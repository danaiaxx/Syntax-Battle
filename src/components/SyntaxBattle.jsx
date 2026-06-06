import { useGameEngine } from '../hooks/useGameEngine';
import GameBoard from './GameBoard';
import QuestionTerminal from './QuestionTerminal';
import CPUTerminal from './CPUTerminal';
import PauseOverlay from './PauseOverlay';
import GameOverOverlay from './GameOverOverlay';
import FlashOverlay from './FlashOverlay';
import AudioPlayerHUD from './AudioPlayerHUD';

export default function SyntaxBattle({ onExit }) {
  const {
    playerGrid,
    cpuGrid,
    playerPiece,
    cpuPiece,
    playerQuestion,
    cpuQuestion,
    playerScore,
    cpuScore,
    isPaused,
    gameOver,
    cpuThinking,
    cpuInput,
    cpuError,
    flashRed,
    playerError,
    handlePlayerSubmit,
    togglePause,
    retryGame,
    resumeGame,
  } = useGameEngine();

  return (
    <div className="scanlines relative min-h-screen bg-gradient-to-b from-[#0a0014] via-[#12002a] to-[#0a0014] px-3 py-4 sm:px-6">
      <FlashOverlay active={flashRed} />

      <header className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onExit}
          className="font-terminal text-xs text-purple-300 underline hover:text-purple-100"
        >
          ← Menu
        </button>

        <div className="flex items-center gap-4 font-terminal text-sm">
          <span className="text-cyan-300">Player: {playerScore}</span>
          <span className="text-fuchsia-300">CPU: {cpuScore}</span>
        </div>

        <div className="flex gap-2">
          <button
            type="button"
            onClick={togglePause}
            disabled={gameOver.active}
            className="rounded border border-purple-400/50 px-3 py-1 text-xs text-purple-200 hover:bg-purple-900/30 disabled:opacity-40"
          >
            {isPaused ? 'Resume' : 'Pause'}
          </button>
          {gameOver.active && (
            <button
              type="button"
              onClick={retryGame}
              className="rounded border border-pink-400/50 px-3 py-1 text-xs text-pink-200 hover:bg-pink-900/30"
            >
              Retry
            </button>
          )}
        </div>
      </header>

      <div className="mx-auto grid max-w-5xl gap-4">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <GameBoard
            grid={playerGrid}
            activePiece={playerPiece}
            label="PLAYER GRID"
            isPlayer
          />
          <GameBoard
            grid={cpuGrid}
            activePiece={cpuPiece}
            label="CPU GRID"
            isPlayer={false}
          />
        </div>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <QuestionTerminal
            question={playerQuestion}
            onSubmit={handlePlayerSubmit}
            error={playerError}
          />
          <CPUTerminal
            question={cpuQuestion}
            cpuInput={cpuInput}
            cpuThinking={cpuThinking}
            cpuError={cpuError}
          />
        </div>

        <AudioPlayerHUD />
      </div>

      <PauseOverlay visible={isPaused && !gameOver.active} onResume={resumeGame} />
      <GameOverOverlay
        visible={gameOver.active}
        winner={gameOver.winner}
        playerScore={playerScore}
        cpuScore={cpuScore}
        onRetry={retryGame}
      />
    </div>
  );
}
