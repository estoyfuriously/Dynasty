import React from 'react';
import { Shield, Heart, Dna, MapPin, AlertTriangle, Info } from 'lucide-react';
import { GameState } from '../types';
import { HOUSES } from '../data/houses';

interface StatsOverviewProps {
  state: GameState;
}

export const StatsOverview: React.FC<StatsOverviewProps> = ({ state }) => {
  const playerHouse = state.playerHouseId ? HOUSES[state.playerHouseId] : null;

  // Calculate Inbreeding Severity label
  const getFLabel = (f: number) => {
    if (f < 0.02) return { text: 'Outbred (Diverse DNA)', color: 'text-emerald-400', bg: 'bg-emerald-950/40 border-emerald-800' };
    if (f < 0.07) return { text: '1st Cousin Level (F ≈ 0.063)', color: 'text-amber-400', bg: 'bg-amber-950/40 border-amber-800' };
    if (f < 0.15) return { text: 'Uncle-Niece Level (F ≈ 0.125)', color: 'text-orange-400', bg: 'bg-orange-950/40 border-orange-800' };
    return { text: 'EXTREME INBREEDING (F ≥ 0.250)', color: 'text-red-400 font-bold animate-pulse', bg: 'bg-red-950/60 border-red-800' };
  };

  const fInfo = getFLabel(state.inbreedingCoeff);

  return (
    <div className="bg-stone-900 border-2 border-amber-600/40 rounded-xl p-4 sm:p-5 shadow-xl text-stone-100 mb-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Prestige & Land Bar */}
        <div className="bg-stone-800/80 p-3.5 rounded-lg border border-stone-700 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-serif font-bold text-amber-300 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-amber-500" /> Prestige & Land Domain
            </span>
            <span className="text-sm font-bold text-amber-400 font-mono">
              {state.prestige} pts
            </span>
          </div>

          <div className="w-full bg-stone-950 rounded-full h-3 overflow-hidden border border-stone-700 mb-2">
            <div
              className="h-full bg-gradient-to-r from-amber-600 to-amber-400 transition-all duration-500"
              style={{ width: `${Math.min(100, (state.prestige / 200) * 100)}%` }}
            />
          </div>

          <p className="text-[11px] text-stone-400">
            {state.prestige < 40 ? (
              <span className="text-red-400 font-bold flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Risk of Bankruptcy & Land Loss!
              </span>
            ) : (
              `Controls ${state.territories.length} primary European regions & titles.`
            )}
          </p>
        </div>

        {/* Genetic Health Bar */}
        <div className="bg-stone-800/80 p-3.5 rounded-lg border border-stone-700 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-serif font-bold text-red-300 flex items-center gap-1.5">
              <Heart className="w-4 h-4 text-red-500" /> Genetic Health Reserve
            </span>
            <span className="text-sm font-bold font-mono text-red-400">
              {state.health}%
            </span>
          </div>

          <div className="w-full bg-stone-950 rounded-full h-3 overflow-hidden border border-stone-700 mb-2">
            <div
              className={`h-full transition-all duration-500 ${
                state.health > 60
                  ? 'bg-gradient-to-r from-emerald-600 to-emerald-400'
                  : state.health > 35
                  ? 'bg-gradient-to-r from-amber-600 to-amber-400'
                  : 'bg-gradient-to-r from-red-700 to-red-500 animate-pulse'
              }`}
              style={{ width: `${Math.max(0, state.health)}%` }}
            />
          </div>

          <p className="text-[11px] text-stone-400">
            {state.health <= 35 ? (
              <span className="text-red-400 font-bold flex items-center gap-1">
                <AlertTriangle className="w-3 h-3" /> Biological Extinction Imminent!
              </span>
            ) : (
              'Biological vigor & immunity level of the direct royal line.'
            )}
          </p>
        </div>

        {/* Inbreeding Coefficient (F) Meter */}
        <div className={`p-3.5 rounded-lg border flex flex-col justify-between ${fInfo.bg}`}>
          <div className="flex items-center justify-between mb-1">
            <span className="text-xs font-serif font-bold text-stone-200 flex items-center gap-1.5">
              <Dna className="w-4 h-4 text-amber-400" /> Inbreeding Coeff (F)
            </span>
            <span className="text-sm font-bold font-mono text-amber-300">
              {state.inbreedingCoeff.toFixed(3)}
            </span>
          </div>

          <div className="text-[11px] font-mono mb-2 font-medium">
            Status: <span className={fInfo.color}>{fInfo.text}</span>
          </div>

          <div className="text-[11px] text-stone-400 flex items-center justify-between">
            <span>Historical baseline: Charles II (F = 0.254)</span>
          </div>
        </div>
      </div>

      {/* Active Traits Pill List */}
      {state.activeTraits.length > 0 && (
        <div className="mt-4 pt-3 border-t border-stone-800">
          <span className="text-xs font-serif font-bold text-red-300 block mb-2 flex items-center gap-1">
            <AlertTriangle className="w-3.5 h-3.5 text-red-400" /> Active Hereditary Deformities & Conditions ({state.activeTraits.length}):
          </span>

          <div className="flex flex-wrap gap-2">
            {state.activeTraits.map((trait) => (
              <div
                key={trait.id}
                className="bg-red-950/80 border border-red-700/60 text-red-200 px-3 py-1 rounded.lg text-xs flex items-center gap-1.5 shadow-sm"
                title={`${trait.description} (${trait.historicalExample})`}
              >
                <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
                <span className="font-serif font-bold">{trait.name}</span>
                <span className="text-[10px] text-red-300 font-mono">
                  (-{trait.healthPenalty}% HP)
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
