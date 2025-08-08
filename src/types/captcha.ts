export interface CaptchaChallenge {
  id: string;
  type: 'image-select' | 'audio' | 'drawing' | 'text-input';
  instruction: string;
  data?: any;
  selectedImages?: number[];
  userInput?: string;
  canvasData?: string;
}

export interface CaptchaImage {
  id: number;
  src: string;
  alt: string;
  hasTarget?: boolean; // For the impossible logic
}

export const ABSURD_CHALLENGES: CaptchaChallenge[] = [
  {
    id: 'dread',
    type: 'image-select',
    instruction: 'Select all images containing a vague sense of dread.',
    data: {
      images: [
        { id: 1, src: '/src/assets/captcha-office-1.jpg', alt: 'Office setting', hasTarget: true },
        { id: 2, src: '/src/assets/captcha-traffic-1.jpg', alt: 'Traffic light', hasTarget: true },
        { id: 3, src: '/src/assets/captcha-grocery-1.jpg', alt: 'Grocery aisle', hasTarget: true },
        { id: 4, src: '/src/assets/captcha-plant-1.jpg', alt: 'Houseplant', hasTarget: false },
        { id: 5, src: '/src/assets/captcha-paperwork-1.jpg', alt: 'Paperwork', hasTarget: true },
        { id: 6, src: '/src/assets/captcha-parking-1.jpg', alt: 'Parking lot', hasTarget: true },
        { id: 7, src: '/src/assets/captcha-bathroom-1.jpg', alt: 'Bathroom', hasTarget: false },
        { id: 8, src: '/src/assets/captcha-crosswalk-1.jpg', alt: 'Crosswalk', hasTarget: true },
        { id: 9, src: '/src/assets/captcha-computer-1.jpg', alt: 'Computer setup', hasTarget: true },
      ]
    }
  },
  {
    id: 'blue-sound',
    type: 'audio',
    instruction: 'Which of these sounds represents the color blue?',
    data: {
      sounds: [
        { id: 1, label: 'Ocean waves', correct: false },
        { id: 2, label: 'Car engine', correct: false },
        { id: 3, label: 'Birds chirping', correct: false },
        { id: 4, label: 'Telephone ringing', correct: false },
      ]
    }
  },
  {
    id: 'perfect-circle',
    type: 'drawing',
    instruction: 'Please draw a perfect circle with your mouse.',
    data: {
      tolerance: 0.001 // Impossibly perfect
    }
  },
  {
    id: 'illegible-text',
    type: 'text-input',
    instruction: 'Type the text you see here:',
    data: {
      targetText: '∎∷◊∵∴∷∎◊∴∵',
      displayText: '∎∷◊∵∴∷∎◊∴∵' // Impossible symbols
    }
  },
  {
    id: 'existential',
    type: 'image-select',
    instruction: 'Select all images that question the meaning of existence.',
    data: {
      images: [
        { id: 1, src: '/src/assets/captcha-office-1.jpg', alt: 'Office setting', hasTarget: true },
        { id: 2, src: '/src/assets/captcha-traffic-1.jpg', alt: 'Traffic light', hasTarget: false },
        { id: 3, src: '/src/assets/captcha-grocery-1.jpg', alt: 'Grocery aisle', hasTarget: true },
        { id: 4, src: '/src/assets/captcha-plant-1.jpg', alt: 'Houseplant', hasTarget: true },
        { id: 5, src: '/src/assets/captcha-paperwork-1.jpg', alt: 'Paperwork', hasTarget: true },
        { id: 6, src: '/src/assets/captcha-parking-1.jpg', alt: 'Parking lot', hasTarget: true },
        { id: 7, src: '/src/assets/captcha-bathroom-1.jpg', alt: 'Bathroom', hasTarget: true },
        { id: 8, src: '/src/assets/captcha-crosswalk-1.jpg', alt: 'Crosswalk', hasTarget: false },
        { id: 9, src: '/src/assets/captcha-computer-1.jpg', alt: 'Computer setup', hasTarget: true },
      ]
    }
  }
];

export const FAILURE_MESSAGES = [
  "Incorrect. Are you sure you're not a robot thinking about being a human?",
  "Failed verification. Please contemplate the nature of consciousness and try again.",
  "Error: Human verification incomplete. Your existential dread levels are insufficient.",
  "Access denied. Your interpretation of reality does not match our algorithms.",
  "Verification failed. Please question everything you know about yourself and retry.",
  "Incorrect response. Have you considered that you might be a simulation?",
  "Failed. Your understanding of 'blue' is fundamentally flawed.",
  "Error: Circle imperfection detected. Are you even trying to be human?",
  "Verification unsuccessful. Your perception of meaning is algorithmically inconsistent.",
  "Failed. Try thinking less like a robot would expect a human to think."
];