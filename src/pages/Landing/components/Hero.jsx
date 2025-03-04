import { Box, Container, Typography, Grid, Button } from "@mui/material";
import { useEffect, useState } from "react";
import LocationSelector from "./Location";
import BackgroundImg from "../../../assets/BackgroundImg.jpeg";
import { ArrowForward, CheckCircleOutline } from "@mui/icons-material";

const Hero = () => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    setLoaded(true);
  }, []);

  const benefits = [
    "Inclusive, supportive community",
    "Verified professionals",
    "Safe, confidential services",
  ];

  return (
    <Box
      sx={{
        position: "relative",
        overflow: "hidden",
        background: "linear-gradient(135deg, #F3EDFF 0%, #E0D6FA 100%)",
        pt: { xs: 6, md: 8 },
        pb: { xs: 10, md: 12 },
      }}
    >
      <Box
        sx={{
          position: "absolute",
          width: "50vw",
          height: "50vw",
          borderRadius: "50%",
          background:
            "linear-gradient(135deg, rgba(157, 132, 183, 0.2) 0%, rgba(157, 132, 183, 0.05) 100%)",
          top: "-25vw",
          right: "-15vw",
          zIndex: 0,
        }}
      />
      <Box
        sx={{
          position: "absolute",
          width: "30vw",
          height: "30vw",
          borderRadius: "50%",
          background:
            "linear-gradient(135deg, rgba(157, 132, 183, 0.15) 0%, rgba(157, 132, 183, 0.03) 100%)",
          bottom: "-10vw",
          left: "-10vw",
          zIndex: 0,
        }}
      />

      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 1 }}>
        <Grid
          container
          spacing={{ xs: 4, md: 6 }}
          alignItems="center"
          justifyContent="space-between"
        >
          <Grid item xs={12} md={6} sx={{ mb: { xs: 4, md: 0 } }}>
            <Box
              sx={{
                opacity: loaded ? 1 : 0,
                transform: loaded ? "translateY(0)" : "translateY(20px)",
                transition: "all 0.8s ease-out",
              }}
            >
              <Box
                sx={{
                  display: "inline-flex",
                  alignItems: "center",
                  bgcolor: "rgba(157, 132, 183, 0.15)",
                  px: 2,
                  py: 0.75,
                  borderRadius: 20,
                  mb: 3,
                }}
              >
                <Typography
                  variant="subtitle2"
                  sx={{
                    color: "#9D84B7",
                    fontWeight: 600,
                    letterSpacing: 0.5,
                  }}
                >
                  Safe & Supportive Community
                </Typography>
              </Box>

              <Typography
                variant="h1"
                component="h1"
                sx={{
                  fontWeight: 800,
                  color: "#2D2D2D",
                  fontSize: { xs: "2.5rem", sm: "3rem", md: "3.5rem" },
                  lineHeight: 1.1,
                  letterSpacing: "-0.02em",
                  mb: 3,
                }}
              >
                <Box component="span" sx={{ display: "block", mb: 1 }}>
                  Empowering{" "}
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
                    Services
                  </Box>
                </Box>
                for LGBTQAI+ & Women
              </Typography>

              <Typography
                variant="h6"
                sx={{
                  color: "#555",
                  mb: 4,
                  fontWeight: 400,
                  fontSize: { xs: "1rem", md: "1.125rem" },
                  lineHeight: 1.6,
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? "translateY(0)" : "translateY(20px)",
                  transition: "all 0.8s ease-out 0.2s",
                }}
              >
                Connect with verified professionals in a safe, judgment-free
                environment tailored to your unique needs.
              </Typography>

              <Box
                sx={{
                  mb: 4,
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? "translateY(0)" : "translateY(20px)",
                  transition: "all 0.8s ease-out 0.3s",
                }}
              >
                {benefits.map((benefit, index) => (
                  <Box
                    key={index}
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      mb: 1.5,
                    }}
                  >
                    <CheckCircleOutline
                      sx={{
                        mr: 1.5,
                        color: "#9D84B7",
                        fontSize: "1.25rem",
                      }}
                    />
                    <Typography
                      variant="body1"
                      sx={{
                        fontWeight: 500,
                        color: "#444",
                      }}
                    >
                      {benefit}
                    </Typography>
                  </Box>
                ))}
              </Box>

              <Box
                sx={{
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? "translateY(0)" : "translateY(20px)",
                  transition: "all 0.8s ease-out 0.4s",
                }}
              >
                <LocationSelector />
              </Box>

              <Box
                sx={{
                  mt: 3,
                  display: "flex",
                  gap: 2,
                  alignItems: "center",
                  opacity: loaded ? 1 : 0,
                  transform: loaded ? "translateY(0)" : "translateY(20px)",
                  transition: "all 0.8s ease-out 0.5s",
                }}
              >
                <Button
                  variant="contained"
                  size="large"
                  endIcon={<ArrowForward />}
                  sx={{
                    bgcolor: "#9D84B7",
                    color: "#fff",
                    px: 3,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 600,
                    boxShadow: "0 8px 20px rgba(157, 132, 183, 0.3)",
                    "&:hover": {
                      bgcolor: "#8A75A0",
                      boxShadow: "0 10px 25px rgba(157, 132, 183, 0.4)",
                    },
                    transition: "all 0.3s ease",
                  }}
                >
                  Find Services
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  sx={{
                    borderColor: "#9D84B7",
                    color: "#9D84B7",
                    px: 3,
                    py: 1.5,
                    borderRadius: 2,
                    textTransform: "none",
                    fontSize: "1rem",
                    fontWeight: 600,
                    borderWidth: 2,
                    "&:hover": {
                      borderWidth: 2,
                      borderColor: "#8A75A0",
                      bgcolor: "rgba(157, 132, 183, 0.05)",
                    },
                  }}
                >
                  Learn More
                </Button>
              </Box>
            </Box>
          </Grid>

          <Grid
            item
            xs={12}
            md={5}
            sx={{ display: "flex", justifyContent: "center" }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: { xs: "85%", sm: "70%", md: "100%" },
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
                  top: { xs: "-5%", md: "-8%" },
                  right: { xs: "-10%", md: "-15%" },
                  width: "70%",
                  height: "60%",
                  borderRadius: 4,
                  background:
                    "linear-gradient(145deg, #e7defb 0%, #C8B8E5 100%)",
                  boxShadow: "0 20px 60px rgba(157, 132, 183, 0.15)",
                  transform: "rotate(-5deg)",
                  zIndex: 0,
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  bottom: { xs: "-5%", md: "-8%" },
                  left: { xs: "-10%", md: "-15%" },
                  width: "70%",
                  height: "60%",
                  borderRadius: 4,
                  background:
                    "linear-gradient(145deg, #F8F5FF 0%, #EEE7FF 100%)",
                  boxShadow: "0 20px 60px rgba(157, 132, 183, 0.1)",
                  transform: "rotate(5deg)",
                  zIndex: 0,
                }}
              />

              <Box
                sx={{
                  position: "relative",
                  height: {
                    xs: "300px",
                    sm: "350px",
                    md: "400px",
                    lg: "450px",
                  },
                  width: "100%",
                  backgroundImage: `url(${BackgroundImg})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  borderRadius: 6,
                  boxShadow: "0 20px 50px rgba(157, 132, 183, 0.25)",
                  zIndex: 1,
                  overflow: "hidden",
                  "&::after": {
                    content: '""',
                    position: "absolute",
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                    background:
                      "linear-gradient(180deg, rgba(157, 132, 183, 0) 0%, rgba(157, 132, 183, 0.1) 100%)",
                    zIndex: 2,
                  },
                  transition: "transform 0.5s ease-out",
                  "&:hover": {
                    transform: "scale(1.02)",
                  },
                }}
              />

              <Box
                sx={{
                  position: "absolute",
                  top: "15%",
                  right: "-30px",
                  backgroundColor: "#fff",
                  borderRadius: "16px",
                  padding: "12px 20px",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                  zIndex: 3,
                  display: { xs: "none", md: "block" },
                  animation: "pulse 2s infinite",
                  "@keyframes pulse": {
                    "0%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(-10px)" },
                    "100%": { transform: "translateY(0px)" },
                  },
                }}
              >
                <Typography fontWeight={600} color="#9D84B7">
                  200+ Professionals
                </Typography>
              </Box>

              <Box
                sx={{
                  position: "absolute",
                  bottom: "15%",
                  left: "-30px",
                  backgroundColor: "#fff",
                  borderRadius: "16px",
                  padding: "12px 20px",
                  boxShadow: "0 8px 20px rgba(0, 0, 0, 0.1)",
                  zIndex: 3,
                  display: { xs: "none", md: "block" },
                  animation: "pulse2 2.2s infinite",
                  "@keyframes pulse2": {
                    "0%": { transform: "translateY(0px)" },
                    "50%": { transform: "translateY(10px)" },
                    "100%": { transform: "translateY(0px)" },
                  },
                  animationDelay: "0.3s",
                }}
              >
                <Typography fontWeight={600} color="#9D84B7">
                  50+ Cities
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Hero;
