import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Play, Pause, Volume2, Moon, Heart, Sparkles } from 'lucide-react';
import { universeData } from '../data/universeData';

export default function FinalSurpriseModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  const { finalSurprise, senderName } = universeData;

  const getInitialDuration = () => {
    if (finalSurprise.audioDurationEstimate) {
      const parts = finalSurprise.audioDurationEstimate.split(':').map(Number);
      if (parts.length === 2 && !isNaN(parts[0]) && !isNaN(parts[1])) {
        return parts[0] * 60 + parts[1];
      }
    }
    return 21;
  };

  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0); // 0 to 100
  const [duration, setDuration] = useState(getInitialDuration);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);

  const handleTogglePlay = () => {
    if (isPlaying) {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause();
      }
      setIsPlaying(false);
    } else {
      setIsPlaying(true);
      if (audioRef.current) {
        audioRef.current.play().catch(() => {});
      }
    }
  };

  const formatTime = (secs) => {
    const s = Math.round(secs) || 0;
    const m = Math.floor(s / 60);
    const rem = s % 60;
    return `${m}:${rem < 10 ? '0' : ''}${rem}`;
  };

  const handleSeek = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newProgress = Math.max(0, Math.min(100, (clickX / rect.width) * 100));
    const newTime = (newProgress / 100) * duration;
    setProgress(newProgress);
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  const resolvedAudioSrc = finalSurprise.audioVoiceRecording?.startsWith('/')
    ? `${import.meta.env.BASE_URL}${finalSurprise.audioVoiceRecording.slice(1)}`
    : finalSurprise.audioVoiceRecording;

  return (
    <AnimatePresence>
      <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 250 }}>
        {/* Hidden HTML5 Audio Element for user-supplied recording */}
        {resolvedAudioSrc && (
          <audio
            ref={audioRef}
            src={resolvedAudioSrc}
            onEnded={() => {
              setIsPlaying(false);
              setProgress(0);
              setCurrentTime(0);
            }}
            onLoadedMetadata={() => {
              if (audioRef.current?.duration && !isNaN(audioRef.current.duration)) {
                setDuration(Math.round(audioRef.current.duration));
              }
            }}
            onTimeUpdate={() => {
              if (audioRef.current && audioRef.current.duration) {
                setCurrentTime(Math.round(audioRef.current.currentTime));
                setProgress((audioRef.current.currentTime / audioRef.current.duration) * 100);
              }
            }}
          />
        )}

        <motion.div
          className="final-quiet-container"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Close button */}
          <button
            className="modal-close-btn"
            style={{ position: 'absolute', top: 20, right: 20 }}
            onClick={onClose}
            aria-label="Close"
          >
            <X size={20} />
          </button>

          {/* Celestial Beacon Moon */}
          <div className="final-moon-beacon">
            <Moon size={40} color="#080D1C" />
          </div>

          <div>
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', letterSpacing: '0.12em', color: 'var(--color-gold)' }}>
              ✦ The Final Surprise ✦
            </span>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.9rem', color: '#FFF', marginTop: '4px' }}>
              {finalSurprise.screenTitle}
            </h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--color-white-muted)', marginTop: '4px' }}>
              {finalSurprise.introSubtitle}
            </p>
          </div>

          {/* Intimate Personal Message */}
          <div className="final-personal-message">
            "{finalSurprise.messageText}"
          </div>

          {/* Audio Player Interface */}
          <div className="audio-player-card">
            <div className="audio-player-header">
              <span className="audio-player-title">
                <Volume2 size={16} color="var(--color-gold)" />
                {finalSurprise.audioRecordingTitle}
              </span>
              {/* Visualizer bars */}
              <div className="audio-visualizer-bars">
                {[8, 16, 24, 12, 28, 18, 10, 22, 14, 20].map((h, i) => (
                  <div
                    key={i}
                    className={`audio-bar ${isPlaying ? 'playing' : ''}`}
                    style={{
                      animationDelay: `${i * 0.09}s`,
                      height: isPlaying ? undefined : `${h * 0.5}px`,
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="audio-controls-row">
              <button
                className="audio-play-btn"
                onClick={handleTogglePlay}
                aria-label={isPlaying ? 'Pause voice message' : 'Play voice message'}
              >
                {isPlaying ? <Pause size={20} /> : <Play size={20} style={{ marginLeft: '2px' }} />}
              </button>

              <div className="audio-progress-bar" onClick={handleSeek}>
                <div
                  className="audio-progress-fill"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <span className="audio-time-label">
                {formatTime(currentTime)} / {formatTime(duration)}
              </span>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-lavender-light)', fontSize: '0.95rem', fontStyle: 'italic' }}>
            <span>{finalSurprise.closingSignoff} {senderName || 'Me'}</span>
            <Heart size={15} fill="#E6A9D1" color="#E6A9D1" />
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
