import { FastifyReply, FastifyRequest } from "fastify";
import { UserSchemaInput } from "./auth.schema";
import { prisma } from "../../../lib/prisma";
import { hash } from "bcrypt";
import { userExists } from "../../../utils/functions/user-exists";
import { transporter } from "../../../lib/nodemailer";
import env from "../../../env";
import { htmlTemplate } from "../../../utils/functions/html-template-send-code";
import crypto from "crypto";

const SALT_ROUNDS = 10;

export async function registerUser(
  req: FastifyRequest<{
    Body: UserSchemaInput;
  }>,
  reply: FastifyReply
) {
  const { email, password, name } = req.body;
  const hashedPassword = await hash(password, SALT_ROUNDS);

  try {
    const userIsRegistered = await userExists(email);
    if (userIsRegistered) {
      return reply.code(409).send("Usuário já existe.");
    }

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return reply.code(201).send({
      id: user.id,
      email: user.email,
      name: user.name,
    });
  } catch (err) {
    return reply.code(400).send({ error: "Não foi possível criar o usuário" });
  }
}

export async function resetPassword(
  req: FastifyRequest<{
    Body: {
      email: string;
    };
  }>,
  reply: FastifyReply
) {
  try {
    const { email } = req.body;
    const userIsRegistered = await userExists(email);
    if (!userIsRegistered) {
      return reply.code(409).send("Usuário inexistente.");
    }
    const { name, id } = userIsRegistered;
    await transporter.sendMail({
      from: {
        name: "CashPilot",
        address: env.MAIL_USER,
      },
      to: {
        name: name,
        address: email,
      },
      subject: "Recupere sua senha",
      html: htmlTemplate(id),
    });
    return reply
      .code(200)
      .send({ message: "Email de recuperação enviado com sucesso!" });
  } catch (err) {
    return reply.code(400).send({ error: "Erro ao tentar resetar a senha!" });
  }
}

export async function sendCode(
  req: FastifyRequest<{
    Body: {
      email: string;
    };
  }>,
  reply: FastifyReply
) {
  try {
    const { email } = req.body;
    const userIsRegistered = await userExists(email);
    if (!userIsRegistered) {
      return reply.code(409).send("Usuário inexistente.");
    }
    const { name } = userIsRegistered;
    const randomCodeGenerated = crypto.randomInt(100000, 1000000).toString();
    await transporter.sendMail({
      from: {
        name: "CashPilot",
        address: env.MAIL_USER,
      },
      to: {
        name: name,
        address: email,
      },
      subject: "Código de recuperação",
      html: htmlTemplate(randomCodeGenerated),
    });
    console.log(randomCodeGenerated);
    return reply.code(200).send({ message: "Código de recuperação enviado!" });
  } catch (err) {
    return reply
      .code(400)
      .send({ error: "Erro ao tentar enviar o código de recuperação!" });
  }
}
