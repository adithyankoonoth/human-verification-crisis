import { useState } from 'react';
import { CheckIcon } from 'lucide-react';

interface CaptchaCheckboxProps {
  onStart: () => void;
}

export const CaptchaCheckbox = ({ onStart }: CaptchaCheckboxProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = () => {
    if (isChecked) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      setIsChecked(true);
      setIsLoading(false);
      
      setTimeout(() => {
        onStart();
      }, 1000);
    }, 2000);
  };

  return (
    <div className="captcha-container p-6 max-w-md mx-auto">
      <div className="flex items-center gap-4">
        <button
          onClick={handleClick}
          className={`captcha-checkbox relative flex items-center justify-center ${
            isChecked ? 'bg-primary border-primary' : ''
          }`}
          disabled={isChecked}
        >
          {isLoading && (
            <div className="loading-spinner absolute"></div>
          )}
          {isChecked && !isLoading && (
            <CheckIcon className="w-4 h-4 text-primary-foreground" />
          )}
        </button>
        
        <div className="flex-1">
          <p className="text-sm font-medium text-foreground">
            I'm not a robot
          </p>
          <div className="flex items-center gap-2 mt-1">
            <div className="w-6 h-6 bg-muted rounded"></div>
            <p className="text-xs text-muted-foreground">
              reCAPTCHA
            </p>
            <div className="flex flex-col text-xs text-muted-foreground ml-auto">
              <span>Privacy</span>
              <span>Terms</span>
            </div>
          </div>
        </div>
      </div>
      
      {isChecked && (
        <div className="mt-4 text-center">
          <p className="text-sm text-muted-foreground animate-pulse">
            Analyzing human patterns...
          </p>
        </div>
      )}
    </div>
  );
};