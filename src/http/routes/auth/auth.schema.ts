import z from "zod";

const userSchemaBody = z.object({
  name: z.string(),
  password: z.string().min(8),
  email: z.string().email({ error: "Email inválido" }),
});

const userSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email({ error: "Email inválido" }),
});

const userRecoverySchema = z.object({
  email: z.string().email(),
});
const userChangePasswordSchema = z.object({
  email: z.string().email(),
  password: z.string(),
  confirmPassword: z.string(),
  code: z.string(),
});

export type UserSchemaInput = z.infer<typeof userSchemaBody>;
export type UserChangeSchemaInput = z.infer<typeof userChangePasswordSchema>;
export type UserSchemaResponse = z.infer<typeof userSchema>;

export {
  userSchemaBody,
  userSchema,
  userRecoverySchema,
  userChangePasswordSchema,
};
