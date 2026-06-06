export default function MechanicsOverlay({ onClose }) {
  return (
    <div className="scanlines flex min-h-screen items-center justify-center bg-black/80 px-4 backdrop-blur-sm">
      <div className="max-w-lg rounded-xl border-2 border-purple-500/50 bg-[#0a0014]/95 p-6 shadow-[0_0_32px_rgba(168,85,247,0.35)] sm:p-8">
        <h2 className="font-arcade text-sm text-purple-200 sm:text-base">
          Mechanics
        </h2>

        <div className="mt-6 space-y-4 font-terminal text-sm leading-relaxed text-purple-100/90">
          <p>
            Fill in the blank code below to fire block attacks at the CPU grid and
            purge garbage from your own. Clearing your own Tetris rows sends extra
            garbage blocks. Don&apos;t let your grid reach the top!
          </p>

          <ul className="list-inside list-disc space-y-2 text-xs text-purple-200/80 sm:text-sm">
            <li>Blocks auto-fall on both grids — answer questions to attack.</li>
            <li>Correct answers launch a garbage row at your opponent.</li>
            <li>Correct answers also purge one garbage row from the bottom of your grid.</li>
            <li>Clearing rows sends bonus garbage to the CPU.</li>
            <li>The CPU attempts answers every 8–12 seconds (~70% accuracy).</li>
            <li>CPU failures drop its active block to the bottom.</li>
            <li>Pause freezes all clocks. Retry resets the match.</li>
          </ul>
        </div>

        <button
          type="button"
          onClick={onClose}
          className="mt-8 w-full rounded border-2 border-pink-400/60 bg-pink-950/30 py-2.5 font-arcade text-xs text-pink-200 hover:bg-pink-900/40"
        >
          Back to Menu
        </button>
      </div>
    </div>
  );
}
