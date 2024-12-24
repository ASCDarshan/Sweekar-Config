// src/pages/LandingPage.jsx
import { Box } from '@mui/material';
import AnnouncementBanner from '../components/landing/AnnouncementBanner';
import HeroSection from '../components/landing/HeroSection';
import ConcernsSection from '../components/landing/ConcernsSection';
import ServicesSection from '../components/landing/ServicesSection';
import FeaturesSection from '../components/landing/FeaturesSection';
import FAQSection from '../components/landing/FAQSection';
import VisionSection from '../components/landing/VisionSection';
import ImportanceSection from '../components/landing/ImportanceSection';

const LandingPage = () => {
  return (
    <Box sx={{ minHeight: '100vh', backgroundColor: '#fff' }}>
      {/* <AnnouncementBanner /> */}
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