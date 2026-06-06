import { useState, useRef, useCallback, useEffect } from 'react';
import {
  DROP_MS_PLAYER,
  DROP_MS_CPU,
  CPU_ANSWER_MIN_MS,
  CPU_ANSWER_MAX_MS,
  CPU_ACCURACY,
  CPU_COLOR,
  PLAYER_COLOR,
} from '../game/constants';
import {
  createEmptyGrid,
  spawnPiece,
  autoTickPiece,
  lockPiece,
  clearFullRows,
  isGridOverflow,
  launchAttack,
  sendGarbageBonus,
  forcePieceToBottom,
  clearBottomGarbageRow,
} from '../game/tetrisEngine';
import { getRandomQuestion } from '../game/questions';
import { scheduleNextAttempt, rollSuccess } from '../game/cpuBot';
import { recordWin, recordLoss } from '../game/storage';

const INITIAL_GAME_OVER = { active: false, winner: null };

function createInitialState() {
  const playerGrid = createEmptyGrid();
  const cpuGrid = createEmptyGrid();
  return {
    playerGrid,
    cpuGrid,
    playerPiece: spawnPiece(playerGrid, PLAYER_COLOR),
    cpuPiece: spawnPiece(cpuGrid, CPU_COLOR),
    playerQuestion: getRandomQuestion(),
    cpuQuestion: getRandomQuestion(),
    playerScore: 0,
    cpuScore: 0,
    isPaused: false,
    gameOver: INITIAL_GAME_OVER,
    cpuThinking: false,
    cpuInput: '',
    cpuError: '',
    flashRed: false,
    playerError: '',
  };
}

export function useGameEngine() {
  const [state, setState] = useState(createInitialState);
  const stateRef = useRef(state);
  const dropIntervalPlayerRef = useRef(null);
  const dropIntervalCpuRef = useRef(null);
  const cpuAnswerTimeoutRef = useRef(null);
  const cpuTypingIntervalRef = useRef(null);
  const flashTimeoutRef = useRef(null);
  const cpuErrorTimeoutRef = useRef(null);
  const playerErrorTimeoutRef = useRef(null);
  const scheduleCpuAnswerRef = useRef(() => {});

  const syncState = useCallback((updater) => {
    setState((prev) => {
      const next = typeof updater === 'function' ? updater(prev) : { ...prev, ...updater };
      stateRef.current = next;
      return next;
    });
  }, []);

  const clearAllTimers = useCallback(() => {
    if (dropIntervalPlayerRef.current) clearInterval(dropIntervalPlayerRef.current);
    if (dropIntervalCpuRef.current) clearInterval(dropIntervalCpuRef.current);
    if (cpuAnswerTimeoutRef.current) clearTimeout(cpuAnswerTimeoutRef.current);
    if (cpuTypingIntervalRef.current) clearInterval(cpuTypingIntervalRef.current);
    dropIntervalPlayerRef.current = null;
    dropIntervalCpuRef.current = null;
    cpuAnswerTimeoutRef.current = null;
    cpuTypingIntervalRef.current = null;
  }, []);

  const endGame = useCallback((winner) => {
    clearAllTimers();
    const current = stateRef.current;
    if (winner === 'player') {
      recordWin(current.playerScore);
    } else {
      recordLoss();
    }
    syncState({
      gameOver: { active: true, winner },
      isPaused: false,
      cpuThinking: false,
    });
  }, [clearAllTimers, syncState]);

  const checkGameOver = useCallback((playerGrid, cpuGrid) => {
    if (isGridOverflow(playerGrid)) {
      endGame('cpu');
      return true;
    }
    if (isGridOverflow(cpuGrid)) {
      endGame('player');
      return true;
    }
    return false;
  }, [endGame]);

  const tickBoard = useCallback((isPlayer) => {
    const current = stateRef.current;
    if (current.isPaused || current.gameOver.active) return;

    const gridKey = isPlayer ? 'playerGrid' : 'cpuGrid';
    const pieceKey = isPlayer ? 'playerPiece' : 'cpuPiece';
    const color = isPlayer ? PLAYER_COLOR : CPU_COLOR;
    const grid = current[gridKey];
    let piece = current[pieceKey];

    if (!piece) {
      piece = spawnPiece(grid, color);
      if (!piece) {
        endGame(isPlayer ? 'cpu' : 'player');
        return;
      }
      syncState({ [pieceKey]: piece });
      return;
    }

    const result = autoTickPiece(grid, piece);
    if (!result.locked) {
      syncState({ [pieceKey]: result.piece });
      return;
    }

    const nextGrid = lockPiece(grid, piece);
    const { grid: clearedGrid, clearedCount } = clearFullRows(nextGrid);

    const updates = {
      [gridKey]: clearedGrid,
      [pieceKey]: spawnPiece(clearedGrid, color),
    };

    if (isPlayer && clearedCount > 0) {
      updates.cpuGrid = sendGarbageBonus(current.cpuGrid, clearedCount);
      updates.playerScore = current.playerScore + clearedCount * 100;
    }

    if (!isPlayer && clearedCount > 0) {
      updates.cpuScore = current.cpuScore + clearedCount * 50;
    }

    syncState(updates);

    const merged = { ...current, ...updates };
    checkGameOver(merged.playerGrid, merged.cpuGrid);
  }, [checkGameOver, endGame, syncState]);

  const triggerFlash = useCallback(() => {
    syncState({ flashRed: true });
    if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
    flashTimeoutRef.current = setTimeout(() => {
      syncState({ flashRed: false });
    }, 350);
  }, [syncState]);

  const animateCpuAnswer = useCallback((answer, onComplete) => {
    let index = 0;
    syncState({ cpuInput: '', cpuThinking: true });

    if (cpuTypingIntervalRef.current) clearInterval(cpuTypingIntervalRef.current);
    cpuTypingIntervalRef.current = setInterval(() => {
      index += 1;
      syncState({ cpuInput: answer.slice(0, index) });

      if (index >= answer.length) {
        clearInterval(cpuTypingIntervalRef.current);
        cpuTypingIntervalRef.current = null;
        onComplete();
      }
    }, 50);
  }, [syncState]);

  const handleCpuAttempt = useCallback(() => {
    const current = stateRef.current;
    if (current.isPaused || current.gameOver.active) return;

    const question = current.cpuQuestion;

    if (rollSuccess(CPU_ACCURACY)) {
      animateCpuAnswer(question.correctAnswer, () => {
        const latest = stateRef.current;
        if (latest.isPaused || latest.gameOver.active) return;

        triggerFlash();
        const attackedGrid = launchAttack(latest.playerGrid);

        syncState({
          playerGrid: attackedGrid,
          cpuInput: '',
          cpuThinking: false,
          cpuQuestion: getRandomQuestion(question.id),
          cpuScore: latest.cpuScore + 150,
        });

        checkGameOver(attackedGrid, latest.cpuGrid);
        scheduleCpuAnswerRef.current();
      });
    } else {
      const updates = {
        cpuError: 'CPU Syntax Error!',
        cpuThinking: false,
        cpuInput: '',
      };

      if (current.cpuPiece) {
        updates.cpuGrid = forcePieceToBottom(current.cpuGrid, current.cpuPiece);
        updates.cpuPiece = spawnPiece(updates.cpuGrid, CPU_COLOR);
      }

      syncState(updates);

      const merged = { ...current, ...updates };
      checkGameOver(merged.playerGrid, merged.cpuGrid);

      if (cpuErrorTimeoutRef.current) clearTimeout(cpuErrorTimeoutRef.current);
      cpuErrorTimeoutRef.current = setTimeout(() => {
        syncState({
          cpuError: '',
          cpuQuestion: getRandomQuestion(stateRef.current.cpuQuestion.id),
        });
        scheduleCpuAnswerRef.current();
      }, 1500);
    }
  }, [animateCpuAnswer, checkGameOver, syncState, triggerFlash]);

  const scheduleCpuAnswer = useCallback(() => {
    if (cpuAnswerTimeoutRef.current) clearTimeout(cpuAnswerTimeoutRef.current);
    const delay = scheduleNextAttempt(CPU_ANSWER_MIN_MS, CPU_ANSWER_MAX_MS);
    cpuAnswerTimeoutRef.current = setTimeout(handleCpuAttempt, delay);
  }, [handleCpuAttempt]);

  scheduleCpuAnswerRef.current = scheduleCpuAnswer;

  const startLoops = useCallback(() => {
    clearAllTimers();

    dropIntervalPlayerRef.current = setInterval(() => tickBoard(true), DROP_MS_PLAYER);
    dropIntervalCpuRef.current = setInterval(() => tickBoard(false), DROP_MS_CPU);
    scheduleCpuAnswer();
  }, [clearAllTimers, scheduleCpuAnswer, tickBoard]);

  const pauseGame = useCallback(() => {
    clearAllTimers();
    syncState({ isPaused: true, cpuThinking: false });
  }, [clearAllTimers, syncState]);

  const resumeGame = useCallback(() => {
    syncState({ isPaused: false });
    startLoops();
  }, [startLoops, syncState]);

  const togglePause = useCallback(() => {
    if (stateRef.current.gameOver.active) return;
    if (stateRef.current.isPaused) {
      resumeGame();
    } else {
      pauseGame();
    }
  }, [pauseGame, resumeGame]);

  const retryGame = useCallback(() => {
    clearAllTimers();
    const fresh = createInitialState();
    stateRef.current = fresh;
    setState(fresh);
    startLoops();
  }, [clearAllTimers, startLoops]);

  const handlePlayerSubmit = useCallback((rawAnswer) => {
    const current = stateRef.current;
    if (current.isPaused || current.gameOver.active) return;

    const answer = rawAnswer.trim();

    if (answer === current.playerQuestion.correctAnswer) {
      const { grid: cleanedGrid } = clearBottomGarbageRow(current.playerGrid);
      const attackedGrid = launchAttack(current.cpuGrid);

      syncState({
        playerGrid: cleanedGrid,
        cpuGrid: attackedGrid,
        playerPiece: null,
        playerQuestion: getRandomQuestion(current.playerQuestion.id),
        playerScore: current.playerScore + 150,
        playerError: '',
      });

      checkGameOver(cleanedGrid, attackedGrid);
    } else {
      syncState({ playerError: 'Syntax Error! Try again.' });
      if (playerErrorTimeoutRef.current) clearTimeout(playerErrorTimeoutRef.current);
      playerErrorTimeoutRef.current = setTimeout(() => {
        syncState({ playerError: '' });
      }, 1500);
    }
  }, [checkGameOver, syncState]);

  useEffect(() => {
    stateRef.current = state;
  }, [state]);

  useEffect(() => {
    startLoops();
    return () => {
      clearAllTimers();
      if (flashTimeoutRef.current) clearTimeout(flashTimeoutRef.current);
      if (cpuErrorTimeoutRef.current) clearTimeout(cpuErrorTimeoutRef.current);
      if (playerErrorTimeoutRef.current) clearTimeout(playerErrorTimeoutRef.current);
    };
  }, [startLoops, clearAllTimers]);

  return {
    ...state,
    handlePlayerSubmit,
    togglePause,
    retryGame,
    pauseGame,
    resumeGame,
  };
}
