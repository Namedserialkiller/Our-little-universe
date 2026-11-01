import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Sparkles, Home, Compass, Coffee, HeartHandshake, Bike, Dog, MapPin } from 'lucide-react';
import { universeData } from '../data/universeData';

const futureIconMap = {
  home: Home,
  bike: Bike,
  compass: Compass,
  coffee: Coffee,
  paw: Dog,
  'heart-handshake': HeartHandshake,
};

export default function FutureModal({ isOpen, onClose }) {
  if (!isOpen) return null;
  const { futureDreams } = universeData;

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
              <span className="modal-subtitle">Constellation VI • Tomorrow & Beyond</span>
              <h2 className="modal-title">Our Future</h2>
            </div>
            <button className="modal-close-btn" onClick={onClose} aria-label="Close">
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="modal-body">
            <p style={{ fontSize: '0.92rem', color: 'var(--color-white-muted)', fontStyle: 'italic', marginBottom: '8px' }}>
              The chapters waiting for us to write them together:
            </p>

            <div className="future-timeline">
              {futureDreams.map((item, idx) => {
                const IconComponent = futureIconMap[item.icon] || Sparkles;
                return (
                  <motion.div
                    key={item.id}
                    className="future-item"
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.09 }}
                  >
                    <div className="future-dot" />
                    <div className="future-meta">
                      <span className="future-status">{item.status}</span>
                      <span className="future-date">{item.estimatedDate}</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div
                        style={{
                          width: '28px',
                          height: '28px',
                          borderRadius: '50%',
                          background: 'rgba(245, 223, 165, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          color: 'var(--color-gold)',
                          flexShrink: 0,
                        }}
                      >
                        <IconComponent size={15} />
                      </div>
                      <h4 className="future-title">{item.title}</h4>
                    </div>

                    <p className="future-desc">{item.description}</p>
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
