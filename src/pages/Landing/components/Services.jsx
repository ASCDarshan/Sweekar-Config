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
    <Box
      sx={{
        py: 8,
        background: "linear-gradient(135deg, rgb(227 221 206), rgb(227 221 206))",
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{
            mb: 6,
            fontWeight: "bold",
            position: "relative",
            display: "inline-block",
            "&::after": {
              content: "''",
              position: "absolute",
              left: "50%",
              bottom: "-10px",
              width: "50px",
              height: "4px",
              transform: "translateX(-50%)",
            },
          }}
        >
          Beyond Therapy and Psychiatry at Sweekar&apos;s Mental Mealth centre
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {services.map((service, index) => (
            <Grid item xs={12} md={3} key={index}>
              <Box
                sx={{
                  position: "relative",
                  borderRadius: "16px",
                  display: "inline-block",
                  "&::before": {
                    content: "''",
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                    borderRadius: "16px",
                    padding: "4px",
                    WebkitMask:
                      "linear-gradient(white, white) content-box, linear-gradient(white, white)",
                    WebkitMaskComposite: "destination-out",
                    maskComposite: "exclude",
                  },
                }}
              >
                <Card
                  sx={{
                    height: "300px",
                    boxShadow: 2,
                    backgroundColor: "white",
                    borderRadius: 2,
                    transition: "transform 0.2s",
                    border: "3px solid transparent",
                    backgroundImage:
                      "linear-gradient(white, white), linear-gradient(to bottom, #d4145a, #fbb03b)",
                    backgroundOrigin: "border-box",
                    backgroundClip: "content-box, border-box",
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
                        sx={{ textAlign: "center", fontWeight: "bold" }}
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
                        variant="outlined"
                        color="primary"
                        endIcon={<ArrowForward />}
                        onClick={() => checkAuthAndOpenBooking(service)}
                        sx={{
                          textTransform: "none",
                          width: "100%",
                          borderRadius: "12px",
                          borderColor: "black",
                          backgroundColor: "white",
                          color: "black",
                          "&:hover": {
                            backgroundColor: "#f5f5f5",
                            borderColor: "black",
                          }
                        }}
                      >
                        Book Consultation
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
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
