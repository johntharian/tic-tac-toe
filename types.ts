
export type Player = 'X' | 'O';
export type SquareValue = Player | null;
export type BoardState = SquareValue[];

export enum GameMode {
  Setup,
  Lobby,
  PlayerVsPlayerOnline,
  Leaderboard,
}

export interface LeaderboardEntry {
  name: string;
  wins: number;
}

export interface GameState {
  board: BoardState;
  currentPlayer: Player;
  winner: SquareValue | 'Draw' | null;
  players: {
    X: string; // Player name for 'X'
    O: string; // Player name for 'O'
  };
}
