import {
  Container,
  Grid,
  Typography,
  Button,
  CardContent,
  Box,
  IconButton,
  Paper,
  Card,
  useTheme,
  alpha,
  Avatar,
  Badge,
  Chip,
  Drawer,
} from "@mui/material";
import {
  AccessTime,
  ArrowForward,
  Close,
  Gavel,
  LocationOn,
  MedicalServices,
  PhoneOutlined,
  Psychology,
  Schedule,
  VideocamOutlined,
  Work,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import BookConsultation from "../../Consultation/BookConsultation";
import ajaxCall from "../../../helpers/ajaxCall";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ClientDashboardShimmer from "../../UI/ClientDashboardShimmer";
import backgroundImage from "../../../assets/HeroBanner.jpg";

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);
const MotionCard = motion(Card);

const services = [
  {
    id: 1,
    title: "Mental Health",
    description:
      "Connect with therapists and counselors who understand your unique needs.",
    icon: <Psychology fontSize="large" />,
    color: "#6A5ACD",
  },
  {
    id: 2,
    title: "Legal Aid",
    description:
      "Find legal professionals committed to protecting your rights and dignity.",
    icon: <Gavel fontSize="large" />,
    color: "#F4A259",
  },
  {
    id: 3,
    title: "Medical Services",
    description:
      "Access to LGBTQAI+ friendly healthcare providers and medical professionals.",
    icon: <MedicalServices fontSize="large" />,
    color: "#4DAA57",
  },
  {
    id: 4,
    title: "Placement Services",
    description: "Discover inclusive workplaces and employment opportunities.",
    icon: <Work fontSize="large" />,
    color: "#5899E2",
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      duration: 0.5,
    },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 12,
    },
  },
};

const generateBackgroundElements = (count) => {
  return Array.from({ length: count }).map((_, index) => ({
    id: index,
    size: Math.floor(Math.random() * 300) + 100,
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100),
    opacity: Math.random() * 0.08 + 0.02,
    duration: Math.random() * 40 + 20,
    delay: Math.random() * 5,
  }));
};

const filterUpcomingSessions = (consultations) => {
  const currentDateTime = new Date();

  const futureConsultations = consultations.filter((consultation) => {
    const consultationDateTime = new Date(consultation.scheduled_time);
    return (
      consultationDateTime > currentDateTime &&
      consultation.status !== "CANCELLED"
    );
  });

  futureConsultations.sort((a, b) => {
    return new Date(a.scheduled_time) - new Date(b.scheduled_time);
  });

  return futureConsultations.slice(0, 1);
};

const getConsultationTypeIcon = (type) => {
  switch (type?.toLowerCase()) {
    case "video":
      return <VideocamOutlined />;
    case "phone":
      return <PhoneOutlined />;
    default:
      return <LocationOn />;
  }
};

const formatDateTime = (dateString) => {
  const date = new Date(dateString);
  const today = new Date();
  const tomorrow = new Date(today);
  tomorrow.setDate(tomorrow.getDate() + 1);

  let prefix = "";
  if (date.toDateString() === today.toDateString()) {
    prefix = "Today";
  } else if (date.toDateString() === tomorrow.toDateString()) {
    prefix = "Tomorrow";
  }

  const formattedDate = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return prefix
    ? `${prefix}, ${formattedTime}`
    : `${formattedDate}, ${formattedTime}`;
};

const Client = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("loginInfo")).user;
  const [service, setService] = useState([]);
  const [openBooking, setOpenBooking] = useState(false);
  const [upcomingConsultations, setUpcomingconsultations] = useState([]);
  const [userName, setUserName] = useState();
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  const fetchData = async (url, setData) => {
    setLoading(true);
    try {
      const response = await ajaxCall(
        url,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
              }`,
          },
          method: "GET",
        },
        8000
      );
      if (response?.status === 200) {
        setData(response?.data || []);
      } else {
        console.error("Fetch error:", response);
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(
      `consultations/consultation-client/?user=${userId}`,
      setUpcomingconsultations
    );
    fetchData(`clients/profile-user/?user=${userId}`, setUserName);
  }, [count, userId]);

  const handleOpenBooking = (service) => {
    setService(service);
    setOpenBooking(true);
  };

  const handleClose = () => {
    setOpenBooking(false);
  };

  const handleViewDetails = (consultationId) => {
    navigate(`/consultation/${consultationId}`);
  };

  const bgElements = generateBackgroundElements(6);
  const filteredConsultations = filterUpcomingSessions(upcomingConsultations);

  if (loading) {
    return <ClientDashboardShimmer />;
  }

  return (
    <MotionBox
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        pt: { xs: 2, md: 4 },
        pb: 8,
        overflow: "hidden",
      }}
    >
      {bgElements.map((el) => (
        <MotionBox
          key={el.id}
          sx={{
            position: "fixed",
            width: el.size,
            height: el.size,
            borderRadius: "50%",
            background: "linear-gradient(145deg, #D8CCFF, #B5A6FF)",
            filter: "blur(60px)",
            left: `${el.x}%`,
            top: `${el.y}%`,
            opacity: el.opacity,
            zIndex: 0,
          }}
          animate={{
            x: ["-20px", "20px", "-20px"],
            y: ["-30px", "30px", "-30px"],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: el.delay,
          }}
        />
      ))}

      <Container
        maxWidth="lg"
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <MotionPaper
          elevation={2}
          variants={itemVariants}
          sx={{
            p: { xs: 3, md: 4 },
            mb: 4,
            borderRadius: 3,
            background: `rgb(227 221 206)`,
            color: "black",
            backdropFilter: "blur(10px)",
            boxShadow: "0 10px 30px rgba(106, 90, 205, 0.15)",
          }}
        >
          <Grid container spacing={2} alignItems="center">
            <Grid item>
              <MotionBox
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring" }}
              >
                <Avatar
                  sx={{
                    width: 56,
                    height: 56,
                    bgcolor: "white",
                    color: theme.palette.primary.main,
                    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                  }}
                >
                  {userName?.user?.username?.charAt(0).toUpperCase() || "U"}
                </Avatar>
              </MotionBox>
            </Grid>
            <Grid item xs>
              <Typography variant="h4" component="h1" fontWeight="bold">
                Welcome back, {userName?.user?.username || "User"}
              </Typography>
              <Typography variant="subtitle1" sx={{ opacity: 0.9, mt: 0.5 }}>
                Your wellness journey continues here
              </Typography>
            </Grid>
            {filteredConsultations.length > 0 && (
              <Grid item>
                <Chip
                  color="secondary"
                  icon={<Schedule />}
                  label={`Next session: ${formatDateTime(
                    filteredConsultations[0].scheduled_time
                  )}`}
                  sx={{
                    py: 1,
                    px: 1,
                    height: "auto",
                    "& .MuiChip-label": {
                      px: 1,
                      fontWeight: 500,
                    },
                  }}
                />
              </Grid>
            )}
          </Grid>
        </MotionPaper>

        <Grid container spacing={4}>
          <Grid item xs={12} md={7}>
            <MotionBox variants={itemVariants}>
              <Typography
                variant="h5"
                component="h2"
                fontWeight="600"
                sx={{
                  mb: 3,
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                }}
              >
                <Badge
                  badgeContent={filteredConsultations.length}
                  color="primary"
                  sx={{
                    "& .MuiBadge-badge": {
                      fontSize: "0.75rem",
                      height: 18,
                      minWidth: 18,
                    },
                  }}
                >
                  <Schedule color="primary" />
                </Badge>
                Upcoming Consultations
              </Typography>

              {filteredConsultations.length > 0 ? (
                <Grid container spacing={2}>
                  {filteredConsultations.map((consultation, index) => (
                    <Grid item xs={12} key={consultation.id}>
                      <MotionCard
                        elevation={1}
                        variants={itemVariants}
                        whileHover={{
                          y: -5,
                          boxShadow: "0 10px 30px rgba(106, 90, 205, 0.15)",
                        }}
                        sx={{
                          borderRadius: 3,
                          transition: "box-shadow 0.3s, transform 0.2s",
                          overflow: "visible",
                          position: "relative",
                          background: "white",
                          backdropFilter: "blur(10px)",
                          border: "3px solid transparent",
                          backgroundImage: `linear-gradient(white, white), 
                      linear-gradient(to bottom, #d4145a, #fbb03b)`,
                          backgroundOrigin: "border-box",
                          backgroundClip: "padding-box, border-box",
                        }}
                      >
                        {index === 0 && (
                          <Chip
                            size="small"
                            label="Next Up"
                            color="secondary"
                            sx={{
                              position: "absolute",
                              top: -10,
                              left: 16,
                              fontWeight: 600,
                              height: 24,
                            }}
                          />
                        )}
                        <CardContent
                          sx={{ px: 3, pt: index === 0 ? 3 : 2, pb: 2 }}
                        >
                          <Grid container spacing={2} alignItems="center">
                            <Grid item xs={12} sm={7}>
                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  mb: 1.5,
                                }}
                              >
                                <Avatar
                                  sx={{
                                    bgcolor: theme.palette.primary.light,
                                    width: 36,
                                    height: 36,
                                    mr: 1.5,
                                  }}
                                >
                                  {consultation.professional_name
                                    ?.charAt(0)
                                    .toUpperCase() || "P"}
                                </Avatar>
                                <Box>
                                  <Typography
                                    variant="h6"
                                    sx={{
                                      fontSize: "1.05rem",
                                      fontWeight: 600,
                                    }}
                                  >
                                    {consultation.professional_name}
                                  </Typography>
                                  <Typography
                                    variant="body2"
                                    color="text.secondary"
                                    sx={{
                                      display: "flex",
                                      alignItems: "center",
                                      gap: 0.5,
                                    }}
                                  >
                                    {getConsultationTypeIcon(
                                      consultation.consultation_type
                                    )}
                                    {consultation.consultation_type ||
                                      "In-person"}{" "}
                                    Session
                                  </Typography>
                                </Box>
                              </Box>

                              <Box
                                sx={{
                                  display: "flex",
                                  alignItems: "center",
                                  gap: 1,
                                }}
                              >
                                <AccessTime fontSize="small" color="action" />
                                <Typography
                                  variant="body2"
                                  color="text.secondary"
                                >
                                  {formatDateTime(consultation.scheduled_time)}
                                </Typography>
                              </Box>
                            </Grid>

                            <Grid
                              item
                              xs={12}
                              sm={5}
                              sx={{
                                display: "flex",
                                justifyContent: {
                                  xs: "flex-start",
                                  sm: "flex-end",
                                },
                              }}
                            >
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() =>
                                  handleViewDetails(consultation.id)
                                }
                                sx={{
                                  borderRadius: 8,
                                  px: 2,
                                  py: 1,
                                  textTransform: "none",
                                  fontWeight: 500,
                                  boxShadow:
                                    "0 5px 15px rgba(106, 90, 205, 0.2)",
                                }}
                              >
                                View Details
                              </Button>
                            </Grid>
                          </Grid>
                        </CardContent>
                      </MotionCard>
                    </Grid>
                  ))}
                </Grid>
              ) : (
                <MotionCard
                  elevation={0}
                  variants={itemVariants}
                  sx={{
                    borderRadius: 3,
                    bgcolor: alpha(theme.palette.primary.light, 0.1),
                    border: `1px dashed ${alpha(
                      theme.palette.primary.main,
                      0.3
                    )}`,
                    p: 3,
                    textAlign: "center",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "rgba(255, 255, 255, 0.4)",
                    backdropFilter: "blur(10px)",
                  }}
                >
                  <Schedule
                    sx={{
                      fontSize: 60,
                      mb: 2,
                      color: alpha(theme.palette.primary.main, 0.7),
                    }}
                  />
                  <Typography variant="h6" color="text.primary" gutterBottom>
                    No Upcoming Consultations
                  </Typography>
                  <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mb: 2, maxWidth: 400, mx: "auto" }}
                  >
                    You don&apos;t have any sessions scheduled. Book a
                    consultation to start your wellness journey!
                  </Typography>
                </MotionCard>
              )}
            </MotionBox>
          </Grid>

          <Grid item xs={12} md={5}>
            <MotionBox variants={itemVariants}>
              <Typography
                variant="h5"
                component="h2"
                fontWeight="600"
                sx={{ mb: 3 }}
              >
                Book a Consultation
              </Typography>

              <Grid container spacing={2}>
                {services.map((service) => (
                  <Grid item xs={12} sm={6} key={service.id}>
                    <MotionCard
                      elevation={1}
                      variants={itemVariants}
                      whileHover={{
                        y: -10,
                        boxShadow: `0 15px 30px rgba(${service.color === "#6A5ACD"
                          ? "106, 90, 205"
                          : service.color === "#4DAA57"
                            ? "77, 170, 87"
                            : service.color === "#F4A259"
                              ? "244, 162, 89"
                              : "88, 153, 226"
                          }, 0.2)`,
                      }}
                      sx={{
                        height: "100%",
                        borderRadius: 3,
                        transition: "transform 0.3s, box-shadow 0.3s",
                        display: "flex",
                        flexDirection: "column",
                        overflow: "hidden",
                        background: "white",
                        backdropFilter: "blur(10px)",
                        border: "3px solid transparent",
                        backgroundImage: `linear-gradient(white, white), 
                      linear-gradient(to bottom, #d4145a, #fbb03b)`,
                        backgroundOrigin: "border-box",
                        backgroundClip: "padding-box, border-box",
                      }}
                    >
                      <Box
                        sx={{
                          p: 2,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          bgcolor: alpha(service.color, 0.1),
                        }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: service.color,
                            color: "white",
                            width: 56,
                            height: 56,
                            boxShadow: `0 5px 15px ${alpha(
                              service.color,
                              0.4
                            )}`,
                          }}
                        >
                          {service.icon}
                        </Avatar>
                      </Box>
                      <CardContent sx={{ flexGrow: 1, pt: 2 }}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          sx={{
                            textAlign: "center",
                            fontWeight: 600,
                            color: service.color,
                          }}
                        >
                          {service.title}
                        </Typography>
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ mb: 2, textAlign: "center" }}
                        >
                          {service.description}
                        </Typography>
                        <Box sx={{ display: "flex", justifyContent: "center" }}>
                          <Button
                            variant="contained"
                            color="primary"
                            endIcon={<ArrowForward />}
                            sx={{
                              textTransform: "none",
                              fontWeight: 500,
                              borderRadius: 8,
                              px: 2,
                              boxShadow: `0 5px 15px ${alpha(
                                service.color,
                                0.3
                              )}`,
                              bgcolor: service.color,
                              "&:hover": {
                                bgcolor: alpha(service.color, 0.9),
                              },
                            }}
                            onClick={() => handleOpenBooking(service)}
                          >
                            Book Now
                          </Button>
                        </Box>
                      </CardContent>
                    </MotionCard>
                  </Grid>
                ))}
              </Grid>
            </MotionBox>
          </Grid>
        </Grid>

        <Drawer
          anchor="right"
          open={openBooking}
          onClose={handleClose}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            "& .MuiBackdrop-root": {
              backgroundColor: alpha(theme.palette.common.black, 0.6),
              backdropFilter: "blur(3px)",
            },
            "& .MuiDrawer-paper": {
              width: { xs: "100%", sm: "520px", md: "620px" },
              borderTopLeftRadius: { xs: "30px", sm: "30px" },
              borderBottomLeftRadius: { xs: 0, sm: "30px" },
              height: { xs: "100%", sm: "94%" },
              maxHeight: { xs: "100%", sm: "94%" },
              top: { xs: 0, sm: "3%" },
              boxShadow:
                "0 12px 32px rgba(0,0,0,0.15), 0 2px 12px rgba(0,0,0,0.08)",
              overflow: "hidden",
            },
          }}
        >
          <Box
            sx={{
              position: "relative",
              overflow: "hidden",
              background: service?.color
                ? `linear-gradient(135deg, ${service.color}, ${alpha(
                  service.color,
                  0.8
                )})`
                : `linear-gradient(135deg, ${theme.palette.primary.main
                }, ${alpha(theme.palette.primary.dark, 0.85)})`,
              color: theme.palette.common.white,
              pt: 6,
              pb: 7,
            }}
          >
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                opacity: 0.1,
                backgroundImage: `
                  radial-gradient(circle at 20% 30%, ${theme.palette.common.white} 0%, transparent 40%),
                  radial-gradient(circle at 80% 70%, ${theme.palette.common.white} 0%, transparent 30%)
                `,
              }}
            />

            <Box
              sx={{
                position: "absolute",
                top: -10,
                right: -10,
                width: 120,
                height: 120,
                borderRadius: "50%",
                background: alpha(theme.palette.common.white, 0.1),
              }}
            />
            <Box
              sx={{
                position: "absolute",
                bottom: -30,
                left: -30,
                width: 150,
                height: 150,
                borderRadius: "50%",
                background: alpha(theme.palette.common.white, 0.1),
              }}
            />

            <IconButton
              onClick={handleClose}
              aria-label="close"
              sx={{
                position: "absolute",
                top: 12,
                right: 12,
                color: theme.palette.common.white,
                bgcolor: alpha(theme.palette.common.white, 0.15),
                backdropFilter: "blur(4px)",
                "&:hover": {
                  bgcolor: alpha(theme.palette.common.white, 0.25),
                },
                zIndex: 10,
              }}
            >
              <Close />
            </IconButton>

            <Box
              sx={{
                position: "relative",
                zIndex: 1,
                textAlign: "center",
                px: 4,
              }}
            >
              {service?.icon && (
                <Avatar
                  sx={{
                    mx: "auto",
                    bgcolor: theme.palette.common.white,
                    color: service.color || theme.palette.primary.main,
                    width: 80,
                    height: 80,
                    mb: 2.5,
                    boxShadow: `0 8px 25px ${alpha(
                      theme.palette.common.black,
                      0.2
                    )}`,
                  }}
                >
                  {service.icon}
                </Avatar>
              )}

              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Book {service?.title || "a Consultation"}
              </Typography>
              <Typography
                variant="body1"
                sx={{ opacity: 0.9, maxWidth: "90%", mx: "auto" }}
              >
                {service?.description ||
                  "Find the right professional for your specific needs"}
              </Typography>
            </Box>

            <Box
              sx={{
                position: "absolute",
                bottom: -2,
                left: 0,
                width: "100%",
                height: "40px",
                overflow: "hidden",
                zIndex: 2,
              }}
            >
              <svg
                viewBox="0 0 500 150"
                preserveAspectRatio="none"
                style={{ height: "100%", width: "100%" }}
              >
                <path
                  d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
                  style={{
                    stroke: "none",
                    fill: theme.palette.background.paper,
                  }}
                ></path>
              </svg>
            </Box>
          </Box>

          <Box
            sx={{
              px: { xs: 2, sm: 4 },
              py: 4,
              height: "calc(100% - 220px)",
              overflow: "auto",
              "&::-webkit-scrollbar": {
                width: "8px",
              },
              "&::-webkit-scrollbar-track": {
                background: alpha(theme.palette.primary.light, 0.1),
                borderRadius: "8px",
              },
              "&::-webkit-scrollbar-thumb": {
                background: alpha(theme.palette.primary.main, 0.2),
                borderRadius: "8px",
              },
            }}
          >
            <BookConsultation
              preSelectedExpertType={service?.id}
              setCount={setCount}
              onClose={handleClose}
            />
          </Box>

          <Box
            sx={{
              position: "sticky",
              bottom: 0,
              left: 0,
              right: 0,
              py: 2,
              px: 3,
              borderTop: `1px solid ${theme.palette.mode === "dark"
                ? theme.palette.primary.dark
                : theme.palette.primary.light
                }`,
              background: theme.palette.background.paper,
              zIndex: 3,
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={handleClose}
              sx={{
                textTransform: "none",
                fontWeight: 500,
                borderRadius: 8,
                px: 3,
              }}
            >
              Cancel
            </Button>
          </Box>
        </Drawer>
      </Container>
    </MotionBox>
  );
};

export default Client;
