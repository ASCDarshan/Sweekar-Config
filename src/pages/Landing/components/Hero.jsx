import { Box, Container, Typography, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import LocationSelector from "./Location";
import LogoImg from "../../../assets/Sweekar.png";
import BackgroundImg from "../../../assets/HeroBanner.jpg";

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        backgroundImage: `url(${BackgroundImg})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        pt: { xs: 4, md: 6 },
        pb: { xs: 8, md: 10 },
      }}
    >
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid
          container
          spacing={{ xs: 3, md: 4 }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={12} md={6} sx={{ mb: { xs: 3, md: 0 } }}>
            <Box
              sx={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.8s ease-out",
                textAlign: { xs: "center", md: "left" },
              }}
            >
              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontWeight: 800,
                  color: "#2D2D2D",
                  fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" },
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  mb: 2,
                }}
              >
                <Box component="span" sx={{ display: "block", mb: 1 }}>
                  Safe & Inclusive{" "}
                  <Box
                    component="span"
                    sx={{
                      color: "#9D84B7",
                      position: "relative",
                      "&::after": {
                        content: '""',
                        position: "absolute",
                        width: "100%",
                        height: "30%",
                        bottom: 0,
                        left: 0,
                        backgroundColor: "rgba(157, 132, 183, 0.2)",
                        zIndex: -1,
                        borderRadius: "4px",
                      },
                    }}
                  >
                    Professional Services
                  </Box>
                </Box>
                for LGBTQAI+ & Women
              </Typography>

              <Typography
                variant="body1"
                sx={{
                  color: "#555",
                  mb: 3,
                  fontWeight: 400,
                  fontSize: { xs: "1rem", md: "1.4rem" },
                  lineHeight: 1.6,
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? "translateY(0)" : "translateY(20px)",
                  transition: "all 0.8s ease-out 0.2s",
                  textAlign: { xs: "center", md: "left" },
                }}
              >
                Connect with verified professionals in a safe, judgment-free
                environment tailored to your unique needs.
              </Typography>

              <Typography
                variant="subtitle1"
                sx={{
                  mb: 1,
                }}
              >
                Our Services
              </Typography>
              <Box
                sx={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? "translateY(0)" : "translateY(20px)",
                  transition: "all 0.8s ease-out 0.4s",
                  display: "flex",
                  justifyContent: { xs: "center", md: "flex-start" },
                }}
              >
                <LocationSelector />
              </Box>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={5}
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: { xs: "70%", sm: "50%", md: "70%" },
                maxHeight: { xs: "300px", md: "350px" },
                opacity: loaded ? 1 : 0,
                transform: loaded
                  ? "translateY(0) scale(1)"
                  : "translateY(40px) scale(0.95)",
                transition: "all 1s ease-out 0.3s",
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  width: "110%",
                  height: "110%",
                  border: "4px solid transparent",
                  background:
                    "linear-gradient(white, white) padding-box, linear-gradient(to bottom, #d4145a, #fbb03b) border-box",
                  borderRadius: "50%",
                  zIndex: 0,
                }}
              />
              <Box
                component="img"
                src={LogoImg}
                alt="Sweekar Logo"
                sx={{
                  position: "relative",
                  width: "90%",
                  height: "90%",
                  objectFit: "cover",
                  objectPosition: "center",
                  borderRadius: "20%",
                  backgroundClip: "content-box, border-box",
                  zIndex: 1,
                  overflow: "hidden",
                  transition: "transform 0.5s ease-out",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              />
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
