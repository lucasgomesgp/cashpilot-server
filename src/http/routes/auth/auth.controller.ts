import { FastifyReply, FastifyRequest } from "fastify";
import { UserSchemaInput } from "./auth.schema";
import { prisma } from "../../../lib/prisma";
import { hash } from "bcrypt";

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
    const userExists = await prisma.user.findUnique({
      where: {
        email,
      },
    });
    if (userExists) {
      return reply.code(409).send("User already exists.");
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
    console.log("Erro durante a criação", err);
    return reply.code(400).send({ error: "User not created" });
  }
}
