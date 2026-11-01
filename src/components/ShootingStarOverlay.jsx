import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles, Heart, X, Star } from 'lucide-react';
import { universeData } from '../data/universeData';
import { playShootingStarSound, playCelestialChime } from '../utils/audioSynth';

export default function ShootingStarOverlay() {
  const [starState, setStarState] = useState(null); // { id, startX, startY, endX, endY, angle }
  const [activeWish, setActiveWish] = useState(null);
  const timerRef = useRef(null);

  // Spawn shooting star at random intervals
  const spawnStar = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    // Pick random start and end points
    const startX = Math.random() * (width * 0.7);
    const startY = Math.random() * (height * 0.4);
    const distance = Math.min(width, height) * (Math.random() * 0.4 + 0.4);
    const angle = Math.random() * 25 + 30; // 30-55 deg
    const rad = (angle * Math.PI) / 180;

    const endX = startX + Math.cos(rad) * distance;
    const endY = startY + Math.sin(rad) * distance;

    const star = {
      id: Date.now(),
      startX,
      startY,
      endX,
      endY,
      angle,
      duration: Math.random() * 1.2 + 1.8, // 1.8s - 3.0s
    };

    setStarState(star);
    playShootingStarSound();

    // Auto clear after animation completes
    setTimeout(() => {
      setStarState((current) => (current?.id === star.id ? null : current));
      scheduleNextStar();
    }, star.duration * 1000 + 400);
  };

  const scheduleNextStar = () => {
    // Next star in 14-25 seconds
    const delay = Math.random() * 11000 + 14000;
    timerRef.current = setTimeout(spawnStar, delay);
  };

  useEffect(() => {
    // Initial delay before first shooting star
    timerRef.current = setTimeout(spawnStar, 6000);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  const handleCatchStar = (e) => {
    e.stopPropagation();
    if (!starState) return;

    playCelestialChime(784);
    // Pick random message
    const wishes = universeData.shootingStarWishes;
    const randomWish = wishes[Math.floor(Math.random() * wishes.length)];
    setActiveWish(randomWish);
    setStarState(null);
  };

  return (
    <>
      {/* Active Shooting Star streak in sky */}
      {starState && (
        <div className="shooting-star-container">
          <motion.div
            className="shooting-star-streak"
            onClick={handleCatchStar}
            initial={{
              left: starState.startX,
              top: starState.startY,
              width: 0,
              opacity: 0,
              rotate: starState.angle,
            }}
            animate={{
              left: [starState.startX, starState.endX],
              top: [starState.startY, starState.endY],
              width: [0, 160, 220, 0],
              opacity: [0, 1, 1, 0],
              rotate: starState.angle,
            }}
            transition={{
              duration: starState.duration,
              ease: 'easeInOut',
            }}
          >
            <div className="shooting-star-head" />
            <div className="shooting-star-tap-hint">
              ✦ Tap the shooting star! ✦
            </div>
          </motion.div>
        </div>
      )}

      {/* Caught Shooting Star Modal */}
      <AnimatePresence>
        {activeWish && (
          <div className="modal-backdrop" onClick={() => setActiveWish(null)}>
            <motion.div
              className="wish-card"
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, scale: 0.85, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 30 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="wish-icon">
                <Sparkles size={28} />
              </div>
              <span className="wish-title">Starlight Wish Caught</span>
              <p className="wish-message">"{activeWish}"</p>
              <button
                className="btn-celestial"
                onClick={() => setActiveWish(null)}
                style={{ marginTop: '10px' }}
              >
                <span>Keep in my heart</span>
                <Heart size={16} fill="var(--color-gold)" />
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </>
  );
}
