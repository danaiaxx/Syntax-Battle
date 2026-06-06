export default function FlashOverlay({ active }) {
  if (!active) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-30 animate-flash-red bg-red-600/60" />
  );
}
