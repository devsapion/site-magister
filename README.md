# Sapion Magister — Site

Site institucional da **Sapion Magister**, a plataforma de formação de professores da Sapion. Apresenta a plataforma para redes municipais de ensino, as trilhas de aprendizagem e seus cursos, o blog, os materiais gratuitos e os canais de contato.

## Páginas

| Rota                           | Conteúdo                                              |
| ------------------------------ | ----------------------------------------------------- |
| `/`                            | Home focada em redes municipais                       |
| `/[trilha]`                    | Trilhas de aprendizagem e o catálogo de cursos de cada uma |
| `/blog`                        | Blog, com páginas por categoria e busca               |
| `/blog/[slug]`                 | Artigo do blog                                        |
| `/materiais-gratuitos`         | Lista de materiais gratuitos                          |
| `/material-gratuito/[slug]`    | Página de download de um material                     |
| `/contato`                     | Contato                                               |

## Stack

- **Next.js 16**: App Router, React 19, TypeScript strict
- **Tailwind CSS v4**: tokens de design em oklch
- **shadcn/ui**: primitivos Base UI
- **Lucide React** e SVGs próprios para ícones

## Pré-requisitos

- [Node.js](https://nodejs.org/) 24+

## Rodando localmente

```bash
npm install
npm run dev
```

O site abre em http://localhost:3000.

## Comandos

```bash
npm run dev       # servidor de desenvolvimento
npm run build     # build de produção
npm run start     # serve o build de produção
npm run lint      # ESLint
npm run typecheck # checagem de tipos
npm run check     # lint + typecheck + build
```

### Com Docker

```bash
docker compose up app --build # build e execução em produção
docker compose up dev --build # modo de desenvolvimento na porta 3001
```

## Variáveis de ambiente

Crie um `.env.local` na raiz quando precisar delas:

| Variável                          | Uso                                                                       |
| --------------------------------- | ------------------------------------------------------------------------- |
| `NEXT_PUBLIC_SITE_URL`            | Origem pública do site, usada nas URLs de Open Graph                      |
| `NEXT_PUBLIC_CONTACT_ENDPOINT`    | Endpoint que recebe os formulários de contato, demonstração e materiais (POST JSON) |
| `NEXT_PUBLIC_NEWSLETTER_ENDPOINT` | Endpoint que recebe as inscrições na newsletter (POST JSON)               |

Sem os endpoints, os formulários avisam que o envio ainda não está configurado.

## Conteúdo

O catálogo de cursos e os posts do blog ficam em JSON dentro de `src/lib/magister/` e são atualizados pelos scripts em `scripts/`:

- `scripts/sync_catalog.py`: sincroniza o catálogo de cursos da plataforma
- `scripts/sync_wp_blog.py`: importa os posts do blog WordPress

## Estrutura

```
src/
  app/                    # rotas do Next.js
  components/
    ui/                   # primitivos shadcn/ui
    sites/magister/       # componentes do site (home, trilhas, blog)
  lib/magister/           # catálogo, posts e materiais
public/
  sites/magister/         # imagens, fontes e demais assets
scripts/                  # scripts de sincronização de conteúdo
docs/research/magister/   # referências de layout
```
