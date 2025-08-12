-- CreateTable
CREATE TABLE "public"."password_reset" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "expiratesAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "password_reset_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "password_reset_userId_key" ON "public"."password_reset"("userId");

-- AddForeignKey
ALTER TABLE "public"."password_reset" ADD CONSTRAINT "password_reset_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
