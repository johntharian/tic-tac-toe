
import React, { useState } from 'react';

interface LobbyProps {
  roomId: string;
  playerCount: number;
  onBack: () => void;
}

const Lobby: React.FC<LobbyProps> = ({ roomId, playerCount, onBack }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(roomId).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  return (
    <div className="flex flex-col items-center space-y-6 animate-fade-in">
      <h2 className="text-2xl font-semibold text-center text-slate-200">Lobby</h2>
      <p className="text-slate-400 text-center">Share this Room ID with your friend to play:</p>
      <div className="relative w-full max-w-xs">
        <div className="flex items-center justify-between p-3 bg-slate-700/50 border border-slate-600 rounded-md">
          <span className="text-xl font-mono tracking-widest text-pink-400">{roomId}</span>
          <button onClick={handleCopy} className="text-slate-400 hover:text-white" aria-label="Copy Room ID">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
            </svg>
          </button>
        </div>
         {copied && <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 text-sm bg-green-600 text-white px-2 py-1 rounded">Copied!</div>}
      </div>
      <div className="mt-4 text-center">
        <p className="text-slate-300">Players in lobby: {playerCount} / 2</p>
        {playerCount < 2 && (
          <p className="text-indigo-400 animate-pulse mt-2">Waiting for opponent to join...</p>
        )}
      </div>
       <button
        onClick={onBack}
        className="mt-4 text-sm text-slate-400 hover:text-slate-200 transition-colors"
      >
        &larr; Back to Menu
      </button>
    </div>
  );
};

export default Lobby;
