import React from 'react';
import { Trophy, Skull, Coins, Crown, RefreshCw, BookOpen, Award, AlertTriangle } from 'lucide-react';
import { GameState } from '../types';
import { HOUSES } from '../data/houses';

interface GameOverModalProps {
  state: GameState;
  onRestart: () => void;
  onOpenCodex: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  state,
  onRestart,
  onOpenCodex,
}) => {
  const house = state.playerHouseId ? HOUSES[state.playerHouseId] : null;

  const isVictory = state.gameStatus === 'gameover_victory';
  const isBankrupt = state.gameStatus === 'gameover_bankrupt';
  const isExtinct = state.gameStatus === 'gameover_extinct';

  // Calculate historical parallel
  const getHistoricalParallel = () => {
    if (state.inbreedingCoeff >= 0.2) {
      return 'Extreme Endogamy (The Spanish Habsburg Route): You prioritized land consolidation at all costs, resulting in severe genetic decay matching King Charles II of Spain.';
    } else if (state.inbreedingCoeff >= 0.08) {
      return 'Moderate Consanguinity (The Austrian Branch): Balanced cousin alliances with occasional outside marriages, maintaining central European dominance.';
    } else {
      return 'Exogamous Diplomacy (The British / Hanoverian Route): Regularly introduced fresh foreign blood, preserving biological health while navigating foreign dowries.';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4 overflow-y-auto">
      <div className="bg-amber-50 border-4 border-amber-800 rounded-2xl max-w-2xl w-full p-6 md:p-8 shadow-2xl text-stone-900 relative animate-in fade-in zoom-in-95 my-8">
        {/* Banner Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-800 text-amber-200 mb-3 shadow-lg border-2 border-amber-600">
            {isVictory ? (
              <Trophy className="w-8 h-8 text-amber-300" />
            ) : isBankrupt ? (
              <Coins className="w-8 h-8 text-amber-300" />
            ) : (
              <Skull className="w-8 h-8 text-red-300" />
            )}
          </div>

          <span className="text-xs font-serif font-bold text-amber-800 uppercase tracking-widest block mb-1">
            History Class Final Assessment Report
          </span>

          <h2 className="font-serif text-2xl md:text-3xl font-bold text-amber-950">
            {isVictory && 'Triumph of the Dynasty!'}
            {isBankrupt && 'Bankrupt & Deposed!'}
            {isExtinct && 'Biological Extinction!'}
          </h2>

          <p className="text-xs text-stone-600 mt-1 font-serif">
            House {house ? house.name : 'Monarchs'} ({state.generation} Generations • {state.year} AD)
          </p>
        </div>

        {/* Narrative Outcome */}
        <div className="bg-amber-100/80 p-4 rounded-xl border border-amber-800/30 mb-6 text-sm text-stone-800 leading-relaxed font-serif">
          {isVictory && (
            <p>
              Congratulations! Your dynasty successfully navigated 15 generations of European political intrigues, war of successions, and genetic challenges. You retained <strong className="text-amber-950 font-bold">{state.prestige} Prestige & Land points</strong> while maintaining <strong className="text-emerald-800 font-bold">{state.health}% Genetic Health</strong>!
            </p>
          )}

          {isBankrupt && (
            <p>
              Your crown surrendered too many border territories, duchies, and cash dowries to foreign kingdoms. Deprived of prestige and wealth, rival noble families deposed your line, turning your sovereigns into mere commoners.
            </p>
          )}

          {isExtinct && (
            <p>
              Generations of intense cousin endogamy accumulated catastrophic recessive gene mutations. Unable to produce a healthy, viable sovereign heir, your direct bloodline died out, triggering a devastating War of Succession across Europe.
            </p>
          )}
        </div>

        {/* Final Metrics Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6 text-center font-mono">
          <div className="bg-amber-100 p-3 rounded-lg border border-amber-300">
            <span className="text-[10px] text-stone-500 uppercase block font-sans font-bold">Generations</span>
            <span className="text-lg font-bold text-amber-950">{state.generation}</span>
          </div>

          <div className="bg-amber-100 p-3 rounded-lg border border-amber-300">
            <span className="text-[10px] text-stone-500 uppercase block font-sans font-bold">Prestige & Land</span>
            <span className="text-lg font-bold text-amber-950">{state.prestige}</span>
          </div>

          <div className="bg-amber-100 p-3 rounded-lg border border-amber-300">
            <span className="text-[10px] text-stone-500 uppercase block font-sans font-bold">Genetic Health</span>
            <span className="text-lg font-bold text-amber-950">{state.health}%</span>
          </div>

          <div className="bg-amber-100 p-3 rounded-lg border border-amber-300">
            <span className="text-[10px] text-stone-500 uppercase block font-sans font-bold">Final F Coeff</span>
            <span className="text-lg font-bold text-amber-950">{state.inbreedingCoeff.toFixed(3)}</span>
          </div>
        </div>

        {/* Historical Analysis Card */}
        <div className="bg-amber-200/50 p-4 rounded-xl border border-amber-800/30 mb-6 text-xs text-stone-800 font-serif">
          <span className="font-bold text-amber-950 block mb-1 flex items-center gap-1.5">
            <Award className="w-4 h-4 text-amber-800" /> Historical Strategy Comparison:
          </span>
          <p className="leading-relaxed text-stone-700">{getHistoricalParallel()}</p>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onRestart}
            className="flex items-center gap-2 px-6 py-2.5 bg-amber-800 hover:bg-amber-900 text-amber-100 font-serif font-bold text-sm rounded-lg shadow transition cursor-pointer"
          >
            <RefreshCw className="w-4 h-4" />
            Play Again with Another House
          </button>

          <button
            onClick={onOpenCodex}
            className="flex items-center gap-2 px-4 py-2.5 bg-amber-200 hover:bg-amber-300 text-amber-950 border border-amber-800/40 font-serif font-bold text-sm rounded-lg transition cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-amber-800" />
            Read History Codex
          </button>
        </div>
      </div>
    </div>
  );
};
