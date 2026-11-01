import React, { useEffect, useRef } from 'react';

/**
 * High-performance 2D HTML Canvas Starfield
 * - Hundreds of twinkling stars with individual brightness, speed, and size
 * - Subtle drifting nebula dust particles
 * - Parallax integration with universe pan offsets and gentle mouse wander
 * - Battery-friendly requestAnimationFrame with tab visibility pause
 */
export default function StarfieldCanvas({ panOffset = { x: 0, y: 0 }, zoom = 1 }) {
  const canvasRef = useRef(null);
  const animFrameId = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    // Star count optimized for performance across mobile & desktop
    const isMobile = window.innerWidth < 768;
    const STAR_COUNT = isMobile ? 180 : 360;
    const NEBULA_DUST_COUNT = isMobile ? 25 : 55;

    // Palette for celestial stars
    const starPalette = ['#FFFFFF', '#F5DFA5', '#A99BFF', '#E6A9D1', '#F4F1FF'];

    // Generate stars
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      size: Math.random() * 1.8 + 0.4,
      color: starPalette[Math.floor(Math.random() * starPalette.length)],
      baseAlpha: Math.random() * 0.6 + 0.3,
      alphaSpeed: Math.random() * 0.02 + 0.005,
      phase: Math.random() * Math.PI * 2,
      depth: Math.random() * 0.5 + 0.1, // For multi-layer parallax
    }));

    // Generate gentle drifting cosmic dust particles
    const dustParticles = Array.from({ length: NEBULA_DUST_COUNT }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      radius: Math.random() * 3 + 1.2,
      color: Math.random() > 0.5 ? 'rgba(169, 155, 255,' : 'rgba(230, 169, 209,',
      alpha: Math.random() * 0.25 + 0.08,
      vx: (Math.random() - 0.5) * 0.15,
      vy: (Math.random() - 0.5) * 0.15,
      pulse: Math.random() * Math.PI,
    }));

    // Resize handler
    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      // Reposition stars inside bounds
      stars.forEach((s) => {
        if (s.x > width) s.x = Math.random() * width;
        if (s.y > height) s.y = Math.random() * height;
      });
    };
    window.addEventListener('resize', handleResize);

    // Smooth render loop
    let lastTime = performance.now();
    let isTabVisible = true;

    const onVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible) {
        lastTime = performance.now();
        animFrameId.current = requestAnimationFrame(render);
      }
    };
    document.addEventListener('visibilitychange', onVisibilityChange);

    const render = (time) => {
      if (!isTabVisible) return;
      const delta = (time - lastTime) / 1000;
      lastTime = time;

      ctx.clearRect(0, 0, width, height);

      // Draw dust particles
      dustParticles.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.pulse += 0.015;

        // Wrap around screen
        if (p.x < -10) p.x = width + 10;
        if (p.x > width + 10) p.x = -10;
        if (p.y < -10) p.y = height + 10;
        if (p.y > height + 10) p.y = -10;

        const currentAlpha = p.alpha + Math.sin(p.pulse) * 0.06;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
        ctx.fillStyle = `${p.color} ${Math.max(0.02, currentAlpha)})`;
        ctx.fill();
      });

      // Draw stars with parallax and twinkling
      stars.forEach((star) => {
        star.phase += star.alphaSpeed;
        const twinkle = (Math.sin(star.phase) + 1) * 0.5;
        const currentAlpha = star.baseAlpha * 0.4 + twinkle * 0.6;

        // Parallax shift based on depth and universe pan
        const px = (star.x + panOffset.x * star.depth * 0.1) % width;
        const py = (star.y + panOffset.y * star.depth * 0.1) % height;
        const finalX = px < 0 ? px + width : px;
        const finalY = py < 0 ? py + height : py;

        ctx.beginPath();
        ctx.arc(finalX, finalY, star.size, 0, Math.PI * 2);
        ctx.fillStyle = star.color;
        ctx.globalAlpha = Math.max(0.1, Math.min(1, currentAlpha));
        ctx.fill();

        // Extra delicate glow around brighter stars
        if (star.size > 1.4 && currentAlpha > 0.7) {
          ctx.beginPath();
          ctx.arc(finalX, finalY, star.size * 2.2, 0, Math.PI * 2);
          ctx.fillStyle = star.color;
          ctx.globalAlpha = (currentAlpha - 0.7) * 0.35;
          ctx.fill();
        }
      });

      ctx.globalAlpha = 1.0;
      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', onVisibilityChange);
      if (animFrameId.current) cancelAnimationFrame(animFrameId.current);
    };
  }, [panOffset.x, panOffset.y, zoom]);

  return (
    <>
      <div className="nebula-glow nebula-1" />
      <div className="nebula-glow nebula-2" />
      <div className="nebula-glow nebula-3" />
      <canvas ref={canvasRef} className="starfield-canvas" />
    </>
  );
}
