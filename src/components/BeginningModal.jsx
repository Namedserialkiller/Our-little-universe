import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Sparkles, Heart } from 'lucide-react';
import { universeData } from '../data/universeData';
import CosmicImage from './CosmicImage';

export default function BeginningModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  const { beginning } = universeData;

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
        >
          {/* Header */}
          <div className="modal-header">
            <div className="modal-header-info">
              <span className="modal-subtitle">Constellation I • The Beginning</span>
              <h2 className="modal-title">{beginning.constellationTitle}</h2>
            </div>
            <button className="modal-close-btn" onClick={onClose} aria-label="Close">
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="modal-body">
            <div className="beginning-layout">
              {/* Polaroid Image */}
              <div className="beginning-polaroid">
                <div className="beginning-polaroid-frame">
                  <CosmicImage
                    src={beginning.image}
                    alt="Our Beginning"
                    type="beginning"
                  />
                </div>
                <p className="beginning-caption">{beginning.imageCaption}</p>
              </div>

              {/* Meta Date */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-gold)', fontSize: '0.9rem' }}>
                <Calendar size={16} />
                <span>{beginning.date} • {beginning.subtitle}</span>
              </div>

              {/* Story Paragraphs */}
              <div className="beginning-text-block">
                {beginning.storyParagraphs.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>

              {/* Highlight Quote */}
              <div className="beginning-quote-box">
                <p>"{beginning.highlightQuote}"</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
