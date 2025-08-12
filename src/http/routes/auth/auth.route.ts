import { FastifyInstance } from "fastify";
import {
  userChangePasswordSchema,
  userRecoverySchema,
  userSchema,
  userSchemaBody,
} from "./auth.schema";
import {
  registerUser,
  sendEmailRecovery,
  sendCode,
  changePassword,
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
}
