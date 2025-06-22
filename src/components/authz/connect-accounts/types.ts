export type SupportedPlatforms =
  | "facebook"
  | "twitter"
  | "instagram"
  | "linkedin"
  | "tiktok";
export type AccountData =
  | {
      expiresIn?: string | null;
      platform?: string | null;
      status?: string | null;
      accountName?: string | null;
    }
  | null
  | undefined;
export type AccountsData = {
  facebook?: AccountData | null;
  twitter?: AccountData | null;
  instagram?: AccountData | null;
  linkedin?: AccountData | null;
  tiktok?: AccountData | null;
};
