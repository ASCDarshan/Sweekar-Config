import {
  Container,
  Grid,
  Typography,
  Button,
  Card,
  CardContent,
  Box,
  IconButton,
  Divider,
} from "@mui/material";
import { ArrowForward, Close, Schedule } from "@mui/icons-material";
import { useEffect, useState } from "react";
import BookConsultation from "../../Consultation/BookConsultation";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import ajaxCall from "../../../helpers/ajaxCall";
import DashboardShimmer from "../../UI/DashboardShimmer";
import { useNavigate } from "react-router-dom";

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

const Client = () => {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("loginInfo")).user;
  const [service, setService] = useState([]);
  const [openBooking, setOpenBooking] = useState(false);
  const [upcomingConsultations, setUpcomingconsultations] = useState([]);
  const [userName, setUserName] = useState();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const handleOpenBooking = (service) => {
    setService(service);
    setOpenBooking(true);
  };

  const handleClose = () => {
    setOpenBooking(false);
  };

  const handleViewDetails = (consultationId) => {
    navigate(`/consultation/${consultationId}`);
  };

  const filterUpcomingSessions = (consultations) => {
    const currentDateTime = new Date();

    const futureConsultations = consultations.filter((consultation) => {
      const consultationDateTime = new Date(consultation.scheduled_time);
      return (
        consultationDateTime > currentDateTime &&
        consultation.status !== "CANCELLED"
      );
    });

    futureConsultations.sort((a, b) => {
      return new Date(a.scheduled_time) - new Date(b.scheduled_time);
    });

    return futureConsultations.slice(0, 1);
  };

  const fetchData = async (url, setData) => {
    setLoading(true);
    try {
      const response = await ajaxCall(
        url,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
              }`,
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
    fetchData(
      `consultations/consultation-client/?user=${userId}`,
      setUpcomingconsultations
    );
    fetchData(`clients/profile-user/?user=${userId}`, setUserName);
  }, [count, userId]);

  const filteredConsultations = filterUpcomingSessions(upcomingConsultations);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <DashboardShimmer />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom mb={4}>
        Welcome <b>{userName?.user?.username}</b>
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Box sx={{ mb: 4 }}>
            <Card>
              <CardContent>
                <Schedule color="primary" sx={{ fontSize: 40 }} />
                <Typography variant="h6" component="div">
                  Next Upcoming Session
                </Typography>
                <Typography variant="h4">
                  {filteredConsultations.length}
                </Typography>
              </CardContent>
            </Card>
          </Box>

          <Typography variant="h6" gutterBottom>
            Next Consultation
          </Typography>
          <Grid container spacing={2} mt={2}>
            {filteredConsultations.length > 0 ? (
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography variant="h6">
                      {filteredConsultations[0].professional_name}
                    </Typography>
                    <Typography color="textSecondary">
                      {new Date(
                        filteredConsultations[0].scheduled_time
                      ).toLocaleString()}
                    </Typography>
                    <Typography variant="body2">
                      Type: {filteredConsultations[0].consultation_type}
                    </Typography>
                  </CardContent>

                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', p: 2 }}>
                    <Button
                      variant="contained"
                      color="primary"
                      sx={{
                        textTransform: "none",
                        fontSize: "0.75rem",
                        py: 0.5,
                      }}
                      onClick={() => handleViewDetails(filteredConsultations[0]?.id)}
                    >
                      View Consultation
                    </Button>
                  </Box>
                </Card>
              </Grid>
            ) : (
              <Grid item xs={12}>
                <Card>
                  <CardContent>
                    <Typography
                      variant="body1"
                      textAlign="center"
                      color="text.secondary"
                    >
                      No upcoming consultations. Book a consultation to get
                      started!
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            )}
          </Grid>
        </Grid>

        <Grid item xs={12} md={1}>
          <Divider
            orientation="vertical"
            flexItem
            sx={{ mx: "auto", height: "100%" }}
          />
        </Grid>

        <Grid item xs={12} md={5}>
          <Typography variant="h5" gutterBottom>
            Book Consultation
          </Typography>

          <Grid container spacing={2}>
            {services.map((service, index) => (
              <Grid item xs={12} sm={6} key={index}>
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
                        fontSize: "2rem",
                        mb: 1,
                        textAlign: "center",
                      }}
                    >
                      {service.icon}
                    </Typography>
                    <Typography
                      variant="h6"
                      gutterBottom
                      sx={{ textAlign: "center", fontSize: "1rem" }}
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ mb: 1, textAlign: "center", fontSize: "0.875rem" }}
                    >
                      {service.description}
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <Button
                        variant="contained"
                        color="primary"
                        endIcon={<ArrowForward />}
                        sx={{
                          textTransform: "none",
                          mt: "auto",
                          fontSize: "0.75rem",
                          py: 0.5,
                        }}
                        onClick={() => handleOpenBooking(service)}
                      >
                        Book Consultation
                      </Button>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <SwipeableDrawer
        anchor="right"
        open={openBooking}
        onClose={handleClose}
        onOpen={() => setOpenBooking(true)}
        sx={{
          "& .MuiDrawer-paper": {
            width: { xs: "100%", sm: "60%", md: "50%" },
            minHeight: "100vh",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            p: 2,
            borderBottom: "1px solid rgba(0, 0, 0, 0.12)",
          }}
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
        <Box sx={{ p: 2 }}>
          <BookConsultation
            preSelectedExpertType={service?.id}
            setCount={setCount}
            onClose={handleClose}
          />
        </Box>
      </SwipeableDrawer>
    </Container>
  );
};

export default Client;
