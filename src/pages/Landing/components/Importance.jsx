import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import { useInView } from "react-intersection-observer";
import BackgroundImg from "../../../assets/HeroBanner.jpg";

const keyPoints = [
  {
    title: "Ensuring Accessibility",
    description:
      "One-stop platform to find trusted providers without the guesswork.",
    icon: "🎯",
  },
  {
    title: "Promoting Safety & Respect",
    description:
      "All listed resources have signed a pledge to treat users with dignity.",
    icon: "🤝",
  },
  {
    title: "Building Community Confidence",
    description:
      "Encouraging marginalized groups to seek help without fear of prejudice.",
    icon: "💪",
  },
];

const Importance = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <Box
      ref={ref}
      sx={{
        py: 8,
        backgroundImage: `url(${BackgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        overflow: "hidden",
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
            color: "#000",
          }}
        >
          The Importance of Sweekar
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {keyPoints.map((point, index) => (
            <Grid item xs={12} sm={10} md={3.5} key={index}>
              <Card
                sx={{
                  height: "auto",
                  minHeight: 280,
                  backgroundColor: "white",
                  boxShadow: 2,
                  borderRadius: 2,
                  border: "3px solid transparent",
                  backgroundImage:
                    "linear-gradient(white, white), linear-gradient(to bottom, #d4145a, #fbb03b)",
                  backgroundOrigin: "border-box",
                  backgroundClip: "content-box, border-box",
                  transition: "transform 0.3s ease-in-out",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <CardContent sx={{ p: 4, textAlign: "center" }}>
                  <Typography variant="h2" sx={{ mb: 2, fontSize: "3rem" }}>
                    {point.icon}
                  </Typography>
                  <Typography
                    variant="h6"
                    gutterBottom
                    sx={{ fontWeight: 700, color: "#000" }}
                  >
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

export default Importance;
