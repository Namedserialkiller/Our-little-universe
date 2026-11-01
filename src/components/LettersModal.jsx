import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Mail, Heart, Sparkles, ArrowLeft } from 'lucide-react';
import { universeData } from '../data/universeData';
import { playCelestialChime } from '../utils/audioSynth';

export default function LettersModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  const { letters, senderName } = universeData;
  const [activeLetter, setActiveLetter] = useState(null);

  const handleOpenLetter = (letter) => {
    setActiveLetter(letter);
    playCelestialChime(660);
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
          style={{ maxWidth: '680px' }}
        >
          {/* Header */}
          <div className="modal-header">
            <div className="modal-header-info">
              <span className="modal-subtitle">Constellation V • Written in the Stars</span>
              <h2 className="modal-title">Letters From Me</h2>
            </div>
            <button className="modal-close-btn" onClick={onClose} aria-label="Close">
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="modal-body">
            {activeLetter ? (
              // Unfolded Letter View
              <motion.div
                initial={{ opacity: 0, y: 30, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}
              >
                <button
                  className="btn-subtle"
                  style={{ alignSelf: 'flex-start' }}
                  onClick={() => setActiveLetter(null)}
                >
                  <ArrowLeft size={14} /> Back to all letters
                </button>

                <div className="letter-parchment">
                  <div className="letter-parchment-stamp">
                    {activeLetter.dateMark || 'FOR YOUR EYES ONLY'}
                  </div>

                  <h3
                    style={{
                      fontFamily: 'var(--font-serif)',
                      fontSize: '1.6rem',
                      color: '#4A3B32',
                      marginBottom: '20px',
                      borderBottom: '1px solid #E4DFD5',
                      paddingBottom: '8px',
                    }}
                  >
                    {activeLetter.sealTitle}
                  </h3>

                  {activeLetter.content.map((paragraph, idx) => (
                    <p key={idx}>{paragraph}</p>
                  ))}

                  <div className="letter-parchment-signoff">
                    <p>{senderName || 'Yours Always'},</p>
                    <Heart size={16} color="#8C3B5E" fill="#8C3B5E" style={{ display: 'inline', marginLeft: '6px' }} />
                  </div>
                </div>
              </motion.div>
            ) : (
              // Envelopes Collection Grid
              <div>
                <p style={{ fontSize: '0.92rem', color: 'var(--color-white-muted)', fontStyle: 'italic', marginBottom: '18px' }}>
                  Tap any envelope when you need its words. They will never expire:
                </p>

                <div className="letters-grid">
                  {letters.map((letter, idx) => (
                    <motion.div
                      key={letter.id}
                      className="envelope-card"
                      onClick={() => handleOpenLetter(letter)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.08 }}
                      whileHover={{ scale: 1.03 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <div className="wax-seal">
                        <Heart size={20} fill="#FFF" />
                      </div>
                      <h4 className="envelope-seal-title">{letter.sealTitle}</h4>
                      <p style={{ fontSize: '0.8rem', color: 'var(--color-white-muted)', lineHeight: '1.4' }}>
                        {letter.previewText}
                      </p>
                      <span className="envelope-hint">✦ Tap to break seal & open ✦</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
