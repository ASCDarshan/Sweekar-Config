import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
} from "@mui/material";
import {
  Psychology,
  Gavel,
  LocalHospital,
  Work,
  Close,
} from "@mui/icons-material";
import BookConsultation from "../../components/Consultation/BookConsultation";
import ServiceCard from "./Services/ServiceCard";
import ServiceDetailDrawer from "./Services/ServiceDetailDrawer";
import ExpertsSection from "./Services/ExpertsSection";
import NeedHelp from "../../components/Needhelp/NeedHelp";
import ajaxCall from "../../helpers/ajaxCall";

const servicess = [
  {
    id: 1,
    category: "Mental Health",
    icon: <Psychology sx={{ fontSize: 40 }} />,
    shortDescription:
      "Professional mental health support in a safe environment",
    description:
      "Access professional mental health support specifically designed for LGBTQAI+ individuals and women. Our services ensure a safe, understanding, and confidential environment.",
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
      "Confidential Environment",
    ],
    color: "#9D84B7",
    stats: {
      professionals: 50,
      sessions: 1000,
      satisfaction: 98,
    },
  },
  {
    id: 2,
    category: "Legal Aid",
    icon: <Gavel sx={{ fontSize: 40 }} />,
    shortDescription: "Expert legal support for rights and justice",
    description:
      "Comprehensive legal assistance for protecting rights and ensuring justice for the LGBTQAI+ community and women.",
    features: [
      "Rights Advocacy",
      "Documentation Support",
      "Family Law",
      "Workplace Rights",
    ],
    benefits: [
      "Expert LGBTQAI+ Lawyers",
      "Pro-bono Services",
      "Complete Privacy",
      "Regular Workshops",
    ],
    color: "#7A5BA1",
    stats: {
      professionals: 30,
      cases: 500,
      success: 95,
    },
  },
  {
    id: 3,
    category: "Medical Services",
    icon: <LocalHospital sx={{ fontSize: 40 }} />,
    shortDescription: "Inclusive healthcare for your well-being",
    description:
      "Access to LGBTQAI+ friendly healthcare providers offering comprehensive medical services in a respectful environment.",
    features: [
      "General Healthcare",
      "Gender-affirming Care",
      "Sexual Health Services",
      "Regular Health Checkups",
    ],
    benefits: [
      "LGBTQAI+ Friendly Doctors",
      "Private Consultations",
      "Specialized Care Plans",
      "Inclusive Healthcare",
    ],
    color: "#FF6B6B",
    stats: {
      doctors: 40,
      patients: 2000,
      satisfaction: 97,
    },
  },
  {
    id: 4,
    category: "Placement Services",
    icon: <Work sx={{ fontSize: 40 }} />,
    shortDescription: "Career opportunities in inclusive workplaces",
    description:
      "Connect with LGBTQAI+ friendly employers and access career development resources for professional growth.",
    features: [
      "Job Placements",
      "Career Counseling",
      "Resume Building",
      "Interview Preparation",
    ],
    benefits: [
      "Verified Inclusive Employers",
      "Career Guidance",
      "Skill Development",
      "Networking Opportunities",
    ],
    color: "#4ECDC4",
    stats: {
      companies: 100,
      placements: 750,
      success: 92,
    },
  },
];

const Services = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(null);


  const fetchData = async (url, setData) => {
    try {
      const response = await ajaxCall(
        url,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "GET",
        },
        8000
      );
      if (response?.status === 200) {
        setData(response?.data || []);
      } else {
        console.error("Fetch error:", response);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  useEffect(() => {
    fetchData("professionals/professionaltype/", setServices);
  }, []);

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
          bgcolor: "primary.light",
          py: { xs: 6, md: 10 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            gutterBottom
            align="center"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              color: "primary.dark",
            }}
          >
            Our Services
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ maxWidth: "800px", mx: "auto", mb: 4 }}
          >
            Comprehensive support services designed for LGBTQAI+ individuals and
            women
          </Typography>
        </Container>
        <Box
          sx={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(157, 132, 183, 0.1)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -30,
            left: -30,
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: "rgba(157, 132, 183, 0.1)",
          }}
        />
      </Box>
      <Container
        maxWidth="lg"
        sx={{ mt: -6, mb: 4, position: "relative", zIndex: 1 }}
      >
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
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h6">
              Book {selectedService?.title} Consultation
              {/* {selectedExpert && ` with ${selectedExpert.name}`} */}
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

      <ExpertsSection
        selectedService={selectedService}
        onBookExpert={handleExpertBooking}
      />

      <NeedHelp />

    </Box>
  );
};

export default Services;
