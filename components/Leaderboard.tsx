
import React from 'react';
import type { LeaderboardEntry } from '../types';

interface LeaderboardProps {
  leaderboard: LeaderboardEntry[];
  onBack: () => void;
}

const Leaderboard: React.FC<LeaderboardProps> = ({ leaderboard, onBack }) => {
  return (
    <div className="flex flex-col items-center animate-fade-in">
      <h2 className="text-3xl font-bold mb-6 text-slate-200">Leaderboard</h2>
      <div className="w-full max-w-sm">
        {leaderboard.length > 0 ? (
          <ul className="space-y-3">
            {leaderboard.map((entry, index) => (
              <li
                key={entry.name}
                className="flex justify-between items-center bg-slate-700/50 p-3 rounded-lg"
              >
                <div className="flex items-center">
                  <span className="text-lg font-semibold w-8 text-center text-slate-400">{index + 1}</span>
                  <span className="text-lg font-medium text-slate-200">{entry.name}</span>
                </div>
                <span className="text-lg font-bold text-indigo-400">{entry.wins} Wins</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-slate-400">No games played yet. Be the first to win!</p>
        )}
      </div>
      <button
        onClick={onBack}
        className="mt-8 px-6 py-2 bg-slate-700 text-slate-300 font-semibold rounded-md hover:bg-slate-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-slate-500 transition-colors"
      >
        &larr; Back to Menu
      </button>
    </div>
  );
};

export default Leaderboard;
