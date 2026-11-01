import React, { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import confetti from 'canvas-confetti';
import IntroScreen from './components/IntroScreen';
import UniverseMap from './components/UniverseMap';
import BeginningModal from './components/BeginningModal';
import MemoriesModal from './components/MemoriesModal';
import ThingsINeverTireModal from './components/ThingsINeverTireModal';
import SoundtrackModal from './components/SoundtrackModal';
import LettersModal from './components/LettersModal';
import FutureModal from './components/FutureModal';
import FinalSurpriseModal from './components/FinalSurpriseModal';
import HiddenConstellationModal from './components/HiddenConstellationModal';
import './styles/universe.css';

export default function App() {
  const [hasEntered, setHasEntered] = useState(false);
  const [activeModal, setActiveModal] = useState(null); // 'beginning' | 'memories' | 'tire' | 'soundtrack' | 'letters' | 'future' | 'beacon' | 'secret'
  const [secretStarsCollected, setSecretStarsCollected] = useState([]);

  // Enter experience
  const handleEnterUniverse = () => {
    setHasEntered(true);
  };

  // Open modal for a celestial node
  const handleOpenSection = (sectionId) => {
    setActiveModal(sectionId);
  };

  // Close active modal
  const handleCloseModal = () => {
    setActiveModal(null);
  };

  // Collect secret star
  const handleCollectSecretStar = (starId) => {
    if (secretStarsCollected.includes(starId)) return;
    const updated = [...secretStarsCollected, starId];
    setSecretStarsCollected(updated);

    // If all 5 stars collected, trigger celebration stardust!
    if (updated.length === 5) {
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#F5DFA5', '#A99BFF', '#E6A9D1', '#FFFFFF'],
          disableForReducedMotion: true,
        });
      } catch (e) {}

      // Auto-open hidden constellation revelation
      setTimeout(() => {
        setActiveModal('secret');
      }, 700);
    }
  };

  return (
    <div className="app-container">
      <AnimatePresence mode="wait">
        {!hasEntered ? (
          <IntroScreen key="intro" onEnter={handleEnterUniverse} />
        ) : (
          <UniverseMap
            key="universe"
            onOpenSection={handleOpenSection}
            onOpenSecretModal={() => setActiveModal('secret')}
            secretStarsCollected={secretStarsCollected}
            onCollectSecretStar={handleCollectSecretStar}
          />
        )}
      </AnimatePresence>

      {/* Interactive Modals */}
      <BeginningModal
        isOpen={activeModal === 'beginning'}
        onClose={handleCloseModal}
      />

      <MemoriesModal
        isOpen={activeModal === 'memories'}
        onClose={handleCloseModal}
      />

      <ThingsINeverTireModal
        isOpen={activeModal === 'tire'}
        onClose={handleCloseModal}
      />

      <SoundtrackModal
        isOpen={activeModal === 'soundtrack'}
        onClose={handleCloseModal}
      />

      <LettersModal
        isOpen={activeModal === 'letters'}
        onClose={handleCloseModal}
      />

      <FutureModal
        isOpen={activeModal === 'future'}
        onClose={handleCloseModal}
      />

      <FinalSurpriseModal
        isOpen={activeModal === 'beacon'}
        onClose={handleCloseModal}
      />

      <HiddenConstellationModal
        isOpen={activeModal === 'secret'}
        onClose={handleCloseModal}
      />
    </div>
  );
}
