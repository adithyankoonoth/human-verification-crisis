import { useEffect, useState } from 'react';
import { AlertTriangle, RotateCcw } from 'lucide-react';
import { FAILURE_MESSAGES } from '@/types/captcha';

interface FailureModalProps {
  isOpen: boolean;
  onRetry: () => void;
  attemptNumber: number;
}

export const FailureModal = ({ isOpen, onRetry, attemptNumber }: FailureModalProps) => {
  const [message, setMessage] = useState('');
  const [isGlitching, setIsGlitching] = useState(false);

  useEffect(() => {
    if (isOpen) {
      // Select message based on attempt number
      const messageIndex = Math.min(attemptNumber - 1, FAILURE_MESSAGES.length - 1);
      setMessage(FAILURE_MESSAGES[messageIndex]);
      
      // Add glitch effect for later attempts
      if (attemptNumber > 3) {
        setIsGlitching(true);
        const timer = setTimeout(() => setIsGlitching(false), 2000);
        return () => clearTimeout(timer);
      }
    }
  }, [isOpen, attemptNumber]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4">
      <div className={`bg-card border border-destructive rounded-lg max-w-md w-full p-6 shadow-glow-error ${
        isGlitching ? 'animate-glitch' : ''
      }`}>
        <div className="flex items-center gap-3 mb-4">
          <AlertTriangle className="w-6 h-6 text-destructive animate-pulse" />
          <h3 className={`text-lg font-semibold ${
            isGlitching ? 'glitch' : ''
          }`} data-text="Verification Failed">
            Verification Failed
          </h3>
        </div>

        <div className="mb-6">
          <p className={`text-muted-foreground ${
            attemptNumber > 5 ? 'animate-shake' : ''
          }`}>
            {message}
          </p>
          
          {attemptNumber > 2 && (
            <div className="mt-3 p-3 bg-muted rounded border-l-4 border-destructive">
              <p className="text-sm text-muted-foreground">
                Attempts: {attemptNumber}
                {attemptNumber > 5 && (
                  <span className="ml-2 text-destructive font-semibold">
                    (System questioning your humanity)
                  </span>
                )}
              </p>
            </div>
          )}
        </div>

        <div className="flex justify-between items-center">
          <div className="text-xs text-muted-foreground">
            Error Code: HUMAN_DOUBT_{attemptNumber.toString().padStart(3, '0')}
          </div>
          <button
            onClick={onRetry}
            className={`btn-captcha flex items-center gap-2 ${
              attemptNumber > 4 ? 'animate-pulse-glow' : ''
            }`}
          >
            <RotateCcw className="w-4 h-4" />
            Try Again
            {attemptNumber > 3 && '?'}
          </button>
        </div>

        {attemptNumber > 6 && (
          <div className="mt-4 text-center">
            <p className="text-xs text-destructive animate-pulse">
              Maybe you really are a robot...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};