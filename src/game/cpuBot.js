export function scheduleNextAttempt(minMs, maxMs) {
  return minMs + Math.floor(Math.random() * (maxMs - minMs + 1));
}

export function rollSuccess(accuracy) {
  return Math.random() < accuracy;
}
