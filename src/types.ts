export type HouseId =
  | 'habsburg'
  | 'bourbon'
  | 'tudor'
  | 'romanov'
  | 'hohenzollern'
  | 'medici'
  | 'stuart'
  | 'orange'
  | 'valois'
  | 'trastamara';

export interface GeneticTrait {
  id: string;
  name: string;
  severity: 'mild' | 'moderate' | 'severe' | 'fatal';
  description: string;
  symptom: string;
  historicalExample: string;
  healthPenalty: number;
  prestigePenalty: number;
}

export interface House {
  id: HouseId;
  name: string;
  title: string;
  motto: string;
  primaryRegion: string;
  color: string;
  accentColor: string;
  borderStyle: string;
  startingPrestige: number;
  perk: string;
  signatureTraitId: string;
  historicalSummary: string;
  famousMonarchs: string[];
  mapProvinces: string[];
}

export interface Monarch {
  name: string;
  title: string;
  gender: 'male' | 'female';
  houseId: HouseId;
  generation: number;
  reignStartYear: number;
  reignEndYear: number;
  traits: GeneticTrait[];
  inbreedingCoeff: number;
}

export interface Spouse {
  name: string;
  houseId: HouseId;
  houseName: string;
  isIncest: boolean;
  relation: string;
  dowryPrestigeDelta: number;
  healthDelta: number;
}

export interface GenerationRecord {
  generation: number;
  year: number;
  monarch: Monarch;
  spouse: Spouse;
  prestigeAfter: number;
  healthAfter: number;
  inbreedingCoeffAfter: number;
  activeTraits: GeneticTrait[];
  logEntry: string;
  territoriesCount: number;
}

export interface GameEvent {
  id: string;
  title: string;
  description: string;
  triggerGen: number;
  choices: {
    text: string;
    prestigeDelta: number;
    healthDelta: number;
    log: string;
  }[];
}

export type GameStatus =
  | 'selecting'
  | 'playing'
  | 'gameover_bankrupt'
  | 'gameover_extinct'
  | 'gameover_victory';

export interface GameState {
  playerHouseId: HouseId | null;
  generation: number;
  year: number;
  prestige: number;
  health: number;
  inbreedingCoeff: number;
  activeTraits: GeneticTrait[];
  alliances: HouseId[];
  territories: string[];
  history: GenerationRecord[];
  currentEvent: GameEvent | null;
  gameStatus: GameStatus;
  soundEnabled: boolean;
}
