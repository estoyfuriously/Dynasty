/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useCallback } from 'react';
import { Crown, Globe, GitBranch, Scroll, Shield, Heart, HelpCircle, Dna, RefreshCw } from 'lucide-react';
import { GameState, HouseId, GenerationRecord, Monarch, Spouse } from './types';
import { HOUSES } from './data/houses';
import { HISTORICAL_EVENTS } from './data/events';
import {
  calculateInbreedingCoeff,
  evaluateGeneticTraits,
  generateMonarchName,
  generateSpouseName,
} from './utils/genetics';
import { playSound } from './utils/audio';

import { Header } from './components/Header';
import { HouseSelection } from './components/HouseSelection';
import { StatsOverview } from './components/StatsOverview';
import { EuropeMap } from './components/EuropeMap';
import { FamilyTree } from './components/FamilyTree';
import { MarriageChoiceCard } from './components/MarriageChoiceCard';
import { GenerationEventModal } from './components/GenerationEventModal';
import { ChronicleLog } from './components/ChronicleLog';
import { EducationCodexModal } from './components/EducationCodexModal';
import { GameOverModal } from './components/GameOverModal';

const INITIAL_STATE: GameState = {
  playerHouseId: null,
  generation: 1,
  year: 1500,
  prestige: 100,
  health: 100,
  inbreedingCoeff: 0.0,
  activeTraits: [],
  alliances: [],
  territories: [],
  history: [],
  currentEvent: null,
  gameStatus: 'selecting',
  soundEnabled: true,
};

export default function App() {
  const [state, setState] = useState<GameState>(INITIAL_STATE);
  const [activeTab, setActiveTab] = useState<'court' | 'map' | 'tree' | 'chronicle'>('court');
  const [isCodexOpen, setIsCodexOpen] = useState(false);

  // Toggle Sound
  const toggleSound = () => {
    setState((prev) => ({ ...prev, soundEnabled: !prev.soundEnabled }));
  };

  // Restart Game
  const handleRestart = () => {
    playSound.click(state.soundEnabled);
    setState(INITIAL_STATE);
    setActiveTab('court');
  };

  // Select Starting House
  const handleSelectHouse = (houseId: HouseId) => {
    playSound.marriage(state.soundEnabled);
    const house = HOUSES[houseId];

    // Initial Monarch
    const initialMonarch: Monarch = {
      name: generateMonarchName(houseId, 1),
      title: house.title,
      gender: 'male',
      houseId,
      generation: 1,
      reignStartYear: 1500,
      reignEndYear: 1520,
      traits: [],
      inbreedingCoeff: 0.0,
    };

    setState((prev) => ({
      ...prev,
      playerHouseId: houseId,
      prestige: house.startingPrestige,
      health: 100,
      inbreedingCoeff: 0.0,
      territories: [...house.mapProvinces],
      gameStatus: 'playing',
      history: [
        {
          generation: 1,
          year: 1500,
          monarch: initialMonarch,
          spouse: {
            name: 'Founding Royal Line',
            houseId,
            houseName: house.name,
            isIncest: false,
            relation: 'Founder',
            dowryPrestigeDelta: 0,
            healthDelta: 0,
          },
          prestigeAfter: house.startingPrestige,
          healthAfter: 100,
          inbreedingCoeffAfter: 0.0,
          activeTraits: [],
          logEntry: `The reign of ${house.name} begins in ${house.primaryRegion}.`,
          territoriesCount: house.mapProvinces.length,
        },
      ],
    }));
  };

  // Handle Marriage Choice (Turn execution)
  const handleMarriage = (isIncest: boolean, partnerHouseId?: HouseId) => {
    if (!state.playerHouseId) return;

    playSound.click(state.soundEnabled);

    const house = HOUSES[state.playerHouseId];
    const targetPartnerId = isIncest ? state.playerHouseId : partnerHouseId || 'bourbon';
    const partnerHouse = HOUSES[targetPartnerId];

    const newGen = state.generation + 1;
    const newYear = state.year + 18; // ~18 years per generation

    // Calculate Inbreeding F
    const newF = calculateInbreedingCoeff(state.inbreedingCoeff, isIncest, newGen);

    // Calculate Prestige & Health Deltas
    let prestigeDelta = 0;
    let healthDelta = 0;

    if (isIncest) {
      prestigeDelta = 25; // Consolidate titles
      healthDelta = -(Math.floor(Math.random() * 12) + 12); // -12% to -24%
    } else {
      prestigeDelta = -(Math.floor(Math.random() * 12) + 12); // -12 to -24 territory dowry
      healthDelta = 15; // +15% fresh blood recovery
    }

    // Perk Adjustments
    if (house.id === 'habsburg' && isIncest) prestigeDelta += 5;
    if (house.id === 'tudor' && !isIncest) healthDelta += 5;
    if (house.id === 'valois') prestigeDelta += 5;

    const newPrestige = Math.max(0, state.prestige + prestigeDelta);
    const newHealth = Math.min(100, Math.max(0, state.health + healthDelta));

    // Evaluate Trait Emergence
    const currentTraitIds = state.activeTraits.map((t) => t.id);
    const emergedTraits = evaluateGeneticTraits(
      newF,
      newHealth,
      currentTraitIds,
      house.signatureTraitId
    );
    const updatedTraits = [...state.activeTraits, ...emergedTraits];

    if (emergedTraits.length > 0) {
      playSound.warning(state.soundEnabled);
    } else {
      playSound.marriage(state.soundEnabled);
    }

    // Generate Monarch & Spouse Data
    const newMonarch: Monarch = {
      name: generateMonarchName(state.playerHouseId, newGen),
      title: house.title,
      gender: 'male',
      houseId: state.playerHouseId,
      generation: newGen,
      reignStartYear: state.year,
      reignEndYear: newYear,
      traits: updatedTraits,
      inbreedingCoeff: newF,
    };

    const spouseData = generateSpouseName(targetPartnerId, isIncest, house.name);
    const newSpouse: Spouse = {
      name: spouseData.name,
      houseId: targetPartnerId,
      houseName: partnerHouse.name,
      isIncest,
      relation: spouseData.relation,
      dowryPrestigeDelta: prestigeDelta,
      healthDelta,
    };

    // Log text
    const logText = isIncest
      ? `Consolidated crown titles by marrying a cousin (${spouseData.relation}). Retained land, but genetic health dropped by ${Math.abs(healthDelta)}%.`
      : `Contracted foreign marriage alliance with ${partnerHouse.name}. Surrendered border territories in dowry (-${Math.abs(prestigeDelta)} Prestige), but introduced fresh blood (+15% Health).`;

    const newRecord: GenerationRecord = {
      generation: newGen,
      year: newYear,
      monarch: newMonarch,
      spouse: newSpouse,
      prestigeAfter: newPrestige,
      healthAfter: newHealth,
      inbreedingCoeffAfter: newF,
      activeTraits: updatedTraits,
      logEntry: logText,
      territoriesCount: state.territories.length,
    };

    // Check for Generation Event
    const matchingEvent = HISTORICAL_EVENTS.find((e) => e.triggerGen === newGen) || null;

    // Check Game Over
    let nextStatus = state.gameStatus;
    if (newPrestige <= 0) nextStatus = 'gameover_bankrupt';
    else if (newHealth <= 0) nextStatus = 'gameover_extinct';
    else if (newGen >= 15) {
      nextStatus = 'gameover_victory';
      playSound.victory(state.soundEnabled);
    }

    setState((prev) => ({
      ...prev,
      generation: newGen,
      year: newYear,
      prestige: newPrestige,
      health: newHealth,
      inbreedingCoeff: newF,
      activeTraits: updatedTraits,
      history: [...prev.history, newRecord],
      currentEvent: matchingEvent,
      gameStatus: nextStatus,
    }));
  };

  // Handle Choice in Generation Event Modal
  const handleEventChoice = (prestigeDelta: number, healthDelta: number, log: string) => {
    playSound.click(state.soundEnabled);

    const newPrestige = Math.max(0, state.prestige + prestigeDelta);
    const newHealth = Math.min(100, Math.max(0, state.health + healthDelta));

    let nextStatus = state.gameStatus;
    if (newPrestige <= 0) nextStatus = 'gameover_bankrupt';
    else if (newHealth <= 0) nextStatus = 'gameover_extinct';

    setState((prev) => {
      const lastHistory = [...prev.history];
      if (lastHistory.length > 0) {
        lastHistory[lastHistory.length - 1].logEntry += ` [Event Choice: ${log}]`;
      }

      return {
        ...prev,
        prestige: newPrestige,
        health: newHealth,
        currentEvent: null,
        gameStatus: nextStatus,
        history: lastHistory,
      };
    });
  };

  return (
    <div className="min-h-screen bg-stone-950 text-stone-100 flex flex-col font-sans selection:bg-amber-800 selection:text-amber-100">
      {/* Header Bar */}
      <Header
        state={state}
        onOpenCodex={() => setIsCodexOpen(true)}
        onToggleSound={toggleSound}
        onRestart={handleRestart}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
        {state.gameStatus === 'selecting' ? (
          <HouseSelection
            onSelectHouse={handleSelectHouse}
            onOpenCodex={() => setIsCodexOpen(true)}
          />
        ) : (
          <div>
            {/* Stats Overview Panel */}
            <StatsOverview state={state} />

            {/* Navigation Tabs */}
            <div className="flex border-b border-stone-800 mb-6 gap-2 overflow-x-auto pb-1">
              <button
                onClick={() => {
                  playSound.click(state.soundEnabled);
                  setActiveTab('court');
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg font-serif font-bold text-xs transition cursor-pointer shrink-0 ${
                  activeTab === 'court'
                    ? 'bg-amber-800 text-amber-100 border-t-2 border-amber-500'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                }`}
              >
                <Crown className="w-4 h-4 text-amber-400" />
                Royal Marriage Court
              </button>

              <button
                onClick={() => {
                  playSound.click(state.soundEnabled);
                  setActiveTab('map');
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg font-serif font-bold text-xs transition cursor-pointer shrink-0 ${
                  activeTab === 'map'
                    ? 'bg-amber-800 text-amber-100 border-t-2 border-amber-500'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                }`}
              >
                <Globe className="w-4 h-4 text-amber-400" />
                Map of Europe
              </button>

              <button
                onClick={() => {
                  playSound.click(state.soundEnabled);
                  setActiveTab('tree');
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg font-serif font-bold text-xs transition cursor-pointer shrink-0 ${
                  activeTab === 'tree'
                    ? 'bg-amber-800 text-amber-100 border-t-2 border-amber-500'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                }`}
              >
                <GitBranch className="w-4 h-4 text-amber-400" />
                Dynasty Genealogy
              </button>

              <button
                onClick={() => {
                  playSound.click(state.soundEnabled);
                  setActiveTab('chronicle');
                }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-t-lg font-serif font-bold text-xs transition cursor-pointer shrink-0 ${
                  activeTab === 'chronicle'
                    ? 'bg-amber-800 text-amber-100 border-t-2 border-amber-500'
                    : 'bg-stone-900 text-stone-400 hover:text-stone-200'
                }`}
              >
                <Scroll className="w-4 h-4 text-amber-400" />
                Historical Chronicle
              </button>
            </div>

            {/* Tab Views */}
            {activeTab === 'court' && (
              <div>
                {/* Turn Choice Options */}
                <MarriageChoiceCard state={state} onMarry={handleMarriage} />

                {/* Europe Map Summary */}
                <EuropeMap state={state} />

                {/* Chronicle Log */}
                <ChronicleLog state={state} />
              </div>
            )}

            {activeTab === 'map' && <EuropeMap state={state} />}

            {activeTab === 'tree' && <FamilyTree state={state} />}

            {activeTab === 'chronicle' && <ChronicleLog state={state} />}
          </div>
        )}
      </main>

      {/* Generation Dilemma Event Modal */}
      {state.currentEvent && (
        <GenerationEventModal
          event={state.currentEvent}
          onChoiceSelected={handleEventChoice}
        />
      )}

      {/* Educational Codex Modal */}
      {isCodexOpen && (
        <EducationCodexModal onClose={() => setIsCodexOpen(false)} />
      )}

      {/* Game Over Assessment Modal */}
      {state.gameStatus.startsWith('gameover_') && (
        <GameOverModal
          state={state}
          onRestart={handleRestart}
          onOpenCodex={() => setIsCodexOpen(true)}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-stone-800 py-4 text-center text-xs text-stone-500 font-serif">
        Dynasty: Land vs. Blood • Designed for World History Class Education
      </footer>
    </div>
  );
}
