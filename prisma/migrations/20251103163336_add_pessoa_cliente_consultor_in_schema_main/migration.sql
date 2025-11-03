-- CreateEnum
CREATE TYPE "TipoClinete" AS ENUM ('CONSULTOR');

-- CreateTable
CREATE TABLE "Pessoa" (
    "id" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cpf" TEXT,
    "dataNascimento" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Pessoa_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Consultor" (
    "id" TEXT NOT NULL,
    "pessoaId" TEXT NOT NULL,

    CONSTRAINT "Consultor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Cliente" (
    "id" TEXT NOT NULL,
    "tipoCliente" "TipoClinete" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pessoaId" TEXT NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Pessoa_cpf_key" ON "Pessoa"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "Consultor_pessoaId_key" ON "Consultor"("pessoaId");

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_pessoaId_key" ON "Cliente"("pessoaId");

-- CreateIndex
CREATE INDEX "Cliente_pessoaId_idx" ON "Cliente"("pessoaId");

-- AddForeignKey
ALTER TABLE "Consultor" ADD CONSTRAINT "Consultor_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "Pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Cliente" ADD CONSTRAINT "Cliente_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "Pessoa"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
