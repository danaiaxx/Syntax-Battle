import { COLS, ROWS } from '../game/constants';
import { getRenderedGrid } from '../game/tetrisEngine';

const CELL_COLORS = {
  cyan: 'bg-cyan-400 shadow-[0_0_6px_#22d3ee]',
  magenta: 'bg-fuchsia-500 shadow-[0_0_6px_#d946ef]',
  gray: 'bg-gray-500 shadow-[0_0_4px_#9ca3af]',
};

export default function GameBoard({ grid, activePiece, label, isPlayer }) {
  const rendered = getRenderedGrid(grid, activePiece);
  const accent = isPlayer ? 'border-cyan-400/60' : 'border-fuchsia-500/60';
  const labelColor = isPlayer ? 'text-cyan-300' : 'text-fuchsia-300';

  return (
    <div className="flex flex-col items-center gap-2">
      <h3 className={`font-arcade text-[10px] sm:text-xs ${labelColor}`}>{label}</h3>
      <div
        className={`grid gap-px rounded border-2 ${accent} bg-black/60 p-1 shadow-[0_0_16px_rgba(255,0,255,0.2)]`}
        style={{
          gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
          width: 'min(100%, 200px)',
        }}
      >
        {rendered.flatMap((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              className={`aspect-square rounded-sm ${
                cell ? CELL_COLORS[cell] ?? 'bg-white' : 'bg-[#12001f]'
              }`}
            />
          )),
        )}
      </div>
      <span className="font-terminal text-[10px] text-purple-300/70">
        {COLS}×{ROWS}
      </span>
    </div>
  );
}
