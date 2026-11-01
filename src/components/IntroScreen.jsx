import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Compass, Heart } from 'lucide-react';
import { universeData } from '../data/universeData';

export default function IntroScreen({ onEnter }) {
  const { intro, longDistanceInfo } = universeData;

  return (
    <motion.div
      className="intro-screen-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.08 }}
      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
    >
      <div className="intro-content">
        {/* Subtle glowing cosmic symbol */}
        <motion.div
          className="intro-symbol"
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.2 }}
        >
          <Sparkles size={28} />
        </motion.div>

        {/* Long-distance coordinates badge if enabled */}
        {longDistanceInfo?.enabled && (
          <motion.div
            className="intro-distance-pill"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.0, delay: 0.5 }}
          >
            <Compass size={14} color="#A99BFF" />
            <span>
              {longDistanceInfo.herCity} ✦ {longDistanceInfo.myCity} ({longDistanceInfo.distanceKm})
            </span>
          </motion.div>
        )}

        {/* Poetic Opening text */}
        <motion.div
          className="intro-poem"
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          {intro.line1}
          <span>{intro.line2}</span>
        </motion.div>

        {/* Enter universe button */}
        <motion.button
          id="enter-universe-btn"
          className="btn-celestial"
          onClick={onEnter}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, delay: 1.3 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.96 }}
        >
          <span>{intro.buttonText}</span>
          <Sparkles size={16} />
        </motion.button>
      </div>
    </motion.div>
  );
}
