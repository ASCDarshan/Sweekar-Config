import { Box, Container, Typography, Grid, Card, CardContent, Fade } from '@mui/material';
import { useInView } from 'react-intersection-observer';

const keyPoints = [
  {
    title: "Ensuring Accessibility",
    description: "One-stop platform to find trusted providers without the guesswork.",
    icon: "🎯"
  },
  {
    title: "Promoting Safety & Respect",
    description: "All listed resources have signed a pledge to treat users with dignity.",
    icon: "🤝"
  },
  {
    title: "Building Community Confidence",
    description: "Encouraging marginalized groups to seek help without fear of prejudice.",
    icon: "💪"
  }
];

const ImportanceSection = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <Box
      ref={ref}
      sx={{
        py: 8,
        background: 'linear-gradient(135deg, #F6F1FF 0%, #E8E1FF 100%)',
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
                mb: 6
              }}
            >
              The Importance of Sweekar
            </Typography>

            <Grid container spacing={4}>
              {keyPoints.map((point, index) => (
                <Grid item xs={12} md={4} key={index}>
                  <Fade in={inView} timeout={1000 + (index * 200)}>
                    <Card
                      sx={{
                        height: '100%',
                        background: 'white',
                        boxShadow: 'none',
                        border: '1px solid',
                        borderColor: 'primary.light',
                        borderRadius: 4,
                        '&:hover': {
                          borderColor: 'primary.main',
                          transform: 'translateY(-5px)',
                          transition: 'all 0.3s ease-in-out'
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

export default ImportanceSection;