export interface LeagueSeed {
  key: string;
  name: string;
  countryCode: string;
  tier: number;
  matchesPerSeason: number;
}

export interface ClubSeed {
  key: string;
  name: string;
  shortName: string;
  leagueKey: string;
  reputation: number;
  primaryColor: string;
}

export const LEAGUES: LeagueSeed[] = [
  { key: "AR1", name: "Liga Profesional", countryCode: "AR", tier: 1, matchesPerSeason: 30 },
  { key: "AR2", name: "Primera Nacional", countryCode: "AR", tier: 2, matchesPerSeason: 30 },
  { key: "BR1", name: "Brasileirão Série A", countryCode: "BR", tier: 1, matchesPerSeason: 38 },
  { key: "BR2", name: "Brasileirão Série B", countryCode: "BR", tier: 2, matchesPerSeason: 38 },
  { key: "ES1", name: "LaLiga", countryCode: "ES", tier: 1, matchesPerSeason: 38 },
  { key: "ES2", name: "Segunda División", countryCode: "ES", tier: 2, matchesPerSeason: 42 },
  { key: "EN1", name: "Premier League", countryCode: "EN", tier: 1, matchesPerSeason: 38 },
  { key: "EN2", name: "Championship", countryCode: "EN", tier: 2, matchesPerSeason: 46 },
  { key: "DE1", name: "Bundesliga", countryCode: "DE", tier: 1, matchesPerSeason: 34 },
  { key: "DE2", name: "2. Bundesliga", countryCode: "DE", tier: 2, matchesPerSeason: 34 },
  { key: "IT1", name: "Serie A", countryCode: "IT", tier: 1, matchesPerSeason: 38 },
  { key: "IT2", name: "Serie B", countryCode: "IT", tier: 2, matchesPerSeason: 38 },
  { key: "FR1", name: "Ligue 1", countryCode: "FR", tier: 1, matchesPerSeason: 34 },
  { key: "FR2", name: "Ligue 2", countryCode: "FR", tier: 2, matchesPerSeason: 34 },
  { key: "PT1", name: "Primeira Liga", countryCode: "PT", tier: 1, matchesPerSeason: 34 },
  { key: "UY1", name: "Primera División", countryCode: "UY", tier: 1, matchesPerSeason: 30 },
  { key: "NL1", name: "Eredivisie", countryCode: "NL", tier: 1, matchesPerSeason: 34 },
  { key: "CO1", name: "Categoría Primera A", countryCode: "CO", tier: 1, matchesPerSeason: 30 },
  { key: "CL1", name: "Primera División", countryCode: "CL", tier: 1, matchesPerSeason: 30 },
  { key: "US1", name: "MLS", countryCode: "US", tier: 1, matchesPerSeason: 34 },
  { key: "JP1", name: "J1 League", countryCode: "JP", tier: 1, matchesPerSeason: 34 },
  { key: "CR1", name: "Liga Promérica", countryCode: "CR", tier: 1, matchesPerSeason: 22 },
];

export const CLUBS: ClubSeed[] = [
  { key: "river", name: "River Plate", shortName: "RIV", leagueKey: "AR1", reputation: 5, primaryColor: "#d10a11" },
  { key: "boca", name: "Boca Juniors", shortName: "BOC", leagueKey: "AR1", reputation: 5, primaryColor: "#1e3a8a" },
  { key: "racing", name: "Racing Club", shortName: "RAC", leagueKey: "AR1", reputation: 4, primaryColor: "#5ab7e8" },
  { key: "independiente", name: "Independiente", shortName: "IND", leagueKey: "AR1", reputation: 3, primaryColor: "#d10a11" },
  { key: "sanlorenzo", name: "San Lorenzo", shortName: "SLO", leagueKey: "AR1", reputation: 3, primaryColor: "#001489" },
  { key: "velez", name: "Vélez Sarsfield", shortName: "VEL", leagueKey: "AR1", reputation: 3, primaryColor: "#1a1a1a" },
  { key: "sanmiguel", name: "San Miguel", shortName: "SMI", leagueKey: "AR2", reputation: 1, primaryColor: "#0a7a3d" },
  { key: "chacoforever", name: "Chaco For Ever", shortName: "CFE", leagueKey: "AR2", reputation: 1, primaryColor: "#e30613" },
  { key: "moron", name: "Morón", shortName: "MOR", leagueKey: "AR2", reputation: 1, primaryColor: "#7a1f7a" },

  { key: "flamengo", name: "Flamengo", shortName: "FLA", leagueKey: "BR1", reputation: 5, primaryColor: "#c8102e" },
  { key: "palmeiras", name: "Palmeiras", shortName: "PAL", leagueKey: "BR1", reputation: 5, primaryColor: "#006437" },
  { key: "saopaulo", name: "São Paulo", shortName: "SAO", leagueKey: "BR1", reputation: 4, primaryColor: "#e0261c" },
  { key: "vasco", name: "Vasco da Gama", shortName: "VAS", leagueKey: "BR1", reputation: 3, primaryColor: "#1a1a1a" },
  { key: "gremio", name: "Grêmio", shortName: "GRE", leagueKey: "BR1", reputation: 3, primaryColor: "#0a7ac2" },
  { key: "internacional", name: "Internacional", shortName: "INT", leagueKey: "BR1", reputation: 4, primaryColor: "#c8102e" },
  { key: "criciuma", name: "Criciúma", shortName: "CRI", leagueKey: "BR2", reputation: 2, primaryColor: "#f2c500" },
  { key: "vilanova", name: "Vila Nova", shortName: "VNO", leagueKey: "BR2", reputation: 1, primaryColor: "#c8102e" },
  { key: "chapecoense", name: "Chapecoense", shortName: "CHA", leagueKey: "BR2", reputation: 1, primaryColor: "#006437" },

  { key: "realmadrid", name: "Real Madrid", shortName: "RMA", leagueKey: "ES1", reputation: 5, primaryColor: "#ffffff" },
  { key: "barcelona", name: "Barcelona", shortName: "BAR", leagueKey: "ES1", reputation: 5, primaryColor: "#004d98" },
  { key: "atletico", name: "Atlético Madrid", shortName: "ATM", leagueKey: "ES1", reputation: 4, primaryColor: "#ce3524" },
  { key: "realsociedad", name: "Real Sociedad", shortName: "RSO", leagueKey: "ES1", reputation: 3, primaryColor: "#0067b1" },
  { key: "sevilla", name: "Sevilla", shortName: "SEV", leagueKey: "ES1", reputation: 3, primaryColor: "#d81a2a" },
  { key: "athletic", name: "Athletic Bilbao", shortName: "ATH", leagueKey: "ES1", reputation: 3, primaryColor: "#ee2523" },
  { key: "sporting", name: "Sporting Gijón", shortName: "SPG", leagueKey: "ES2", reputation: 1, primaryColor: "#e2231a" },
  { key: "racingsantander", name: "Racing Santander", shortName: "RSA", leagueKey: "ES2", reputation: 1, primaryColor: "#00a651" },
  { key: "mirandes", name: "Mirandés", shortName: "MIR", leagueKey: "ES2", reputation: 1, primaryColor: "#e2231a" },

  { key: "mancity", name: "Manchester City", shortName: "MCI", leagueKey: "EN1", reputation: 5, primaryColor: "#6cabdd" },
  { key: "manutd", name: "Manchester United", shortName: "MUN", leagueKey: "EN1", reputation: 5, primaryColor: "#da291c" },
  { key: "liverpool", name: "Liverpool", shortName: "LIV", leagueKey: "EN1", reputation: 5, primaryColor: "#c8102e" },
  { key: "arsenal", name: "Arsenal", shortName: "ARS", leagueKey: "EN1", reputation: 4, primaryColor: "#ef0107" },
  { key: "chelsea", name: "Chelsea", shortName: "CHE", leagueKey: "EN1", reputation: 4, primaryColor: "#034694" },
  { key: "everton", name: "Everton", shortName: "EVE", leagueKey: "EN1", reputation: 2, primaryColor: "#003399" },
  { key: "leeds", name: "Leeds United", shortName: "LEE", leagueKey: "EN2", reputation: 2, primaryColor: "#ffcd00" },
  { key: "preston", name: "Preston North End", shortName: "PNE", leagueKey: "EN2", reputation: 1, primaryColor: "#1b1464" },
  { key: "watford", name: "Watford", shortName: "WAT", leagueKey: "EN2", reputation: 1, primaryColor: "#fbee23" },

  { key: "bayern", name: "Bayern Múnich", shortName: "BAY", leagueKey: "DE1", reputation: 5, primaryColor: "#dc052d" },
  { key: "dortmund", name: "Borussia Dortmund", shortName: "BVB", leagueKey: "DE1", reputation: 4, primaryColor: "#fde100" },
  { key: "leipzig", name: "RB Leipzig", shortName: "RBL", leagueKey: "DE1", reputation: 4, primaryColor: "#dd0741" },
  { key: "leverkusen", name: "Bayer Leverkusen", shortName: "B04", leagueKey: "DE1", reputation: 4, primaryColor: "#e32219" },
  { key: "frankfurt", name: "Eintracht Frankfurt", shortName: "SGE", leagueKey: "DE1", reputation: 3, primaryColor: "#e1000f" },
  { key: "hamburgo", name: "Hamburgo", shortName: "HSV", leagueKey: "DE2", reputation: 1, primaryColor: "#0f1a3c" },
  { key: "fortuna", name: "Fortuna Düsseldorf", shortName: "F95", leagueKey: "DE2", reputation: 1, primaryColor: "#e2231a" },

  { key: "juventus", name: "Juventus", shortName: "JUV", leagueKey: "IT1", reputation: 5, primaryColor: "#1a1a1a" },
  { key: "inter", name: "Inter de Milán", shortName: "INT", leagueKey: "IT1", reputation: 5, primaryColor: "#0068a8" },
  { key: "acmilan", name: "AC Milan", shortName: "MIL", leagueKey: "IT1", reputation: 4, primaryColor: "#fb090b" },
  { key: "napoli", name: "Napoli", shortName: "NAP", leagueKey: "IT1", reputation: 4, primaryColor: "#12a0d7" },
  { key: "roma", name: "AS Roma", shortName: "ROM", leagueKey: "IT1", reputation: 3, primaryColor: "#8e1f2f" },
  { key: "parma", name: "Parma", shortName: "PAR", leagueKey: "IT2", reputation: 1, primaryColor: "#f7d117" },
  { key: "bari", name: "Bari", shortName: "BAR2", leagueKey: "IT2", reputation: 1, primaryColor: "#c8102e" },

  { key: "psg", name: "Paris Saint-Germain", shortName: "PSG", leagueKey: "FR1", reputation: 5, primaryColor: "#004170" },
  { key: "marseille", name: "Olympique de Marsella", shortName: "OM", leagueKey: "FR1", reputation: 3, primaryColor: "#2fa7dd" },
  { key: "lyon", name: "Olympique de Lyon", shortName: "OL", leagueKey: "FR1", reputation: 3, primaryColor: "#e2231a" },
  { key: "monaco", name: "AS Mónaco", shortName: "ASM", leagueKey: "FR1", reputation: 4, primaryColor: "#e2231a" },
  { key: "lehavre", name: "Le Havre", shortName: "HAC", leagueKey: "FR2", reputation: 1, primaryColor: "#00539f" },
  { key: "auxerre", name: "Auxerre", shortName: "AJA", leagueKey: "FR2", reputation: 1, primaryColor: "#ffffff" },

  { key: "benfica", name: "Benfica", shortName: "SLB", leagueKey: "PT1", reputation: 4, primaryColor: "#e2231a" },
  { key: "porto", name: "Porto", shortName: "POR", leagueKey: "PT1", reputation: 4, primaryColor: "#00539f" },
  { key: "sporting_cp", name: "Sporting CP", shortName: "SCP", leagueKey: "PT1", reputation: 4, primaryColor: "#00944d" },
  { key: "braga", name: "Braga", shortName: "BRA", leagueKey: "PT1", reputation: 2, primaryColor: "#e2231a" },

  { key: "penarol", name: "Peñarol", shortName: "PEN", leagueKey: "UY1", reputation: 3, primaryColor: "#f7d117" },
  { key: "nacional", name: "Nacional", shortName: "NAC", leagueKey: "UY1", reputation: 3, primaryColor: "#00539f" },
  { key: "defensor", name: "Defensor Sporting", shortName: "DEF", leagueKey: "UY1", reputation: 1, primaryColor: "#8e1f2f" },

  { key: "ajax", name: "Ajax", shortName: "AJX", leagueKey: "NL1", reputation: 4, primaryColor: "#d2122e" },
  { key: "psv", name: "PSV Eindhoven", shortName: "PSV", leagueKey: "NL1", reputation: 4, primaryColor: "#ed1c24" },
  { key: "feyenoord", name: "Feyenoord", shortName: "FEY", leagueKey: "NL1", reputation: 3, primaryColor: "#e2231a" },

  { key: "millonarios", name: "Millonarios", shortName: "MIL2", leagueKey: "CO1", reputation: 2, primaryColor: "#00539f" },
  { key: "nacionalco", name: "Atlético Nacional", shortName: "NAL", leagueKey: "CO1", reputation: 2, primaryColor: "#1a7a3d" },
  { key: "junior", name: "Junior de Barranquilla", shortName: "JUN", leagueKey: "CO1", reputation: 2, primaryColor: "#d10a11" },

  { key: "colocolo", name: "Colo-Colo", shortName: "CCO", leagueKey: "CL1", reputation: 2, primaryColor: "#1a1a1a" },
  { key: "uchile", name: "Universidad de Chile", shortName: "UCH", leagueKey: "CL1", reputation: 2, primaryColor: "#00539f" },
  { key: "ucatolica", name: "Universidad Católica", shortName: "UCA", leagueKey: "CL1", reputation: 2, primaryColor: "#00509d" },

  { key: "lagalaxy", name: "LA Galaxy", shortName: "LAG", leagueKey: "US1", reputation: 3, primaryColor: "#00245d" },
  { key: "intermiami", name: "Inter Miami CF", shortName: "MIA", leagueKey: "US1", reputation: 3, primaryColor: "#f7b5cd" },
  { key: "seattlesounders", name: "Seattle Sounders", shortName: "SEA", leagueKey: "US1", reputation: 2, primaryColor: "#5d9741" },
  { key: "atlantaunited", name: "Atlanta United", shortName: "ATL", leagueKey: "US1", reputation: 2, primaryColor: "#a49665" },
  { key: "nycfc", name: "New York City FC", shortName: "NYC", leagueKey: "US1", reputation: 2, primaryColor: "#6cabdd" },
  { key: "chicagofire", name: "Chicago Fire", shortName: "CHI", leagueKey: "US1", reputation: 1, primaryColor: "#a6192e" },
  { key: "coloradorapids", name: "Colorado Rapids", shortName: "COL", leagueKey: "US1", reputation: 1, primaryColor: "#960a2d" },

  { key: "kashimaantlers", name: "Kashima Antlers", shortName: "KSM", leagueKey: "JP1", reputation: 3, primaryColor: "#960014" },
  { key: "urawareds", name: "Urawa Red Diamonds", shortName: "URW", leagueKey: "JP1", reputation: 3, primaryColor: "#c8102e" },
  { key: "yokohamamarinos", name: "Yokohama F. Marinos", shortName: "YFM", leagueKey: "JP1", reputation: 2, primaryColor: "#00539f" },
  { key: "vissekobe", name: "Vissel Kobe", shortName: "VIS", leagueKey: "JP1", reputation: 2, primaryColor: "#a6192e" },
  { key: "kawasakifrontale", name: "Kawasaki Frontale", shortName: "KWS", leagueKey: "JP1", reputation: 2, primaryColor: "#004098" },
  { key: "fctokyo", name: "FC Tokyo", shortName: "FCT", leagueKey: "JP1", reputation: 1, primaryColor: "#0f3f8c" },
  { key: "shonanbellmare", name: "Shonan Bellmare", shortName: "SHO", leagueKey: "JP1", reputation: 1, primaryColor: "#0068b7" },

  { key: "saprissa", name: "Deportivo Saprissa", shortName: "SAP", leagueKey: "CR1", reputation: 3, primaryColor: "#5c1a8a" },
  { key: "alajuelense", name: "Liga Deportiva Alajuelense", shortName: "ALA", leagueKey: "CR1", reputation: 3, primaryColor: "#e2231a" },
  { key: "herediano", name: "CS Herediano", shortName: "HER", leagueKey: "CR1", reputation: 2, primaryColor: "#c8102e" },
  { key: "cartagines", name: "CS Cartaginés", shortName: "CAR", leagueKey: "CR1", reputation: 2, primaryColor: "#003876" },
  { key: "sancarlos", name: "AD San Carlos", shortName: "SCA", leagueKey: "CR1", reputation: 1, primaryColor: "#e2231a" },
  { key: "puntarenas", name: "Puntarenas FC", shortName: "PUN", leagueKey: "CR1", reputation: 1, primaryColor: "#f7d117" },
  { key: "limonfc", name: "Limón FC", shortName: "LIM", leagueKey: "CR1", reputation: 1, primaryColor: "#1a1a1a" },
];
