import { COLS, ROWS, GARBAGE_COLOR, PLAYER_COLOR, CPU_COLOR } from './constants';

const SHAPES = [
  { cells: [[0, 0]] },
  { cells: [[0, 0], [1, 0]] },
  { cells: [[0, 0], [1, 0], [2, 0]] },
  { cells: [[0, 0], [1, 0], [0, 1], [1, 1]] },
];

export function createEmptyGrid(cols = COLS, rows = ROWS) {
  return Array.from({ length: rows }, () => Array(cols).fill(null));
}

export function cloneGrid(grid) {
  return grid.map((row) => [...row]);
}

export function getShapeWidth(cells) {
  return Math.max(...cells.map(([x]) => x)) + 1;
}

export function canPlace(grid, piece) {
  for (const [cx, cy] of piece.cells) {
    const x = piece.x + cx;
    const y = piece.y + cy;
    if (x < 0 || x >= COLS || y < 0 || y >= ROWS) return false;
    if (grid[y][x] !== null) return false;
  }
  return true;
}

export function simulateDropY(grid, piece) {
  let y = piece.y;
  while (canPlace(grid, { ...piece, y: y + 1 })) {
    y += 1;
  }
  return y;
}

export function findBestLandingX(grid, piece) {
  const width = getShapeWidth(piece.cells);
  let bestX = piece.x;
  let bestY = -1;

  for (let x = 0; x <= COLS - width; x += 1) {
    const landY = simulateDropY(grid, { ...piece, x });
    if (landY > bestY || (landY === bestY && x < bestX)) {
      bestY = landY;
      bestX = x;
    }
  }

  return bestX;
}

export function spawnPiece(grid, color = PLAYER_COLOR) {
  const shape = SHAPES[Math.floor(Math.random() * SHAPES.length)];
  const width = getShapeWidth(shape.cells);
  const validXs = [];

  for (let x = 0; x <= COLS - width; x += 1) {
    const candidate = {
      cells: shape.cells.map(([cx, cy]) => [cx, cy]),
      x,
      y: 0,
      color,
    };
    if (canPlace(grid, candidate)) {
      validXs.push(x);
    }
  }

  if (validXs.length === 0) return null;

  const x = validXs[Math.floor(Math.random() * validXs.length)];
  return {
    cells: shape.cells.map(([cx, cy]) => [cx, cy]),
    x,
    y: 0,
    color,
  };
}

export function autoTickPiece(grid, piece) {
  const targetX = findBestLandingX(grid, piece);
  let current = { ...piece };

  if (current.x < targetX && canPlace(grid, { ...current, x: current.x + 1 })) {
    return { piece: { ...current, x: current.x + 1 }, locked: false };
  }

  if (current.x > targetX && canPlace(grid, { ...current, x: current.x - 1 })) {
    return { piece: { ...current, x: current.x - 1 }, locked: false };
  }

  const moved = { ...current, y: current.y + 1 };
  if (canPlace(grid, moved)) {
    return { piece: moved, locked: false };
  }

  return { piece: current, locked: true };
}

export function movePieceDown(grid, piece) {
  const moved = { ...piece, y: piece.y + 1 };
  if (canPlace(grid, moved)) {
    return { piece: moved, locked: false };
  }
  return { piece, locked: true };
}

export function lockPiece(grid, piece) {
  const next = cloneGrid(grid);
  for (const [cx, cy] of piece.cells) {
    const x = piece.x + cx;
    const y = piece.y + cy;
    if (y >= 0 && y < ROWS && x >= 0 && x < COLS) {
      next[y][x] = piece.color;
    }
  }
  return next;
}

export function clearFullRows(grid) {
  const remaining = grid.filter((row) => row.some((cell) => cell === null));
  const clearedCount = ROWS - remaining.length;
  while (remaining.length < ROWS) {
    remaining.unshift(Array(COLS).fill(null));
  }
  return { grid: remaining, clearedCount };
}

export function isGridOverflow(grid) {
  return grid[0].some((cell) => cell !== null);
}

function createGarbageRow() {
  return Array(COLS).fill(GARBAGE_COLOR);
}

export function clearBottomGarbageRow(grid) {
  let targetRow = -1;

  for (let y = ROWS - 1; y >= 0; y -= 1) {
    if (grid[y].some((cell) => cell === GARBAGE_COLOR)) {
      targetRow = y;
      break;
    }
  }

  if (targetRow === -1) {
    return { grid, cleared: false };
  }

  const next = createEmptyGrid();
  let writeY = ROWS - 1;

  for (let y = ROWS - 1; y >= 0; y -= 1) {
    if (y === targetRow) continue;
    next[writeY] = [...grid[y]];
    writeY -= 1;
  }

  return { grid: next, cleared: true };
}

export function launchAttack(targetGrid) {
  const next = cloneGrid(targetGrid);
  for (let y = 0; y < ROWS - 1; y++) {
    next[y] = [...targetGrid[y + 1]];
  }
  next[ROWS - 1] = createGarbageRow();
  return next;
}

export function sendGarbageBonus(targetGrid, lineCount) {
  const rowsToAdd = Math.min(lineCount, 3);
  let next = cloneGrid(targetGrid);
  for (let i = 0; i < rowsToAdd; i++) {
    next = launchAttack(next);
  }
  return next;
}

export function forcePieceToBottom(grid, piece) {
  const steeredX = findBestLandingX(grid, piece);
  let current = { ...piece, x: steeredX };
  while (canPlace(grid, { ...current, y: current.y + 1 })) {
    current = { ...current, y: current.y + 1 };
  }
  return lockPiece(grid, current);
}

export function getRenderedGrid(grid, activePiece) {
  const rendered = cloneGrid(grid);
  if (!activePiece) return rendered;

  for (const [cx, cy] of activePiece.cells) {
    const x = activePiece.x + cx;
    const y = activePiece.y + cy;
    if (y >= 0 && y < ROWS && x >= 0 && x < COLS) {
      rendered[y][x] = activePiece.color;
    }
  }
  return rendered;
}

export function getDefaultPieceColor(isPlayer) {
  return isPlayer ? PLAYER_COLOR : CPU_COLOR;
}
