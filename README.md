# CarreraFUT

Simulador de carrera futbolística. Cada jugador de la oficina crea su propio perfil (nombre,
dorsal, pierna hábil, nacionalidad, posición) y juega su carrera temporada a temporada:
ofertas de cantera, mercado de pases, préstamos, y decisiones aleatorias (lesiones, prensa,
selección nacional, disciplina, etc.) que hacen subir o bajar su nivel.

## Stack

- Next.js 16 (App Router, Server Actions) + TypeScript + Tailwind v4
- Prisma 7 + PostgreSQL (Supabase, vía `@prisma/adapter-pg`)
- Auth propia con sesiones en cookie (sin librerías externas), + modo invitado sin registro

## Primer arranque

```bash
npm install
cp .env.example .env   # si no existe .env, completar DATABASE_URL con la connection string de Postgres
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Variables de entorno

- `DATABASE_URL`: connection string de Postgres, por ejemplo la de Supabase (usar el **connection
  pooler** — `aws-0-<región>.pooler.supabase.com:5432` con usuario `postgres.<project-ref>` — la
  conexión directa `db.<project-ref>.supabase.co` solo resuelve por IPv6 en muchas redes).
- `SESSION_COOKIE_NAME`: nombre de la cookie de sesión (opcional, tiene default).

## Base de datos

El schema vive en `prisma/schema.prisma`. El cliente de Prisma se genera en
`lib/generated/prisma` (ignorado por git) — correr `npx prisma generate` después de instalar
dependencias o cambiar el schema (ya corre solo vía `postinstall`).

- `npx prisma migrate dev --name <nombre>`: nueva migración en desarrollo.
- `npx prisma migrate deploy`: aplicar migraciones en producción (script `npm run db:migrate`).
- `npx prisma db seed`: carga países, ligas y clubes base (script `npm run db:seed`).

## Estructura del motor de juego

Todo el motor de simulación vive en `lib/game/` y es independiente de Next.js/Prisma en su
mayoría (fácil de testear):

- `attributes.ts`: atributos por posición y cálculo de overall.
- `data/events.ts`: banco de eventos narrativos (decisiones con resultados probabilísticos).
- `eventEngine.ts`: selección y resolución de eventos.
- `seasonSim.ts`: simulación de partidos/temporada, copas y selección nacional.
- `ageCurve.ts`: evolución de atributos según la edad.
- `careerEngine.ts`: orquesta todo lo anterior contra la base de datos (crear carrera, resolver
  ofertas de club, resolver eventos, avanzar temporada).

## Deploy

Es una app Next.js estándar (`npm run build && npm run start`) — **no es un sitio estático**:
usa Server Actions, sesiones con cookie y lee la base de datos en cada request, así que necesita
un proceso Node corriendo siempre, no una carpeta de HTML para "publicar".

La base de datos vive en Supabase (Postgres), no en el disco del servicio — así que el plan
**Free** de Render alcanza perfectamente: cuentas y carreras persisten entre deploys y reinicios
sin necesidad de un disco persistente ni de un plan pago.

### Render

El repo incluye `render.yaml` (Blueprint) de referencia: tipo **Web Service** (no "Static Site"),
plan **Free**. `DATABASE_URL` se configura como variable de entorno directamente en el servicio
(nunca en este archivo, que es público) con la connection string de Supabase.

1. En Render: New → Blueprint → conectar este repo. Va a leer `render.yaml` solo.
2. Si ya creaste el servicio a mano como "Static Site", hay que borrarlo y crear uno nuevo — no
   se puede convertir un Static Site existente en Web Service.
3. Configurar `DATABASE_URL` a mano en el dashboard del servicio (Environment) con la connection
   string de Supabase.
