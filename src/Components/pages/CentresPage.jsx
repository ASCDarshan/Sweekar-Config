// src/pages/CentresPage.jsx
import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Fade,
  Slide,
  IconButton,
} from '@mui/material';
import {
  LocationOn,
  Phone,
  AccessTime,
  DirectionsWalk,
  ArrowForward,
  EventAvailable,
  Groups,
  Gavel,
  Psychology,
} from '@mui/icons-material';

const services = [
  {
    icon: <Psychology fontSize="large" />,
    title: "Mental Health Support",
    description: "Professional counseling and therapy services for LGBTQAI+ individuals and women"
  },
  {
    icon: <Gavel fontSize="large" />,
    title: "Legal Aid",
    description: "Legal assistance and guidance for addressing discrimination and rights protection"
  },
  {
    icon: <Groups fontSize="large" />,
    title: "Support Groups",
    description: "Regular community meetings and support group sessions"
  },
  {
    icon: <EventAvailable fontSize="large" />,
    title: "Scheduled Sessions",
    description: "Pre-scheduled professional consultations and appointments"
  }
];

const CentresPage = () => {

  return (
    <Box>
      <Box
        sx={{
          bgcolor: 'primary.light',
          py: { xs: 6, md: 10 },
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Container maxWidth="lg">
          <Fade in={true} timeout={1000}>
            <Typography
              variant="h2"
              align="center"
              sx={{
                fontWeight: 700,
                mb: 2,
                color: 'primary.dark',
                fontSize: { xs: '2.5rem', md: '3.5rem' },
              }}
            >
              Our Centre
            </Typography>
          </Fade>
          <Fade in={true} timeout={1500}>
            <Typography
              variant="h5"
              align="center"
              color="text.secondary"
              sx={{ maxWidth: '800px', mx: 'auto' }}
            >
              A safe and inclusive space for support, community building, and professional services
            </Typography>
          </Fade>
        </Container>

        <Box
          sx={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'rgba(157, 132, 183, 0.1)',
          }}
        />
      </Box>

      <Container maxWidth="lg" sx={{ mt: -6, mb: 8, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Slide direction="up" in={true} timeout={1000}>
              <Card elevation={3}>
                <CardMedia
                  component="img"
                  height="300"
                  image="/path/to/center-image.jpg"
                  alt="Sweekar Centre"
                />
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
                            Shri Maharani Chimnabai Stree Udyogalaya,<br />
                            Opp. Sursagar Lake,<br />
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
                    onClick={() => window.open('https://maps.google.com?q=Maharani+Chimnabai+Stree+Udyogalaya+Vadodara')}
                  >
                    Get Directions
                  </Button>
                </CardContent>
              </Card>
            </Slide>
          </Grid>

          <Grid item xs={12} md={6}>
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
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            transform: 'translateX(10px)',
                            bgcolor: 'primary.light',
                          }
                        }}
                      >
                        <CardContent>
                          <Grid container alignItems="center" spacing={2}>
                            <Grid item>
                              <IconButton
                                sx={{
                                  bgcolor: 'primary.light',
                                  '&:hover': { bgcolor: 'primary.main' }
                                }}
                              >
                                {service.icon}
                              </IconButton>
                            </Grid>
                            <Grid item xs>
                              <Typography variant="h6" gutterBottom>
                                {service.title}
                              </Typography>
                              <Typography variant="body2" color="text.secondary">
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
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" align="center" gutterBottom fontWeight="bold">
            Location
          </Typography>
          <Typography variant="body1" align="center" color="text.secondary" sx={{ mb: 4 }}>
            Find us at our centre opposite to Sursagar Lake
          </Typography>
          <Paper elevation={3} sx={{ height: 400, borderRadius: 4, overflow: 'hidden' }}>
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
        </Container>
      </Box>
    </Box>
  );
};

export default CentresPage;