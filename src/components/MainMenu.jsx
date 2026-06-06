import { getStats } from '../game/storage';
import AudioPlayerHUD from './AudioPlayerHUD';

export default function MainMenu({ onStartGame, onShowMechanics }) {
  const stats = getStats();

  return (
    <div className="scanlines flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#0a0014] via-[#1a0030] to-[#0a0014] px-6">
      <div className="text-center">
        <p className="font-terminal text-sm tracking-widest text-fuchsia-400/80">
          RETRO ARCADE
        </p>
        <h1 className="mt-4 font-arcade text-xl leading-relaxed text-transparent bg-gradient-to-r from-cyan-300 via-fuchsia-400 to-pink-400 bg-clip-text sm:text-2xl md:text-3xl">
          SYNTAX BATTLE
        </h1>
        <p className="mt-2 font-arcade text-[10px] text-purple-300 sm:text-xs">
          TETRIS EDITION
        </p>
      </div>

      <div className="mt-10 flex flex-col gap-4">
        <button
          type="button"
          onClick={onStartGame}
          className="rounded-lg border-2 border-cyan-400/70 bg-cyan-950/40 px-10 py-3 font-arcade text-xs text-cyan-200 shadow-[0_0_20px_rgba(34,211,238,0.3)] transition hover:bg-cyan-900/50 sm:text-sm"
        >
          Start Game
        </button>
        <button
          type="button"
          onClick={onShowMechanics}
          className="rounded-lg border-2 border-fuchsia-400/50 bg-fuchsia-950/30 px-10 py-3 font-arcade text-xs text-fuchsia-200 transition hover:bg-fuchsia-900/40 sm:text-sm"
        >
          How to Play
        </button>
      </div>

      <div className="mt-12 rounded-lg border border-purple-500/30 bg-black/30 px-6 py-4 text-center font-terminal text-xs text-purple-200/80">
        <p>High Score: {stats.highScore}</p>
        <p className="mt-1">
          Wins: {stats.wins} | Losses: {stats.losses}
        </p>
      </div>

      <AudioPlayerHUD className="mt-8 w-full max-w-md" />
    </div>
  );
}
