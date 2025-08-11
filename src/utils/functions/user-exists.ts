import { prisma } from "../../lib/prisma";

export async function userExists(email: string) {
  const user = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  return user;
}
