import { Box, Container, Typography, Grid, Card, CardContent, Fade } from '@mui/material';
import { useInView } from 'react-intersection-observer';

const visionPoints = [
  {
    title: "LGBTQAI+ Community & Women Focus",
    description: "Community members often face unique challenges accessing safe and inclusive services.",
    icon: "🌈"
  },
  {
    title: "Bridging Service Gaps",
    description: "Lack of easily accessible verified resources can lead to discrimination and poor experiences.",
    icon: "🌉"
  },
  {
    title: "Centralized Directory",
    description: "Offering a centralized, vetted directory of compassionate and inclusive service providers.",
    icon: "📚"
  }
];

const Vision = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <Box
      ref={ref}
      sx={{
        py: 8,
        backgroundColor: 'primary.light',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="lg">
        <Fade in={inView} timeout={1000}>
          <Box>
            <Typography
              variant="h3"
              align="center"
              gutterBottom
              sx={{
                fontWeight: 700,
                mb: 6,
                color: 'primary.dark'
              }}
            >
              Why Sweekar? – The Vision
            </Typography>
            <Grid container spacing={4}>
              {visionPoints.map((point, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Fade in={inView} timeout={1000 + (index * 200)}>
                    <Card
                      sx={{
                        height: '100%',
                        backgroundColor: 'white',
                        boxShadow: 2,
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          transition: 'transform 0.3s ease-in-out'
                        }
                      }}
                    >
                      <CardContent sx={{ p: 4 }}>
                        <Typography variant="h1" sx={{ mb: 2, fontSize: '3rem' }}>
                          {point.icon}
                        </Typography>
                        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                          {point.title}
                        </Typography>
                        <Typography variant="body1" color="text.secondary">
                          {point.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Fade>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Fade>
      </Container>
    </Box>
  );
};

export default Vision;
