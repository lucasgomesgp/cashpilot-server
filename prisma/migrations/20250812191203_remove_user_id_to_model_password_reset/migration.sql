/*
  Warnings:

  - You are about to drop the column `userId` on the `password_reset` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email]` on the table `password_reset` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."password_reset_userId_key";

-- AlterTable
ALTER TABLE "public"."password_reset" DROP COLUMN "userId";

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_email_key" ON "public"."password_reset"("email");
