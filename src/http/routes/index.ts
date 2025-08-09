import z from "zod";
import { FastifyTypedInstance } from "../../types";
import { authRoutes } from "./auth/auth.route";

export async function routes(app: FastifyTypedInstance) {
  app.get(
    "/health",
    {
      schema: {
        response: {
          200: z.string(),
        },
      },
    },
    (req, reply) => {
      return "Server is healthy";
    }
  );

  app.register(authRoutes, { prefix: "/auth" });
}
