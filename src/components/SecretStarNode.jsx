import React from 'react';
import { motion } from 'framer-motion';
import { playCelestialChime } from '../utils/audioSynth';

export default function SecretStarNode({ star, isCollected, onCollect }) {
  const handleClick = (e) => {
    e.stopPropagation();
    if (!isCollected) {
      playCelestialChime(star.freq || 880);
      onCollect(star.id);
    }
  };

  return (
    <div
      className={`secret-star-node ${isCollected ? 'collected' : ''}`}
      style={{
        left: `${star.x}px`,
        top: `${star.y}px`,
      }}
      onClick={handleClick}
      title={isCollected ? 'Aligned Star' : 'A faint twinkling point...'}
    >
      <div className="secret-star-inner" />
    </div>
  );
}
