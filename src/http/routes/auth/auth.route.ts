import { FastifyInstance, FastifyReply, FastifyRequest } from "fastify";
import { userSchema, userSchemaBody, UserSchemaResponse } from "./auth.schema";
import { registerUser } from "./auth.controller";

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
}
