
import React from 'react';
import { type Player, type BoardState, type SquareValue } from '../types';
import Square from './Square';

interface GameBoardProps {
  board: BoardState;
  currentPlayer: Player;
  winner: SquareValue | 'Draw' | null;
  playerSymbol: Player;
  player1Name: string;
  player2Name: string;
  onMakeMove: (index: number) => void;
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

const GameBoard: React.FC<GameBoardProps> = ({
  board,
  currentPlayer,
  winner,
  playerSymbol,
  player1Name,
  player2Name,
  onMakeMove,
  onPlayAgain,
  onBackToMenu,
}) => {

  const getStatusMessage = () => {
    if (winner) {
      if (winner === 'Draw') return "It's a Draw!";
      const winnerName = winner === 'X' ? player1Name : player2Name;
      if (winner === playerSymbol) {
        return `Congratulations, you won!`;
      }
      return `${winnerName} has won!`;
    }
    const nextPlayerName = currentPlayer === 'X' ? player1Name : player2Name;
    if (currentPlayer === playerSymbol) {
        return "Your turn";
    }
    return `Waiting for ${nextPlayerName}...`;
  };

  return (
    <div className="flex flex-col items-center animate-fade-in">
      <div className="w-full flex justify-between items-center mb-4">
        <div className={`text-center p-2 rounded-lg transition-all ${playerSymbol === 'X' ? 'bg-primary-800/80 ring-2 ring-accent-400' : 'opacity-70'}`}>
            <p className="text-lg font-bold text-accent-400">{player1Name} {playerSymbol === 'X' && '(You)'}</p>
            <p className="text-2xl font-black">X</p>
        </div>
        <div className={`text-center p-2 rounded-lg transition-all ${playerSymbol === 'O' ? 'bg-primary-800/80 ring-2 ring-secondary-400' : 'opacity-70'}`}>
            <p className="text-lg font-bold text-secondary-400">{player2Name} {playerSymbol === 'O' && '(You)'}</p>
            <p className="text-2xl font-black">O</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3 mb-6 bg-primary-900/50 p-4 rounded-xl backdrop-blur-sm">
        {board.map((value, index) => (
          <Square
            key={index}
            value={value}
            onClick={() => onMakeMove(index)}
            isClickable={currentPlayer === playerSymbol && !value && !winner}
          />
        ))}
      </div>
      <div className="mt-6 text-center h-16 flex flex-col justify-center">
        <div className="text-xl font-semibold mb-4 text-primary-100">{getStatusMessage()}</div>
        <div className="flex gap-4">
          <button
            onClick={onPlayAgain}
            className="px-4 py-2 bg-accent-600 text-white rounded-lg hover:bg-accent-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={!winner}
          >
            Play Again
          </button>
          <button
            onClick={onBackToMenu}
            className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
          >
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
};

export default GameBoard;
