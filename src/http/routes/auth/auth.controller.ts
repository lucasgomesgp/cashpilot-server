import { FastifyReply, FastifyRequest } from "fastify";
import { UserChangeSchemaInput, UserSchemaInput } from "./auth.schema";
import { prisma } from "../../../lib/prisma";
import { hash } from "bcrypt";
import { userExists } from "../../../utils/functions/user-exists";
import { transporter } from "../../../lib/nodemailer";
import env from "../../../env";
import { htmlTemplateCode } from "../../../utils/functions/html-template-send-code";
import crypto from "crypto";
import { htmlTemplateLinkRecovery } from "../../../utils/functions/html-template-confirm-email";
import path from "node:path";

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

export async function sendEmailRecovery(
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
      attachments: [
        {
          filename: "logo.png",
          path: path.join(__dirname, "../../../assets/logo.png"),
          cid: "logo_cid",
        },
      ],
      subject: "Recupere sua senha",
      html: htmlTemplateLinkRecovery(id),
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
      attachments: [
        {
          filename: "logo.png",
          path: path.join(__dirname, "../../../assets/logo.png"),
          cid: "logo_cid",
        },
      ],
      subject: "Código de recuperação",
      html: htmlTemplateCode(randomCodeGenerated),
    });
    await prisma.passwordReset.create({
      data: {
        code: randomCodeGenerated,
        expiratesAt: new Date(Date.now() + 10 * 60 * 1000), // 10 minutes
        email,
      },
    });
    return reply.code(200).send({ message: "Código de recuperação enviado!" });
  } catch (err) {
    return reply
      .code(400)
      .send({ error: "Erro ao tentar enviar o código de recuperação!" });
  }
}

export async function changePassword(
  req: FastifyRequest<{
    Body: UserChangeSchemaInput;
  }>,
  reply: FastifyReply
) {
  const { email, password, confirmPassword, code } = req.body;
  if (password !== confirmPassword) {
    return reply.code(400).send({ message: "Senhas incompatíveis!" });
  }
  const user = await userExists(email);
  if (!user) {
    return reply.code(400).send({ message: "Este usuário não existe!" });
  }
  try {
    const codeChangeIsValid = await prisma.passwordReset.findFirst({
      where: {
        email,
        code,
        expiratesAt: { gt: new Date() }, // Check if is in time (gt = Greater Then/maior que)
      },
    });
    if (!codeChangeIsValid) {
      return reply.code(400).send({
        message:
          "Infelizmente seu código já inspirou, envie outro para recomeçar o processo!",
      });
    }
    const hashedPassword = await hash(password, SALT_ROUNDS);

    const userUpdated = await prisma.user.update({
      where: {
        email,
      },
      data: {
        password: hashedPassword,
      },
    });
    return reply.code(201).send({
      id: userUpdated.id,
      email: userUpdated.email,
      name: userUpdated.name,
    });
  } catch (err) {
    return reply
      .code(400)
      .send({ message: "Ocorreu um erro ao tentar modificar sua senha!" });
  }
}
