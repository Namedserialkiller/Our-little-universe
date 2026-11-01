import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Calendar, Sparkles, Star } from 'lucide-react';
import { universeData } from '../data/universeData';
import CosmicImage from './CosmicImage';

export default function MemoriesModal({ isOpen, onClose, selectedMemoryId = null }) {
  if (!isOpen) return null;
  const { memories } = universeData;
  const [activeMemory, setActiveMemory] = useState(
    memories.find((m) => m.id === selectedMemoryId) || null
  );

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
              <span className="modal-subtitle">Constellation II • Starlit Moments</span>
              <h2 className="modal-title">Little Memories</h2>
            </div>
            <button className="modal-close-btn" onClick={onClose} aria-label="Close">
              <X size={20} />
            </button>
          </div>

          {/* Body */}
          <div className="modal-body">
            {activeMemory ? (
              // Detailed Single Memory View
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <button
                  className="btn-subtle"
                  style={{ alignSelf: 'flex-start' }}
                  onClick={() => setActiveMemory(null)}
                >
                  ← Back to all memories
                </button>

                {activeMemory.image ? (
                  <div className="beginning-polaroid">
                    <div className="beginning-polaroid-frame" style={{ height: '260px' }}>
                      <CosmicImage
                        src={activeMemory.image}
                        alt={activeMemory.title}
                        type="call"
                      />
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                      <span className="memory-tag">{activeMemory.tag}</span>
                      <span className="memory-date">{activeMemory.date}</span>
                    </div>
                  </div>
                ) : (
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(169, 155, 255, 0.15)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Sparkles size={16} color="var(--color-gold)" />
                      <span className="memory-tag">{activeMemory.tag}</span>
                    </div>
                    <span className="memory-date">{activeMemory.date}</span>
                  </div>
                )}

                <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.6rem', color: 'var(--color-gold)' }}>
                  {activeMemory.title}
                </h3>
                <p style={{ fontSize: '1rem', lineHeight: '1.7', color: 'var(--color-white-muted)' }}>
                  {activeMemory.description}
                </p>
              </div>
            ) : (
              // List of Memories
              <div className="memories-container">
                <p style={{ fontSize: '0.9rem', color: 'var(--color-white-muted)', fontStyle: 'italic', marginBottom: '4px' }}>
                  A constellation of tiny moments that make up the biggest parts of my heart:
                </p>
                {memories.map((mem) => (
                  <motion.div
                    key={mem.id}
                    className="memory-card"
                    onClick={() => setActiveMemory(mem)}
                    whileHover={{ scale: 1.01 }}
                    whileTap={{ scale: 0.99 }}
                    style={{
                      cursor: 'pointer',
                      gridTemplateColumns: mem.image ? '120px 1fr' : '1fr',
                    }}
                  >
                    {mem.image && (
                      <div className="memory-thumb-wrapper">
                        <CosmicImage
                          src={mem.image}
                          alt={mem.title}
                          type="call"
                        />
                      </div>
                    )}
                    <div className="memory-info">
                      <div className="memory-top-meta">
                        <span className="memory-tag">{mem.tag}</span>
                        <span className="memory-date">{mem.date}</span>
                      </div>
                      <h4 className="memory-title">{mem.title}</h4>
                      <p className="memory-desc">{mem.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
