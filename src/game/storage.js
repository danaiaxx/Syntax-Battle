const KEYS = {
  highScore: 'syntax-battle-high-score',
  wins: 'syntax-battle-wins',
  losses: 'syntax-battle-losses',
};

function readNumber(key, fallback = 0) {
  const raw = localStorage.getItem(key);
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function getStats() {
  return {
    highScore: readNumber(KEYS.highScore),
    wins: readNumber(KEYS.wins),
    losses: readNumber(KEYS.losses),
  };
}

export function updateHighScore(score) {
  const current = readNumber(KEYS.highScore);
  if (score > current) {
    localStorage.setItem(KEYS.highScore, String(score));
    return score;
  }
  return current;
}

export function recordWin(score) {
  localStorage.setItem(KEYS.wins, String(readNumber(KEYS.wins) + 1));
  return updateHighScore(score);
}

export function recordLoss() {
  localStorage.setItem(KEYS.losses, String(readNumber(KEYS.losses) + 1));
}
