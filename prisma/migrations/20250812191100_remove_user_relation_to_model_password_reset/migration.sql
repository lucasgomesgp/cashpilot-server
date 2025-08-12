/*
  Warnings:

  - Added the required column `email` to the `password_reset` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."password_reset" DROP CONSTRAINT "password_reset_userId_fkey";

-- AlterTable
ALTER TABLE "public"."password_reset" ADD COLUMN     "email" TEXT NOT NULL;
