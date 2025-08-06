export interface LikenessProduct {
  name: string;
  description: string;
  image: string;
  amazonLink: string;
}

export interface LikenessResult {
  celebrity: string;
  era: string;
  reason: string;
  products: LikenessProduct[];
}