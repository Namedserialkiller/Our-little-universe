import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, MessageCircle, Camera, UtensilsCrossed, Music2, Sun, Flame, Heart, Smile } from 'lucide-react';
import { universeData } from '../data/universeData';

const iconMap = {
  message: MessageCircle,
  photo: Camera,
  food: UtensilsCrossed,
  music: Music2,
  sun: Sun,
  sparkles: Sparkles,
  camera: Camera,
  flame: Flame,
  heart: Heart,
  smile: Smile,
};

export default function ThingsINeverTireModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  const { thingsINeverTireOf } = universeData;

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
              <span className="modal-subtitle">Constellation III • Endlessly Adored</span>
              <h2 className="modal-title">Things I Never Get Tired Of</h2>
            </div>
            <button className="modal-close-btn" onClick={onClose} aria-label="Close">
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="modal-body">
            <p style={{ fontSize: '0.92rem', color: 'var(--color-white-muted)', fontStyle: 'italic', marginBottom: '8px' }}>
              Even if I had a thousand lifetimes, these are the little things that would still take my breath away every single day:
            </p>

            <div className="tire-grid">
              {thingsINeverTireOf.map((item, idx) => {
                const IconComponent = iconMap[item.icon] || Sparkles;
                return (
                  <motion.div
                    key={item.id}
                    className="tire-card"
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.08 }}
                  >
                    <div className="tire-icon-bubble">
                      <IconComponent size={20} />
                    </div>
                    <h4 className="tire-title">{item.title}</h4>
                    <p className="tire-body">{item.body}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
