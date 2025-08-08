import { useRef, useState, useEffect } from 'react';
import { RotateCcw } from 'lucide-react';
import { CaptchaChallenge } from '@/types/captcha';

interface DrawingChallengeProps {
  challenge: CaptchaChallenge;
  onSubmit: (canvasData: string) => void;
}

export const DrawingChallenge = ({ challenge, onSubmit }: DrawingChallengeProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set up canvas
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    // Fill with white background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    setIsDrawing(true);
    setHasDrawn(true);

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  };

  const handleSubmit = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dataURL = canvas.toDataURL();
    onSubmit(dataURL);
  };

  return (
    <div className="captcha-container max-w-lg mx-auto p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Drawing Challenge
        </h3>
        <p className="text-base font-medium text-primary">
          {challenge.instruction}
        </p>
      </div>

      <div className="border-2 border-captcha-border rounded-lg p-4 bg-white">
        <canvas
          ref={canvasRef}
          width={400}
          height={300}
          className="border border-gray-200 cursor-crosshair w-full max-w-full h-auto"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
        />
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={clearCanvas}
          className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          Clear
        </button>
        <button
          onClick={handleSubmit}
          disabled={!hasDrawn}
          className="btn-verify"
        >
          Verify
        </button>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Use your mouse to draw. Perfection is required.
        </p>
      </div>
    </div>
  );
};