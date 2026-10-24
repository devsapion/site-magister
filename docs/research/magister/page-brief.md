# Sapion Magister — home page brief

Source: https://magister.sapion.com.br/ (WordPress 6 + Elementor 4.3 / Pro Elements, theme Hello Elementor, Happy Addons).
Local route: `/` → `src/app/page.tsx`. Components in `src/components/sites/magister/`, assets in `public/sites/magister/`.

## Page-wide

- Breakpoints (Elementor): mobile ≤ 767px, tablet ≤ 1024px, desktop above. Content width 1140px.
- Fonts (self-hosted copies of Google Fonts on the source): Sora (variable, default for everything),
  Poppins 500/700 (header buttons + mobile menu), Roboto (trilha card descriptions, "Assine" list, popup text).
- Global colors: primary `#A05FF9`, secondary `#87F199`, accent `#FBBF00`, `#8341E9`, light blue `#D9EAFA`, text `#7A7A7A`.
- `body` background `#8341E9` (shows behind the header).
- Entrance animations: Elementor `fadeIn`, `fadeInLeft`, `fadeInRight`, `fadeInDown`, 1.25s, triggered on viewport entry, with per-element delays.
- Floating FX (Happy Addons / anime.js): hero sparkle x/y -3→8px 3000ms; certificate tablet y -8→16px 1000ms; alternate loop.
- Motion FX parallax declared on the Venn image but inactive on the live page (transform stays `none`) — not reproduced.

## Sections (desktop 1440px, page y)

| # | Section | y / h | Background |
|---|---------|-------|------------|
| 1 | Header (not sticky) | 0 / 84 | transparent over body `#8341E9` |
| 2 | Hero | 84 / 616 | `linear-gradient(180deg,#8341E9 0%,#A05FF9 80%)` |
| 3 | Trilhas + features + Venn | 699 / 1468 | `linear-gradient(171deg,#A05FF9 16%,#5713A4 48%)` + path image `SITE-4-14` at `0 83px / contain` |
| 4 | Vídeo + flip cards | 2167 / 462 | `linear-gradient(180deg,#5613A3 0%,#83ADC8 100%)` |
| 5 | Assine / Investimento | 2628 / 824 (pb 340) | `linear-gradient(180deg,#83ADC8 8%,#8BBAD0 32%)` |
| 6 | Ecossistema + testimonials | 3212 / 788 (mt -240) | `FUNDO-08` cover |
| 7 | #TimeMagister carousel | 4000 / 854 | `linear-gradient(40deg,#D6E8FA 66%,#A9A1F5 85%)` |
| 8 | Confiam (partners carousel) | 4855 / 569 | `#D9EAFA` |
| 9 | Wave divider | 5423 / 245 | `#D6E8FA` + `SITE-4-03` cover |
| 10 | Certificado | 5668 / 630 | `#A05FF9` |
| 11 | Footer | 6298 / 175 | `radial-gradient(at top center,#8341E9 50%,#B896E7 100%)` |

Hidden on every breakpoint in the source (not cloned): blog posts block, header Blog/Materiais gratuitos links.

## Interactions

- Header buttons: white/outline → hover bg `#87F199`, text `#8341E9`, border `#8341E9`. Text links hover `#87F199`.
- Mobile (≤767): header becomes logo + outlined hamburger; opens a left drawer (294px, white, colored logo, close X `#8341E9`,
  "Nossos cursos", "Sou aluno" filled purple, "Assine agora" outlined) over `rgba(0,0,0,.8)`.
- Trilha cards: "Conhecer cursos" `#474DF0` → hover `#8341E9`. Mobile: one-card carousel with arrows.
- Feature cards: hover bg `linear-gradient(180deg,#A9E9BB,#78CFA3)` (0.8s), title → `#45108A`.
- Flip cards (Happy Addons classic, flip-up): hover rotates X 180°, 0.6s `cubic-bezier(0.2,0.85,0.4,1.275)`.
- Testimonials: 3 Swiper rows, 2 per view, 20px gap, loop, autoplay 5s, speed 500ms, pause on hover; rows bleed off the right edge.
- Team: 4 per view (1 on mobile), 20px gap, dots, loop, autoplay 5s. Names/titles are baked into the photos.
- Partners: 4 per view, dots (inactive white, active `#87F199`), loop, autoplay 5s.
- "Leve para sua escola ou órgão" → contact popup (Elementor form: Nome, E-mail, Telefone, Nome do órgão, Departamento,
  Mensagem opcional; submit `#87F199`). Submission targets WordPress admin-ajax — not available in the clone.
- "Assine agora" in the header → `#assine` anchor (pricing section).

## Asset map (source `wp-content/uploads/…` → `public/sites/magister/…`)

| Local | Source |
|-------|--------|
| images/logo-white.png | 2024/03/magister-branca-1024x347.png |
| images/logo-color.png | 2024/03/SAPION-MAGISTER-MARCA-14-1024x298.png |
| images/sparkle.png | 2024/04/SITE-4-52-1.png |
| images/badge-app-store.png | 2025/04/selo-apple-store-e1746020812142-600x182.png |
| images/badge-google-play.png | 2025/04/985c719c-…-e1746020774703.png |
| images/hero-phones.png | 2025/01/mochup_app_magister-1467x1536.png |
| images/trilhas-path-bg.png | 2024/04/SITE-4-14.png |
| images/trilha-{inovacao,infancia,skills,gestao,inclusao}.png | 2024/04/SITE-03/04/05/06/07.png |
| images/feature-*.png | 2024/04/SITE-21…25.png |
| images/venn-inovacao-educacao.png | 2024/04/SITE-38-1536x1092.png |
| images/scroll-arrows.png | 2024/04/SITE-54.png |
| images/flip-front-bg.png / flip-back-bg.png | 2024/04/CARDS_Prancheta-1.png / CARDS-02.png |
| images/book-icon.png | 2024/03/SAPION-MAGISTER-MARCA-10.png |
| images/ecossistema-bg.png / ecossistema-illustration.png | 2024/04/FUNDO-08.png / SITE-4-44.png |
| images/time-cube.png / time-stars.png | 2024/04/SITE-4-47-1024x1021.png / SITE-4-43.png |
| images/team/*.png | 2024/05/{Vanessa,Jose,Israel,Giselle,Flavia,Adriana}.png |
| images/partners/partner-{1..7}.png | 2024/07/{1..7}-1.png |
| images/star-purple.png | 2024/04/pag-trilha-fundo-02.png |
| images/certificado-wave-bg.png / certificado.png | 2024/04/SITE-4-03.png / CERTIFICADO-01-1536x1465.png |
| images/favicon.png | 2024/03/SAPION-MAGISTER-MARCA-10-300x300.png |
| images/heart.svg | s.w.org emoji 2764.svg |
| fonts/sora-latin.woff2, roboto-latin.woff2, poppins-{500,700}.woff2 | elementor/google-fonts/fonts/… |

Partner order in the carousel: 7 Colatina, 6 Alto Rio Novo, 5 São Roque do Canaã, 4 Fundação Renova,
3 Governo do ES, 2 Pancas, 1 Barra de São Francisco.

Video: `https://www.youtube-nocookie.com/embed/2HUE36-zVds?controls=0` (iframe, radius 15px, 619×415).

---

# Track pages (`/trilha-*`)

Source: https://magister.sapion.com.br/trilha-inovacao/ (and infancia, skills, inclusao, gestao — same template).
Local route: `src/app/[trilha]/page.tsx` (static params from `trilhas` in `content.ts`, `dynamicParams = false`).

What changes per track (all in `trilhas` in `content.ts`): title, description, icon, `pageColor`
(Inovação `#fea244`, Infância `#ffed00`, Skills `#6ff782`, Inclusão `#37bfeb`, Gestão `#c4c4c4`), certificate image
(CERTIFICADO-06/05/04/02/03) and the course list. Everything else is shared.

Source quirk not reproduced: the live Inovação page shows the Skills description; the clone uses the track's own
description (the same text as its home card).

Section order: light header + purple divider (on `pageColor`) → hero → courses + highlights (`#cursos`) →
pricing (dark variant) → dark arches wave → features + Venn (`#45108a` gradient, arch at -152px) →
video (trilha gradient, 330px bottom space) → testimonials (-192px) → #TimeMagister → certificate → footer.

Courses come from `getCoursesByTrilha()` in `src/lib/magister/courses.ts`, currently backed by 3 fictitious
courses per track in `mock-courses.ts`. Courses without an image render a placeholder with the track icon.

| Local | Source |
|-------|--------|
| images/trilha/wave-dark.png | 2024/04/pag-trilha-fundo_Prancheta-1.png |
| images/trilha/courses-path-bg.png | 2024/04/PAG-TRILHA.png |
| images/trilha/diamond.png | 2024/04/SITE-4-45-1.png |
| images/trilha/stat-clock.png | 2024/04/Ativo-5.png |
| images/trilha/chip-{videos,ebooks,online,atividades}.png | 2024/04/copia-de-Ativo-5.png, Ativo-5-copia-2*.png |
| images/certificados/{inovacao,infancia,skills,inclusao,gestao}.png | 2024/04/CERTIFICADO-06/05/04/02/03-1536x1465.png |
