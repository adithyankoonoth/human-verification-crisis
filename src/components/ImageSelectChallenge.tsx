import { useState } from 'react';
import { CaptchaChallenge } from '@/types/captcha';

// Import all captcha images
import officeImg from '@/assets/captcha-office-1.jpg';
import trafficImg from '@/assets/captcha-traffic-1.jpg';
import groceryImg from '@/assets/captcha-grocery-1.jpg';
import plantImg from '@/assets/captcha-plant-1.jpg';
import paperworkImg from '@/assets/captcha-paperwork-1.jpg';
import parkingImg from '@/assets/captcha-parking-1.jpg';
import bathroomImg from '@/assets/captcha-bathroom-1.jpg';
import crosswalkImg from '@/assets/captcha-crosswalk-1.jpg';
import computerImg from '@/assets/captcha-computer-1.jpg';

const imageMap: Record<string, string> = {
  '/src/assets/captcha-office-1.jpg': officeImg,
  '/src/assets/captcha-traffic-1.jpg': trafficImg,
  '/src/assets/captcha-grocery-1.jpg': groceryImg,
  '/src/assets/captcha-plant-1.jpg': plantImg,
  '/src/assets/captcha-paperwork-1.jpg': paperworkImg,
  '/src/assets/captcha-parking-1.jpg': parkingImg,
  '/src/assets/captcha-bathroom-1.jpg': bathroomImg,
  '/src/assets/captcha-crosswalk-1.jpg': crosswalkImg,
  '/src/assets/captcha-computer-1.jpg': computerImg,
};

interface ImageSelectChallengeProps {
  challenge: CaptchaChallenge;
  onSubmit: (selectedImages: number[]) => void;
}

export const ImageSelectChallenge = ({ challenge, onSubmit }: ImageSelectChallengeProps) => {
  const [selectedImages, setSelectedImages] = useState<number[]>([]);
  const [isHovering, setIsHovering] = useState<number | null>(null);

  const toggleImage = (imageId: number) => {
    setSelectedImages(prev => 
      prev.includes(imageId) 
        ? prev.filter(id => id !== imageId)
        : [...prev, imageId]
    );
  };

  const handleSubmit = () => {
    onSubmit(selectedImages);
  };

  return (
    <div className="captcha-container max-w-lg mx-auto p-6">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Select all images with
        </h3>
        <p className="text-base font-medium text-primary">
          {challenge.instruction.replace('Select all images containing ', '').replace('Select all images that ', '')}
        </p>
      </div>

      <div className="captcha-grid">
        {challenge.data.images.map((image: any) => (
          <div
            key={image.id}
            className={`captcha-tile overflow-hidden relative cursor-pointer ${
              selectedImages.includes(image.id) ? 'selected' : ''
            }`}
            onClick={() => toggleImage(image.id)}
            onMouseEnter={() => setIsHovering(image.id)}
            onMouseLeave={() => setIsHovering(null)}
          >
            <img
              src={imageMap[image.src]}
              alt={image.alt}
              className="w-full h-full object-cover"
            />
            {selectedImages.includes(image.id) && (
              <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-primary-foreground text-sm">✓</span>
                </div>
              </div>
            )}
            {isHovering === image.id && !selectedImages.includes(image.id) && (
              <div className="absolute inset-0 bg-captcha-hover/30" />
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 flex justify-between items-center">
        <button
          onClick={() => setSelectedImages([])}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          Skip
        </button>
        <button
          onClick={handleSubmit}
          disabled={selectedImages.length === 0}
          className="btn-verify"
        >
          Verify
        </button>
      </div>

      <div className="mt-4 text-center">
        <p className="text-xs text-muted-foreground">
          Click verify once there are none left
        </p>
      </div>
    </div>
  );
};