<div align="center">
<h1>Tic-Tac-Toe</h1>
<p>A modern, responsive Tic-Tac-Toe game with online multiplayer capabilities</p>
</div>

## 🌟 Features

- 🎮 Online multiplayer modes
- 🏆 Leaderboard to track wins
- ⚡ Built with React, TypeScript, and Vite

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
   ```bash
   git clone https://github.com/johntharian/tic-tac-toe.git
   cd tic-tac-toe
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Start the development server
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## 🏗️ Architecture

### Tech Stack
- **Frontend**: React 18 with TypeScript for type safety
- **Styling**: Tailwind CSS with custom theme and responsive design
- **Build Tool**: Vite for fast development and optimized production builds
- **State Management**: React Hooks (useState, useEffect, useCallback) for local state
- **Multiplayer**: WebSocket-based real-time communication

### Component Architecture

#### Core Components
1. **App.tsx**
   - Root component that manages game state and routing
   - Handles WebSocket connections and game logic
   - Manages player authentication and game mode selection

2. **GameBoard.tsx**
   - Renders the 3x3 game grid
   - Handles player moves and win conditions
   - Displays game status and player turns
   - Manages game reset and navigation

3. **GameSetup.tsx**
   - Handles player name input
   - Provides game mode selection (Create/Join game)
   - Manages room creation and joining logic

4. **Lobby.tsx**
   - Displays waiting room for multiplayer games
   - Shows connected players
   - Handles game start conditions

5. **Leaderboard.tsx**
   - Displays player statistics
   - Tracks wins and game history
   - Sorts and presents leaderboard data

6. **Square.tsx**
   - Individual game cell component
   - Handles click events
   - Animates X/O placement

### State Management
- **Local State**: React's useState for component-level state
- **Game State**: Centralized in App.tsx, passed down via props
- **Persistence**: LocalStorage for leaderboard data
- **Real-time Updates**: WebSocket for multiplayer synchronization

### Multiplayer Flow
1. Player creates/joins a game room
2. WebSocket connection established
3. Game state synchronized between players
4. Moves broadcasted in real-time
5. Win/draw conditions checked and announced

### Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── GameBoard.tsx     # Main game board and controls
│   ├── GameSetup.tsx     # Player setup and game creation
│   ├── Leaderboard.tsx   # Player statistics and rankings
│   ├── Lobby.tsx         # Multiplayer waiting room
│   └── Square.tsx        # Individual game cell
├── services/            # Application services
│   ├── multiplayerService.ts  # WebSocket communication
│   └── geminiService.ts       # AI integration (future)
├── types/              # TypeScript type definitions
│   └── index.ts        # Shared type definitions
├── App.tsx             # Root component
└── index.tsx           # Application entry point
```

### Key Features Implementation

#### Real-time Multiplayer
- WebSocket-based communication
- Room-based architecture for game sessions
- Automatic reconnection handling
- Synchronized game state across clients

#### Responsive Design
- Mobile-first approach
- Adaptive layout for different screen sizes

#### Performance Optimizations
- Memoized components with React.memo
- Lazy loading for non-critical components
- Optimized re-renders with useCallback

#### Type Safety
- Comprehensive TypeScript interfaces
- Strict null checks
- Type-safe API contracts

## 🎨 Design System

### Color Palette
- **Primary**: Deep blue gradients (`primary-*`)
- **Accent**: Teal for Player X (`accent-*`)
- **Secondary**: Purple for Player O (`secondary-*`)
- **Background**: Dark theme with gray gradients
- **Text**: High contrast white/gray for readability

### UI Components
- **Buttons**: Rounded with subtle shadows and hover effects
- **Inputs**: Clean, accessible forms with proper focus states
- **Game Board**: Grid-based layout with smooth animations
- **Responsive**: Works on mobile, tablet, and desktop

## 🛠 Development

### Code Style
- TypeScript for type safety
- Functional components with hooks
- Consistent code formatting with Prettier


