import { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from "@mui/material";
import { ArrowForward, Close } from "@mui/icons-material";
import BookConsultation from "../../../components/Consultation/BookConsultation";
import { toast } from "react-toastify";

const services = [
  {
    id: 1,
    title: "Mental Health",
    description:
      "Connect with therapists and counselors who understand your unique needs.",
    icon: "🧠",
  },
  {
    id: 2,
    title: "Medical Services",
    description:
      "Access to LGBTQAI+ friendly healthcare providers and medical professionals.",
    icon: "🏥",
  },
  {
    id: 3,
    title: "Legal Aid",
    description:
      "Find legal professionals committed to protecting your rights and dignity.",
    icon: "⚖️",
  },
  {
    id: 4,
    title: "Placement Services",
    description: "Discover inclusive workplaces and employment opportunities.",
    icon: "💼",
  },
];

const Services = () => {
  const [openBooking, setOpenBooking] = useState(false);
  const [service, setService] = useState({});

  const checkAuthAndOpenBooking = (service) => {
    const accessToken = JSON.parse(
      localStorage.getItem("loginInfo")
    )?.accessToken;

    if (accessToken) {
      setService(service);
      setOpenBooking(true);
    } else {
      toast.error("You need to be logged in to book a consultation. Please sign in to continue.");
      setOpenBooking(false);
    }
  };

  const handleClose = () => {
    setOpenBooking(false);
  };

  return (
    <Box sx={{ py: 8, backgroundColor: "#F6F1FF" }}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 6 }}>
          Beyond therapy and psychiatry at Sweekar&apos;s mental health centre
        </Typography>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} md={3} key={index}>
              <Card
                sx={{
                  height: "100%",
                  boxShadow: 2,
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <CardContent
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <Box>
                    <Typography
                      variant="h2"
                      sx={{
                        fontSize: "3rem",
                        mb: 2,
                        textAlign: "center",
                      }}
                    >
                      {service.icon}
                    </Typography>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ textAlign: "center" }}
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 2, textAlign: "center" }}
                    >
                      {service.description}
                    </Typography>
                  </Box>
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={<ArrowForward />}
                      onClick={() => checkAuthAndOpenBooking(service)}
                      sx={{
                        textTransform: "none",
                        width: "100%",
                      }}
                    >
                      Book Consultation
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
        <Dialog
          open={openBooking}
          onClose={handleClose}
          maxWidth="md"
          fullWidth
          scroll="paper"
          sx={{
            "& .MuiDialog-paper": {
              minHeight: "80vh",
            },
          }}
        >
          <DialogTitle>
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">Book a Consultation</Typography>
              <IconButton
                edge="end"
                color="inherit"
                onClick={handleClose}
                aria-label="close"
              >
                <Close />
              </IconButton>
            </Box>
          </DialogTitle>
          <DialogContent dividers>
            <BookConsultation preSelectedExpertType={service?.id} />
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
};

export default Services;
