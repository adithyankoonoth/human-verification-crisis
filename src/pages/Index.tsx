import { HumanVerificationCrisis } from '@/components/HumanVerificationCrisis';
import { useEffect } from 'react';

const Index = () => {
  useEffect(() => {
    document.title = 'Human Verification Required - SecureAuth Portal';
  }, []);

  return <HumanVerificationCrisis />;
};

export default Index;
