import { useState } from 'react';
import { RotateCcw } from 'lucide-react';
import { CaptchaChallenge } from '@/types/captcha';

interface TextInputChallengeProps {
  challenge: CaptchaChallenge;
  onSubmit: (input: string) => void;
}

export const TextInputChallenge = ({ challenge, onSubmit }: TextInputChallengeProps) => {
  const [input, setInput] = useState('');

  const handleSubmit = () => {
    onSubmit(input);
  };

  const refreshChallenge = () => {
    // Simulate refreshing with the same impossible text
    setInput('');
  };

  return (
    <div className="captcha-container max-w-lg mx-auto p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Text Challenge
        </h3>
        <p className="text-base font-medium text-primary">
          {challenge.instruction}
        </p>
      </div>

      <div className="border-2 border-captcha-border rounded-lg p-6 bg-captcha-bg mb-4">
        <div className="text-center">
          <div 
            className="text-3xl font-mono bg-gradient-to-r from-gray-400 via-gray-600 to-gray-400 bg-clip-text text-transparent select-none"
            style={{
              filter: 'blur(0.5px) contrast(0.8)',
              textShadow: '2px 2px 4px rgba(0,0,0,0.3)',
              transform: 'skew(-5deg, 2deg)',
              letterSpacing: '3px'
            }}
          >
            {challenge.data.displayText}
          </div>
        </div>
      </div>

      <div className="mb-6">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter the text above"
          className="w-full p-3 border border-captcha-border rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={refreshChallenge}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          New Challenge
        </button>
        <button
          onClick={handleSubmit}
          disabled={input.trim() === ''}
          className="btn-verify"
        >
          Verify
        </button>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Type the exact characters shown above
        </p>
      </div>
    </div>
  );
};