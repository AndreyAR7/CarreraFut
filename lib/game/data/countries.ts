export interface CountrySeed {
  code: string;
  name: string;
  flag: string;
  footballPower: number;
}

export const COUNTRIES: CountrySeed[] = [
  { code: "AR", name: "Argentina", flag: "🇦🇷", footballPower: 5 },
  { code: "BR", name: "Brasil", flag: "🇧🇷", footballPower: 5 },
  { code: "UY", name: "Uruguay", flag: "🇺🇾", footballPower: 3 },
  { code: "ES", name: "España", flag: "🇪🇸", footballPower: 5 },
  { code: "EN", name: "Inglaterra", flag: "🏴", footballPower: 5 },
  { code: "DE", name: "Alemania", flag: "🇩🇪", footballPower: 5 },
  { code: "IT", name: "Italia", flag: "🇮🇹", footballPower: 4 },
  { code: "FR", name: "Francia", flag: "🇫🇷", footballPower: 5 },
  { code: "PT", name: "Portugal", flag: "🇵🇹", footballPower: 4 },
  { code: "NL", name: "Países Bajos", flag: "🇳🇱", footballPower: 4 },
  { code: "CO", name: "Colombia", flag: "🇨🇴", footballPower: 3 },
  { code: "CL", name: "Chile", flag: "🇨🇱", footballPower: 3 },
  { code: "US", name: "Estados Unidos", flag: "🇺🇸", footballPower: 2 },
  { code: "JP", name: "Japón", flag: "🇯🇵", footballPower: 3 },
  { code: "CR", name: "Costa Rica", flag: "🇨🇷", footballPower: 3 },
];
