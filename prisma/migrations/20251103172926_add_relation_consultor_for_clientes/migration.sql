/*
  Warnings:

  - A unique constraint covering the columns `[consultorId]` on the table `Cliente` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Cliente" ADD COLUMN     "consultorId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_consultorId_key" ON "Cliente"("consultorId");

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_consultorId_fkey" FOREIGN KEY ("consultorId") REFERENCES "Consultor"("id") ON DELETE SET NULL ON UPDATE CASCADE;
