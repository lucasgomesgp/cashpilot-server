import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import {
  userRecoverySchema,
  userSchema,
  userSchemaBody,
  UserSchemaResponse,
} from "./auth.schema";
import { registerUser, resetPassword } from "./auth.controller";
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
    "/reset-password",
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
    resetPassword
  );
}
