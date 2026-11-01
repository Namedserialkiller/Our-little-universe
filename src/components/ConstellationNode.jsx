import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Calendar, BookHeart, Music, Mail, Compass, Moon } from 'lucide-react';
import { playCelestialChime } from '../utils/audioSynth';

const iconMap = {
  beginning: Calendar,
  memories: BookHeart,
  tire: Sparkles,
  soundtrack: Music,
  letters: Mail,
  future: Compass,
  beacon: Moon,
};

export default function ConstellationNode({ node, onClick }) {
  const IconComponent = iconMap[node.id] || Sparkles;

  const handleClick = (e) => {
    e.stopPropagation();
    playCelestialChime(node.chimeFreq || 528);
    onClick(node.id);
  };

  return (
    <div
      className="celestial-node"
      style={{
        left: `${node.x}px`,
        top: `${node.y}px`,
      }}
      onClick={handleClick}
    >
      <div className="celestial-star-core">
        <div className="celestial-ring" />
        <div className="celestial-icon-badge">
          <IconComponent size={20} />
        </div>
      </div>

      <div className="celestial-label-pill">
        <span className="celestial-label-title">{node.title}</span>
        {node.tag && <span className="celestial-label-tag">{node.tag}</span>}
      </div>
    </div>
  );
}
