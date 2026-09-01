# CarreraFUT

Simulador de carrera futbolística. Cada jugador de la oficina crea su propio perfil (nombre,
dorsal, pierna hábil, nacionalidad, posición) y juega su carrera temporada a temporada:
ofertas de cantera, mercado de pases, préstamos, y decisiones aleatorias (lesiones, prensa,
selección nacional, disciplina, etc.) que hacen subir o bajar su nivel.

## Stack

- Next.js 16 (App Router, Server Actions) + TypeScript + Tailwind v4
- Prisma 7 + SQLite (vía `@prisma/adapter-better-sqlite3`)
- Auth propia con sesiones en cookie (sin librerías externas), + modo invitado sin registro

## Primer arranque

```bash
npm install
cp .env.example .env   # si no existe .env, completar DATABASE_URL
npx prisma migrate dev
npx prisma db seed
npm run dev
```

Abrí [http://localhost:3000](http://localhost:3000).

## Variables de entorno

- `DATABASE_URL`: ruta al archivo SQLite, por ejemplo `file:./prisma/dev.db`.
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

Es una app Next.js estándar (`npm run build && npm run start`). Como usa SQLite, alcanza con
persistir el archivo de `DATABASE_URL` entre despliegues (por ejemplo, un volumen si se corre
en un contenedor).
