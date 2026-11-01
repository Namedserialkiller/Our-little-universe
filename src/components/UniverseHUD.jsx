import React from 'react';
import { motion } from 'framer-motion';
import {
  Sparkles,
  ZoomIn,
  ZoomOut,
  Maximize2,
  Volume2,
  VolumeX,
  Compass,
  Calendar,
  BookHeart,
  Music,
  Mail,
  Moon,
  Star,
} from 'lucide-react';
import { universeData } from '../data/universeData';

export default function UniverseHUD({
  zoom,
  onZoomIn,
  onZoomOut,
  onRecenter,
  isAmbientPlaying,
  onToggleAmbient,
  secretCount,
  totalSecrets = 5,
  onOpenSecretModal,
  onNavigateNode,
}) {
  const { websiteTitle, recipientName } = universeData;

  const dockItems = [
    { id: 'beginning', label: 'Beginning', icon: Calendar },
    { id: 'memories', label: 'Memories', icon: BookHeart },
    { id: 'tire', label: 'Things I Love', icon: Sparkles },
    { id: 'soundtrack', label: 'Soundtrack', icon: Music },
    { id: 'letters', label: 'Letters', icon: Mail },
    { id: 'future', label: 'Future', icon: Compass },
    { id: 'beacon', label: 'Final Beacon', icon: Moon, highlight: true },
  ];

  return (
    <>
      {/* Top Header */}
      <header className="hud-header">
        <div className="hud-header-left">
          <div className="hud-title-badge">
            <span className="hud-title-text">{websiteTitle}</span>
            <span className="hud-title-sub">For {recipientName}</span>
          </div>
        </div>

        <div className="hud-header-right">
          {/* Secret Constellation alignment counter */}
          <button
            className="hud-secret-counter"
            onClick={onOpenSecretModal}
            title="Hidden constellation discovery status"
          >
            <Star
              size={14}
              fill={secretCount === totalSecrets ? 'var(--color-gold)' : 'none'}
            />
            <span>
              {secretCount === totalSecrets
                ? 'Constellation Aligned ✦'
                : `Hidden Stars: ${secretCount}/${totalSecrets}`}
            </span>
          </button>
        </div>
      </header>

      {/* Right Controls Cluster */}
      <div className="hud-controls-cluster">
        <button
          className="hud-icon-btn"
          onClick={onZoomIn}
          title="Zoom In"
          aria-label="Zoom In"
        >
          <ZoomIn size={18} />
        </button>

        <button
          className="hud-icon-btn"
          onClick={onZoomOut}
          title="Zoom Out"
          aria-label="Zoom Out"
        >
          <ZoomOut size={18} />
        </button>

        <button
          className="hud-icon-btn"
          onClick={onRecenter}
          title="Recenter Star Map"
          aria-label="Recenter Universe"
        >
          <Maximize2 size={18} />
        </button>

        <button
          className={`hud-icon-btn ${isAmbientPlaying ? 'active' : ''}`}
          onClick={onToggleAmbient}
          title="Toggle Ambient Cosmic Lullaby"
          aria-label="Toggle Ambient Sound"
        >
          {isAmbientPlaying ? <Volume2 size={18} /> : <VolumeX size={18} />}
        </button>
      </div>

      {/* Bottom Constellations Dock */}
      <nav className="hud-dock" aria-label="Constellations Quick Navigation">
        {dockItems.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.id}
              className={`dock-item ${item.highlight ? 'highlight' : ''}`}
              onClick={() => onNavigateNode(item.id)}
            >
              <Icon size={14} />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    </>
  );
}
