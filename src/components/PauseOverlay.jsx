export default function PauseOverlay({ visible, onResume }) {
  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={onResume}
      className="fixed inset-0 z-40 flex cursor-pointer items-center justify-center bg-black/70 backdrop-blur-sm"
    >
      <div className="rounded-xl border-2 border-purple-500/60 bg-[#0a0014]/90 px-8 py-6 text-center shadow-[0_0_24px_rgba(168,85,247,0.4)]">
        <p className="font-arcade text-sm text-purple-200 sm:text-base">
          Game Paused
        </p>
        <p className="mt-3 font-terminal text-sm text-purple-300/80">
          Click to Resume
        </p>
      </div>
    </button>
  );
}
