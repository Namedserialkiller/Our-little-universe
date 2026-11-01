import React, { useState, useRef, useEffect, useCallback } from 'react';
import ConstellationNode from './ConstellationNode';
import SecretStarNode from './SecretStarNode';
import StarfieldCanvas from './StarfieldCanvas';
import UniverseHUD from './UniverseHUD';
import ShootingStarOverlay from './ShootingStarOverlay';
import { toggleAmbientSoundscape } from '../utils/audioSynth';

export default function UniverseMap({
  onOpenSection,
  onOpenSecretModal,
  secretStarsCollected,
  onCollectSecretStar,
}) {
  // Universe Pan & Zoom State
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [isAmbientPlaying, setIsAmbientPlaying] = useState(false);

  const containerRef = useRef(null);
  const isDragging = useRef(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const initialPinchDistance = useRef(null);
  const initialZoom = useRef(1);

  // Constellation Coordinates in World Space (Center is roughly 1600, 1200)
  const nodes = [
    {
      id: 'beginning',
      x: 1220,
      y: 980,
      title: 'Our Beginning',
      tag: 'July 2024',
      chimeFreq: 440,
    },
    {
      id: 'memories',
      x: 1980,
      y: 900,
      title: 'Little Memories',
      tag: '4 Moments',
      chimeFreq: 528,
    },
    {
      id: 'tire',
      x: 1050,
      y: 1450,
      title: 'Things I Love',
      tag: 'Endless',
      chimeFreq: 587,
    },
    {
      id: 'soundtrack',
      x: 2120,
      y: 1420,
      title: 'Our Soundtrack',
      tag: 'Melodies',
      chimeFreq: 659,
    },
    {
      id: 'letters',
      x: 1600,
      y: 1600,
      title: 'Letters From Me',
      tag: 'Open When',
      chimeFreq: 698,
    },
    {
      id: 'future',
      x: 1600,
      y: 720,
      title: 'Our Future',
      tag: 'Promises',
      chimeFreq: 784,
    },
    {
      id: 'beacon',
      x: 1600,
      y: 1180,
      title: 'Celestial Beacon',
      tag: 'Final Gift',
      chimeFreq: 880,
    },
  ];

  // 5 Secret Stars forming a celestial heart
  const secretStars = [
    { id: 's1', x: 1480, y: 1060, freq: 880 },
    { id: 's2', x: 1720, y: 1060, freq: 932 },
    { id: 's3', x: 1790, y: 1220, freq: 987 },
    { id: 's4', x: 1600, y: 1350, freq: 1046 },
    { id: 's5', x: 1410, y: 1220, freq: 1108 },
  ];

  // Recenter universe to the middle
  const recenter = useCallback(() => {
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;
    // World center is (1600, 1200)
    setPan({
      x: screenW / 2 - 1600 * zoom,
      y: screenH / 2 - 1200 * zoom,
    });
  }, [zoom]);

  // Initial center on mount
  useEffect(() => {
    recenter();
  }, []);

  // Zoom handlers
  const handleZoomIn = () => setZoom((z) => Math.min(1.8, +(z + 0.2).toFixed(1)));
  const handleZoomOut = () => setZoom((z) => Math.max(0.5, +(z - 0.2).toFixed(1)));

  // Wheel zoom
  const handleWheel = (e) => {
    e.preventDefault();
    const delta = e.deltaY * -0.001;
    setZoom((z) => Math.min(1.8, Math.max(0.5, +(z + delta).toFixed(2))));
  };

  // Focus directly on a node when clicked from the bottom dock
  const navigateToNode = (nodeId) => {
    const target = nodes.find((n) => n.id === nodeId);
    if (!target) return;
    const screenW = window.innerWidth;
    const screenH = window.innerHeight;

    setPan({
      x: screenW / 2 - target.x * zoom,
      y: screenH / 2 - target.y * zoom,
    });

    // Auto-open modal after smooth pan
    setTimeout(() => {
      onOpenSection(nodeId);
    }, 280);
  };

  // Mouse Drag Handlers
  const handleMouseDown = (e) => {
    if (e.button !== 0) return;
    isDragging.current = true;
    dragStart.current = { x: e.clientX - pan.x, y: e.clientY - pan.y };
  };

  const handleMouseMove = (e) => {
    if (!isDragging.current) return;
    setPan({
      x: e.clientX - dragStart.current.x,
      y: e.clientY - dragStart.current.y,
    });
  };

  const handleMouseUp = () => {
    isDragging.current = false;
  };

  // Touch Drag & Pinch Zoom Handlers
  const handleTouchStart = (e) => {
    if (e.touches.length === 1) {
      isDragging.current = true;
      dragStart.current = {
        x: e.touches[0].clientX - pan.x,
        y: e.touches[0].clientY - pan.y,
      };
    } else if (e.touches.length === 2) {
      isDragging.current = false;
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      initialPinchDistance.current = Math.hypot(dx, dy);
      initialZoom.current = zoom;
    }
  };

  const handleTouchMove = (e) => {
    if (e.touches.length === 1 && isDragging.current) {
      setPan({
        x: e.touches[0].clientX - dragStart.current.x,
        y: e.touches[0].clientY - dragStart.current.y,
      });
    } else if (e.touches.length === 2 && initialPinchDistance.current) {
      const dx = e.touches[0].clientX - e.touches[1].clientX;
      const dy = e.touches[0].clientY - e.touches[1].clientY;
      const currentDist = Math.hypot(dx, dy);
      const ratio = currentDist / initialPinchDistance.current;
      setZoom(Math.min(1.8, Math.max(0.5, +(initialZoom.current * ratio).toFixed(2))));
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    initialPinchDistance.current = null;
  };

  const allSecretsFound = secretStarsCollected.length === secretStars.length;

  return (
    <div
      ref={containerRef}
      className="universe-viewport"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {/* Background HTML5 Canvas Starfield with Parallax */}
      <StarfieldCanvas panOffset={pan} zoom={zoom} />

      {/* Interactive World Map */}
      <div
        className="universe-world"
        style={{
          transform: `translate(${pan.x}px, ${pan.y}px) scale(${zoom})`,
          transition: isDragging.current ? 'none' : 'transform 0.25s ease-out',
        }}
      >
        {/* Constellation SVG Lines */}
        <svg className="constellations-svg-layer" width="3200" height="2400">
          {/* Main Constellation Web Lines */}
          <line x1="1600" y1="720" x2="1220" y2="980" className="constellation-line" />
          <line x1="1600" y1="720" x2="1980" y2="900" className="constellation-line" />
          <line x1="1220" y1="980" x2="1600" y2="1180" className="constellation-line" />
          <line x1="1980" y1="900" x2="1600" y2="1180" className="constellation-line" />
          <line x1="1220" y1="980" x2="1050" y2="1450" className="constellation-line" />
          <line x1="1050" y1="1450" x2="1600" y2="1600" className="constellation-line" />
          <line x1="1600" y1="1600" x2="2120" y2="1420" className="constellation-line" />
          <line x1="1980" y1="900" x2="2120" y2="1420" className="constellation-line" />
          <line x1="1600" y1="1180" x2="1600" y2="1600" className="constellation-line" />

          {/* Golden Alignment lines for discovered secret constellation */}
          {allSecretsFound && (
            <path
              d="M 1480 1060 L 1720 1060 L 1790 1220 L 1600 1350 L 1410 1220 Z"
              className="constellation-line-golden"
              fill="rgba(245, 223, 165, 0.08)"
            />
          )}
        </svg>

        {/* 6 Constellations + Beacon Node */}
        {nodes.map((node) => (
          <ConstellationNode
            key={node.id}
            node={node}
            onClick={onOpenSection}
          />
        ))}

        {/* 5 Hidden Stars */}
        {secretStars.map((star) => (
          <SecretStarNode
            key={star.id}
            star={star}
            isCollected={secretStarsCollected.includes(star.id)}
            onCollect={onCollectSecretStar}
          />
        ))}
      </div>

      {/* Shooting Star Overlay */}
      <ShootingStarOverlay />

      {/* Floating HUD controls & quick constellation navigation */}
      <UniverseHUD
        zoom={zoom}
        onZoomIn={handleZoomIn}
        onZoomOut={handleZoomOut}
        onRecenter={recenter}
        isAmbientPlaying={isAmbientPlaying}
        onToggleAmbient={() => toggleAmbientSoundscape(setIsAmbientPlaying)}
        secretCount={secretStarsCollected.length}
        totalSecrets={secretStars.length}
        onOpenSecretModal={onOpenSecretModal}
        onNavigateNode={navigateToNode}
      />
    </div>
  );
}
