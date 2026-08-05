import React from 'react';
import { Crown, Shield, Globe, Award, Heart, HelpCircle } from 'lucide-react';
import { HouseId } from '../types';
import { HOUSES } from '../data/houses';
import { GENETIC_TRAITS } from '../data/traits';

interface HouseSelectionProps {
  onSelectHouse: (houseId: HouseId) => void;
  onOpenCodex: () => void;
}

export const HouseSelection: React.FC<HouseSelectionProps> = ({
  onSelectHouse,
  onOpenCodex,
}) => {
  const houseList = Object.values(HOUSES);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      {/* Introduction Hero Section */}
      <div className="bg-amber-50/90 border-2 border-amber-800/40 rounded-xl p-6 md:p-8 mb-8 shadow-lg text-stone-900 relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 opacity-5 pointer-events-none text-stone-900">
          <Crown className="w-80 h-80" />
        </div>

        <div className="max-w-3xl">
          <span className="inline-block px-3 py-1 bg-amber-900/10 text-amber-900 border border-amber-900/20 text-xs font-serif font-bold tracking-widest uppercase rounded mb-3">
            World History Class Simulation
          </span>
          <h2 className="font-serif text-2xl md:text-4xl font-bold text-amber-950 mb-3">
            Dynastic Succession in Early Modern Europe
          </h2>
          <p className="text-stone-700 text-sm md:text-base leading-relaxed mb-4">
            Welcome, Royal Historian. Between the 15th and 18th centuries, European dynasties faced an existential dilemma:
            <strong className="text-amber-900 font-serif"> Marry outside</strong> and lose precious land, crown titles, and wealth to foreign rivals through dowries, or
            <strong className="text-amber-900 font-serif"> marry inside the family</strong> to consolidate power, triggering catastrophic genetic inbreeding.
          </p>
          <div className="flex flex-wrap items-center gap-4 text-xs font-serif text-amber-900 font-medium">
            <span className="flex items-center gap-1 bg-amber-100/80 border border-amber-300 px-2.5 py-1 rounded">
              <Shield className="w-3.5 h-3.5 text-amber-800" /> 10 Major Royal Houses
            </span>
            <span className="flex items-center gap-1 bg-amber-100/80 border border-amber-300 px-2.5 py-1 rounded">
              <Globe className="w-3.5 h-3.5 text-amber-800" /> 15 Generations of History
            </span>
            <span className="flex items-center gap-1 bg-amber-100/80 border border-amber-300 px-2.5 py-1 rounded">
              <Heart className="w-3.5 h-3.5 text-amber-800" /> Inbreeding & Genetic Traits
            </span>
            <button
              onClick={onOpenCodex}
              className="flex items-center gap-1 text-amber-800 underline hover:text-amber-950 cursor-pointer ml-auto"
            >
              <HelpCircle className="w-3.5 h-3.5" /> Read History Codex
            </button>
          </div>
        </div>
      </div>

      {/* House Grid Selection Header */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="font-serif text-xl font-bold text-stone-100 flex items-center gap-2">
            <Crown className="w-5 h-5 text-amber-400" /> Choose Your Dynasty
          </h3>
          <p className="text-xs text-stone-400">
            Select one of the 10 royal houses to take command of their lineage.
          </p>
        </div>
      </div>

      {/* Grid of Houses */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {houseList.map((house) => {
          const sigTrait = GENETIC_TRAITS[house.signatureTraitId];

          return (
            <div
              key={house.id}
              className="bg-amber-50 border-2 border-amber-800/30 hover:border-amber-600 rounded-xl p-5 shadow-md hover:shadow-xl transition-all flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Header color strip */}
              <div
                className="absolute top-0 left-0 right-0 h-2"
                style={{ backgroundColor: house.color }}
              />

              <div>
                {/* House Banner */}
                <div className="flex items-start justify-between gap-3 mb-2 pt-2">
                  <div>
                    <h4 className="font-serif text-lg font-bold text-amber-950 group-hover:text-amber-800 transition">
                      {house.name}
                    </h4>
                    <p className="text-xs text-amber-900/70 font-serif italic">
                      "{house.motto}"
                    </p>
                  </div>
                  <div
                    className="w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-inner shrink-0"
                    style={{ backgroundColor: house.color }}
                  >
                    {house.name.charAt(6) || house.name.charAt(0)}
                  </div>
                </div>

                <p className="text-xs font-semibold text-stone-600 mb-3 flex items-center gap-1">
                  <Globe className="w-3.5 h-3.5 text-amber-700" />
                  {house.primaryRegion}
                </p>

                {/* Historical Summary */}
                <p className="text-xs text-stone-700 leading-relaxed mb-4 line-clamp-3">
                  {house.historicalSummary}
                </p>

                {/* Perk & Signature Trait */}
                <div className="space-y-2 mb-4 bg-amber-100/60 p-3 rounded-lg border border-amber-200 text-xs">
                  <div>
                    <span className="font-serif font-bold text-amber-900 block flex items-center gap-1">
                      <Award className="w-3.5 h-3.5 text-amber-700" /> Dynasty Perk:
                    </span>
                    <span className="text-stone-800">{house.perk}</span>
                  </div>

                  {sigTrait && (
                    <div>
                      <span className="font-serif font-bold text-red-900 block flex items-center gap-1">
                        <Heart className="w-3.5 h-3.5 text-red-700" /> Risk Trait:
                      </span>
                      <span className="text-red-950 font-medium">
                        {sigTrait.name}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Action Button */}
              <button
                onClick={() => onSelectHouse(house.id)}
                className="w-full py-2.5 px-4 bg-amber-800 hover:bg-amber-900 text-amber-100 font-serif font-bold text-xs rounded shadow transition cursor-pointer flex items-center justify-center gap-2 group-hover:bg-amber-950"
              >
                <Crown className="w-4 h-4 text-amber-400" />
                Command House {house.name.replace('House of ', '')}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};
