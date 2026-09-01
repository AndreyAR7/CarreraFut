export type ClubOfferKind = "CANTERA" | "TRANSFER" | "LOAN_OUT" | "LOAN_RETURN";

export interface ClubOfferOption {
  optionKey: string;
  label: string;
  description: string;
  clubId: string | null;
  clubName?: string;
  clubShort?: string;
  clubColor?: string;
  clubKey?: string;
  leagueName?: string;
  countryCode?: string;
  reputation?: number;
  setsLoanFrom?: string | null;
  clearsLoan?: boolean;
  marketValueMultiplier?: number;
  moraleDelta?: number;
  starterShareSet?: number;
}
