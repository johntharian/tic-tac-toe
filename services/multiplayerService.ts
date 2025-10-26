
import type { GameState, Player } from '../types';

export interface BaseEvent {
  type: string;
  payload?: any;
}

export interface PlayerJoinedEvent extends BaseEvent {
  type: 'PLAYER_JOINED';
  payload: {
    playerName: string;
  };
}

export interface GameStartEvent extends BaseEvent {
  type: 'GAME_START';
  payload: {
    gameState: GameState;
  };
}

export interface MoveEvent extends BaseEvent {
  type: 'MAKE_MOVE';
  payload: {
    squareIndex: number;
    player: Player;
  };
}

export interface GameStateUpdateEvent extends BaseEvent {
  type: 'GAME_STATE_UPDATE';
  payload: {
    gameState: GameState;
  };
}

export interface GameResetEvent extends BaseEvent {
    type: 'GAME_RESET';
}

export interface PlayerLeftEvent extends BaseEvent {
    type: 'PLAYER_LEFT';
}


export type MultiplayerEvent = PlayerJoinedEvent | GameStartEvent | MoveEvent | GameStateUpdateEvent | GameResetEvent | PlayerLeftEvent;

let channel: BroadcastChannel | null = null;

export const multiplayerService = {
  createGame: (roomId: string): void => {
    if (channel) channel.close();
    channel = new BroadcastChannel(`tictactoe-${roomId}`);
  },

  joinGame: (roomId: string): void => {
    if (channel) channel.close();
    channel = new BroadcastChannel(`tictactoe-${roomId}`);
  },

  sendMessage: (event: MultiplayerEvent): void => {
    if (channel) {
      channel.postMessage(event);
    } else {
      console.error('No active channel to send message');
    }
  },

  subscribe: (onMessage: (event: MultiplayerEvent) => void): (() => void) => {
    const handleMessage = (event: MessageEvent<MultiplayerEvent>) => {
      onMessage(event.data);
    };

    if (channel) {
      channel.addEventListener('message', handleMessage);
    }

    return () => {
      if (channel) {
        channel.removeEventListener('message', handleMessage);
      }
    };
  },

  leaveGame: (): void => {
    if (channel) {
      multiplayerService.sendMessage({ type: 'PLAYER_LEFT' });
      channel.close();
      channel = null;
    }
  },
};
