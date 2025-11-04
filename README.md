<p align="center">
  <img alt="Varos Logo" src="./public/logo.svg" width="260" />
</p>

<!-- SUMÁRIO -->

## Sumário

- [Projeto Varos - Plataforma de Gerenciamento de Consultores e Clientes](#projeto-varos---plataforma-de-gerenciamento-de-consultores-e-clientes)
  - [Resumo do Projeto](#resumo-do-projeto)
  - [Principais Decisões](#principais-decis%C3%B5es)
  - [Dados de Acesso para Testes](#dados-de-acesso-para-testes)
  - [Especificações Técnicas Atendidas](#especifica%C3%A7%C3%B5es-t%C3%A9cnicas-atendidas)
    - [Estrutura das tabelas principais:](#estrutura-das-tabelas-principais)
  - [Organização do Código](#organiza%C3%A7%C3%A3o-do-c%C3%B3digo)
  - [Prisma – Migrations e Studio (resumido)](#prisma--migrations-e-studio-resumido)
  - [Como rodar localmente](#como-rodar-localmente)
  - [Observações finais](#observa%C3%A7%C3%B5es-finais)

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Projeto Varos - Plataforma de Gerenciamento de Consultores e Clientes

Este projeto foi desenvolvido como parte do teste técnico para vaga Full-Stack na Varos, utilizando Next.js (v16), Tailwind CSS, e Prisma ORM, seguindo boas práticas e todos requisitos do teste.

## Resumo do Projeto

O sistema consiste em um dashboard para consultores, além de um módulo de gestão de usuários (consultores e clientes) com cadastro, atualização e visualização de dados e relacionamentos.

Principais funcionalidades:

- **Dashboard do Consultor:** Lista clientes do consultor, com filtros e métricas.
- **Gestão Completa de Usuários:** Criação (upsert) e atualização de consultores e clientes, com validação.
- **Relacionamento:** Cada consultor pode ter múltiplos clientes.
- **Autenticação:** Login via email e CPF, JWT e cookies httpOnly.
- **Arquitetura Moderna:** Server Components, Suspense, loading skeletons, cache e Server Actions.

Deploy no **Vercel** (Next.js) e banco no **Supabase**.

---

## Principais Decisões

- **Next.js v16:** Suporte a Server Actions/Components e features recentes.
- **Tailwind CSS:** Produtividade e flexibilidade visual.
- **Prisma ORM:** Banco relacional versionado com migrations.
- **React Hook Form + Zod:** Validação completa no frontend.
- **JWT:** Autenticação cuidando da segurança.
- **Estrutura modular:** Código organizado.
- **Stack completo solicitado no teste**, usando todas as features pedidas.

---

## Dados de Acesso para Testes

Consultor para login:

- **CPF:** 034234234
- **E-mail:** flavio@exemplo.com

---

## Especificações Técnicas Atendidas

- **Next.js 16 + App Router + Server Components**
- **Tailwind CSS**
- **Prisma ORM:** Modelagem, migrations e acesso ao banco
- **React Hook Form + Zod**
- **Dashboard completo**
- **Cadastro e relação consultor–cliente**
- **JWT para endpoints**
- **Deploy em Vercel e Supabase**

### Estrutura das tabelas principais:

**Consultor (Pessoa):**

- tipoUsuario, nome, telefone, email, idade, cpf, cep, estado, endereco, complemento
- **Relação: lista de clientes**

**Cliente:**

- nome, email, telefone, cpf, idade, endereco, criadoEm, atualizadoEm

---

## Organização do Código

```
app/
├── api/
│   ├── clientes/
│   │   └── [id]
│   └── consultor/
│       └── login/
├── cadastro/usuario/
├── cliente/[id]/
├── dashboard/
└── generated/
    └── prisma/
├── lib/
│   └── prisma.ts
├── prisma/
└── migrations/
```

---

## Prisma – Migrations e Studio (resumido)

- Para criar uma migration após mudar o schema, use:

```bash
npx prisma migrate dev --name nome_da_migrate
```

- O nome deve seguir _snake_case_ (exemplo: `adicionar_campo_idade`). Isso facilita histórico e entendimento dos propósitos de cada migration.

- Para aplicar migrations em produção utilize:

```bash
npx prisma migrate deploy
```

> Este comando aplica todas as migrations pendentes. Ele é focado para ambiente de produção, pois não executa validações interativas nem resolve conflitos automaticamente.

- Para explorar/editar os dados de maneira visual, execute:

```bash
npx prisma studio
```

> Acesse a interface web para consultar, inserir e editar dados no banco de forma simples.

---

## Como rodar localmente

1. Instale as dependências:

```bash
npm install
```

2. Execute o servidor de desenvolvimento:

```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
# ou
bun dev
```

3. Abra [http://localhost:3000](http://localhost:3000) para acessar o sistema.

---

## Observações finais

- Todo stack e funcionalidades sugeridas no teste foram aplicados.
- Stack Next.js moderno, autenticação, validações e relacionamento de entidades completos.
- Deploy conforme recomendado.

Assim que finalizado, link do deploy e repositório foi enviado conforme instrução ao recrutador via Linkedin.

---

Dúvidas, sugestões ou feedbacks são bem-vindos!
