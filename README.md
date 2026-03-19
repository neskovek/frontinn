# Frontinn

Frontend de um sistema de gerenciamento de projetos e usuários com controle de acesso baseado em perfis (admin/hero).

## O que o projeto faz

- **Autenticação** — login e cadastro com JWT armazenado no localStorage. Rotas protegidas redirecionam automaticamente para `/login` em caso de sessão inválida ou expirada.
- **Dashboard** — visão geral dos projetos cadastrados com status (pendente, em progresso, concluído) e metas associadas.
- **Gerenciamento de usuários** — admins podem criar, editar e excluir usuários. Cada usuário possui nome, e-mail, personagem e perfil (admin ou hero).
- **Gerenciamento de projetos** — criação e edição de projetos com descrição, status, metas e vínculo a um usuário responsável via busca dinâmica.

## Stack

- **React 19** + **TanStack Router** (roteamento com layouts autenticados)
- **TanStack Query** (cache e sincronização de dados com a API)
- **React Hook Form** + **Zod** (formulários com validação tipada)
- **Tailwind CSS v4** (estilização)
- **Axios** (cliente HTTP com interceptors de autenticação)
- **Vite** (bundler)

## Configuração

Crie um arquivo `.env` na raiz com:

```env
VITE_API_URL=http://localhost:3333
```

## Rodando localmente

```bash
npm install
npm run dev
```

A aplicação estará disponível em `http://localhost:3000`.

## Rodando com Docker

### Build da imagem

```bash
docker build --build-arg VITE_API_URL=http://localhost:3333 -t frontinn .
```

### Subir o container

```bash
docker run -p 8080:80 frontinn
```

A aplicação estará disponível em `http://localhost:8080`.