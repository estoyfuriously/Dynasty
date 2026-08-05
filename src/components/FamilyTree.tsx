import React from 'react';
import { Crown, Heart, Dna, GitBranch, Shield, AlertTriangle } from 'lucide-react';
import { GenerationRecord, GameState } from '../types';
import { HOUSES } from '../data/houses';

interface FamilyTreeProps {
  state: GameState;
}

export const FamilyTree: React.FC<FamilyTreeProps> = ({ state }) => {
  const playerHouse = state.playerHouseId ? HOUSES[state.playerHouseId] : null;

  if (state.history.length === 0) {
    return (
      <div className="bg-amber-50 border-2 border-amber-800/40 rounded-xl p-8 text-center text-stone-800 font-serif">
        <GitBranch className="w-12 h-12 text-amber-800 mx-auto mb-3 opacity-60" />
        <h3 className="text-xl font-bold mb-1">Genealogy Tree Empty</h3>
        <p className="text-xs text-stone-600">
          Begin your reign to track generational lineage and inherited genetic traits.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 border-2 border-amber-800/40 rounded-xl p-5 shadow-lg text-stone-900 mb-6">
      <div className="flex items-center justify-between mb-5 pb-3 border-b border-amber-900/20">
        <div>
          <h3 className="font-serif text-lg font-bold text-amber-950 flex items-center gap-2">
            <GitBranch className="w-5 h-5 text-amber-800" /> Royal Lineage & Genealogy Chart
          </h3>
          <p className="text-xs text-stone-600">
            Generational record of sovereigns, marriage partners, and hereditary traits.
          </p>
        </div>
        <div className="text-xs font-serif font-bold text-amber-900 bg-amber-200/80 px-3 py-1 rounded border border-amber-400">
          {state.history.length} Generations Logged
        </div>
      </div>

      {/* Vertical Timeline Tree */}
      <div className="relative pl-6 sm:pl-8 space-y-6 before:absolute before:left-3 sm:before:left-4 before:top-2 before:bottom-2 before:w-1 before:bg-amber-800/30">
        {state.history.map((record) => {
          const spouseHouse = HOUSES[record.spouse.houseId as keyof typeof HOUSES];

          return (
            <div
              key={record.generation}
              className="relative bg-amber-100/70 border border-amber-800/30 rounded-xl p-4 shadow-sm hover:shadow-md transition group"
            >
              {/* Timeline dot node */}
              <div
                className={`absolute -left-7 sm:-left-9 top-4 w-6 h-6 rounded-full border-2 flex items-center justify-center text-white font-bold text-[10px] shadow ${
                  record.spouse.isIncest
                    ? 'bg-red-700 border-red-900 animate-pulse'
                    : 'bg-amber-700 border-amber-900'
                }`}
              >
                {record.generation}
              </div>

              {/* Generation Header */}
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2 border-b border-amber-900/15 pb-2">
                <div className="flex items-center gap-2">
                  <span className="font-serif text-base font-bold text-amber-950 flex items-center gap-1.5">
                    <Crown className="w-4 h-4 text-amber-700" />
                    {record.monarch.name}
                  </span>
                  <span className="text-xs text-stone-500 font-serif italic">
                    ({record.year} AD)
                  </span>
                </div>

                <div className="flex items-center gap-2 text-xs">
                  <span
                    className={`px-2 py-0.5 rounded font-mono font-bold ${
                      record.inbreedingCoeffAfter >= 0.15
                        ? 'bg-red-200 text-red-900 border border-red-400'
                        : record.inbreedingCoeffAfter >= 0.06
                        ? 'bg-amber-200 text-amber-900 border border-amber-400'
                        : 'bg-emerald-200 text-emerald-900 border border-emerald-400'
                    }`}
                  >
                    F = {record.inbreedingCoeffAfter.toFixed(3)}
                  </span>
                </div>
              </div>

              {/* Monarch & Spouse Details Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-3 text-xs">
                {/* Spouse Info */}
                <div className="bg-amber-50/80 p-2.5 rounded border border-amber-800/20">
                  <span className="text-stone-500 block font-serif font-bold text-[11px] mb-0.5">
                    Consort / Spouse:
                  </span>
                  <span className="font-serif font-bold text-amber-900 block">
                    {record.spouse.name}
                  </span>
                  <span className="text-[11px] text-stone-600 block mt-0.5">
                    Relation: <strong className={record.spouse.isIncest ? 'text-red-700 font-serif' : 'text-emerald-800'}>{record.spouse.relation}</strong>
                  </span>
                </div>

                {/* Impact Summary */}
                <div className="bg-amber-50/80 p-2.5 rounded border border-amber-800/20 flex flex-col justify-between">
                  <span className="text-stone-500 block font-serif font-bold text-[11px] mb-0.5">
                    Generation Impact:
                  </span>
                  <div className="flex items-center gap-3 text-[11px] font-mono">
                    <span className={record.spouse.dowryPrestigeDelta >= 0 ? 'text-emerald-700 font-bold' : 'text-red-700 font-bold'}>
                      Prestige: {record.spouse.dowryPrestigeDelta >= 0 ? `+${record.spouse.dowryPrestigeDelta}` : record.spouse.dowryPrestigeDelta}
                    </span>
                    <span className={record.spouse.healthDelta >= 0 ? 'text-emerald-700 font-bold' : 'text-red-700 font-bold'}>
                      Health: {record.spouse.healthDelta >= 0 ? `+${record.spouse.healthDelta}%` : `${record.spouse.healthDelta}%`}
                    </span>
                  </div>
                </div>
              </div>

              {/* Active Traits for this Monarch */}
              {record.activeTraits.length > 0 && (
                <div className="mt-2 pt-2 border-t border-amber-900/15">
                  <span className="text-[11px] font-serif font-bold text-red-900 block mb-1 flex items-center gap-1">
                    <AlertTriangle className="w-3 h-3 text-red-600" /> Inherited Hereditary Traits:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {record.activeTraits.map((t) => (
                      <span
                        key={t.id}
                        className="bg-red-100 text-red-900 border border-red-300 text-[10px] font-serif font-semibold px-2 py-0.5 rounded"
                      >
                        {t.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
