-- AlterTable
ALTER TABLE "Pessoa" ADD COLUMN     "idade" INTEGER;

-- CreateTable
CREATE TABLE "Endereco" (
    "id" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "estado" TEXT NOT NULL,
    "cidade" TEXT,
    "bairro" TEXT,
    "rua" TEXT,
    "numero" TEXT,
    "complemento" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "pessoaId" TEXT,

    CONSTRAINT "Endereco_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Endereco_pessoaId_key" ON "Endereco"("pessoaId");

-- CreateIndex
CREATE INDEX "Endereco_pessoaId_idx" ON "Endereco"("pessoaId");

-- AddForeignKey
ALTER TABLE "Endereco" ADD CONSTRAINT "Endereco_pessoaId_fkey" FOREIGN KEY ("pessoaId") REFERENCES "Pessoa"("id") ON DELETE SET NULL ON UPDATE CASCADE;
