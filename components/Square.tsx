
import React from 'react';
import type { SquareValue } from '../types';

interface SquareProps {
  value: SquareValue;
  onClick: () => void;
  isClickable?: boolean;
}

const Square: React.FC<SquareProps> = ({ value, onClick, isClickable }) => {
  const textClass = value === 'X' 
    ? 'text-blue-400' 
    : value === 'O' 
    ? 'text-pink-400' 
    : '';
  
  const hoverClass = isClickable 
    ? 'hover:scale-105 hover:bg-slate-700 cursor-pointer' 
    : 'cursor-not-allowed';

  return (
    <button
      onClick={onClick}
      className={`w-20 h-20 sm:w-24 sm:h-24 bg-slate-800 rounded-lg flex items-center justify-center text-5xl sm:text-6xl font-black focus:outline-none focus:ring-2 focus:ring-indigo-500 transition-all transform ${hoverClass}`}
      disabled={!isClickable && !value}
      aria-label={`Square ${value ? `is ${value}` : 'is empty'}${isClickable ? '. Click to place your mark.' : ''}`}
    >
      <span className={`transition-transform duration-300 ease-in-out ${value ? 'scale-100' : 'scale-0'} ${textClass}`}>
        {value}
      </span>
    </button>
  );
};

export default Square;
