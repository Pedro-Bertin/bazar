# Bazar

Um aplicativo de marketplace full-stack construído com Next.js, TypeScript e Prisma. Usuários podem criar uma conta, fazer login, gerenciar seu endereço e cadastrar produtos para venda com imagens.

## Funcionalidades

- **Autenticação** — criação de conta e login com senhas criptografadas (bcrypt).
- **Perfis de usuário** — cada usuário possui um endereço vinculado (rua, bairro, cidade, estado, CEP).
- **Listagem de produtos** — criação, visualização e gerenciamento de produtos com título, descrição, preço, categoria e múltiplas imagens.
- **Upload de imagens** — as imagens dos produtos são hospedadas via Cloudinary.
- **Rotas privadas** — páginas de conta e gerenciamento de produtos acessíveis apenas para usuários autenticados.
- **Componentes de UI** — construídos com primitivos do Radix UI e componentes no estilo shadcn, estilizados com Tailwind CSS, com suporte a tema claro/escuro via next-themes.

## Stack tecnológica

- **Framework:** Next.js (App Router) + React
- **Linguagem:** TypeScript
- **Banco de dados / ORM:** PostgreSQL + Prisma
- **Autenticação:** hashing de senha com bcrypt, Server Actions para lógica de usuário/sessão
- **Hospedagem de imagens:** Cloudinary (next-cloudinary)
- **UI:** Tailwind CSS, Radix UI, ícones lucide-react

## Estrutura do projeto

- `actions/` — server actions para usuários (`user.actions.ts`) e produtos (`product.actions.ts`)
- `app/` — rotas, incluindo o grupo de rotas `(private)`, páginas de login e cadastro
- `components/ui/` — componentes de UI reutilizáveis
- `prisma/` — schema do banco de dados (User, Address, Product, ProductImage)
- `lib/` — utilitários compartilhados

## Como começar

Clone o repositório e instale as dependências:

```
npm install
```

Configure suas variáveis de ambiente (string de conexão do banco de dados, credenciais do Cloudinary).

Execute as migrações do Prisma:

```
npx prisma migrate dev
```

Inicie o servidor de desenvolvimento:

```
npm run dev
```

Abra http://localhost:3000 no seu navegador.

## Status

Este projeto está sendo revisado e aprimorado ativamente. Feedback e sugestões são bem-vindos.
