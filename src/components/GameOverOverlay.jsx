import { getStats } from '../game/storage';

export default function GameOverOverlay({ visible, winner, playerScore, cpuScore, onRetry }) {
  if (!visible) return null;

  const stats = getStats();
  const isVictory = winner === 'player';

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
      <div className="mx-4 max-w-md rounded-xl border-2 border-pink-500/60 bg-[#0a0014]/95 p-6 text-center shadow-[0_0_32px_rgba(236,72,153,0.4)]">
        <h2
          className={`font-arcade text-lg sm:text-xl ${
            isVictory ? 'text-green-400' : 'text-red-400'
          }`}
        >
          {isVictory ? 'Victory!' : 'Defeat!'}
        </h2>
        <p className="mt-4 font-terminal text-sm text-purple-200">
          Match Score — Player: {playerScore} | CPU: {cpuScore}
        </p>
        <p className="mt-2 font-terminal text-xs text-purple-300/70">
          High Score: {stats.highScore} | Wins: {stats.wins} | Losses: {stats.losses}
        </p>
        <button
          type="button"
          onClick={onRetry}
          className="mt-6 rounded border-2 border-pink-400 bg-pink-900/30 px-6 py-2 font-arcade text-xs text-pink-200 transition hover:bg-pink-800/40"
        >
          Retry
        </button>
      </div>
    </div>
  );
}
