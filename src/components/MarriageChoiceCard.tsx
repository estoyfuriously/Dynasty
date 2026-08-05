import React from 'react';
import { Shield, Heart, Dna, AlertTriangle, CheckCircle, Crown, Award } from 'lucide-react';
import { GameState, HouseId } from '../types';
import { HOUSES } from '../data/houses';

interface MarriageChoiceCardProps {
  state: GameState;
  onMarry: (isIncest: boolean, partnerHouseId?: HouseId) => void;
}

export const MarriageChoiceCard: React.FC<MarriageChoiceCardProps> = ({
  state,
  onMarry,
}) => {
  const playerHouse = state.playerHouseId ? HOUSES[state.playerHouseId] : null;

  if (!playerHouse) return null;

  // Pick 2 random foreign candidate houses for foreign marriage choices
  const foreignCandidates = React.useMemo(() => {
    const keys = (Object.keys(HOUSES) as HouseId[]).filter(
      (h) => h !== state.playerHouseId
    );
    // Shuffle deterministic based on generation
    const seed1 = (state.generation * 7) % keys.length;
    let seed2 = (state.generation * 13) % keys.length;
    if (seed2 === seed1) seed2 = (seed1 + 1) % keys.length;

    return [HOUSES[keys[seed1]], HOUSES[keys[seed2]]];
  }, [state.generation, state.playerHouseId]);

  return (
    <div className="bg-stone-900 border-2 border-amber-600/50 rounded-xl p-5 shadow-2xl text-stone-100 mb-6">
      <div className="mb-4 text-center">
        <span className="inline-block px-3 py-1 bg-amber-900/40 text-amber-300 border border-amber-600/40 text-xs font-serif font-bold uppercase tracking-widest rounded mb-1">
          Generation {state.generation} Royal Marriage Court ({state.year} AD)
        </span>
        <h3 className="font-serif text-xl sm:text-2xl font-bold text-amber-100">
          Select a Sovereign Consort for the Sovereign Heir
        </h3>
        <p className="text-xs text-stone-400 max-w-xl mx-auto mt-1">
          Will you preserve all crown titles and land by marrying a cousin, or pay a massive land dowry to introduce healthy foreign blood?
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* OPTION 1: MARRY A COUSIN (INCESTUOUS CHOICE) */}
        <div className="bg-red-950/40 border-2 border-red-700/80 hover:border-red-500 rounded-xl p-4 flex flex-col justify-between transition-all shadow-md hover:shadow-xl group relative overflow-hidden">
          <div className="absolute top-0 right-0 bg-red-700 text-stone-100 text-[10px] font-serif font-bold px-2 py-0.5 rounded-bl">
            ENDOGAMY / INCEST
          </div>

          <div>
            <div className="flex items-center gap-2 text-red-400 mb-2">
              <Dna className="w-5 h-5" />
              <h4 className="font-serif text-base font-bold text-red-200">
                Marry a Cousin (House {playerHouse.name.replace('House of ', '')})
              </h4>
            </div>

            <p className="text-xs text-stone-300 mb-4 leading-relaxed">
              Consolidate all family land titles and Duchy inheritances. Keep wealth strictly inside the royal bloodline.
            </p>

            <div className="space-y-2 text-xs font-mono mb-4 bg-stone-950/80 p-3 rounded border border-red-900/50">
              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" /> Title Consolidation:
                </span>
                <span>+20 to +30 Prestige</span>
              </div>

              <div className="flex items-center justify-between text-red-400 font-bold">
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5" /> Genetic Health:
                </span>
                <span>-15% to -25% HP</span>
              </div>

              <div className="flex items-center justify-between text-amber-400 font-bold">
                <span className="flex items-center gap-1">
                  <Dna className="w-3.5 h-3.5" /> Inbreeding (F):
                </span>
                <span>+0.063 Coeff</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onMarry(true)}
            className="w-full py-2.5 px-3 bg-red-800 hover:bg-red-700 text-stone-100 font-serif font-bold text-xs rounded shadow transition cursor-pointer flex items-center justify-center gap-2 group-hover:bg-red-600"
          >
            <Crown className="w-4 h-4 text-amber-300" />
            Consolidate Titles (Cousin Match)
          </button>
        </div>

        {/* OPTION 2: FOREIGN MARRIAGE A */}
        <div className="bg-emerald-950/30 border-2 border-emerald-700/60 hover:border-emerald-500 rounded-xl p-4 flex flex-col justify-between transition-all shadow-md hover:shadow-xl group relative">
          <div className="absolute top-0 right-0 bg-emerald-700 text-stone-100 text-[10px] font-serif font-bold px-2 py-0.5 rounded-bl">
            FOREIGN ALLIANCE
          </div>

          <div>
            <div className="flex items-center gap-2 text-emerald-400 mb-2">
              <Crown className="w-5 h-5 text-emerald-500" />
              <h4 className="font-serif text-base font-bold text-emerald-200">
                Marry into {foreignCandidates[0].name}
              </h4>
            </div>

            <p className="text-xs text-stone-300 mb-4 leading-relaxed">
              Pay a grand wedding dowry and surrender border territories to secure a fresh royal bloodline.
            </p>

            <div className="space-y-2 text-xs font-mono mb-4 bg-stone-950/80 p-3 rounded border border-emerald-900/50">
              <div className="flex items-center justify-between text-red-400 font-bold">
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" /> Land Dowry Surrender:
                </span>
                <span>-15 to -25 Prestige</span>
              </div>

              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5" /> Fresh Genetic Blood:
                </span>
                <span>+15% HP Recovery</span>
              </div>

              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span className="flex items-center gap-1">
                  <Dna className="w-3.5 h-3.5" /> Inbreeding (F):
                </span>
                <span>-65% Reduction</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onMarry(false, foreignCandidates[0].id)}
            className="w-full py-2.5 px-3 bg-emerald-800 hover:bg-emerald-700 text-stone-100 font-serif font-bold text-xs rounded shadow transition cursor-pointer flex items-center justify-center gap-2 group-hover:bg-emerald-600"
          >
            <CheckCircle className="w-4 h-4 text-emerald-300" />
            Marry into {foreignCandidates[0].name.replace('House of ', '')}
          </button>
        </div>

        {/* OPTION 3: FOREIGN MARRIAGE B */}
        <div className="bg-emerald-950/30 border-2 border-emerald-700/60 hover:border-emerald-500 rounded-xl p-4 flex flex-col justify-between transition-all shadow-md hover:shadow-xl group relative">
          <div className="absolute top-0 right-0 bg-emerald-700 text-stone-100 text-[10px] font-serif font-bold px-2 py-0.5 rounded-bl">
            FOREIGN ALLIANCE
          </div>

          <div>
            <div className="flex items-center gap-2 text-emerald-400 mb-2">
              <Crown className="w-5 h-5 text-emerald-500" />
              <h4 className="font-serif text-base font-bold text-emerald-200">
                Marry into {foreignCandidates[1].name}
              </h4>
            </div>

            <p className="text-xs text-stone-300 mb-4 leading-relaxed">
              Form a diplomatic pact with the {foreignCandidates[1].primaryRegion} domain at the cost of territorial concessions.
            </p>

            <div className="space-y-2 text-xs font-mono mb-4 bg-stone-950/80 p-3 rounded border border-emerald-900/50">
              <div className="flex items-center justify-between text-red-400 font-bold">
                <span className="flex items-center gap-1">
                  <Shield className="w-3.5 h-3.5" /> Land Dowry Surrender:
                </span>
                <span>-15 to -25 Prestige</span>
              </div>

              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span className="flex items-center gap-1">
                  <Heart className="w-3.5 h-3.5" /> Fresh Genetic Blood:
                </span>
                <span>+15% HP Recovery</span>
              </div>

              <div className="flex items-center justify-between text-emerald-400 font-bold">
                <span className="flex items-center gap-1">
                  <Dna className="w-3.5 h-3.5" /> Inbreeding (F):
                </span>
                <span>-65% Reduction</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => onMarry(false, foreignCandidates[1].id)}
            className="w-full py-2.5 px-3 bg-emerald-800 hover:bg-emerald-700 text-stone-100 font-serif font-bold text-xs rounded shadow transition cursor-pointer flex items-center justify-center gap-2 group-hover:bg-emerald-600"
          >
            <CheckCircle className="w-4 h-4 text-emerald-300" />
            Marry into {foreignCandidates[1].name.replace('House of ', '')}
          </button>
        </div>
      </div>
    </div>
  );
};
