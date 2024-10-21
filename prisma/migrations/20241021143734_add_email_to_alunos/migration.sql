-- CreateTable
CREATE TABLE "Aluno" (
    "id" SERIAL NOT NULL,
    "nome" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "idade" INTEGER NOT NULL,
    "nota_primeiro_semestre" DOUBLE PRECISION NOT NULL,
    "nota_segundo_semestre" DOUBLE PRECISION NOT NULL,
    "nome_professor" TEXT NOT NULL,
    "numero_sala" INTEGER NOT NULL,

    CONSTRAINT "Aluno_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Aluno_email_key" ON "Aluno"("email");
