import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { Psychology, Security, People } from "@mui/icons-material";

const features = [
  {
    icon: <Psychology />,
    title: "Highly qualified experts",
    description:
      "Our therapists and psychiatrists are qualified & internationally trained to deliver quality care.",
  },
  {
    icon: <Security />,
    title: "Focus on confidentiality",
    description:
      "We uphold the highest standards of data security and maintain 100% client confidentiality.",
  },
  {
    icon: <People />,
    title: "Empathy & understanding",
    description:
      "Being collaborators in your care, we are committed to understanding your concerns.",
  },
];
const Features = () => {
  
  return (
    <Box sx={{ py: 8, backgroundColor: "#2C1810", color: "white" }}>
      <Container maxWidth="lg">
        <Typography variant="h4" align="center" gutterBottom sx={{ mb: 6 }}>
          What makes Sweekar unique?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  backgroundColor: "transparent",
                  color: "white",
                  boxShadow: "none",
                  textAlign: "center",
                }}
              >
                <CardContent>
                  <Box
                    sx={{
                      backgroundColor: "rgba(255,255,255,0.1)",
                      width: 80,
                      height: 80,
                      borderRadius: "50%",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      margin: "0 auto 20px",
                      "& svg": {
                        fontSize: 40,
                      },
                    }}
                  >
                    {feature.icon}
                  </Box>
                  <Typography variant="h6" gutterBottom>
                    {feature.title}
                  </Typography>
                  <Typography>{feature.description}</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;
