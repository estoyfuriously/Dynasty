import { House, HouseId } from '../types';

export const HOUSES: Record<HouseId, House> = {
  habsburg: {
    id: 'habsburg',
    name: 'House of Habsburg',
    title: 'Archdukes of Austria, Holy Roman Emperors & Kings of Spain',
    motto: 'Bella gerant alii, tu felix Austria nube',
    primaryRegion: 'Central Europe & Iberia',
    color: '#D4AF37', // Gold
    accentColor: '#1A1A1A',
    borderStyle: 'border-amber-600',
    startingPrestige: 110,
    perk: 'Marriage Alliances: Consolidating power through cousin marriage yields +25 Bonus Prestige.',
    signatureTraitId: 'habsburg_jaw',
    historicalSummary:
      'Famous for building a vast global empire not through sword, but through strategic marriage contracts. Their relentless endogamy kept territories united but created famous genetic deformities.',
    famousMonarchs: ['Emperor Charles V', 'King Philip II', 'King Charles II (The Bewitched)'],
    mapProvinces: ['austria', 'bohemia', 'spain', 'milan'],
  },
  bourbon: {
    id: 'bourbon',
    name: 'House of Bourbon',
    title: 'Kings of France, Navarre, & the Two Sicilies',
    motto: 'L’État, c’est moi (The State is I)',
    primaryRegion: 'Western Europe',
    color: '#1E3A8A', // Royal Blue
    accentColor: '#F59E0B',
    borderStyle: 'border-blue-700',
    startingPrestige: 115,
    perk: 'Absolutist Prestige: Foreign alliances grant extra prestige, but marrying minor houses causes public backlash.',
    signatureTraitId: 'royal_melancholy',
    historicalSummary:
      'Rulers of Versailles and architects of European absolutism. Their grand dynastic ambitions led to the War of the Spanish Succession.',
    famousMonarchs: ['King Henry IV', 'King Louis XIV (The Sun King)', 'King Philip V'],
    mapProvinces: ['france', 'navarre', 'naples'],
  },
  tudor: {
    id: 'tudor',
    name: 'House of Tudor',
    title: 'Monarchs of England, Wales & Ireland',
    motto: 'Semper Eadem (Always the Same)',
    primaryRegion: 'British Isles',
    color: '#DC2626', // Crimson Tudor Rose
    accentColor: '#10B981',
    borderStyle: 'border-red-700',
    startingPrestige: 95,
    perk: 'Island Stronghold: Fresh foreign blood yields +20% bonus genetic health recovery.',
    signatureTraitId: 'sterility',
    historicalSummary:
      'A volatile line born from the Wars of the Roses. Desperate struggle for a male heir led to six marriages for Henry VIII and dramatic religious shifts.',
    famousMonarchs: ['King Henry VII', 'King Henry VIII', 'Queen Elizabeth I'],
    mapProvinces: ['england', 'wales', 'ireland'],
  },
  romanov: {
    id: 'romanov',
    name: 'House of Romanov',
    title: 'Tsars & Emperors of All Russia',
    motto: 'S nami Bog (God is with us)',
    primaryRegion: 'Eastern Europe & Eurasia',
    color: '#4C1D95', // Imperial Purple
    accentColor: '#EAB308',
    borderStyle: 'border-purple-800',
    startingPrestige: 100,
    perk: 'Autocratic Domain: Land loss penalties are reduced by 25% when negotiating foreign dowries.',
    signatureTraitId: 'hemophilia',
    historicalSummary:
      'Unifiers of the vast Russian empire from St. Petersburg to Siberia. Intermarriage with German royal houses brought European prestige and the royal hemophilia gene.',
    famousMonarchs: ['Peter the Great', 'Catherine the Great', 'Tsar Nicholas II'],
    mapProvinces: ['russia', 'poland', 'finland'],
  },
  hohenzollern: {
    id: 'hohenzollern',
    name: 'House of Hohenzollern',
    title: 'Electors of Brandenburg & Kings of Prussia',
    motto: 'Gott mit uns (God with us)',
    primaryRegion: 'Northern & Central Europe',
    color: '#1F2937', // Prussian Black & Silver
    accentColor: '#E5E7EB',
    borderStyle: 'border-gray-800',
    startingPrestige: 90,
    perk: 'Prussian Discipline: Starts with higher base health stability (+10% baseline health resilience).',
    signatureTraitId: 'scoliosis',
    historicalSummary:
      'Transformed a sandy marshland into the formidable military power of Prussia. Strict drill and selective alliances fueled their rapid rise.',
    famousMonarchs: ['Frederick William (Great Elector)', 'Frederick the Great', 'Kaiser Wilhelm II'],
    mapProvinces: ['prussia', 'brandenburg', 'pomerania'],
  },
  medici: {
    id: 'medici',
    name: 'House of Medici',
    title: 'Grand Dukes of Tuscany & Papal Bankers',
    motto: 'Festina Lente (Make haste slowly)',
    primaryRegion: 'Italian Peninsula',
    color: '#059669', // Renaissance Emerald & Gold
    accentColor: '#FBBF24',
    borderStyle: 'border-emerald-700',
    startingPrestige: 105,
    perk: 'Merchant Wealth: Generates +10 bonus Prestige on every foreign wedding dowry paid.',
    signatureTraitId: 'podagra_gout',
    historicalSummary:
      'Wealthy Florentine merchant bankers who bought their way into European royalty, producing two Queens of France and four Popes.',
    famousMonarchs: ['Cosimo de’ Medici', 'Lorenzo the Magnificent', 'Queen Catherine de’ Medici'],
    mapProvinces: ['tuscany', 'florence', 'papal_states'],
  },
  stuart: {
    id: 'stuart',
    name: 'House of Stuart',
    title: 'Kings of Scotland, England & Ireland',
    motto: 'In My Defens God Me Defend',
    primaryRegion: 'Scotland & Great Britain',
    color: '#B91C1C', // Royal Tartan Red
    accentColor: '#F3F4F6',
    borderStyle: 'border-red-800',
    startingPrestige: 85,
    perk: 'Divine Right: Inbreeding health penalties are halved every 3rd generation due to strict royal isolation.',
    signatureTraitId: 'intellectual_impairment',
    historicalSummary:
      'Ruled Scotland for centuries before inheriting the English crown in 1603. Plagued by civil wars, religious disputes, and unstable succession.',
    famousMonarchs: ['Mary, Queen of Scots', 'King James VI & I', 'King Charles I'],
    mapProvinces: ['scotland', 'england'],
  },
  orange: {
    id: 'orange',
    name: 'House of Orange-Nassau',
    title: 'Princes of Orange & Stadtholders of the Netherlands',
    motto: 'Je Maintiendrai (I Will Maintain)',
    primaryRegion: 'Low Countries',
    color: '#EA580C', // Dutch Orange
    accentColor: '#3B82F6',
    borderStyle: 'border-orange-600',
    startingPrestige: 88,
    perk: 'Naval Trade: Foreign marriages cost 30% less territory/dowry prestige.',
    signatureTraitId: 'infant_frailty',
    historicalSummary:
      'Champions of Dutch independence against the Spanish Habsburg Empire. Championed Protestant alliances across Northern Europe.',
    famousMonarchs: ['William the Silent', 'William III (King of England)', 'Queen Wilhelmina'],
    mapProvinces: ['netherlands', 'flanders'],
  },
  valois: {
    id: 'valois',
    name: 'House of Valois',
    title: 'Kings of France & Dukes of Burgundy',
    motto: 'Nutrisco et Extinguo (I nourish and I extinguish)',
    primaryRegion: 'France & Burgundy',
    color: '#7C3AED', // Royal Violet
    accentColor: '#F43F5E',
    borderStyle: 'border-violet-700',
    startingPrestige: 100,
    perk: 'Renaissance Patronage: Generates +5 Prestige on every generation turn regardless of marriage choice.',
    signatureTraitId: 'podagra_gout',
    historicalSummary:
      'Ruled France through the Hundred Years War and the Italian Renaissance. Famed for lavish court spectacles and Burgundian chivalry.',
    famousMonarchs: ['King Francis I', 'King Charles VII', 'King Henry III'],
    mapProvinces: ['france', 'burgundy'],
  },
  trastamara: {
    id: 'trastamara',
    name: 'House of Trastámara',
    title: 'Monarchs of Castile, Aragon, Naples & Sicily',
    motto: 'Tanto Monta, Monta Tanto',
    primaryRegion: 'Iberian Peninsula',
    color: '#991B1B', // Castilian Crimson
    accentColor: '#F59E0B',
    borderStyle: 'border-amber-800',
    startingPrestige: 98,
    perk: 'Iberian Union: Cousin marriages yield +15 bonus territory security.',
    signatureTraitId: 'habsburg_jaw',
    historicalSummary:
      'Forged the modern kingdom of Spain through the marriage of Ferdinand and Isabella. Their daughter Joanna married Philip of Habsburg, laying the ground for Habsburg dominance.',
    famousMonarchs: ['Isabella I of Castile', 'Ferdinand II of Aragon', 'Joanna the Mad'],
    mapProvinces: ['castile', 'aragon', 'sicily'],
  },
};
