import { GeneticTrait } from '../types';

export const GENETIC_TRAITS: Record<string, GeneticTrait> = {
  habsburg_jaw: {
    id: 'habsburg_jaw',
    name: 'Mandibular Prognathism (Habsburg Jaw)',
    severity: 'severe',
    description:
      'A prominent jutting lower jaw and oversized tongue caused by repeated endogamy. Makes chewing solid food difficult and speech slurred.',
    symptom: 'Pronounced lower jaw overhang, difficulty speaking and swallowing.',
    historicalExample: 'King Charles II of Spain (1661–1700), whose jaw was so malformed he could not chew food.',
    healthPenalty: 12,
    prestigePenalty: 8,
  },
  hemophilia: {
    id: 'hemophilia',
    name: 'Royal Hemophilia (The Bleeding Disease)',
    severity: 'fatal',
    description:
      'An X-linked genetic blood clotting disorder that caused minor cuts or bruises to lead to life-threatening internal bleeding.',
    symptom: 'Severe internal bleeding from slight impacts, joint swelling, short lifespan.',
    historicalExample: 'Tsarevich Alexei of Russia & Prince Leopold of Great Britain.',
    healthPenalty: 20,
    prestigePenalty: 5,
  },
  podagra_gout: {
    id: 'podagra_gout',
    name: 'Gout & Metabolic Disorder',
    severity: 'mild',
    description:
      'Accumulation of uric acid in joint tissue, heightened by genetic predisposition and rich royal banquets.',
    symptom: 'Excruciating joint inflammation in toes and knees, immobility.',
    historicalExample: 'Piero the Gouty of the Medici Dynasty & Holy Roman Emperor Charles V.',
    healthPenalty: 6,
    prestigePenalty: 2,
  },
  sterility: {
    id: 'sterility',
    name: 'Congenital Infertility & High Miscarriage Rate',
    severity: 'fatal',
    description:
      'Homozygous genetic defects preventing healthy embryo development and severely reducing birth rates.',
    symptom: 'Frequent stillbirths, failure to produce a viable male heir.',
    historicalExample: 'Queen Mary I (Tudor) & the extinction of the Spanish Habsburg branch in 1700.',
    healthPenalty: 25,
    prestigePenalty: 15,
  },
  scoliosis: {
    id: 'scoliosis',
    name: 'Congenital Spinal Deformity',
    severity: 'moderate',
    description:
      'Severe lateral curvature of the spine leading to hunching, respiratory constraint, and chronic pain.',
    symptom: 'Asymmetrical shoulders, curved spine, fatigue during physical duties.',
    historicalExample: 'King Richard III of England & several Spanish Infantas.',
    healthPenalty: 10,
    prestigePenalty: 4,
  },
  intellectual_impairment: {
    id: 'intellectual_impairment',
    name: 'Congenital Cognitive Impairment',
    severity: 'severe',
    description:
      'Delayed cognitive development and difficulty mastering court politics, making the monarch dependent on regents.',
    symptom: 'Late speech development, reliance on royal advisors for simple state decisions.',
    historicalExample: 'King Ferdinand I of Austria & Tsar Ivan V of Russia.',
    healthPenalty: 15,
    prestigePenalty: 12,
  },
  infant_frailty: {
    id: 'infant_frailty',
    name: 'Infant Frailty & Immunodeficiency',
    severity: 'moderate',
    description:
      'Compromised immune resilience causing royal offspring to succumb quickly to childhood fevers.',
    symptom: 'Frequent childhood illness, high infant mortality before age 10.',
    historicalExample: 'Over half of the children of Holy Roman Emperor Leopold I died in infancy.',
    healthPenalty: 14,
    prestigePenalty: 6,
  },
  royal_melancholy: {
    id: 'royal_melancholy',
    name: 'Royal Melancholia & Nervous Breakdown',
    severity: 'mild',
    description:
      'Hereditary mood disturbances and severe depression intensified by the immense pressure of dynastic duty.',
    symptom: 'Prolonged withdrawal from court duties, fits of paralysis or anxiety.',
    historicalExample: 'King Philip V of Spain & King George III of the United Kingdom.',
    healthPenalty: 8,
    prestigePenalty: 5,
  },
};
