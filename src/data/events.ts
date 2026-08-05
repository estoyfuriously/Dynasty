import { GameEvent } from '../types';

export const HISTORICAL_EVENTS: GameEvent[] = [
  {
    id: 'papal_dispensation',
    title: 'Dilemma: Request for Papal Dispensation',
    description:
      'Canon Law forbids marriage between close blood relatives without special dispensation from the Pope in Rome. Your council wishes to marry your heir to their first cousin to retain the Duchy of Milan.',
    triggerGen: 3,
    choices: [
      {
        text: 'Pay a lavish bribe to Rome for Papal Dispensation',
        prestigeDelta: 15,
        healthDelta: -10,
        log: 'Obtained a Papal Bull allowing 1st cousin marriage. The Duchy of Milan remains within the family.',
      },
      {
        text: 'Reject the cousin marriage and seek a foreign princess',
        prestigeDelta: -15,
        healthDelta: 10,
        log: 'Surrendered Milan as dowry to secure fresh foreign blood from abroad.',
      },
    ],
  },
  {
    id: 'war_of_succession',
    title: 'Crisis: War of Dynastic Succession!',
    description:
      'A rival house claims your throne, citing your heir’s fragile health and lack of martial vigor. Neighboring kingdoms assemble armies on your borders!',
    triggerGen: 6,
    choices: [
      {
        text: 'Marry into the rival house to unite crowns peacefully (Partition Land)',
        prestigeDelta: -25,
        healthDelta: 15,
        log: 'Signed a peace accord, ceding border provinces to secure an alliance with the challenger.',
      },
      {
        text: 'Consolidate internal family holdings and rally loyalist dukes',
        prestigeDelta: 25,
        healthDelta: -15,
        log: 'Defended the crown by marrying a wealthy aunt, keeping all gold and titles strictly internal.',
      },
    ],
  },
  {
    id: 'grand_dowry',
    title: 'Diplomatic Accord: The Grand Dowry Negotiation',
    description:
      'The King of France offers his daughter in marriage. She brings a massive treasury, but demands the permanent surrender of the Low Countries as her dowry.',
    triggerGen: 9,
    choices: [
      {
        text: 'Accept the French alliance (Surrender Low Countries)',
        prestigeDelta: -20,
        healthDelta: 20,
        log: 'Accepted the French royal bride. Restored genetic vigor, but lost governance over Flemish ports.',
      },
      {
        text: 'Refuse French demands and marry a Royal Archduchess cousin',
        prestigeDelta: 20,
        healthDelta: -20,
        log: 'Retained all Flemish territories by marrying within the inner family fold.',
      },
    ],
  },
  {
    id: 'bewitched_heir',
    title: 'Court Scandal: The "Bewitched" Monarch',
    description:
      'Generations of cousin intermarriage have produced an heir who suffers from severe physical weakness and speech difficulty. European ambassadors whisper that your bloodline is cursed by God.',
    triggerGen: 12,
    choices: [
      {
        text: 'Appoint an energetic foreign Regent and bring fresh blood to court',
        prestigeDelta: -15,
        healthDelta: 15,
        log: 'Admitted the sovereign’s infirmity and invited foreign noble advisors to guide state affairs.',
      },
      {
        text: 'Proclaim Divine Right and execute court heralds who whisper of weakness',
        prestigeDelta: 15,
        healthDelta: -15,
        log: 'Suppressed court rumors through royal decree, but the genetic strain grows severe.',
      },
    ],
  },
  {
    id: 'treaty_partition',
    title: 'Grand Alliance: The European Partition Treaty',
    description:
      'Rival empires form a League of Augsburg to prevent your family from consolidating too many European crowns. They demand you pledge never to combine your territories with a cousin dynasty.',
    triggerGen: 14,
    choices: [
      {
        text: 'Sign the Partition Treaty (Surrender peripheral territories)',
        prestigeDelta: -30,
        healthDelta: 25,
        log: 'Agreed to partition peripheral kingdoms to secure European peace and introduce healthy stock.',
      },
      {
        text: 'Defy the League! Will all your territories to an internal cousin',
        prestigeDelta: 30,
        healthDelta: -25,
        log: 'Defied European coalition demands! Willed the vast global empire to a cousin heir.',
      },
    ],
  },
];
