'use client';

import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';

interface AudioPlayerProps {
  src: string;
  className?: string;
}

function getProxyUrl(url: string): string {
  if (typeof window === 'undefined') return url;
  try {
    const parsed = new URL(url, 'https://example.com');
    const origin = window?.location?.origin;
    if (!origin || parsed.origin === origin) return url;
    return `/api/audio?url=${encodeURIComponent(url)}`;
  } catch {
    return url;
  }
}

function formatTime(seconds: number): string {
  if (!isFinite(seconds) || isNaN(seconds) || seconds < 0) return '0:00';
  const m = Math.floor(seconds / 60);
  const s = Math.floor(seconds % 60);
  return `${m}:${s.toString().padStart(2, '0')}`;
}

export default function AudioPlayer({ src, className = '' }: AudioPlayerProps) {
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(1);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [ready, setReady] = useState(false);
  const [useDirectUrl, setUseDirectUrl] = useState(false);
  const proxySrc = src
    ? useDirectUrl
      ? src
      : getProxyUrl(src)
    : '';

  useEffect(() => {
    setError(null);
    setReady(false);
    setUseDirectUrl(false);
    setCurrentTime(0);
    setDuration(0);
  }, [src]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => {
      if (!isNaN(audio.duration) && isFinite(audio.duration) && audio.duration > 0) {
        setDuration(audio.duration);
      }
    };
    const handleEndedEvt = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('durationchange', updateDuration);
    audio.addEventListener('ended', handleEndedEvt);
    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('durationchange', updateDuration);
      audio.removeEventListener('ended', handleEndedEvt);
    };
  }, [proxySrc]);

  useEffect(() => {
    const audio = audioRef.current;
    if (audio) audio.volume = volume;
  }, [volume]);

  const handleError = () => {
    if (!useDirectUrl && src && src.startsWith('http')) {
      setUseDirectUrl(true);
      setError(null);
    } else {
      setError('Failed to load audio');
      setReady(false);
      setIsPlaying(false);
    }
  };

  const handleCanPlay = () => {
    setError(null);
    setReady(true);
    const audio = audioRef.current;
    if (audio && !isNaN(audio.duration) && audio.duration > 0) setDuration(audio.duration);
  };

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio || !proxySrc) return;

    try {
      if (isPlaying) {
        audio.pause();
        setIsPlaying(false);
      } else {
        await audio.play();
        setIsPlaying(true);
      }
    } catch {
      setError('Playback failed');
    }
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const audio = audioRef.current;
    const bar = progressRef.current;
    if (!audio || !bar || !ready || duration <= 0) return;

    const rect = bar.getBoundingClientRect();
    const percent = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const newTime = percent * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  if (!src || !src.trim()) return null;

  const progressPercent = duration > 0 ? Math.min(100, (currentTime / duration) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      className={`overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-lg dark:border-gray-700/80 dark:bg-gray-800/80 ${className}`}
    >
      <div className="p-5">
        <audio
          key={proxySrc}
          ref={audioRef}
          src={proxySrc}
          onEnded={() => { setIsPlaying(false); setCurrentTime(0); }}
          onError={handleError}
          onCanPlay={handleCanPlay}
          preload="auto"
          className="hidden"
        />

        <div className="flex items-center gap-4">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={togglePlay}
            disabled={!!error}
            className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-saffron to-amber-500 text-white shadow-md hover:shadow-lg disabled:opacity-50 transition-shadow"
          >
            {isPlaying ? (
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            ) : (
              <svg className="ml-1 h-6 w-6" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clipRule="evenodd" />
              </svg>
            )}
          </motion.button>

          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-saffron mb-2">Audio Narration</p>
            <div
              ref={progressRef}
              onClick={handleProgressClick}
              className="relative h-3 w-full cursor-pointer rounded-full bg-gray-200 dark:bg-gray-600 touch-none"
            >
              <div
                className="absolute inset-0 rounded-full overflow-hidden"
              >
                <div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-saffron to-amber-500 transition-[width] duration-150 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <div
                className="absolute top-1/2 w-3.5 h-3.5 -translate-y-1/2 -translate-x-1/2 rounded-full bg-white shadow-md border-2 border-saffron pointer-events-none z-10"
                style={{ left: `${progressPercent}%` }}
              />
            </div>
            <div className="mt-1.5 flex justify-between text-xs font-medium tabular-nums text-gray-600 dark:text-gray-400">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 w-28 shrink-0">
            <svg className="h-5 w-5 text-gray-500 dark:text-gray-400 shrink-0" fill="currentColor" viewBox="0 0 24 24">
              <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02z" />
            </svg>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="audio-range h-1.5 w-full max-w-20 cursor-pointer"
            />
          </div>
        </div>

        <div className="sm:hidden mt-3 pt-3 border-t border-gray-100 dark:border-gray-700 flex items-center gap-2">
          <svg className="h-4 w-4 text-gray-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
            <path d="M3 9v6h4l5 5V4L7 9H3z" />
          </svg>
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="audio-range h-1.5 flex-1 cursor-pointer"
          />
        </div>

        {error && (
          <p className="mt-3 text-xs text-red-500 font-medium">{error}</p>
        )}
      </div>
    </motion.div>
  );
}
