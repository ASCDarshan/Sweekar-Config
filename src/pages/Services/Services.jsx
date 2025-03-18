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
  Fade,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { toast } from "react-toastify";
import BookConsultation from "../../components/Consultation/BookConsultation";
import ServiceCard from "./Services/ServiceCard";
import ServiceDetailDrawer from "./Services/ServiceDetailDrawer";
import ExpertsSection from "./Services/ExpertsSection";
import NeedHelp from "../../components/Needhelp/NeedHelp";
import ajaxCall from "../../helpers/ajaxCall";
import ServiceShimmer from "../../components/UI/ServiceShimmer";

const Services = () => {
  const [services, setServices] = useState([]);
  const [selectedService, setSelectedService] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [bookingOpen, setBookingOpen] = useState(false);
  const [selectedExpert, setSelectedExpert] = useState(null);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

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
  }, [count]);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
  };

  const handleDetailOpen = (service) => {
    setSelectedService(service);
    setDetailOpen(true);
  };

  const checkAuthAndOpenBooking = (service) => {
    const accessToken = JSON.parse(
      localStorage.getItem("loginInfo")
    )?.accessToken;

    if (accessToken) {
      setSelectedService(service);
      setSelectedExpert(null);
      setBookingOpen(true);
    } else {
      toast.error(
        "You need to be logged in to book a consultation. Please sign in to continue."
      );
      setBookingOpen(false);
    }
  };

  const checkAuthAndOpenExpertBooking = (expert) => {
    const accessToken = JSON.parse(
      localStorage.getItem("loginInfo")
    )?.accessToken;

    if (accessToken) {
      setSelectedExpert(expert);
      setBookingOpen(true);
    } else {
      toast.error(
        "You need to be logged in to book a consultation. Please sign in to continue."
      );
      setBookingOpen(false);
    }
  };

  const handleBookingClose = () => {
    setBookingOpen(false);
    setSelectedExpert(null);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Box sx={{ mb: 6 }}>
          <ServiceShimmer />
        </Box>
      </Container>
    );
  }

  return (
    <Box>
      <Box
        sx={{
          bgcolor: "#f5f1e8",
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
                isSelected={selectedService?.id === service.id}
                onDetailOpen={handleDetailOpen}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      <ServiceDetailDrawer
        service={selectedService}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
        onBooking={checkAuthAndOpenBooking}
      />

      <Dialog
        open={bookingOpen}
        onClose={handleBookingClose}
        maxWidth="md"
        fullWidth
        scroll="paper"
        PaperProps={{
          sx: {
            borderRadius: 3,
            boxShadow: "0 25px 50px rgba(0, 0, 0, 0.3)",
            overflow: "hidden",
          },
        }}
        TransitionComponent={Fade}
        TransitionProps={{ timeout: 500 }}
      >
        <DialogTitle
          sx={{
            p: 3,
            background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            color: "white",
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Typography variant="h5" sx={{ fontWeight: 600 }}>
              Book {selectedService?.title} Consultation
              {selectedExpert && ` with ${selectedExpert?.user?.username}`}
            </Typography>
            <IconButton
              edge="end"
              sx={{ color: "white" }}
              onClick={handleBookingClose}
              aria-label="close"
            >
              <Close />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent dividers sx={{ p: 0 }}>
          <BookConsultation
            preSelectedExpert={selectedExpert}
            preSelectedExpertType={selectedService?.id}
            onClose={handleBookingClose}
            setCount={setCount}
          />
        </DialogContent>
      </Dialog>

      {selectedService && (
        <ExpertsSection
          selectedService={selectedService}
          onBookExpert={checkAuthAndOpenExpertBooking}
        />
      )}

      <NeedHelp />
    </Box>
  );
};

export default Services;
