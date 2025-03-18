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
    <Box sx={{ py: 8, backgroundColor: "#F5F1E8", color: "#000" }}>
      <Container maxWidth="lg">
        <Typography
          variant="h4"
          align="left"
          gutterBottom
          sx={{
            mb: 6,
            fontWeight: 700,
            fontSize: "2.5rem",
          }}
        >
          What makes Sweekar unique?
        </Typography>
        <Grid container spacing={4}>
          {features.map((feature, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  backgroundColor: "transparent",
                  color: "#000",
                  boxShadow: "none",
                  textAlign: "left",
                }}
              >
                <CardContent sx={{ p: 0 }}>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{
                      position: "relative",
                      pb: 1,
                      mb: 2,
                      fontWeight: 700,
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        width: "50%",
                        height: "4px",
                        background:
                          "linear-gradient(to right, #d4145a, #fbb03b)",
                      },
                    }}
                  >
                    {feature.title}
                  </Typography>
                  <Typography variant="body1" sx={{ color: "#333" }}>
                    {feature.description}
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

export default Features;
