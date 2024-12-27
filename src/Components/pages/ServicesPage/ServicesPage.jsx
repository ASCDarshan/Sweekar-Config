import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  useTheme,
  Dialog,
  DialogTitle,
  DialogContent,
} from '@mui/material';
import {
  Psychology,
  Gavel,
  LocalHospital,
  Work,
  Close,
} from '@mui/icons-material';
import BookConsultation from '../../consultation/BookConsultation';
import ServiceCard from './Services/ServiceCard';
import ServiceDetailDrawer from './Services/ServiceDetailDrawer';
import ExpertsSection from './Services/ExpertsSection';
import NeedHelp from '../../common/NeedHelp';

const services = [
  {
    id: 1,
    category: "Mental Health",
    icon: <Psychology sx={{ fontSize: 40 }} />,
    shortDescription: "Professional mental health support in a safe environment",
    description: "Access professional mental health support specifically designed for LGBTQAI+ individuals and women. Our services ensure a safe, understanding, and confidential environment.",
    features: [
      "Individual Counseling",
      "Group Support Sessions",
      "Crisis Intervention",
      "Family Counseling",
    ],
    benefits: [
      "24/7 Emergency Support",
      "Online & In-person Sessions",
      "Specialized LGBTQAI+ Expertise",
      "Confidential Environment"
    ],
    color: "#9D84B7",
    stats: {
      professionals: 50,
      sessions: 1000,
      satisfaction: 98
    }
  },
  {
    id: 2,
    category: "Legal Aid",
    icon: <Gavel sx={{ fontSize: 40 }} />,
    shortDescription: "Expert legal support for rights and justice",
    description: "Comprehensive legal assistance for protecting rights and ensuring justice for the LGBTQAI+ community and women.",
    features: [
      "Rights Advocacy",
      "Documentation Support",
      "Family Law",
      "Workplace Rights"
    ],
    benefits: [
      "Expert LGBTQAI+ Lawyers",
      "Pro-bono Services",
      "Complete Privacy",
      "Regular Workshops"
    ],
    color: "#7A5BA1",
    stats: {
      professionals: 30,
      cases: 500,
      success: 95
    }
  },
  {
    id: 3,
    category: "Medical Services",
    icon: <LocalHospital sx={{ fontSize: 40 }} />,
    shortDescription: "Inclusive healthcare for your well-being",
    description: "Access to LGBTQAI+ friendly healthcare providers offering comprehensive medical services in a respectful environment.",
    features: [
      "General Healthcare",
      "Gender-affirming Care",
      "Sexual Health Services",
      "Regular Health Checkups"
    ],
    benefits: [
      "LGBTQAI+ Friendly Doctors",
      "Private Consultations",
      "Specialized Care Plans",
      "Inclusive Healthcare"
    ],
    color: "#FF6B6B",
    stats: {
      doctors: 40,
      patients: 2000,
      satisfaction: 97
    }
  },
  {
    id: 4,
    category: "Placement Services",
    icon: <Work sx={{ fontSize: 40 }} />,
    shortDescription: "Career opportunities in inclusive workplaces",
    description: "Connect with LGBTQAI+ friendly employers and access career development resources for professional growth.",
    features: [
      "Job Placements",
      "Career Counseling",
      "Resume Building",
      "Interview Preparation"
    ],
    benefits: [
      "Verified Inclusive Employers",
      "Career Guidance",
      "Skill Development",
      "Networking Opportunities"
    ],
    color: "#4ECDC4",
    stats: {
      companies: 100,
      placements: 750,
      success: 92
    }
  }
];

const ServicesPage = () => {
  const theme = useTheme();
  const [selectedService, setSelectedService] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(null);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setDetailOpen(true);
  };

  const handleBookingOpen = (service) => {
    setSelectedService(service);
    setSelectedExpert(null);
    setBookingOpen(true);
  };

  const handleExpertBooking = (expert) => {
    setSelectedExpert(expert);
    setBookingOpen(true);
  };

  const handleBookingClose = () => {
    setBookingOpen(false);
    setSelectedExpert(null);
  };

  return (
    <Box>
      <Box
        sx={{
          background: `linear-gradient(45deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          py: 8,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: 'white',
              mb: 3
            }}
          >
            Our Services
          </Typography>
          <Typography
            variant="h5"
            align="center"
            sx={{
              maxWidth: 800,
              mx: 'auto',
              mb: 4,
              color: 'rgba(255, 255, 255, 0.9)'
            }}
          >
            Comprehensive support services designed for LGBTQAI+ individuals and women
          </Typography>
        </Container>

        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
          }}
        />
      </Box>

      <Container maxWidth="lg" sx={{ mt: -6, mb: 4, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={3}>
          {services.map((service) => (
            <Grid item xs={12} md={6} lg={3} key={service.id}>
              <ServiceCard
                service={service}
                onSelect={handleServiceSelect}
                onBooking={handleBookingOpen}
                isSelected={selectedService?.id === service.id}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      <ExpertsSection
        selectedService={selectedService}
        onBookExpert={handleExpertBooking}
      />

      <NeedHelp />

      <ServiceDetailDrawer
        service={selectedService}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        onBooking={handleBookingOpen}
      />

      <Dialog
        open={bookingOpen}
        onClose={handleBookingClose}
        maxWidth="md"
        fullWidth
        scroll="paper"
      >
        <DialogTitle>
          <Box display="flex" justifyContent="space-between" alignItems="center">
            <Typography variant="h6">
              Book {selectedService?.category} Consultation
              {selectedExpert && ` with ${selectedExpert.name}`}
            </Typography>
            <IconButton
              edge="end"
              color="inherit"
              onClick={handleBookingClose}
              aria-label="close"
            >
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers>
          <BookConsultation
            preSelectedService={selectedService}
            preSelectedExpert={selectedExpert}
          />
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default ServicesPage;