
import React, { useState, useEffect, useCallback } from 'react';
import { GameMode, type LeaderboardEntry, type GameState, type Player, type BoardState, type SquareValue } from './types';
import GameSetup from './components/GameSetup';
import GameBoard from './components/GameBoard';
import Leaderboard from './components/Leaderboard';
import Lobby from './components/Lobby';
import { multiplayerService, type MultiplayerEvent } from './services/multiplayerService';

const WINNING_COMBINATIONS = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
  [0, 4, 8], [2, 4, 6]             // diagonals
];

const App: React.FC = () => {
  const [gameMode, setGameMode] = useState<GameMode>(GameMode.Setup);
  const [playerName, setPlayerName] = useState<string>('Player');
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  
  // Multiplayer state
  const [roomId, setRoomId] = useState<string | null>(null);
  const [playerSymbol, setPlayerSymbol] = useState<Player | null>(null);
  const [isHost, setIsHost] = useState<boolean>(false);
  const [playerCount, setPlayerCount] = useState(0);
  const [gameState, setGameState] = useState<GameState | null>(null);

  useEffect(() => {
    try {
      const storedLeaderboard = localStorage.getItem('ticTacToeLeaderboard');
      if (storedLeaderboard) {
        setLeaderboard(JSON.parse(storedLeaderboard));
      }
    } catch (error) {
      console.error("Failed to parse leaderboard from localStorage", error);
      setLeaderboard([]);
    }
  }, []);
  
  const handleGameWin = useCallback((winnerName: string) => {
    setLeaderboard(prevLeaderboard => {
      const playerIndex = prevLeaderboard.findIndex(entry => entry.name === winnerName);
      let newLeaderboard;

      if (playerIndex > -1) {
        newLeaderboard = [...prevLeaderboard];
        newLeaderboard[playerIndex] = {
          ...newLeaderboard[playerIndex],
          wins: newLeaderboard[playerIndex].wins + 1,
        };
      } else {
        newLeaderboard = [...prevLeaderboard, { name: winnerName, wins: 1 }];
      }

      newLeaderboard.sort((a, b) => b.wins - a.wins);

      try {
        localStorage.setItem('ticTacToeLeaderboard', JSON.stringify(newLeaderboard));
      } catch (error) {
        console.error("Failed to save leaderboard to localStorage", error);
      }
      
      return newLeaderboard;
    });
  }, []);

  const resetLocalState = useCallback(() => {
    setGameMode(GameMode.Setup);
    setRoomId(null);
    setPlayerSymbol(null);
    setIsHost(false);
    setGameState(null);
    setPlayerCount(0);
    multiplayerService.leaveGame();
  }, []);

  const calculateWinner = useCallback((currentBoard: BoardState): SquareValue | 'Draw' | null => {
    for (const combination of WINNING_COMBINATIONS) {
      const [a, b, c] = combination;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return currentBoard[a];
      }
    }
    return currentBoard.every(square => square !== null) ? 'Draw' : null;
  }, []);
  
  const handleHostMove = useCallback((index: number, playerMakingMove: Player) => {
    if (!gameState || !isHost) return;

    if (gameState.winner || gameState.board[index] !== null || gameState.currentPlayer !== playerMakingMove) {
      console.warn("Invalid move rejected by host.");
      return;
    }

    const newBoard = [...gameState.board];
    newBoard[index] = gameState.currentPlayer;
    
    const winner = calculateWinner(newBoard);

    if (winner && winner !== 'Draw') {
      handleGameWin(winner === 'X' ? gameState.players.X : gameState.players.O);
    }
    
    const newGameState: GameState = {
      ...gameState,
      board: newBoard,
      currentPlayer: gameState.currentPlayer === 'X' ? 'O' : 'X',
      winner: winner,
    };
    
    setGameState(newGameState);
    multiplayerService.sendMessage({ type: 'GAME_STATE_UPDATE', payload: { gameState: newGameState } });
  }, [gameState, isHost, calculateWinner, handleGameWin]);

  const handleMultiplayerEvent = useCallback((event: MultiplayerEvent) => {
    switch (event.type) {
      case 'PLAYER_JOINED':
        setPlayerCount(2);
        if (isHost) {
          const newGameState: GameState = {
            board: Array(9).fill(null),
            currentPlayer: 'X',
            winner: null,
            players: { X: playerName, O: event.payload.playerName }
          };
          setGameState(newGameState);
          multiplayerService.sendMessage({ type: 'GAME_START', payload: { gameState: newGameState }});
          setGameMode(GameMode.PlayerVsPlayerOnline);
        }
        break;
      case 'GAME_START':
        setGameState(event.payload.gameState);
        setGameMode(GameMode.PlayerVsPlayerOnline);
        break;
      case 'GAME_STATE_UPDATE':
        setGameState(event.payload.gameState);
        break;
      case 'MAKE_MOVE':
        if (isHost) {
          handleHostMove(event.payload.squareIndex, event.payload.player);
        }
        break;
      case 'GAME_RESET':
        if(isHost && gameState) {
            const newGameState: GameState = { ...gameState, board: Array(9).fill(null), currentPlayer: 'X', winner: null };
            setGameState(newGameState);
            multiplayerService.sendMessage({ type: 'GAME_STATE_UPDATE', payload: { gameState: newGameState }});
        }
        break;
      case 'PLAYER_LEFT':
        alert('Your opponent has left the game.');
        resetLocalState();
        break;
    }
  }, [isHost, playerName, gameState, handleHostMove, resetLocalState]);

  useEffect(() => {
    if(!roomId) return;
    const unsubscribe = multiplayerService.subscribe(handleMultiplayerEvent);

    const handleBeforeUnload = () => {
      multiplayerService.sendMessage({ type: 'PLAYER_LEFT' });
    };
    window.addEventListener('beforeunload', handleBeforeUnload);
    
    return () => {
      unsubscribe();
      window.removeEventListener('beforeunload', handleBeforeUnload);
    }
  }, [roomId, handleMultiplayerEvent]);

  const handleCreateGame = (name: string) => {
    const newRoomId = Math.random().toString(36).substring(2, 8).toUpperCase();
    setPlayerName(name || 'Player 1');
    setRoomId(newRoomId);
    setPlayerSymbol('X');
    setIsHost(true);
    setPlayerCount(1);
    multiplayerService.createGame(newRoomId);
    setGameMode(GameMode.Lobby);
  };

  const handleJoinGame = (name: string, joinRoomId: string) => {
    setPlayerName(name || 'Player 2');
    setRoomId(joinRoomId.toUpperCase());
    setPlayerSymbol('O');
    setIsHost(false);
    multiplayerService.joinGame(joinRoomId.toUpperCase());
    multiplayerService.sendMessage({ type: 'PLAYER_JOINED', payload: { playerName: name || 'Player 2' } });
  };
  
  const handlePlayAgain = () => {
    if (isHost) {
      if (gameState) {
        const newGameState: GameState = { ...gameState, board: Array(9).fill(null), currentPlayer: 'X', winner: null };
        setGameState(newGameState);
        multiplayerService.sendMessage({ type: 'GAME_STATE_UPDATE', payload: { gameState: newGameState }});
      }
    } else {
        multiplayerService.sendMessage({ type: 'GAME_RESET' });
    }
  };

  const renderContent = () => {
    switch (gameMode) {
      case GameMode.Lobby:
        return <Lobby roomId={roomId!} playerCount={playerCount} onBack={resetLocalState} />;
      case GameMode.PlayerVsPlayerOnline:
        if (!gameState || !playerSymbol) return <div className="text-center text-slate-300">Loading game...</div>;
        return (
          <GameBoard
            board={gameState.board}
            currentPlayer={gameState.currentPlayer}
            winner={gameState.winner}
            playerSymbol={playerSymbol}
            player1Name={gameState.players.X}
            player2Name={gameState.players.O}
            onMakeMove={(index) => {
              if (isHost) {
                handleHostMove(index, playerSymbol);
              } else {
                multiplayerService.sendMessage({ type: 'MAKE_MOVE', payload: { squareIndex: index, player: playerSymbol }});
              }
            }}
            onPlayAgain={handlePlayAgain}
            onBackToMenu={resetLocalState}
          />
        );
      case GameMode.Leaderboard:
        return <Leaderboard leaderboard={leaderboard} onBack={resetLocalState} />;
      case GameMode.Setup:
      default:
        return (
          <GameSetup
            onCreateGame={handleCreateGame}
            onJoinGame={handleJoinGame}
            onShowLeaderboard={() => setGameMode(GameMode.Leaderboard)}
            defaultPlayerName={playerName}
          />
        );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex flex-col items-center justify-center p-4 font-sans text-gray-100">
        <div className="w-full max-w-md mx-auto">
            <header className="text-center mb-8">
                <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-accent-300 to-secondary-400">
                  Tic-Tac-Toe
                </h1>
            </header>
            <main className="bg-gray-800/80 rounded-2xl shadow-2xl p-6 sm:p-8 backdrop-blur-sm border border-gray-700/50">
                {renderContent()}
            </main>
        </div>
    </div>
  );
};

export default App;
