import { useState, useEffect } from 'react';
import { CaptchaCheckbox } from './CaptchaCheckbox';
import { ImageSelectChallenge } from './ImageSelectChallenge';
import { AudioChallenge } from './AudioChallenge';
import { DrawingChallenge } from './DrawingChallenge';
import { TextInputChallenge } from './TextInputChallenge';
import { FailureModal } from './FailureModal';
import { ABSURD_CHALLENGES, CaptchaChallenge } from '@/types/captcha';
import { Shield, AlertCircle } from 'lucide-react';

type AppState = 'initial' | 'challenge' | 'failed' | 'loading';

export const HumanVerificationCrisis = () => {
  const [state, setState] = useState<AppState>('initial');
  const [currentChallenge, setCurrentChallenge] = useState<CaptchaChallenge | null>(null);
  const [attemptNumber, setAttemptNumber] = useState(0);
  const [showFailureModal, setShowFailureModal] = useState(false);
  const [isGlitchMode, setIsGlitchMode] = useState(false);

  useEffect(() => {
    if (attemptNumber > 4) {
      setIsGlitchMode(true);
    }
  }, [attemptNumber]);

  const startChallenge = () => {
    setState('loading');
    setTimeout(() => {
      const randomChallenge = ABSURD_CHALLENGES[Math.floor(Math.random() * ABSURD_CHALLENGES.length)];
      setCurrentChallenge(randomChallenge);
      setState('challenge');
    }, 1500);
  };

  const handleChallengeSubmit = () => {
    setState('loading');
    setAttemptNumber(prev => prev + 1);
    
    setTimeout(() => {
      setState('failed');
      setShowFailureModal(true);
    }, 2000);
  };

  const handleRetry = () => {
    setShowFailureModal(false);
    setTimeout(() => {
      startChallenge();
    }, 500);
  };

  const renderChallenge = () => {
    if (!currentChallenge) return null;

    switch (currentChallenge.type) {
      case 'image-select':
        return (
          <ImageSelectChallenge
            challenge={currentChallenge}
            onSubmit={handleChallengeSubmit}
          />
        );
      case 'audio':
        return (
          <AudioChallenge
            challenge={currentChallenge}
            onSubmit={handleChallengeSubmit}
          />
        );
      case 'drawing':
        return (
          <DrawingChallenge
            challenge={currentChallenge}
            onSubmit={handleChallengeSubmit}
          />
        );
      case 'text-input':
        return (
          <TextInputChallenge
            challenge={currentChallenge}
            onSubmit={handleChallengeSubmit}
          />
        );
      default:
        return null;
    }
  };

  const renderContent = () => {
    switch (state) {
      case 'initial':
        return <CaptchaCheckbox onStart={startChallenge} />;
      
      case 'loading':
        return (
          <div className="captcha-container max-w-md mx-auto p-8 text-center">
            <div className="loading-spinner mx-auto mb-4"></div>
            <p className="text-sm text-muted-foreground animate-pulse">
              {attemptNumber === 0 
                ? 'Initializing human verification protocols...' 
                : 'Analyzing previous failure patterns...'}
            </p>
          </div>
        );
      
      case 'challenge':
        return renderChallenge();
      
      case 'failed':
        return (
          <div className="captcha-container max-w-md mx-auto p-8 text-center">
            <AlertCircle className="w-8 h-8 text-destructive mx-auto mb-4 animate-pulse" />
            <p className="text-muted-foreground">
              Processing verification failure...
            </p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className={`min-h-screen bg-background relative ${isGlitchMode ? 'animate-pulse-glow' : ''}`}>
      {/* Header */}
      <header className="p-6 border-b border-border">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-3">
            <Shield className={`w-6 h-6 text-primary ${isGlitchMode ? 'animate-glitch' : ''}`} />
            <h1 className={`text-xl font-semibold ${isGlitchMode ? 'glitch' : ''}`} data-text="SecureAuth Portal">
              SecureAuth Portal
            </h1>
            {attemptNumber > 2 && (
              <div className="ml-auto">
                <span className="text-xs text-destructive bg-destructive/10 px-2 py-1 rounded">
                  ELEVATED VERIFICATION
                </span>
              </div>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h2 className={`text-2xl font-bold mb-2 ${isGlitchMode ? 'glitch' : ''}`} data-text="Human Verification Required">
              Human Verification Required
            </h2>
            <p className="text-muted-foreground">
              Please complete the following verification to continue.
              {attemptNumber > 0 && (
                <span className="block mt-1 text-destructive text-sm">
                  Previous attempts: {attemptNumber}
                </span>
              )}
            </p>
          </div>

          {renderContent()}
        </div>
      </main>

      {/* Footer */}
      <footer className="p-6 border-t border-border">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-xs text-muted-foreground">
            This verification system is designed to ensure maximum security by 
            questioning the fundamental nature of human consciousness.
          </p>
          {isGlitchMode && (
            <p className="text-xs text-destructive mt-2 animate-pulse">
              System integrity compromised. Reality uncertain.
            </p>
          )}
        </div>
      </footer>

      <FailureModal
        isOpen={showFailureModal}
        onRetry={handleRetry}
        attemptNumber={attemptNumber}
      />
    </div>
  );
};