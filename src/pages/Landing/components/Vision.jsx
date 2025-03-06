import { Box, Container, Typography, Grid, Card, CardContent } from '@mui/material';
import { useInView } from 'react-intersection-observer';

const visionPoints = [
  {
    title: "LGBTQAI+ & Women Focus",
    description: "Community members often face unique challenges accessing safe and inclusive services.",
    icon: "⚧️"
  },
  {
    title: "Bridging Service Gaps",
    description: "Lack of easily accessible verified resources can lead to discrimination and poor experiences.",
    icon: "🤝"
  },
  {
    title: "Centralized Directory",
    description: "Offering a centralized, vetted directory of compassionate and inclusive service providers.",
    icon: "📖"
  }
];

const Vision = () => {
  const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.1 });

  return (
    <Box
      ref={ref}
      sx={{
        py: 8,
        background: 'linear-gradient(to bottom,rgb(243 240 232),rgb(243 240 232))',
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="left"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 4,
            color: '#000'
          }}
        >
          Why Sweekar?
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {visionPoints.map((point, index) => (
            <Grid item xs={12} sm={10} md={3.5} key={index}>
              <Card
                sx={{
                  height: 'auto',
                  minHeight: 280,
                  backgroundColor: 'white',
                  boxShadow: 2,
                  borderRadius: 2,
                  border: '3px solid transparent',
                  backgroundImage: 'linear-gradient(white, white), linear-gradient(to bottom, #d4145a, #fbb03b)',
                  backgroundOrigin: 'border-box',
                  backgroundClip: 'content-box, border-box',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-5px)'
                  }
                }}
              >
                <CardContent sx={{ p: 4, textAlign: 'center' }}>
                  <Typography variant="h2" sx={{ mb: 2, fontSize: '3rem' }}>
                    {point.icon}
                  </Typography>
                  <Typography variant="h6" gutterBottom sx={{ fontWeight: 700, color: '#000' }}>
                    {point.title}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {point.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Vision;
