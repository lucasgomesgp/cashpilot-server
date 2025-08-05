import z from "zod";
import { FastifyTypedInstance } from "../../types";

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
}
