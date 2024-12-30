import { Box, Container, Typography, Grid, Fade, Slide } from '@mui/material';
import { useEffect, useState } from 'react';
import LocationSelector from './LocationSelector';

const HeroSection = () => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    setShowContent(true);
  }, []);

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #F6F1FF 0%, #E8E1FF 100%)',
        py: { xs: 3, md: 4 },
        position: 'relative',
        overflow: 'hidden',
        minHeight: '70vh',
        display: 'flex',
        alignItems: 'center'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Fade in={showContent} timeout={1000}>
              <Box>
                <Typography
                  variant="h2"
                  component="h1"
                  gutterBottom
                  sx={{
                    fontWeight: 700,
                    color: '#2D2D2D',
                    fontSize: { xs: '2rem', md: '2.75rem' },
                    lineHeight: 1.2,
                    mb: 2
                  }}
                >
                  Safe & Inclusive Professional Services for{' '}
                  <Box component="span" sx={{ color: 'primary.main' }}>
                    LGBTQAI+ & Women
                  </Box>
                </Typography>

                <Slide direction="up" in={showContent} timeout={1200}>
                  <Typography
                    variant="h6"
                    sx={{
                      color: '#666',
                      mb: 3,
                      fontWeight: 400,
                      lineHeight: 1.6
                    }}
                  >
                    Connect with verified, respectful, and compassionate service providers.
                  </Typography>
                </Slide>

                <Slide direction="up" in={showContent} timeout={1400}>
                  <Box sx={{ mb: 3 }}>
                    <LocationSelector />
                  </Box>
                </Slide>
              </Box>
            </Fade>
          </Grid>

          <Grid item xs={12} md={6}>
            <Fade in={showContent} timeout={2000}>
              <Box
                sx={{
                  height: '400px',
                  background: 'linear-gradient(135deg, #9D84B7 0%, #7A5BA1 100%)',
                  borderRadius: '20px',
                  position: 'relative',
                  overflow: 'hidden',
                  boxShadow: '0 20px 40px rgba(157, 132, 183, 0.2)',
                  transform: 'perspective(1000px) rotateY(-5deg)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'perspective(1000px) rotateY(0deg)',
                  }
                }}
              >
              </Box>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default HeroSection;