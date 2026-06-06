import { createContext, useContext, useState, useRef, useEffect, useCallback } from 'react';

const AudioContext = createContext(null);

const VOLUME_KEY = 'syntax-battle-volume';

function readStoredVolume() {
  const raw = localStorage.getItem(VOLUME_KEY);
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? Math.min(1, Math.max(0, parsed)) : 0.5;
}

export function AudioProvider({ children }) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolumeState] = useState(readStoredVolume);
  const [audioReady, setAudioReady] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = volume;
    localStorage.setItem(VOLUME_KEY, String(volume));
  }, [volume]);

  const setVolume = useCallback((value) => {
    setVolumeState(Math.min(1, Math.max(0, value)));
  }, []);

  const togglePlay = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch {
      setAudioReady(false);
      setIsPlaying(false);
    }
  }, [isPlaying]);

  const value = {
    isPlaying,
    volume,
    audioReady,
    togglePlay,
    setVolume,
  };

  return (
    <AudioContext.Provider value={value}>
      <audio
        ref={audioRef}
        src="/audio/synthwave.mp3"
        loop
        onError={() => setAudioReady(false)}
        onEnded={() => setIsPlaying(false)}
      />
      {children}
    </AudioContext.Provider>
  );
}

export function useAudio() {
  const ctx = useContext(AudioContext);
  if (!ctx) {
    throw new Error('useAudio must be used within AudioProvider');
  }
  return ctx;
}
