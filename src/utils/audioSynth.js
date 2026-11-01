/**
 * Web Audio Ambient & Sound Effects Helper
 * Generates delicate harmonic tones for starlight clicks, shooting stars,
 * and ambient cosmic soundscape without needing large external audio files.
 */

let audioCtx = null;

function getAudioContext() {
  if (typeof window === 'undefined') return null;
  if (!audioCtx) {
    const AudioContextClass = window.AudioContext || window.webkitAudioContext;
    if (AudioContextClass) {
      audioCtx = new AudioContextClass();
    }
  }
  if (audioCtx && audioCtx.state === 'suspended') {
    audioCtx.resume();
  }
  return audioCtx;
}

/**
 * Play a delicate celestial chime when tapping a star or constellation
 */
export function playCelestialChime(frequency = 528) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    // Soft sine wave
    osc.type = 'sine';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(frequency * 1.5, ctx.currentTime + 0.35);

    // Smooth gentle decay
    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.04);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 1.3);
  } catch (e) {
    // Audio policies might block before user interaction
  }
}

/**
 * Play shooting star swoosh sound
 */
export function playShootingStarSound() {
  try {
    const ctx = getAudioContext();
    if (!ctx) return;

    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(900, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(320, ctx.currentTime + 0.6);

    gain.gain.setValueAtTime(0.001, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, ctx.currentTime + 0.1);
    gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.8);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start();
    osc.stop(ctx.currentTime + 0.85);
  } catch (e) {}
}

/**
 * Ambient Drone Synthesizer (Generative cosmic lullaby)
 */
let ambientGain = null;
let ambientOscs = [];
let isAmbientPlaying = false;

export function toggleAmbientSoundscape(onStateChange) {
  try {
    const ctx = getAudioContext();
    if (!ctx) return false;

    if (isAmbientPlaying) {
      if (ambientGain) {
        ambientGain.gain.setTargetAtTime(0, ctx.currentTime, 0.5);
      }
      setTimeout(() => {
        ambientOscs.forEach((o) => {
          try { o.stop(); } catch(e) {}
        });
        ambientOscs = [];
      }, 600);
      isAmbientPlaying = false;
      if (onStateChange) onStateChange(false);
      return false;
    } else {
      ambientGain = ctx.createGain();
      ambientGain.gain.setValueAtTime(0.001, ctx.currentTime);
      ambientGain.gain.linearRampToValueAtTime(0.035, ctx.currentTime + 2);
      ambientGain.connect(ctx.destination);

      // Warm celestial chord (C# minor / E major pentatonic celestial frequencies)
      const freqs = [138.59, 207.65, 277.18, 329.63, 440];
      ambientOscs = freqs.map((f, i) => {
        const osc = ctx.createOscillator();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(f, ctx.currentTime);

        // Subtle LFO for gentle shimmering
        const panner = ctx.createStereoPanner ? ctx.createStereoPanner() : null;
        if (panner) {
          panner.pan.setValueAtTime((i % 2 === 0 ? -0.4 : 0.4), ctx.currentTime);
          osc.connect(panner);
          panner.connect(ambientGain);
        } else {
          osc.connect(ambientGain);
        }

        osc.start();
        return osc;
      });

      isAmbientPlaying = true;
      if (onStateChange) onStateChange(true);
      return true;
    }
  } catch (e) {
    return false;
  }
}
