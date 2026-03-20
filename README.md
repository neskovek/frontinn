# Frontinn

Frontend do portal **HeroForce** — sistema de gestão e vendas de projetos heroicos. Construído com React.js.

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

## Decisões técnicas

### TanStack Router

O TanStack Router foi escolhido por oferecer uma forma mais simples e prática de criar rotas, via páginas, além de ter suporte a SSR sem depender de um framework estilo Next. Além disso, o router possui suporte nativo a nested layouts, o que permitiu isolar as rotas autenticadas num único layout `_authenticated` que intercepta o acesso e redireciona para `/login` quando necessário.

### TanStack Query

O TanStack Query gerencia todo o ciclo de vida das requisições: cache, revalidação, estados de loading/error e sincronização entre componentes. A decisão de usá-lo evitou a necessidade de criar stores globais (Zustand, Redux) apenas para compartilhar dados entre componentes, além de simplificar as chamadas para a API.

### React Hook Form + Zod

Formulários são validados com Zod no próprio schema e integrados ao React Hook Form via `zodResolver`, garantindo que a tipagem TypeScript e as regras de validação sejam a mesma.

### Controle de acesso por perfil

O papel do usuário (`admin` / `hero`) é lido do token JWT via hook `useAuth` e propagado para os componentes.

## Possíveis melhorias

- **Filtros na tela de usuários** — atualmente a listagem de usuários não possui filtros. Seria interessante adicionar busca por nome, filtro por perfil (admin/hero) e por personagem, seguindo o mesmo padrão do `FormFilter` já implementado na dashboard.

- **Upload de foto de perfil** — cada usuário poderia ter uma foto de perfil. Uma boa abordagem seria integrar com o Google Cloud Storage (GCS), fazendo upload direto do browser via signed URL gerada pelo backend, e armazenando apenas a URL pública no banco de dados.

- **Dashboard mais rico** — a tela de projetos poderia evoluir para um dashboard mais analítico, com cards de resumo (total de projetos por status), gráficos de distribuição (pizza ou barras), e uma visão de linha do tempo das metas. Atualmente a listagem mostra os dados tabulares mas não oferece uma visão agregada do estado geral dos projetos.