# Trophy/award photo credits

The photos in this folder are real trophies and individual awards (Champions League, Copa
Libertadores, CONCACAF Champions Cup, Copa del Rey, Costa Rica's Liga Promérica trophy, the
FIFA World Cup, Balón de Oro, Bota de Oro, Trofeo Puskás) sourced from the web and supplied by
the project owner. Backgrounds were removed and images were resized/normalized (see
`lib/game/data/trophyImages.ts`) with the open-source [rembg](https://github.com/danielgatis/rembg)
tool (MIT-licensed, ONNX U2Net/ISNet models).

These are trademarked objects/awards owned by FIFA, UEFA, CONMEBOL, CONCACAF, RFEF, FEDEFUTBOL,
France Football, etc. This project is a fan-made, non-commercial career simulator; no
affiliation with or endorsement by any of those organizations is claimed or implied. If a rights
holder objects to their use here, remove the relevant file(s) and `TrophyIcon` falls back to the
drawn icon automatically (see `components/TrophyIcon.tsx`).

Competitions/awards without a real photo here (e.g. other countries' domestic cups, the AFC
Champions League) fall back to the same drawn icon.
