import React from 'react';
import { Crown, BookOpen, Volume2, VolumeX, Shield, RefreshCw } from 'lucide-react';
import { GameState } from '../types';
import { HOUSES } from '../data/houses';

interface HeaderProps {
  state: GameState;
  onOpenCodex: () => void;
  onToggleSound: () => void;
  onRestart: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  state,
  onOpenCodex,
  onToggleSound,
  onRestart,
}) => {
  const currentHouse = state.playerHouseId ? HOUSES[state.playerHouseId] : null;

  return (
    <header className="bg-stone-900 border-b-4 border-amber-600 text-stone-100 shadow-xl sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 py-3 flex flex-wrap items-center justify-between gap-3">
        {/* Title & Brand */}
        <div className="flex items-center gap-3">
          <div className="bg-amber-600/20 p-2 rounded border border-amber-500/40 text-amber-400">
            <Crown className="w-6 h-6" />
          </div>
          <div>
            <h1 className="font-serif text-lg sm:text-xl font-bold tracking-wide text-amber-200 flex items-center gap-2">
              Dynasty: <span className="text-amber-500">Land vs. Blood</span>
            </h1>
            <p className="text-xs text-stone-400 hidden sm:block">
              European Dynastic Succession & Inbreeding Simulator
            </p>
          </div>
        </div>

        {/* Active House Badge if playing */}
        {currentHouse && state.gameStatus === 'playing' && (
          <div className="flex items-center gap-2 bg-stone-800/90 border border-amber-500/30 px-3 py-1.5 rounded-full text-xs">
            <span
              className="w-3 h-3 rounded-full inline-block"
              style={{ backgroundColor: currentHouse.color }}
            />
            <span className="font-serif font-bold text-amber-100">{currentHouse.name}</span>
            <span className="text-stone-400 border-l border-stone-700 pl-2">
              Gen <strong className="text-amber-400">{state.generation}</strong> ({state.year} AD)
            </span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          <button
            onClick={onOpenCodex}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-900/60 hover:bg-amber-800 border border-amber-600/50 text-amber-200 text-xs rounded transition font-serif font-medium cursor-pointer"
            title="Open Historical Codex & Primary Sources"
          >
            <BookOpen className="w-4 h-4 text-amber-400" />
            <span className="hidden md:inline">History Codex</span>
          </button>

          <button
            onClick={onToggleSound}
            className="p-1.5 bg-stone-800 hover:bg-stone-700 text-amber-400 border border-stone-700 rounded transition cursor-pointer"
            title={state.soundEnabled ? 'Mute Sounds' : 'Enable Sounds'}
          >
            {state.soundEnabled ? (
              <Volume2 className="w-4 h-4" />
            ) : (
              <VolumeX className="w-4 h-4 text-stone-500" />
            )}
          </button>

          {state.gameStatus !== 'selecting' && (
            <button
              onClick={onRestart}
              className="p-1.5 bg-stone-800 hover:bg-stone-700 text-amber-400 border border-stone-700 rounded transition cursor-pointer"
              title="Restart Game"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </header>
  );
};
