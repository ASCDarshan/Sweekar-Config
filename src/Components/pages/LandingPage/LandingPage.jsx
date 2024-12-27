import { Box } from '@mui/material';
import HeroSection from './landing/HeroSection';
import ConcernsSection from './landing/ConcernsSection';
import ServicesSection from './landing/ServicesSection';
import FeaturesSection from './landing/FeaturesSection';
import FAQSection from './landing/FAQSection';
import VisionSection from './landing/VisionSection';
import ImportanceSection from './landing/ImportanceSection';

const LandingPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      <HeroSection />
      <VisionSection />
      <ImportanceSection />
      <ConcernsSection />
      <ServicesSection />
      <FeaturesSection />
      <FAQSection />
    </Box>
  );
};

export default LandingPage;