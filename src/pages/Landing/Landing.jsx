import { Box } from "@mui/material";
import HeroSection from "./components/Hero";
import ConcernsSection from "./components/Concerns";
import ServicesSection from "./components/Services";
import FeaturesSection from "./components/Features";
import FAQSection from "./components/FAQ";
import VisionSection from "./components/Vision";
import ImportanceSection from "./components/Importance";

const Landing = () => {
  return (
    <Box>
      <HeroSection />
      <VisionSection />
      <ServicesSection />
      <ImportanceSection />
      <ConcernsSection />
      <FeaturesSection />
      <FAQSection />
    </Box>
  );
};

export default Landing;
