export type TypeGame = {
  name: string;
  bestResult: number;
  isPlayed: boolean;
};

export type TypeProgressData = {
  id: number;
  name: string;
  thresholdPoints: number;
  calculation: number;
  stepName?: string;
  games: TypeGame[];
};
