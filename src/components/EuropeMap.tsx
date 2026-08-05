import React from 'react';
import { Globe, MapPin, Shield, Crown } from 'lucide-react';
import { GameState } from '../types';
import { HOUSES } from '../data/houses';

interface EuropeMapProps {
  state: GameState;
}

export const EuropeMap: React.FC<EuropeMapProps> = ({ state }) => {
  const playerHouse = state.playerHouseId ? HOUSES[state.playerHouseId] : null;

  // Regions on the European map with coordinates and house owners
  const regions = [
    { id: 'england', name: 'England & Wales', cx: 210, cy: 190, r: 24, owner: 'tudor' },
    { id: 'scotland', name: 'Scotland', cx: 195, cy: 120, r: 18, owner: 'stuart' },
    { id: 'france', name: 'Kingdom of France', cx: 260, cy: 280, r: 35, owner: 'bourbon' },
    { id: 'spain', name: 'Spain & Castile', cx: 170, cy: 390, r: 38, owner: 'habsburg' },
    { id: 'aragon', name: 'Crown of Aragon', cx: 230, cy: 370, r: 22, owner: 'trastamara' },
    { id: 'austria', name: 'Archduchy of Austria', cx: 420, cy: 290, r: 30, owner: 'habsburg' },
    { id: 'prussia', name: 'Prussia & Brandenburg', cx: 440, cy: 190, r: 26, owner: 'hohenzollern' },
    { id: 'netherlands', name: 'United Provinces (Dutch)', cx: 290, cy: 200, r: 18, owner: 'orange' },
    { id: 'tuscany', name: 'Grand Duchy of Tuscany', cx: 370, cy: 350, r: 18, owner: 'medici' },
    { id: 'russia', name: 'Tsardom of Russia', cx: 620, cy: 160, r: 45, owner: 'romanov' },
    { id: 'burgundy', name: 'Duchy of Burgundy', cx: 310, cy: 280, r: 20, owner: 'valois' },
  ];

  return (
    <div className="bg-amber-50 border-2 border-amber-800/40 rounded-xl p-5 shadow-lg text-stone-900 mb-6">
      <div className="flex items-center justify-between mb-4 pb-2 border-b border-amber-900/20">
        <div>
          <h3 className="font-serif text-lg font-bold text-amber-950 flex items-center gap-2">
            <Globe className="w-5 h-5 text-amber-800" /> European Dynastic Map (1500–1750 AD)
          </h3>
          <p className="text-xs text-stone-600">
            Territories and sphere of dynastic influence across Western and Eastern Europe.
          </p>
        </div>
        {playerHouse && (
          <div className="flex items-center gap-2 text-xs font-serif font-bold text-amber-900 bg-amber-200/80 px-3 py-1 rounded border border-amber-400">
            <Crown className="w-4 h-4 text-amber-800" />
            Your Domain: {playerHouse.name}
          </div>
        )}
      </div>

      {/* SVG Map Container */}
      <div className="relative w-full bg-[#e8dcb5] rounded-lg border-2 border-amber-900/30 overflow-hidden p-2 shadow-inner">
        <svg
          viewBox="0 0 750 480"
          className="w-full h-auto max-h-[380px] drop-shadow-sm"
        >
          {/* Water background & coastline lines */}
          <rect width="750" height="480" fill="#d0e2ec" />

          {/* Europe Land Mass (Simplified Artistic Polygon) */}
          <path
            d="M 120 100 L 240 70 L 320 80 L 480 60 L 720 90 L 720 440 L 520 450 L 360 460 L 220 460 L 100 420 Z"
            fill="#ede2c4"
            stroke="#9e8a5b"
            strokeWidth="2"
          />

          {/* Connecting Dynastic Alliances Lines */}
          <g stroke="#997a3d" strokeWidth="1.5" strokeDasharray="4 4" opacity="0.6">
            <line x1="210" y1="190" x2="260" y2="280" />
            <line x1="260" y1="280" x2="170" y2="390" />
            <line x1="170" y1="390" x2="420" y2="290" />
            <line x1="420" y1="290" x2="440" y2="190" />
            <line x1="440" y1="190" x2="620" y2="160" />
            <line x1="370" y1="350" x2="260" y2="280" />
          </g>

          {/* Provinces / Dynastic Regions */}
          {regions.map((reg) => {
            const isPlayerTerritory = state.playerHouseId === reg.owner;
            const house = HOUSES[reg.owner as keyof typeof HOUSES];

            return (
              <g key={reg.id} className="cursor-pointer group">
                {/* Outer pulsing ring for player territory */}
                {isPlayerTerritory && (
                  <circle
                    cx={reg.cx}
                    cy={reg.cy}
                    r={reg.r + 6}
                    fill="none"
                    stroke="#d97706"
                    strokeWidth="2"
                    className="animate-ping opacity-75"
                  />
                )}

                {/* Main Region Circle */}
                <circle
                  cx={reg.cx}
                  cy={reg.cy}
                  r={reg.r}
                  fill={house ? house.color : '#a89060'}
                  stroke={isPlayerTerritory ? '#f59e0b' : '#332a15'}
                  strokeWidth={isPlayerTerritory ? '3' : '1.5'}
                  opacity={isPlayerTerritory ? 0.95 : 0.75}
                  className="transition-all duration-300 group-hover:opacity-100"
                />

                {/* Region Label */}
                <text
                  x={reg.cx}
                  y={reg.cy + 4}
                  textAnchor="middle"
                  fill="#ffffff"
                  fontSize="10"
                  fontWeight="bold"
                  fontFamily="Georgia, serif"
                  className="drop-shadow-md select-none pointer-events-none"
                >
                  {reg.name.split(' ')[0]}
                </text>

                {/* Owner House Tag */}
                <text
                  x={reg.cx}
                  y={reg.cy + reg.r + 12}
                  textAnchor="middle"
                  fill="#2d220c"
                  fontSize="9"
                  fontWeight="600"
                  fontFamily="Georgia, serif"
                  className="select-none pointer-events-none"
                >
                  {house ? house.name.replace('House of ', '') : reg.owner}
                </text>
              </g>
            );
          })}
        </svg>

        <div className="mt-2 flex flex-wrap items-center justify-between text-[11px] text-stone-700 font-serif border-t border-amber-900/10 pt-2 px-1">
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 border border-amber-700" />
              Your Crown Holdings
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-stone-500 border border-stone-800" />
              Foreign Sovereign Houses
            </span>
          </div>
          <span>Parchment Map Scale: 1 cm = 150 Leagues</span>
        </div>
      </div>
    </div>
  );
};
