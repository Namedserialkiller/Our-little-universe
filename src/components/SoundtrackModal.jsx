import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Disc3, ExternalLink, Music2, Heart, Play, Pause } from 'lucide-react';
import { universeData } from '../data/universeData';
import { playCelestialChime } from '../utils/audioSynth';

export default function SoundtrackModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  const { soundtrack } = universeData;
  const [selectedSong, setSelectedSong] = useState(soundtrack[0]);
  const [isPlayingPreview, setIsPlayingPreview] = useState(false);

  const handleSelectSong = (song) => {
    setSelectedSong(song);
    playCelestialChime(440);
  };

  return (
    <AnimatePresence>
      <div className="modal-backdrop" onClick={onClose}>
        <motion.div
          className="modal-card"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.92, y: 20 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
          style={{ maxWidth: '640px' }}
        >
          {/* Header */}
          <div className="modal-header">
            <div className="modal-header-info">
              <span className="modal-subtitle">Constellation IV • Melodies of Us</span>
              <h2 className="modal-title">Our Soundtrack</h2>
            </div>
            <button className="modal-close-btn" onClick={onClose} aria-label="Close">
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="modal-body">
            {/* Featured Active Player Banner */}
            {selectedSong && (
              <div
                style={{
                  padding: '20px',
                  borderRadius: 'var(--radius-md)',
                  background: 'linear-gradient(135deg, rgba(24, 38, 77, 0.8) 0%, rgba(13, 20, 42, 0.9) 100%)',
                  border: '1px solid rgba(169, 155, 255, 0.25)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '20px',
                }}
              >
                <div className="vinyl-wrapper">
                  <motion.div
                    className="vinyl-disc"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
                  >
                    <div className="vinyl-center-art">
                      <Music2 size={16} />
                    </div>
                  </motion.div>
                </div>

                <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <span style={{ fontSize: '0.72rem', color: 'var(--color-gold)', textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                    Currently Selected
                  </span>
                  <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.4rem', color: '#FFF' }}>
                    {selectedSong.title}
                  </h3>
                  <p style={{ fontSize: '0.85rem', color: 'var(--color-lavender-light)' }}>
                    by {selectedSong.artist}
                  </p>
                  {selectedSong.externalLink && (
                    <a
                      href={selectedSong.externalLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-subtle"
                      style={{ alignSelf: 'flex-start', marginTop: '6px', fontSize: '0.75rem', padding: '4px 12px' }}
                    >
                      <ExternalLink size={12} />
                      Listen on Spotify
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Song List */}
            <div className="soundtrack-list">
              {soundtrack.map((song) => {
                const isSelected = selectedSong?.id === song.id;
                return (
                  <div
                    key={song.id}
                    className="song-card"
                    onClick={() => handleSelectSong(song)}
                    style={{
                      cursor: 'pointer',
                      borderColor: isSelected ? 'var(--color-gold)' : undefined,
                      background: isSelected ? 'rgba(24, 38, 77, 0.65)' : undefined,
                    }}
                  >
                    <div
                      style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: isSelected ? 'var(--color-gold)' : 'rgba(244, 241, 255, 0.08)',
                        color: isSelected ? 'var(--color-bg)' : 'var(--color-lavender)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <Disc3 size={18} />
                    </div>

                    <div className="song-info">
                      <div className="song-title-row">
                        <span className="song-name">{song.title}</span>
                        <span className="song-artist">— {song.artist}</span>
                      </div>
                      <p className="song-why">"{song.whyItMatters}"</p>
                      <span className="song-vibe-tag">{song.vibe}</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
