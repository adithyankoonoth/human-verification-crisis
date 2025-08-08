import { useState } from 'react';
import { VolumeX, Volume2 } from 'lucide-react';
import { CaptchaChallenge } from '@/types/captcha';

interface AudioChallengeProps {
  challenge: CaptchaChallenge;
  onSubmit: (selectedSound: number) => void;
}

export const AudioChallenge = ({ challenge, onSubmit }: AudioChallengeProps) => {
  const [selectedSound, setSelectedSound] = useState<number | null>(null);
  const [playingSound, setPlayingSound] = useState<number | null>(null);

  const playSound = (soundId: number) => {
    setPlayingSound(soundId);
    // Simulate sound playing
    setTimeout(() => setPlayingSound(null), 2000);
  };

  const handleSubmit = () => {
    if (selectedSound !== null) {
      onSubmit(selectedSound);
    }
  };

  return (
    <div className="captcha-container max-w-lg mx-auto p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Audio Challenge
        </h3>
        <p className="text-base font-medium text-primary">
          {challenge.instruction}
        </p>
      </div>

      <div className="space-y-3">
        {challenge.data.sounds.map((sound: any) => (
          <div
            key={sound.id}
            className={`flex items-center justify-between p-4 border rounded-lg cursor-pointer transition-all ${
              selectedSound === sound.id 
                ? 'border-primary bg-captcha-hover' 
                : 'border-captcha-border hover:border-primary/50'
            }`}
            onClick={() => setSelectedSound(sound.id)}
          >
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full border-2 ${
                selectedSound === sound.id 
                  ? 'border-primary bg-primary' 
                  : 'border-captcha-border'
              }`} />
              <span className="text-sm font-medium">{sound.label}</span>
            </div>
            
            <button
              onClick={(e) => {
                e.stopPropagation();
                playSound(sound.id);
              }}
              className="p-2 text-muted-foreground hover:text-primary transition-colors"
            >
              {playingSound === sound.id ? (
                <Volume2 className="w-5 h-5 animate-pulse" />
              ) : (
                <VolumeX className="w-5 h-5" />
              )}
            </button>
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => setSelectedSound(null)}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Clear
        </button>
        <button
          onClick={handleSubmit}
          disabled={selectedSound === null}
          className="btn-verify"
        >
          Verify
        </button>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Listen to each sound and select the one that represents blue
        </p>
      </div>
    </div>
  );
};