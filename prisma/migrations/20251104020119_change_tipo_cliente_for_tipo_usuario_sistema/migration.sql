/*
  Warnings:

  - You are about to drop the column `tipoCliente` on the `Cliente` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "TipoUsuario" AS ENUM ('CONSULTOR', 'CLIENTE');

-- AlterTable
ALTER TABLE "Cliente" DROP COLUMN "tipoCliente";

-- AlterTable
ALTER TABLE "Pessoa" ADD COLUMN     "tipoUsuario" "TipoUsuario" NOT NULL DEFAULT 'CONSULTOR';

-- DropEnum
DROP TYPE "public"."TipoClinete";
