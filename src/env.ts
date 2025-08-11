import z from "zod";

const envSchema = z.object({
  PORT: z.coerce.number().min(1000),
  DATABASE_URL: z.string().url(),
  API_BASE_URL: z.string().url(),
  MAIL_USER: z.string(),
  MAIL_PORT: z.coerce.number(),
  MAIL_PASSWORD: z.string(),
});

const env = envSchema.parse(process.env);

export default env;
