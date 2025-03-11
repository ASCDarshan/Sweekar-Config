import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Slide,
  IconButton,
} from "@mui/material";
import {
  LocationOn,
  Phone,
  AccessTime,
  DirectionsWalk,
  ArrowForward,
} from "@mui/icons-material";

const services = [
  {
    id: 1,
    title: "Medical Services",
    description:
      "Access to LGBTQAI+ friendly healthcare providers and medical professionals.",
    icon: "🏥",
  },
  {
    id: 2,
    title: "Mental Health",
    description:
      "Connect with therapists and counselors who understand your unique needs.",
    icon: "🧠",
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
const Centres = () => {
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
            Our Centre
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ maxWidth: "800px", mx: "auto", mb: 4 }}
          >
            A safe and inclusive space for support, community building, and
            professional services
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
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Slide direction="up" in={true} timeout={1000}>
              <Card elevation={3}>
                <Paper
                  elevation={3}
                  sx={{ height: 200, borderRadius: "0px", overflow: "hidden" }}
                >
                  <iframe
                    src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1845.6838688858468!2d73.203417!3d22.301928!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc5f564000001%3A0x209077d9d0bca2cf!2sSHREE%20MAHARANI%20CHIMNABAI%20STREE%20UDYOGALAYA!5e0!3m2!1sen!2sin!4v1734520014817!5m2!1sen!2sin"
                    width="100%"
                    height="100%"
                    style={{ border: 0 }}
                    allowFullScreen=""
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                  />
                </Paper>
                <CardContent sx={{ p: 4 }}>
                  <Typography variant="h4" gutterBottom fontWeight="bold">
                    Main Centre
                  </Typography>

                  <List>
                    <ListItem>
                      <ListItemIcon>
                        <LocationOn color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" fontWeight="medium">
                            Address
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1" color="text.secondary">
                            Shri Maharani Chimnabai Stree Udyogalaya,
                            <br />
                            Opp. Sursagar Lake,
                            <br />
                            Vadodara. 390001
                          </Typography>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <Phone color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" fontWeight="medium">
                            Contact
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1" color="text.secondary">
                            (+91) 85111 26808
                          </Typography>
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemIcon>
                        <AccessTime color="primary" />
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography variant="subtitle1" fontWeight="medium">
                            Working Hours
                          </Typography>
                        }
                        secondary={
                          <Typography variant="body1" color="text.secondary">
                            Monday - Saturday: 9:00 AM - 6:00 PM
                          </Typography>
                        }
                      />
                    </ListItem>
                  </List>
                  <Button
                    variant="contained"
                    startIcon={<DirectionsWalk />}
                    fullWidth
                    sx={{ mt: 2 }}
                    onClick={() =>
                      window.open(
                        "https://maps.google.com?q=Maharani+Chimnabai+Stree+Udyogalaya+Vadodara"
                      )
                    }
                  >
                    Get Directions
                  </Button>
                </CardContent>
              </Card>
            </Slide>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card elevation={3}>
              <CardContent sx={{ p: 4 }}>
                <Slide direction="up" in={true} timeout={1500}>
                  <Box>
                    <Typography variant="h4" gutterBottom fontWeight="bold">
                      Available Services
                    </Typography>
                    <Grid container spacing={2}>
                      {services.map((service, index) => (
                        <Grid item xs={12} key={index}>
                          <Card
                            elevation={2}
                            sx={{
                              transition: "all 0.3s ease",
                              "&:hover": {
                                transform: "translateX(10px)",
                                bgcolor: "primary.light",
                              },
                            }}
                          >
                            <CardContent>
                              <Grid container alignItems="center" spacing={2}>
                                <Grid item>
                                  <IconButton
                                    sx={{
                                      bgcolor: "primary.light",
                                      "&:hover": { bgcolor: "primary.main" },
                                    }}
                                  >
                                    {service.icon}
                                  </IconButton>
                                </Grid>
                                <Grid item xs>
                                  <Typography variant="h6" gutterBottom>
                                    {service.title}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                  >
                                    {service.description}
                                  </Typography>
                                </Grid>
                                <Grid item>
                                  <ArrowForward color="primary" />
                                </Grid>
                              </Grid>
                            </CardContent>
                          </Card>
                        </Grid>
                      ))}
                    </Grid>
                  </Box>
                </Slide>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Box sx={{ bgcolor: "grey.100", py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            fontWeight="bold"
          >
            Location
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Find us at our centre opposite to Sursagar Lake
          </Typography>
          <Paper
            elevation={3}
            sx={{ height: 400, borderRadius: 4, overflow: "hidden" }}
          >
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1845.6838688858468!2d73.203417!3d22.301928!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc5f564000001%3A0x209077d9d0bca2cf!2sSHREE%20MAHARANI%20CHIMNABAI%20STREE%20UDYOGALAYA!5e0!3m2!1sen!2sin!4v1734520014817!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Paper>
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
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Centres;
