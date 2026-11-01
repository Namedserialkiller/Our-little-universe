import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Heart, Sparkles, X, Star } from 'lucide-react';
import { universeData } from '../data/universeData';

export default function HiddenConstellationModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  const { hiddenConstellation, recipientName } = universeData;

  return (
    <AnimatePresence>
      <div className="modal-backdrop" onClick={onClose} style={{ zIndex: 250 }}>
        <motion.div
          className="secret-celebration-card"
          onClick={(e) => e.stopPropagation()}
          initial={{ opacity: 0, scale: 0.82, rotate: -2 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.82 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Animated Glowing Heart Orbit */}
          <div className="secret-heart-orbit">
            <Heart size={36} fill="#E6A9D1" />
          </div>

          <div>
            <span
              style={{
                fontSize: '0.8rem',
                textTransform: 'uppercase',
                letterSpacing: '0.14em',
                color: 'var(--color-gold)',
                display: 'block',
                marginBottom: '6px',
              }}
            >
              ✦ Secret Constellation Aligned ✦
            </span>
            <span className="secret-recipient-name">
              For {hiddenConstellation.recipientPlaceholder || recipientName || 'You'}
            </span>
          </div>

          {/* The mandatory revelation message */}
          <div className="secret-revelation-text">
            "{hiddenConstellation.specialMessage}"
          </div>

          <p style={{ fontSize: '0.92rem', color: 'var(--color-white-muted)', lineHeight: '1.6', maxWidth: '420px' }}>
            You found all hidden coordinates scattered across our sky. No matter where we are in this vast world, my heart will always navigate directly back to you.
          </p>

          <button
            className="btn-celestial"
            onClick={onClose}
            style={{ marginTop: '8px' }}
          >
            <span>Treasured Forever</span>
            <Sparkles size={16} />
          </button>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
