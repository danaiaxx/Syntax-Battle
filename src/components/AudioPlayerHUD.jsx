import { useAudio } from '../context/AudioContext';

export default function AudioPlayerHUD({ className = '' }) {
  const { isPlaying, volume, audioReady, togglePlay, setVolume } = useAudio();

  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-3 rounded-lg border border-purple-500/30 bg-black/40 px-4 py-3 ${className}`}
    >
      <span className="font-arcade text-[10px] text-purple-300">SYNTHWAVE HUD</span>

      <button
        type="button"
        onClick={togglePlay}
        disabled={!audioReady}
        title={audioReady ? 'Toggle music' : 'Audio file could not be loaded'}
        className="rounded border border-purple-400/50 px-3 py-1 text-xs text-purple-200 hover:bg-purple-900/30 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {isPlaying ? 'Pause Music' : 'Play Music'}
      </button>

      <label className="flex items-center gap-2 text-xs text-purple-200">
        Vol
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(Number(e.target.value))}
          className="w-24 accent-fuchsia-500"
        />
        <span className="w-8 text-right">{Math.round(volume * 100)}%</span>
      </label>

      {!audioReady && (
        <span className="text-[10px] text-yellow-400/80">
          Audio file could not be loaded
        </span>
      )}
    </div>
  );
}
