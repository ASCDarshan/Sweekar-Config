import { Box, Container, Typography, Grid, Card, CardContent, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

const services = [
  {
    title: "Medical Services",
    description: "Access to LGBTQAI+ friendly healthcare providers and medical professionals.",
    icon: "🏥"
  },
  {
    title: "Mental Health",
    description: "Connect with therapists and counselors who understand your unique needs.",
    icon: "🧠"
  },
  {
    title: "Legal Aid",
    description: "Find legal professionals committed to protecting your rights and dignity.",
    icon: "⚖️"
  },
  {
    title: "Placement Services",
    description: "Discover inclusive workplaces and employment opportunities.",
    icon: "💼"
  }
];
const ServicesSection = () => {

  return (
    <Box sx={{ py: 8, backgroundColor: '#F6F1FF' }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="center"
          gutterBottom
          sx={{ mb: 6 }}
        >
          Beyond therapy and psychiatry at Sweekar&apos;s mental health centre
        </Typography>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: '100%',
                  boxShadow: 2,
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  }
                }}
              >
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    {service.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {service.description}
                  </Typography>
                  <Button
                    endIcon={<ArrowForward />}
                    sx={{
                      textTransform: 'none',
                      '&:hover': {
                        backgroundColor: 'rgba(0, 0, 0, 0.04)'
                      }
                    }}
                  >
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default ServicesSection;