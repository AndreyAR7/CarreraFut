// flag-icons (node_modules/flag-icons) keys almost every flag by ISO 3166-1 alpha-2 code, but a
// couple of our seeded "countries" use football-association codes instead (England isn't its own
// ISO country). This maps those exceptions to the flag-icons key that actually renders them.
const CODE_OVERRIDES: Record<string, string> = {
  EN: "gb-eng",
};

export function flagIconKey(code: string): string {
  return (CODE_OVERRIDES[code] ?? code).toLowerCase();
}
