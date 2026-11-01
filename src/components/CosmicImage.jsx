import React, { useState } from 'react';

/**
 * CosmicImage
 * Attempts to load the user's personal image from the specified path.
 * If the image fails to load or hasn't been uploaded yet, it seamlessly
 * renders a custom SVG cosmic illustration matching the theme!
 */
export default function CosmicImage({ src, alt, type = 'default', className = '' }) {
  const [error, setError] = useState(false);
  const [loaded, setLoaded] = useState(false);

  const resolvedSrc = src?.startsWith('/')
    ? `${import.meta.env.BASE_URL}${src.slice(1)}`
    : src;

  // If user has provided an image and it hasn't errored
  if (src && !error) {
    return (
      <img
        src={resolvedSrc}
        alt={alt || 'Celestial memory'}
        className={className}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: loaded ? 1 : 0.4,
          transition: 'opacity 0.4s ease',
        }}
        onLoad={() => setLoaded(true)}
        onError={() => setError(true)}
        loading="lazy"
      />
    );
  }

  // Fallback Cosmic SVG Illustrations
  return (
    <div
      className={className}
      style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #0D1630 0%, #060B18 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <IllustrationByType type={type} />
    </div>
  );
}

function IllustrationByType({ type }) {
  switch (type) {
    case 'beginning':
      return (
        <svg viewBox="0 0 320 200" fill="none" style={{ width: '100%', height: '100%' }}>
          <circle cx="160" cy="90" r="45" fill="url(#begGlow)" opacity="0.3" />
          <path d="M160 55C140 55 125 70 125 90C125 110 140 125 160 125C170 125 180 120 185 112C165 111 150 95 150 75C150 67 154 60 160 55Z" fill="#F5DFA5" />
          <circle cx="110" cy="115" r="3" fill="#A99BFF" />
          <circle cx="210" cy="115" r="3" fill="#E6A9D1" />
          <line x1="110" y1="115" x2="210" y2="115" stroke="rgba(245, 223, 165, 0.4)" strokeDasharray="3 3" />
          <circle cx="80" cy="60" r="1.5" fill="#FFF" opacity="0.6" />
          <circle cx="240" cy="50" r="1.5" fill="#FFF" opacity="0.8" />
          <circle cx="250" cy="140" r="1.5" fill="#F5DFA5" opacity="0.7" />
          <defs>
            <radialGradient id="begGlow" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stop-color="#F5DFA5" stop-opacity="0.6" />
              <stop offset="100%" stop-color="#080D1C" stop-opacity="0" />
            </radialGradient>
          </defs>
        </svg>
      );
    case 'call':
      return (
        <svg viewBox="0 0 200 140" fill="none" style={{ width: '100%', height: '100%' }}>
          <circle cx="65" cy="70" r="22" stroke="#A99BFF" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="65" cy="70" r="4" fill="#A99BFF" />
          <circle cx="135" cy="70" r="22" stroke="#E6A9D1" strokeWidth="1" strokeDasharray="2 2" />
          <circle cx="135" cy="70" r="4" fill="#E6A9D1" />
          <path d="M72 70 Q 100 45 128 70" stroke="#F5DFA5" strokeWidth="1.5" strokeDasharray="4 2" />
          <path d="M72 70 Q 100 95 128 70" stroke="#F5DFA5" strokeWidth="1.5" strokeDasharray="4 2" />
        </svg>
      );
    case 'sleep':
      return (
        <svg viewBox="0 0 200 140" fill="none" style={{ width: '100%', height: '100%' }}>
          <ellipse cx="100" cy="95" rx="60" ry="20" fill="rgba(169, 155, 255, 0.15)" filter="blur(4px)" />
          <path d="M105 45C92 45 82 55 82 68C82 81 92 91 105 91C111 91 117 88 120 83C108 82 98 72 98 60C98 54 101 49 105 45Z" fill="#F5DFA5" />
          <circle cx="70" cy="50" r="1.5" fill="#FFF" />
          <circle cx="130" cy="55" r="1.5" fill="#FFF" />
          <circle cx="140" cy="75" r="1" fill="#E6A9D1" />
        </svg>
      );
    case 'airport':
      return (
        <svg viewBox="0 0 200 140" fill="none" style={{ width: '100%', height: '100%' }}>
          <path d="M30 110 Q 100 20 170 110" stroke="rgba(245, 223, 165, 0.5)" strokeWidth="1.5" strokeDasharray="3 3" />
          <circle cx="30" cy="110" r="4" fill="#A99BFF" />
          <circle cx="170" cy="110" r="4" fill="#E6A9D1" />
          {/* Paper plane or celestial glider */}
          <path d="M98 55 L112 50 L102 65 Z" fill="#F5DFA5" />
        </svg>
      );
    case 'album':
      return (
        <svg viewBox="0 0 100 100" fill="none" style={{ width: '100%', height: '100%' }}>
          <circle cx="50" cy="50" r="45" fill="#13192B" stroke="rgba(255,255,255,0.1)" />
          <circle cx="50" cy="50" r="32" stroke="rgba(255,255,255,0.06)" />
          <circle cx="50" cy="50" r="20" fill="rgba(169, 155, 255, 0.25)" />
          <circle cx="50" cy="50" r="8" fill="#F5DFA5" />
        </svg>
      );
    default:
      return (
        <svg viewBox="0 0 200 140" fill="none" style={{ width: '100%', height: '100%' }}>
          <circle cx="100" cy="70" r="28" fill="rgba(169, 155, 255, 0.15)" />
          <circle cx="100" cy="70" r="5" fill="#F5DFA5" />
          <circle cx="60" cy="40" r="2" fill="#FFF" />
          <circle cx="140" cy="90" r="2" fill="#E6A9D1" />
          <circle cx="130" cy="40" r="1.5" fill="#A99BFF" />
        </svg>
      );
  }
}
