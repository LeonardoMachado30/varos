<p align="center">
  <img alt="Varos Logo" src="./public/logo.svg" width="260" />
</p>

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

# Projeto Varos - Plataforma de Gerenciamento de Consultores e Clientes

Este projeto foi desenvolvido como parte do teste técnico para vaga Full-Stack na Varos. O objetivo era criar uma aplicação completa utilizando Next.js (v16), Tailwind CSS, e Prisma ORM, aplicando as boas práticas recomendadas e empregando todos os requisitos do teste.

## Resumo do Projeto

O sistema consiste em um painel (“dashboard”) para consultores, e um módulo de gestão de usuários, permitindo o gerenciamento de consultores e clientes, incluindo cadastro, atualização e visualização dos dados, e relacionamentos entre essas entidades.

Principais funcionalidades:

- **Dashboard do Consultor:** Exibição de clientes associados a cada consultor, com filtros e métricas.
- **Gestão de Usuários:** Formulários para criação (upsert) e atualização de consultores e clientes, com validação completa dos campos.
- **Relacionamento:** Cada consultor pode ter múltiplos clientes vinculados.
- **Autenticação:** Login seguro com email e CPF, geração de JWT no backend e uso de cookies httpOnly.
- **Arquitetura moderna:** Server Components, Suspense, Loading Skeletons, Cache e Server Actions, conforme o stack utilizado internamente pela Varos.

O deploy foi realizado na **Vercel** para o front-end (Next.js) e no **Supabase** para o banco de dados PostgreSQL, permitindo fácil acesso e validação.

---

## Principais Decisões

- **Next.js v16:** Utilização da versão mais atual para garantir acesso a Server Components, Server Actions e demais features modernas.
- **Tailwind CSS:** Utilizado para agilizar o desenvolvimento de UI responsiva e consistente, além de garantir facilidade em customizações.
- **Prisma ORM:** Gerenciamento do banco de dados relacional (PostgreSQL/Supabase), com migrations versionadas na pasta `/prisma/migrations`.
- **Validação de formulários:** Utilização do React Hook Form e Zod para validação client-side e mensagens de erro amigáveis.
- **Autenticação JWT:** Implementada via endpoints no backend, seguindo boas práticas de segurança (cookies httpOnly, JWT).
- **Estrutura modular:** Código organizado com separation of concerns (controle de auth, regras de negócio, componentes).
- **Recomendações do teste:** Todo o stack e cada item solicitado (como Server Components, Suspense, loading, relações entre entidades, etc.) estão devidamente implementados e documentados no código.

---

## Dados de Acesso para Testes

Consultor Padrão:

- **CPF:** 034234234
- **E-mail:** flavio@exemplo.com

Esses dados podem ser usados para acessar o sistema na tela de login.

---

## Especificações Técnicas Atendidas

- **Next.js 16 + App Router + Server Components**
- **Tailwind CSS** para estilização
- **Prisma ORM** para modelagem, migrations e acesso ao banco
- **Validação com React Hook Form + Zod**
- **Dashboard com tabela, filtros e métricas**
- **Sistema de cadastro (upsert) de usuário**
- **Relacionamento entre consultores e clientes**
- **Endpoints para autenticação via JWT**
- **Deploy em Vercel e banco em Supabase**

### Estrutura das tabelas principais:

Consultor (Pessoa):

- tipoUsuario
- nome
- telefone
- email
- idade
- cpf
- cep
- estado
- endereco
- complemento
- **Relação: lista de clientes**

Cliente:

- nome
- email
- telefone
- cpf
- idade
- endereco
- criadoEm
- atualizadoEm

---

## Organização do Código

Principais pastas e arquivos:

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
        ├── internal/
        └── models/
├── lib/
│   └── prisma.ts
├── prisma/
└── migrations/
    ├── ... (migrations do banco)
```

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

- Todo o stack/funcionalidade recomendados no teste foram utilizados.
- Validações, relacionamento entre entidades e recursos modernos do Next.js estão aplicados.
- Toda a lógica de autenticação e controle de acesso está devidamente protegida.
- Deploy realizado conforme a recomendação do teste.

Assim que finalizado, o link do deploy e do repositório foi enviado conforme instrução ao Linkedin do recrutador.

---

Dúvidas, sugestões ou feedbacks são bem-vindos!
