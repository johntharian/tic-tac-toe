
import React, { useState } from 'react';

interface GameSetupProps {
  onCreateGame: (playerName: string) => void;
  onJoinGame: (playerName: string, roomId: string) => void;
  onShowLeaderboard: () => void;
  defaultPlayerName: string;
}

const GameSetup: React.FC<GameSetupProps> = ({ onCreateGame, onJoinGame, onShowLeaderboard, defaultPlayerName }) => {
  const [playerName, setPlayerName] = useState(defaultPlayerName);
  const [roomId, setRoomId] = useState('');
  const [showJoin, setShowJoin] = useState(false);

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (roomId.trim()) {
      onJoinGame(playerName, roomId.trim());
    }
  };

  return (
    <div className="flex flex-col space-y-6 animate-fade-in">
      <h2 className="text-2xl font-semibold text-center text-primary-100">Welcome</h2>
      <div>
        <label htmlFor="playerName" className="block text-sm font-medium text-primary-200 mb-2">
          Enter Your Name
        </label>
        <input
          id="playerName"
          type="text"
          value={playerName}
          onChange={(e) => setPlayerName(e.target.value)}
          placeholder="Player 1"
          className="w-full px-4 py-2 bg-primary-800/50 border border-primary-600/50 rounded-md focus:ring-2 focus:ring-accent-500 focus:outline-none transition-all text-white placeholder-primary-400"
          aria-label="Your Name"
        />
      </div>

      {!showJoin ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <button
            onClick={() => onCreateGame(playerName)}
            className="w-full px-4 py-3 bg-accent-600 text-white font-semibold rounded-lg hover:bg-accent-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-accent-500 transition-all transform hover:scale-105 shadow-lg shadow-accent-900/30"
          >
            Create Game
          </button>
          <button
            onClick={() => setShowJoin(true)}
            className="w-full px-4 py-3 bg-secondary-700 text-white font-semibold rounded-lg hover:bg-secondary-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-secondary-500 transition-all transform hover:scale-105 shadow-lg shadow-secondary-900/30"
          >
            Join Game
          </button>
        </div>
      ) : (
        <form onSubmit={handleJoin} className="flex flex-col space-y-4">
          <div>
            <label htmlFor="roomId" className="block text-sm font-medium text-slate-400 mb-2">
              Enter Room ID
            </label>
            <input
              id="roomId"
              type="text"
              value={roomId}
              onChange={(e) => setRoomId(e.target.value)}
              placeholder="e.g. XYZ123"
              className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-md focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-all"
              aria-label="Room ID"
              autoCapitalize="characters"
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-3 bg-pink-600 text-white font-semibold rounded-md hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-pink-500 transition-transform transform hover:scale-105 disabled:bg-pink-800 disabled:cursor-not-allowed"
            disabled={!roomId.trim()}
          >
            Join Room
          </button>
           <button type="button" onClick={() => setShowJoin(false)} className="text-center text-sm text-slate-400 hover:text-slate-200">
            &larr; Back
          </button>
        </form>
      )}

      <hr className="border-slate-700" />

      <button
        onClick={onShowLeaderboard}
        className="w-full mt-4 px-4 py-2.5 bg-primary-800/30 text-primary-100 font-medium rounded-lg hover:bg-primary-700/40 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-primary-900 focus:ring-primary-500 transition-all border border-primary-700/50 hover:border-primary-600/70"
      >
        View Leaderboard
      </button>
    </div>
  );
};

export default GameSetup;
