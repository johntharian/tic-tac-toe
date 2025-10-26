<div align="center">
<h1>Tic-Tac-Toe</h1>
<p>A modern, responsive Tic-Tac-Toe game with online multiplayer capabilities</p>
</div>

## 🌟 Features

- 🎮 Local and online multiplayer modes
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
- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom theme
- **Build Tool**: Vite
- **State Management**: React Hooks
- **Multiplayer**: WebSocket-based service

### Project Structure

```
src/
├── components/       # Reusable UI components
│   ├── GameBoard.tsx  # Main game board component
│   ├── GameSetup.tsx  # Game setup and lobby
│   ├── Leaderboard.tsx # Leaderboard component
│   ├── Lobby.tsx      # Multiplayer lobby
│   └── Square.tsx     # Individual game square
├── services/        # Service layer
│   └── multiplayerService.ts  # WebSocket service
├── types.ts         # TypeScript type definitions
└── App.tsx          # Main application component
```

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


