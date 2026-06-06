import { useState } from 'react';
import { AudioProvider } from './context/AudioContext';
import MainMenu from './components/MainMenu';
import MechanicsOverlay from './components/MechanicsOverlay';
import SyntaxBattle from './components/SyntaxBattle';

export default function App() {
  const [view, setView] = useState('MENU');

  return (
    <AudioProvider>
      {view === 'MENU' && (
        <MainMenu
          onStartGame={() => setView('GAME')}
          onShowMechanics={() => setView('MECHANICS')}
        />
      )}

      {view === 'MECHANICS' && (
        <MechanicsOverlay onClose={() => setView('MENU')} />
      )}

      {view === 'GAME' && (
        <SyntaxBattle onExit={() => setView('MENU')} />
      )}
    </AudioProvider>
  );
}
