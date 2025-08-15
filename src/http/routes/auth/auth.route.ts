import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
  userChangePasswordSchema,
  userLoginResponse,
  userLoginSchema,
  userRecoverySchema,
  userSchema,
  userSchemaBody,
  usersSchema,
} from "./auth.schema";
import {
  registerUser,
  sendEmailRecovery,
  sendCode,
  changePassword,
  loginUser,
  getUsers,
} from "./auth.controller";
import z from "zod";

export function authRoutes(app: FastifyInstance) {
  app.post(
    "/register",
    {
      schema: {
        body: userSchemaBody,
        response: {
          201: userSchema,
        },
      },
    },
    registerUser
  );
  app.post(
    "/recovery-email",
    {
      schema: {
        body: userRecoverySchema,
        response: {
          200: z.object({
            message: z.string(),
          }),
        },
      },
    },
    sendEmailRecovery
  );
  app.post(
    "/send-code",
    {
      schema: {
        body: userRecoverySchema,
        response: {
          200: z.object({
            message: z.string(),
          }),
        },
      },
    },
    sendCode
  );
  app.post(
    "/change-password",
    {
      schema: {
        body: userChangePasswordSchema,
        response: {
          201: userSchema,
        },
      },
    },
    changePassword
  );
  app.post(
    "/login",
    {
      schema: {
        body: userLoginSchema,
        response: {
          200: userLoginResponse,
        },
      },
    },
    loginUser
  );

  app.get(
    "/users",
    {
      preHandler: [app.authenticate],
      schema: {
        response: {
          200: usersSchema,
        },
      },
    },
    getUsers
  );
  app.delete(
    "/logout",
    {
      preHandler: [app.authenticate],
      schema: {
        response: {
          204: z.object({
            message: z.string(),
          }),
        },
      },
    },
    (req: FastifyRequest, reply: FastifyReply) => {
      reply.clearCookie("access_token", {
        path: "/",
        httpOnly: true,
        secure: true,
      });

      return reply.code(200).send({ message: "Usuário deslogado!" });
    }
  );
}
