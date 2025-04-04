import {
  Container,
  Paper,
  Grid,
  Avatar,
  Typography,
  Box,
  Chip,
  Stack,
  Button,
  alpha,
  Tab,
  Tabs,
  useTheme,
  IconButton,
  Grid2,
  Tooltip,
} from "@mui/material";
import {
  Language,
  LocationOn,
  AccessTime,
  EmojiEvents,
  VerifiedUser,
  Edit,
  Psychology,
  Info,
  Work,
  PhoneOutlined,
  PersonOutlined,
  CalendarMonth,
  VideocamOutlined,
} from "@mui/icons-material";
import ajaxCall from "../../../helpers/ajaxCall";
import { useEffect, useState } from "react";
import ProfessionalUpdateDrawer from "./ProfessionalUpdateDrawer";
import UserProfileShimmer from "../../UI/UserProfileShimmer";
import CallIcon from "@mui/icons-material/Call";
import Concern from "./Update-Professional-Component/Concern";
import { TabContext, TabPanel } from "@mui/lab";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import backgroundImage from "../../../assets/HeroBanner.jpg";

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);
const MotionAvatar = motion(Avatar);
const MotionTypography = motion(Typography);

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

const ProfessionalProfileDisplay = () => {
  const theme = useTheme();
  const userId = JSON.parse(localStorage.getItem("loginInfo")).user;
  const user = JSON.parse(localStorage.getItem("loginInfo"));
  const navigate = useNavigate();
  const [expert, setExpert] = useState({});
  const [openUpdateDrawer, setOpenUpdateDrawer] = useState(false);
  const [loading, setLoading] = useState(true);
  const [tabValue, setTabValue] = useState("1");
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
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("loginInfo")).accessToken
              }`,
          },
          method: "GET",
        },
        8000
      );
      if (response?.status === 200) {
        setData(response?.data || {});
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
    fetchData(`professionals/professional-user/?user=${userId}`, setExpert);
  }, [userId, count]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const generateRandomElements = (count) => {
    return Array.from({ length: count }).map((_, index) => ({
      id: index,
      size: Math.floor(Math.random() * 80) + 40,
      x: Math.floor(Math.random() * 100),
      y: Math.floor(Math.random() * 100),
      opacity: Math.random() * 0.2 + 0.1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
  };

  const expertName = `${expert?.user?.first_name || ""} ${expert?.user?.last_name || ""
    }`;

  const backgroundElements = generateRandomElements(5);
  const bgElements = generateBackgroundElements(6);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <UserProfileShimmer />
      </Container>
    );
  }

  return (
    <>
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
            elevation={0}
            variants={itemVariants}
            sx={{
              borderRadius: 4,
              overflow: "hidden",
              position: "relative",
              mb: 4,
              border: "1px solid",
              borderColor: alpha(theme.palette.divider, 0.1),
              background: "transparent",
            }}
          >
            <Box
              sx={{
                height: 220,
                background: "rgb(227 221 206)",
                position: "relative",
                overflow: "hidden",
              }}
            ></Box>
            {backgroundElements.map((el) => (
              <MotionBox
                key={el.id}
                sx={{
                  position: "absolute",
                  width: el.size,
                  height: el.size,
                  borderRadius: "50%",
                  background: "rgba(175, 169, 238, 0.1)",
                  filter: "blur(8px)",
                  left: `${el.x}%`,
                  top: `${el.y}%`,
                  opacity: el.opacity,
                  zIndex: 0,
                }}
                animate={{
                  x: ["-20px", "20px", "-20px"],
                  y: ["-30px", "30px", "-30px"],
                  rotate: [0, 360],
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

            <Box
              sx={{
                bgcolor: "background.paper",
                borderRadius: { md: "30px 30px 0 0" },
                mt: -5,
                position: "relative",
                pb: 3,
              }}
            >
              <Grid2 container spacing={3}>
                <Grid2 item="true" xs={12} md={6}>
                  <Box sx={{ display: "flex", px: { xs: 2, md: 4 }, pt: 4 }}>
                    <MotionAvatar
                      initial={{ y: 30, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: 0.3,
                        type: "spring",
                        stiffness: 100,
                      }}
                      src={expert.image}
                      sx={{
                        width: { xs: 100, md: 130 },
                        height: { xs: 100, md: 130 },
                        fontSize: "3rem",
                        bgcolor: "primary.main",
                        mb: 2,
                        mt: { xs: -7, md: -9 },
                        border: "5px solid white",
                        boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                      }}
                    >
                      {expert?.user?.first_name?.charAt(0)}
                      {expert?.user?.last_name?.charAt(0)}
                    </MotionAvatar>

                    <Box sx={{ ml: 3, mt: 2 }}>
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                      >
                        <MotionTypography
                          variant="h4"
                          component="h1"
                          sx={{ fontWeight: 700, mr: 1 }}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.4 }}
                        >
                          {expertName}
                        </MotionTypography>

                        {expert.verification_status === "VERIFIED" && (
                          <Tooltip title="Verified Expert">
                            <VerifiedUser color="primary" />
                          </Tooltip>
                        )}
                      </Box>
                    </Box>

                    {expert.professional_type?.title && (
                      <MotionTypography
                        variant="h6"
                        color="text.secondary"
                        gutterBottom
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.5 }}
                      >
                        <Chip
                          size="medium"
                          label={expert.professional_type.title}
                          sx={(theme) => ({
                            bgcolor: alpha(theme.palette.primary.dark, 0.1),
                            color: theme.palette.primary.main,
                          })}
                        />
                      </MotionTypography>
                    )}
                  </Box>
                </Grid2>
                <Grid2 item="true" xs={12} md={6}>
                  <Box
                    sx={{
                      display: "flex",
                      flexWrap: "wrap",
                      justifyContent: { xs: "flex-start", md: "flex-end" },
                      gap: 2,
                      px: { xs: 2, md: 4 },
                      pt: 3,
                    }}
                  >
                    <MotionPaper
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 }}
                      sx={{
                        p: 2,
                        bgcolor: alpha(theme.palette.primary.light, 0.1),
                        borderRadius: 3,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        minWidth: 100,
                      }}
                    >
                      <Typography
                        variant="h4"
                        color="primary.main"
                        sx={{ fontWeight: 700 }}
                      >
                        ₹{expert?.hourly_rate}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        per session
                      </Typography>
                    </MotionPaper>

                    <MotionPaper
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.8 }}
                      sx={{
                        p: 2,
                        bgcolor: alpha(theme.palette.success.light, 0.1),
                        borderRadius: 3,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        minWidth: 100,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                      >
                        <AccessTime
                          sx={{
                            color: theme.palette.success.main,
                            mr: 0.5,
                            fontSize: 20,
                          }}
                        />
                        <Typography
                          variant="h6"
                          color="success.main"
                          sx={{ fontWeight: 600 }}
                        >
                          {expert?.session_duration}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        min session
                      </Typography>
                    </MotionPaper>

                    <MotionPaper
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.9 }}
                      sx={{
                        p: 2,
                        bgcolor: alpha(theme.palette.info.light, 0.1),
                        borderRadius: 3,
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        minWidth: 100,
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 0.5 }}
                      >
                        <Work
                          sx={{
                            color: theme.palette.info.main,
                            mr: 0.5,
                            fontSize: 20,
                          }}
                        />
                        <Typography
                          variant="h6"
                          color="info.main"
                          sx={{ fontWeight: 600 }}
                        >
                          {expert?.years_of_experience}
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        years exp.
                      </Typography>
                    </MotionPaper>
                  </Box>
                </Grid2>
              </Grid2>
            </Box>
          </MotionPaper>
          <MotionPaper
            variants={itemVariants}
            elevation={0}
            sx={{
              p: 3,
              mb: 4,
              borderRadius: 4,
              border: "1px solid",
              borderColor: alpha(theme.palette.divider, 0.1),
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: 4,
            }}
          >
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <IconButton
                sx={{
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  p: 2,
                  mb: 1,
                  "&:hover": {
                    bgcolor: alpha(theme.palette.primary.main, 0.2),
                  },
                }}
              >
                <PhoneOutlined
                  sx={{ color: theme.palette.primary.main, fontSize: 28 }}
                />
              </IconButton>
              <Typography variant="body2" fontWeight={500}>
                Audio Call
              </Typography>
            </Box>

            {expert?.is_available_in_person && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <IconButton
                  sx={{
                    bgcolor: alpha(theme.palette.warning.main, 0.1),
                    p: 2,
                    mb: 1,
                    "&:hover": {
                      bgcolor: alpha(theme.palette.warning.main, 0.2),
                    },
                  }}
                >
                  <PersonOutlined
                    sx={{ color: theme.palette.warning.main, fontSize: 28 }}
                  />
                </IconButton>
                <Typography variant="body2" fontWeight={500}>
                  In-Person
                </Typography>
              </Box>
            )}
          </MotionPaper>
          <Grid container spacing={4}>
            <Grid item="true" xs={12} md={4}>
              <MotionPaper
                variants={itemVariants}
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: alpha(theme.palette.divider, 0.1),
                  mb: 4,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
                >
                  <CalendarMonth color="primary" />
                  Upcoming Availability
                </Typography>

                {expert.events?.map((event) => (
                  <Box
                    key={event.id}
                    sx={{
                      p: 2,
                      mb: 2,
                      borderRadius: 2,
                      bgcolor: alpha(theme.palette.primary.light, 0.05),
                      border: "1px solid",
                      borderColor: alpha(theme.palette.primary.main, 0.1),
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography variant="subtitle2">
                        {new Date(event.start_date).toLocaleDateString(
                          "en-US",
                          {
                            weekday: "short",
                            month: "short",
                            day: "numeric",
                          }
                        )}
                      </Typography>
                      <Chip
                        size="small"
                        label={event.title}
                        icon={<VideocamOutlined fontSize="small" />}
                        sx={{
                          bgcolor: alpha(theme.palette.success.light, 0.1),
                          color: theme.palette.success.main,
                        }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {new Date(event.start_date).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -
                      {new Date(event.end_date).toLocaleTimeString("en-US", {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </Typography>
                  </Box>
                ))}
                {user.user_type === "PROFESSIONAL" &&
                  expert?.user?.id === user.user && (
                    <Button
                      fullWidth
                      variant="outlined"
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        mt: 2,
                      }}
                      onClick={() => navigate("/Professional/Dashboard")}
                    >
                      View Full Schedule
                    </Button>
                  )}
              </MotionPaper>

              <MotionPaper
                variants={itemVariants}
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: alpha(theme.palette.divider, 0.1),
                  mb: 4,
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
                >
                  <Language color="primary" />
                  Languages
                </Typography>

                <Stack direction="row" flexWrap="wrap" gap={1}>
                  {expert?.languages_spoken?.split(",").map((lang, index) => (
                    <Chip
                      key={index}
                      label={lang.trim()}
                      size="medium"
                      sx={{
                        bgcolor: alpha(theme.palette.primary.dark, 0.1),
                        color: theme.palette.primary.main,
                      }}
                    />
                  ))}
                </Stack>
              </MotionPaper>

              <MotionPaper
                variants={itemVariants}
                elevation={0}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: alpha(theme.palette.divider, 0.1),
                }}
              >
                <Typography
                  variant="h6"
                  sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
                >
                  <Info color="primary" />
                  Consultation Modes
                </Typography>

                <Stack spacing={2}>
                  {expert?.is_available_online && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Chip
                        icon={<CallIcon />}
                        label="Online Consultations"
                        color="success"
                        variant="outlined"
                      />
                    </Box>
                  )}

                  {expert?.is_available_in_person && (
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <Chip
                        icon={<LocationOn />}
                        label="In-Person Consultations"
                        color="warning"
                        variant="outlined"
                      />
                    </Box>
                  )}
                </Stack>
              </MotionPaper>
            </Grid>
            <Grid item="true" xs={12} md={8}>
              <MotionPaper
                variants={itemVariants}
                elevation={0}
                sx={{
                  borderRadius: 4,
                  border: "1px solid",
                  borderColor: alpha(theme.palette.divider, 0.1),
                  overflow: "hidden",
                }}
              >
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                  <TabContext value={tabValue}>
                    <Tabs
                      value={tabValue}
                      onChange={handleTabChange}
                      variant="fullWidth"
                      sx={{
                        "& .MuiTabs-indicator": {
                          height: 3,
                          borderRadius: 1.5,
                        },
                      }}
                    >
                      <Tab
                        value="1"
                        active="true"
                        label="About Me"
                        icon={<Info />}
                        iconPosition="start"
                        sx={{ textTransform: "none", fontWeight: 600 }}
                      />
                      <Tab
                        value="2"
                        label="Expertise"
                        icon={<Psychology />}
                        iconPosition="start"
                        sx={{ textTransform: "none", fontWeight: 600 }}
                      />
                      <Tab
                        value="3"
                        label="Achievements"
                        icon={<EmojiEvents />}
                        iconPosition="start"
                        sx={{ textTransform: "none", fontWeight: 600 }}
                      />
                    </Tabs>

                    <Box sx={{ px: 3 }}>
                      <TabPanel value="1" index={0}>
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{
                            lineHeight: 1.8,
                            fontSize: "1.05rem",
                            whiteSpace: "pre-line",
                          }}
                        >
                          {expert?.biography ||
                            "This expert hasn't provided a biography yet."}
                        </Typography>
                      </TabPanel>

                      <TabPanel value="2" index={1}>
                        <Typography
                          variant="h6"
                          gutterBottom
                          color="primary.main"
                          sx={{ fontWeight: 600, mb: 3 }}
                        >
                          Areas of Expertise(Modify concerns with a click)
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: 1,
                            mb: 4,
                          }}
                        >
                          <Concern />
                        </Box>

                        <Typography
                          variant="h6"
                          gutterBottom
                          color="primary.main"
                          sx={{ fontWeight: 600, mb: 3 }}
                        >
                          Professional Experience
                        </Typography>

                        <Box
                          sx={{
                            p: 2,
                            borderLeft: `4px solid ${theme.palette.primary.main}`,
                            bgcolor: alpha(theme.palette.primary.light, 0.05),
                            borderRadius: "0 8px 8px 0",
                          }}
                        >
                          <Typography
                            variant="subtitle1"
                            sx={{ fontWeight: 600 }}
                          >
                            {expert?.years_of_experience} Years of Experience
                          </Typography>
                          <Typography
                            variant="body2"
                            color="text.secondary"
                            sx={{ mt: 1 }}
                          >
                            Helping clients achieve better mental health and
                            well-being through personalized care and
                            evidence-based approaches.
                          </Typography>
                        </Box>
                      </TabPanel>

                      <TabPanel value="3" index={2}>
                        {expert?.awards?.length > 0 ? (
                          <Stack spacing={4}>
                            {expert?.awards.map((award) => (
                              <Box
                                key={award.id}
                                sx={{
                                  p: 3,
                                  borderRadius: 3,
                                  border: "1px solid",
                                  borderColor: alpha(
                                    theme.palette.warning.main,
                                    0.3
                                  ),
                                  bgcolor: alpha(
                                    theme.palette.warning.light,
                                    0.05
                                  ),
                                  position: "relative",
                                  overflow: "hidden",
                                }}
                              >
                                <Box
                                  sx={{
                                    position: "absolute",
                                    top: 0,
                                    left: 0,
                                    width: 6,
                                    height: "100%",
                                    bgcolor: theme.palette.warning.main,
                                  }}
                                />

                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "flex-start",
                                    gap: 2,
                                  }}
                                >
                                  <EmojiEvents
                                    sx={{
                                      color: theme.palette.warning.main,
                                      fontSize: 28,
                                    }}
                                  />
                                  <Box>
                                    <Typography
                                      variant="h6"
                                      gutterBottom
                                      sx={{ fontWeight: 600 }}
                                    >
                                      {award.title}
                                    </Typography>
                                    <Typography
                                      variant="subtitle2"
                                      color="text.secondary"
                                      gutterBottom
                                      sx={{ mb: 2 }}
                                    >
                                      {new Date(
                                        award.date_received
                                      ).toLocaleDateString("en-US", {
                                        year: "numeric",
                                        month: "long",
                                      })}
                                    </Typography>
                                    <Typography
                                      variant="body2"
                                      color="text.secondary"
                                      sx={{ lineHeight: 1.6 }}
                                    >
                                      {award.description}
                                    </Typography>
                                  </Box>
                                </Box>
                              </Box>
                            ))}
                          </Stack>
                        ) : (
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                              flexDirection: "column",
                              py: 6,
                            }}
                          >
                            <EmojiEvents
                              sx={{
                                fontSize: 60,
                                color: alpha(theme.palette.text.secondary, 0.2),
                                mb: 2,
                              }}
                            />
                            <Typography variant="h6" color="text.secondary">
                              No awards or achievements listed
                            </Typography>
                            <Typography
                              variant="body2"
                              color="text.secondary"
                              sx={{ mt: 1 }}
                            >
                              This professional hasn&apos;t added any awards or
                              achievements yet
                            </Typography>
                          </Box>
                        )}
                      </TabPanel>
                    </Box>
                  </TabContext>
                </Box>
              </MotionPaper>
            </Grid>
          </Grid>
          {user.user_type === "PROFESSIONAL" &&
            expert?.user?.id === user.user && (
              <Box sx={{ mt: 2, display: "flex", justifyContent: "flex-end" }}>
                <Button
                  variant="contained"
                  color="primary"
                  startIcon={<Edit />}
                  onClick={() => setOpenUpdateDrawer(true)}
                >
                  Update Profile
                </Button>
              </Box>
            )}
        </Container>

        <ProfessionalUpdateDrawer
          ExpertDetails={expert}
          open={openUpdateDrawer}
          onClose={() => setOpenUpdateDrawer(false)}
          setCount={setCount}
        />
      </MotionBox>
    </>
  );
};

export default ProfessionalProfileDisplay;
