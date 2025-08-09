/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- CreateEnum
CREATE TYPE "public"."Bank" AS ENUM ('BRADESCO', 'NUBANK', 'PAN', 'BANCO DO BRASIL', 'INTER', 'SOFISA', 'C6', 'BMG', 'PICPAY', 'SANTANDER', 'BTG', 'PAGSEGURO', 'PAYPAL', 'MERCADO PAGO', 'SAFRA', 'OUTRO');

-- CreateEnum
CREATE TYPE "public"."Category" AS ENUM ('PESSOAL', 'SERVICOS', 'OUTRO');

-- CreateEnum
CREATE TYPE "public"."InvestimentsCategory" AS ENUM ('TESOURO', 'CDB', 'LCI', 'ACOES', 'FII', 'ETF', 'PGBL', 'VGBL', 'CRIPTO', 'POUPANCA');

-- CreateEnum
CREATE TYPE "public"."Cards" AS ENUM ('CLASSIC', 'GOLD', 'PLATINUM', 'BLACK', 'INFINITE', 'NACIONAL', 'INTERNACIONAL', 'ELO MAIS', 'ELO GRAFITE', 'ELO NANQUIM');

-- DropTable
DROP TABLE "public"."User";

-- CreateTable
CREATE TABLE "public"."users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "imageUrl" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."savings" (
    "id" TEXT NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "description" TEXT NOT NULL,
    "senderBank" "public"."Bank" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "savings_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."loans" (
    "id" TEXT NOT NULL,
    "loanValue" DECIMAL(65,30) NOT NULL,
    "pursharseValue" DECIMAL(65,30) NOT NULL,
    "description" TEXT NOT NULL,
    "category" "public"."Category" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "loans_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."investiments" (
    "id" TEXT NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "description" TEXT NOT NULL,
    "category" "public"."InvestimentsCategory" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,

    CONSTRAINT "investiments_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."transactions" (
    "id" TEXT NOT NULL,
    "value" DECIMAL(65,30) NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "userId" TEXT NOT NULL,
    "creditCardId" TEXT NOT NULL,

    CONSTRAINT "transactions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."credit_cards" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "type" "public"."Cards" NOT NULL,
    "number" TEXT NOT NULL,
    "expiration" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "principal" BOOLEAN NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "credit_cards_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "public"."users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "savings_userId_key" ON "public"."savings"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "loans_userId_key" ON "public"."loans"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "investiments_userId_key" ON "public"."investiments"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "transactions_userId_key" ON "public"."transactions"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "credit_cards_userId_key" ON "public"."credit_cards"("userId");

-- AddForeignKey
ALTER TABLE "public"."savings" ADD CONSTRAINT "savings_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."loans" ADD CONSTRAINT "loans_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."investiments" ADD CONSTRAINT "investiments_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."transactions" ADD CONSTRAINT "transactions_creditCardId_fkey" FOREIGN KEY ("creditCardId") REFERENCES "public"."credit_cards"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."transactions" ADD CONSTRAINT "transactions_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."credit_cards" ADD CONSTRAINT "credit_cards_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
