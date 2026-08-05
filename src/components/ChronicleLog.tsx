import React from 'react';
import { Scroll, BookOpen, Clock } from 'lucide-react';
import { GameState } from '../types';

interface ChronicleLogProps {
  state: GameState;
}

export const ChronicleLog: React.FC<ChronicleLogProps> = ({ state }) => {
  return (
    <div className="bg-amber-50 border-2 border-amber-800/40 rounded-xl p-5 shadow-lg text-stone-900 mb-6">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-amber-900/20">
        <h3 className="font-serif text-lg font-bold text-amber-950 flex items-center gap-2">
          <Scroll className="w-5 h-5 text-amber-800" /> Chronicle of the Bloodline
        </h3>
        <span className="text-xs text-stone-500 font-serif">
          Historical Annal Log
        </span>
      </div>

      {state.history.length === 0 ? (
        <p className="text-xs text-stone-500 italic font-serif py-4 text-center">
          No generational annals recorded yet.
        </p>
      ) : (
        <div className="max-h-64 overflow-y-auto space-y-2.5 pr-2 custom-scrollbar">
          {state.history.slice().reverse().map((record) => (
            <div
              key={record.generation}
              className="bg-amber-100/60 border border-amber-800/20 p-3 rounded-lg text-xs font-serif leading-relaxed"
            >
              <div className="flex items-center justify-between gap-2 text-stone-600 mb-1 font-mono text-[11px]">
                <span className="font-bold text-amber-900">
                  Gen {record.generation} ({record.year} AD) - {record.monarch.name}
                </span>
                <span className={record.spouse.isIncest ? 'text-red-700 font-bold' : 'text-emerald-800'}>
                  {record.spouse.isIncest ? 'Cousin Endogamy' : 'Foreign Alliance'}
                </span>
              </div>
              <p className="text-stone-800">{record.logEntry}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
