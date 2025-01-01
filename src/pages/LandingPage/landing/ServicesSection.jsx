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

const services = [
  {
    title: "Medical Services",
    description:
      "Access to LGBTQAI+ friendly healthcare providers and medical professionals.",
    icon: "🏥",
  },
  {
    title: "Mental Health",
    description:
      "Connect with therapists and counselors who understand your unique needs.",
    icon: "🧠",
  },
  {
    title: "Legal Aid",
    description:
      "Find legal professionals committed to protecting your rights and dignity.",
    icon: "⚖️",
  },
  {
    title: "Placement Services",
    description: "Discover inclusive workplaces and employment opportunities.",
    icon: "💼",
  },
];

const ServicesSection = () => {
  const [openBooking, setOpenBooking] = useState(false);

  const handleOpenBooking = () => {
    console.log("Opening booking dialog");
    setOpenBooking(true);
  };

  const handleClose = () => {
    console.log("Closing booking dialog");
    setOpenBooking(false);
  };

  return (
    <Box sx={{ py: 8, backgroundColor: "#F6F1FF" }}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 6 }}>
          Beyond therapy and psychiatry at Sweekar's mental health centre
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
                }}
              >
                <CardContent>
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
                  <Box sx={{ display: "flex", justifyContent: "center" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      endIcon={<ArrowForward />}
                      onClick={handleOpenBooking}
                      sx={{
                        textTransform: "none",
                        mt: "auto",
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
            <BookConsultation />
          </DialogContent>
        </Dialog>
      </Container>
    </Box>
  );
};

export default ServicesSection;
