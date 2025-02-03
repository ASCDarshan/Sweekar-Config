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
  CircularProgress,
} from "@mui/material";
import {
  Close,
} from "@mui/icons-material";
import BookConsultation from "../../components/Consultation/BookConsultation";
import ServiceCard from "./Services/ServiceCard";
import ServiceDetailDrawer from "./Services/ServiceDetailDrawer";
import ExpertsSection from "./Services/ExpertsSection";
import NeedHelp from "../../components/Needhelp/NeedHelp";
import ajaxCall from "../../helpers/ajaxCall";

const Services = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [loading, setLoading] = useState(true);

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
    } finally {
      setLoading(false);
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

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

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
            preSelectedExpert={selectedExpert}
            preSelectedExpertType={selectedService?.id}
            onClose={handleBookingClose}
          />
        </DialogContent>
      </Dialog>

      {selectedService && (
        <ExpertsSection
          selectedService={selectedService}
          onBookExpert={handleExpertBooking}
        />
      )}

      <NeedHelp />

    </Box>
  );
};

export default Services;
