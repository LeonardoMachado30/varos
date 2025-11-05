-- DropIndex
DROP INDEX "public"."Cliente_consultorId_key";

-- CreateIndex
CREATE INDEX "Cliente_consultorId_idx" ON "Cliente"("consultorId");
