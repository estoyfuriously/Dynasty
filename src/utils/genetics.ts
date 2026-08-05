import { GENETIC_TRAITS } from '../data/traits';
import { GeneticTrait, HouseId } from '../types';

const MONARCH_NAMES: Record<HouseId, { male: string[]; female: string[] }> = {
  habsburg: {
    male: ['Charles', 'Philip', 'Ferdinand', 'Leopold', 'Maximilian', 'Joseph', 'Rudolf', 'Albert'],
    female: ['Maria Theresa', 'Margaret', 'Eleonora', 'Joanna', 'Anna', 'Elisabeth', 'Constance'],
  },
  bourbon: {
    male: ['Louis', 'Philip', 'Henry', 'Charles', 'Ferdinand', 'Alfonso', 'Robert', 'Gaston'],
    female: ['Anne', 'Marie Antoinette', 'Henrietta', 'Elisabeth', 'Maria Louisa', 'Blanche'],
  },
  tudor: {
    male: ['Henry', 'Edward', 'Arthur', 'Edmund', 'Jasper', 'Humphrey'],
    female: ['Elizabeth', 'Mary', 'Margaret', 'Catherine', 'Jane', 'Frances'],
  },
  romanov: {
    male: ['Peter', 'Alexander', 'Nicholas', 'Ivan', 'Michael', 'Paul', 'Feodor', 'Alexei'],
    female: ['Catherine', 'Elizabeth', 'Anna', 'Sophia', 'Anastasia', 'Maria', 'Olga'],
  },
  hohenzollern: {
    male: ['Frederick William', 'Frederick', 'William', 'Joachim', 'George', 'Christian'],
    female: ['Louise', 'Sophia Charlotte', 'Augusta', 'Victoria', 'Wilhelmina'],
  },
  medici: {
    male: ['Cosimo', 'Lorenzo', 'Piero', 'Ferdinando', 'Francesco', 'Giovanni', 'Giulio'],
    female: ['Catherine', 'Marie', 'Clarice', 'Lucrezia', 'Eleonora', 'Contessina'],
  },
  stuart: {
    male: ['James', 'Charles', 'Henry', 'Robert', 'David', 'Francis'],
    female: ['Mary', 'Anne', 'Elizabeth', 'Margaret', 'Henrietta', 'Arabella'],
  },
  orange: {
    male: ['William', 'Maurice', 'Frederick Henry', 'John William', 'Alexander'],
    female: ['Mary', 'Amalia', 'Wilhelmina', 'Louise', 'Carolina', 'Emma'],
  },
  valois: {
    male: ['Francis', 'Charles', 'Henry', 'Louis', 'John', 'Philip'],
    female: ['Margaret', 'Claude', 'Charlotte', 'Joan', 'Renée', 'Isabella'],
  },
  trastamara: {
    male: ['Ferdinand', 'John', 'Henry', 'Alfonso', 'Peter', 'Sanche'],
    female: ['Isabella', 'Joanna', 'Eleanor', 'Blanche', 'Catherine', 'Maria'],
  },
};

/**
 * Calculates updated Inbreeding Coefficient (F) based on previous F and marriage choice
 */
export function calculateInbreedingCoeff(
  currentF: number,
  isIncest: boolean,
  generation: number
): number {
  if (isIncest) {
    // 1st cousin / close relative marriage increases F compounding
    // F_new = F_old + (1/16) * (1 + F_old) roughly
    const delta = 0.0625 + currentF * 0.25;
    return Math.min(0.35, Math.round((currentF + delta) * 1000) / 1000);
  } else {
    // Foreign marriage introduces fresh genetic material, dropping F significantly
    const reduced = currentF * 0.35;
    return Math.max(0, Math.round(reduced * 1000) / 1000);
  }
}

/**
 * Determines new genetic traits that emerge based on F coefficient and health level
 */
export function evaluateGeneticTraits(
  currentF: number,
  currentHealth: number,
  existingTraitIds: string[],
  houseSignatureTraitId: string
): GeneticTrait[] {
  const newTraits: GeneticTrait[] = [];
  const existingSet = new Set(existingTraitIds);

  // High F or low health forces signature trait if not present
  if ((currentF >= 0.08 || currentHealth <= 65) && !existingSet.has(houseSignatureTraitId)) {
    if (GENETIC_TRAITS[houseSignatureTraitId]) {
      newTraits.push(GENETIC_TRAITS[houseSignatureTraitId]);
      existingSet.add(houseSignatureTraitId);
    }
  }

  // Very high F or low health risks additional severe traits
  const allTraitKeys = Object.keys(GENETIC_TRAITS);

  if (currentF >= 0.15 || currentHealth <= 45) {
    for (const key of allTraitKeys) {
      if (!existingSet.has(key)) {
        const trait = GENETIC_TRAITS[key];
        // Probability check
        const probability = (currentF * 2) + ((100 - currentHealth) / 100);
        if (Math.random() < probability * 0.4) {
          newTraits.push(trait);
          existingSet.add(key);
          if (newTraits.length >= 2) break; // limit to 2 new traits per turn
        }
      }
    }
  }

  return newTraits;
}

/**
 * Returns a Roman numeral for regnal numbers (e.g., I, II, III, IV, V)
 */
export function toRomanNumeral(num: number): string {
  const map: [number, string][] = [
    [10, 'X'],
    [9, 'IX'],
    [5, 'V'],
    [4, 'IV'],
    [1, 'I'],
  ];
  let result = '';
  let n = num;
  for (const [val, str] of map) {
    while (n >= val) {
      result += str;
      n -= val;
    }
  }
  return result || 'I';
}

/**
 * Generates monarch name for a given house and generation
 */
export function generateMonarchName(houseId: HouseId, generation: number): string {
  const houseNames = MONARCH_NAMES[houseId] || MONARCH_NAMES.habsburg;
  const isMale = Math.random() > 0.2; // European monarchies were predominantly agnatic
  const namePool = isMale ? houseNames.male : houseNames.female;
  const baseName = namePool[(generation - 1) % namePool.length];
  const numeral = toRomanNumeral(Math.floor((generation - 1) / namePool.length) + 1);

  return `${isMale ? 'King' : 'Queen'} ${baseName} ${numeral}`;
}

/**
 * Generates spouse name for a given house choice
 */
export function generateSpouseName(
  houseId: HouseId,
  isIncest: boolean,
  playerHouseName: string
): { name: string; relation: string } {
  if (isIncest) {
    const relations = [
      '1st Cousin (Archduchess)',
      'Double First Cousin',
      'Uncle-Niece Alliance',
      'Second Cousin (Crown Princess)',
      'Aunt-Nephew Matrimony',
    ];
    const relation = relations[Math.floor(Math.random() * relations.length)];
    const houseNames = MONARCH_NAMES[houseId] || MONARCH_NAMES.habsburg;
    const spouseBase = houseNames.female[Math.floor(Math.random() * houseNames.female.length)];
    return {
      name: `Princess ${spouseBase} of ${playerHouseName}`,
      relation,
    };
  } else {
    const relations = [
      'Foreign Royal Princess',
      'Infanta of the Realm',
      'Grand Duchess',
      'Princess Royal',
    ];
    const relation = relations[Math.floor(Math.random() * relations.length)];
    const houseNames = MONARCH_NAMES[houseId] || MONARCH_NAMES.habsburg;
    const spouseBase = houseNames.female[Math.floor(Math.random() * houseNames.female.length)];
    return {
      name: `Princess ${spouseBase} of House ${houseId.charAt(0).toUpperCase() + houseId.slice(1)}`,
      relation,
    };
  }
}
