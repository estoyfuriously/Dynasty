import React from 'react';
import { Shield, AlertTriangle, Crown, Scroll } from 'lucide-react';
import { GameEvent } from '../types';

interface GenerationEventModalProps {
  event: GameEvent;
  onChoiceSelected: (prestigeDelta: number, healthDelta: number, log: string) => void;
}

export const GenerationEventModal: React.FC<GenerationEventModalProps> = ({
  event,
  onChoiceSelected,
}) => {
  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-amber-50 border-4 border-amber-800 rounded-2xl max-w-xl w-full p-6 shadow-2xl text-stone-900 relative animate-in fade-in zoom-in-95 duration-200">
        {/* Modal Banner */}
        <div className="flex items-center gap-3 mb-4 pb-3 border-b-2 border-amber-800/30">
          <div className="bg-amber-800 p-2.5 rounded-lg text-amber-200 shadow">
            <Scroll className="w-6 h-6" />
          </div>
          <div>
            <span className="text-xs font-serif font-bold text-amber-800 uppercase tracking-widest block">
              Royal Crisis & Dilemma (Gen {event.triggerGen})
            </span>
            <h3 className="font-serif text-xl font-bold text-amber-950">
              {event.title}
            </h3>
          </div>
        </div>

        {/* Event Description */}
        <p className="text-sm text-stone-700 leading-relaxed mb-6 bg-amber-100/60 p-4 rounded-xl border border-amber-200 font-serif">
          {event.description}
        </p>

        {/* Event Choices */}
        <div className="space-y-3">
          {event.choices.map((choice, idx) => (
            <button
              key={idx}
              onClick={() => onChoiceSelected(choice.prestigeDelta, choice.healthDelta, choice.log)}
              className="w-full text-left p-4 bg-amber-100 hover:bg-amber-200/90 border-2 border-amber-700/60 hover:border-amber-900 rounded-xl transition cursor-pointer shadow flex flex-col justify-between group"
            >
              <span className="font-serif font-bold text-amber-950 text-sm mb-1 group-hover:text-amber-800 flex items-center gap-2">
                <Crown className="w-4 h-4 text-amber-700 shrink-0" />
                {choice.text}
              </span>

              <div className="flex items-center gap-3 text-xs font-mono mt-1">
                <span className={choice.prestigeDelta >= 0 ? 'text-emerald-800 font-bold' : 'text-red-800 font-bold'}>
                  Prestige: {choice.prestigeDelta >= 0 ? `+${choice.prestigeDelta}` : choice.prestigeDelta}
                </span>
                <span className={choice.healthDelta >= 0 ? 'text-emerald-800 font-bold' : 'text-red-800 font-bold'}>
                  Health: {choice.healthDelta >= 0 ? `+${choice.healthDelta}%` : `${choice.healthDelta}%`}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
