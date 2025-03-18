import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Button,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
  useTheme,
  alpha,
  Avatar,
  Card,
  CardContent,
  IconButton,
} from "@mui/material";
import {
  AccessTime,
  ArrowBack,
  Cancel,
  Close,
  EventNote,
  LocationOn,
  Payments,
  PhoneOutlined,
  Psychology,
  VideocamOutlined,
} from "@mui/icons-material";
import ajaxCall from "../../../../helpers/ajaxCall";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);
const MotionCard = motion(Card);

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
  if (!dateString) return "";

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
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  const formattedTime = date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });

  return prefix
    ? `${prefix}, ${formattedTime}`
    : `${formattedDate}, ${formattedTime}`;
};

const ConsultationDetail = () => {
  const theme = useTheme();
  const { id } = useParams();
  const navigate = useNavigate();
  const userType = JSON.parse(localStorage.getItem("loginInfo"))?.user_type;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewDialog, setReviewDialog] = useState(false);
  const [consultation, setConsultation] = useState({});
  const [cancelDialog, setCancelDialog] = useState(false);
  const [loading, setLoading] = useState(true);

  const fetchData = async (url, setData) => {
    setLoading(true);
    try {
      const response = await ajaxCall(
        url,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("loginInfo"))?.accessToken}`,
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
    fetchData(`consultations/consultation-update/${id}/`, setConsultation);
  }, [id]);

  const handleCancelConsultation = async () => {
    try {
      const response = await ajaxCall(
        `consultations/consultation-cancel/${id}/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("loginInfo"))?.accessToken}`,
          },
          method: "PATCH",
        },
        8000
      );
      if ([200, 201].includes(response.status)) {
        toast.success("Consultation Cancelled Successfully.");
        setCancelDialog(false);
        fetchData(`consultations/consultation-update/${id}/`, setConsultation);
        if (userType === "PROFESSIONAL") {
          navigate("/Professional/Dashboard");
        } else {
          navigate("/Client/Dashboard");
        }
      } else if ([400, 404].includes(response.status)) {
        toast.error("Some Problem Occurred. Please try again.");
      } else if ([401].includes(response.status)) {
        toast.error("Invalid Credentials.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmitReview = async () => {
    try {
      const response = await ajaxCall(
        "consultations/review-create/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("loginInfo"))?.accessToken}`,
          },
          method: "POST",
          body: JSON.stringify({
            consultation: id,
            rating,
            comment,
          }),
        },
        8000
      );
      if ([200, 201].includes(response.status)) {
        toast.success("Review Submitted Successfully");
        setReviewDialog(false);
        fetchData(`consultations/consultation-update/${id}/`, setConsultation);
      } else {
        toast.error("Failed to submit review. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting review:", error);
      toast.error("An error occurred. Please try again.");
    }
  };

  const goBack = () => {
    if (userType === "PROFESSIONAL") {
      navigate("/Professional/Dashboard");
    } else {
      navigate("/Client/Dashboard");
    }
  };

  const bgElements = generateBackgroundElements(6);

  const getStatusColor = (status) => {
    switch (status) {
      case "SCHEDULED":
        return theme.palette.primary.main;
      case "COMPLETED":
        return "#4DAA57";
      case "CANCELLED":
        return theme.palette.secondary.main;
      default:
        return theme.palette.primary.main;
    }
  };

  const getName = () => {
    if (userType === "CLIENT") {
      return consultation?.professional_details?.user?.username || "Professional";
    } else {
      return consultation?.client_details?.user?.username || "Client";
    }
  };

  const getFirstLetter = () => {
    const name = getName();
    return name.charAt(0).toUpperCase();
  };

  return (
    <MotionBox
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      sx={{
        position: "relative",
        minHeight: "100vh",
        background: "linear-gradient(145deg, #F3EFFF, #E5E0FF)",
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
        maxWidth="md"
        sx={{
          position: "relative",
          zIndex: 1,
        }}
      >
        <MotionBox
          variants={itemVariants}
          sx={{
            display: "flex",
            alignItems: "center",
            mb: 3,
            gap: 2,
          }}
        >
          <Button
            variant="contained"
            startIcon={<ArrowBack />}
            onClick={goBack}
            sx={{
              bgcolor: "rgba(255,255,255,0.9)",
              color: theme.palette.primary.main,
              borderRadius: 8,
              boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
              backdropFilter: "blur(10px)",
              px: 3,
              py: 1.2,
              "&:hover": {
                bgcolor: "white",
                boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                transform: "translateY(-3px)",
              },
              transition: "all 0.3s ease",
            }}
          >
            <span className="sr-only">Back</span>
          </Button>
          <Typography variant="h4" component="h1" fontWeight="bold">
            Consultation Details
          </Typography>
        </MotionBox>

        <MotionPaper
          elevation={2}
          variants={itemVariants}
          sx={{
            p: 0,
            mb: 4,
            borderRadius: 3,
            background: "rgba(255, 255, 255, 0.9)",
            backdropFilter: "blur(10px)",
            boxShadow: "0 10px 30px rgba(106, 90, 205, 0.15)",
            overflow: "hidden",
          }}
        >
          <Box
            sx={{
              p: { xs: 3, md: 4 },
              background: `linear-gradient(145deg, ${theme.palette.primary.light}, ${alpha(
                theme.palette.primary.main,
                0.8
              )})`,
              color: "white",
              position: "relative",
            }}
          >
            <Grid container spacing={2} alignItems="center">
              <Grid item>
                <Avatar
                  sx={{
                    width: 64,
                    height: 64,
                    bgcolor: "white",
                    color: theme.palette.primary.main,
                    boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                    fontSize: "1.5rem",
                    fontWeight: "bold",
                  }}
                >
                  {getFirstLetter()}
                </Avatar>
              </Grid>
              <Grid item xs>
                <Typography
                  variant="subtitle1"
                  sx={{ opacity: 0.9, fontWeight: "normal" }}
                >
                  {userType === "CLIENT" ? "Professional" : "Client"}
                </Typography>
                <Typography variant="h5" component="h2" fontWeight="bold">
                  {getName()}
                </Typography>
              </Grid>
              <Grid item>
                <Chip
                  label={consultation?.status || "PENDING"}
                  sx={{
                    color: "white",
                    fontWeight: "bold",
                    bgcolor: getStatusColor(consultation?.status),
                    px: 1,
                    py: 2.5,
                    "& .MuiChip-label": {
                      px: 1,
                    },
                  }}
                />
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ p: { xs: 3, md: 4 } }}>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <MotionCard
                  elevation={0}
                  variants={itemVariants}
                  sx={{
                    borderRadius: 3,
                    height: "100%",
                    border: `1px solid ${alpha(theme.palette.primary.light, 0.5)}`,
                    background: "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                        gap: 1.5,
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                        }}
                      >
                        <AccessTime />
                      </Avatar>
                      <Typography variant="h6">Date & Time</Typography>
                    </Box>
                    <Typography variant="body1" sx={{ pl: 6 }}>
                      {formatDateTime(consultation?.scheduled_time)}
                    </Typography>
                  </CardContent>
                </MotionCard>
              </Grid>

              <Grid item xs={12} md={6}>
                <MotionCard
                  elevation={0}
                  variants={itemVariants}
                  sx={{
                    borderRadius: 3,
                    height: "100%",
                    border: `1px solid ${alpha(theme.palette.primary.light, 0.5)}`,
                    background: "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                        gap: 1.5,
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                        }}
                      >
                        {getConsultationTypeIcon(consultation?.consultation_type)}
                      </Avatar>
                      <Typography variant="h6">Consultation Type</Typography>
                    </Box>
                    <Typography variant="body1" sx={{ pl: 6 }}>
                      {consultation?.consultation_type || "In-person"}
                    </Typography>
                  </CardContent>
                </MotionCard>
              </Grid>

              <Grid item xs={12} md={6}>
                <MotionCard
                  elevation={0}
                  variants={itemVariants}
                  sx={{
                    borderRadius: 3,
                    height: "100%",
                    border: `1px solid ${alpha(theme.palette.primary.light, 0.5)}`,
                    background: "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                        gap: 1.5,
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                        }}
                      >
                        <Psychology />
                      </Avatar>
                      <Typography variant="h6">Concerns</Typography>
                    </Box>
                    <Typography variant="body1" sx={{ pl: 6 }}>
                      {consultation?.professional_details?.concerns
                        ?.map((concern) => concern.name)
                        .join(", ") || "Not specified"}
                    </Typography>
                  </CardContent>
                </MotionCard>
              </Grid>

              <Grid item xs={12} md={6}>
                <MotionCard
                  elevation={0}
                  variants={itemVariants}
                  sx={{
                    borderRadius: 3,
                    height: "100%",
                    border: `1px solid ${alpha(theme.palette.primary.light, 0.5)}`,
                    background: "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 2,
                        gap: 1.5,
                      }}
                    >
                      <Avatar
                        sx={{
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                        }}
                      >
                        <Payments />
                      </Avatar>
                      <Typography variant="h6">Payment Status</Typography>
                    </Box>
                    <Typography variant="body1" sx={{ pl: 6 }}>
                      {consultation?.payment_status || "Not specified"}
                    </Typography>
                  </CardContent>
                </MotionCard>
              </Grid>

              {consultation?.notes && (
                <Grid item xs={12}>
                  <MotionCard
                    elevation={0}
                    variants={itemVariants}
                    sx={{
                      borderRadius: 3,
                      border: `1px solid ${alpha(theme.palette.primary.light, 0.5)}`,
                      background: "rgba(255, 255, 255, 0.5)",
                    }}
                  >
                    <CardContent>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          mb: 2,
                          gap: 1.5,
                        }}
                      >
                        <Avatar
                          sx={{
                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                            color: theme.palette.primary.main,
                          }}
                        >
                          <EventNote />
                        </Avatar>
                        <Typography variant="h6">Notes</Typography>
                      </Box>
                      <Typography variant="body1" sx={{ pl: 6 }}>
                        {consultation?.notes}
                      </Typography>
                    </CardContent>
                  </MotionCard>
                </Grid>
              )
              }
            </Grid >

            <Box
              sx={{
                mt: 4,
                display: "flex",
                gap: 2,
                justifyContent: "center",
              }}
            >
              {consultation?.status === "SCHEDULED" && (
                <Button
                  variant="outlined"
                  color="error"
                  startIcon={<Cancel />}
                  onClick={() => setCancelDialog(true)}
                  sx={{
                    px: 4,
                    py: 1.2,
                    borderRadius: 8,
                    borderWidth: 2,
                    transition: "all 0.3s",
                    "&:hover": {
                      borderWidth: 2,
                      transform: "translateY(-2px)",
                      boxShadow: "0 5px 15px rgba(242, 107, 91, 0.3)",
                    },
                  }}
                >
                  Cancel Consultation
                </Button>
              )}

              {consultation?.status === "COMPLETED" && !consultation?.review && (
                <Button
                  variant="contained"
                  onClick={() => setReviewDialog(true)}
                  sx={{
                    px: 4,
                    py: 1.2,
                    borderRadius: 8,
                    transition: "all 0.3s",
                    background: `linear - gradient(145deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                    "&:hover": {
                      transform: "translateY(-2px)",
                      boxShadow: "0 5px 15px rgba(157, 132, 183, 0.4)",
                    },
                  }}
                >
                  Leave Review
                </Button>
              )}
            </Box>
          </Box >
        </MotionPaper >

        <Dialog
          open={reviewDialog}
          onClose={() => setReviewDialog(false)}
          PaperProps={{
            style: {
              borderRadius: 16,
              padding: 8,
              maxWidth: 500,
            },
          }}
          BackdropProps={{
            style: {
              backgroundColor: alpha("#000", 0.6),
              backdropFilter: "blur(5px)",
            },
          }}
        >
          <DialogTitle
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              position: "relative",
              pb: 1,
            }}
          >
            Share Your Experience
            <IconButton
              aria-label="close"
              onClick={() => setReviewDialog(false)}
              sx={{
                position: "absolute",
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <Close />
            </IconButton>
          </DialogTitle>
          <DialogContent>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                my: 1,
              }}
            >
              <Typography
                variant="body1"
                gutterBottom
                sx={{ textAlign: "center", mb: 3 }}
              >
                How would you rate your consultation with{" "}
                {userType === "CLIENT"
                  ? consultation?.professional_details?.user?.username
                  : consultation?.client_details?.user?.username}
                ?
              </Typography>

              <Rating
                value={rating}
                onChange={(event, newValue) => {
                  setRating(newValue);
                }}
                size="large"
                sx={{
                  mb: 3,
                  "& .MuiRating-iconFilled": {
                    color: theme.palette.secondary.main,
                  },
                  "& .MuiRating-iconHover": {
                    color: theme.palette.secondary.light,
                  },
                }}
              />

              <TextField
                fullWidth
                multiline
                rows={4}
                label="Your Review"
                placeholder="Share details of your experience to help others"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                variant="outlined"
                sx={{
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    "&.Mui-focused fieldset": {
                      borderColor: theme.palette.primary.main,
                    },
                  },
                }}
              />
            </Box>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3, justifyContent: "center" }}>
            <Button
              onClick={() => setReviewDialog(false)}
              sx={{
                borderRadius: 8,
                px: 3,
                color: theme.palette.primary.main,
              }}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              onClick={handleSubmitReview}
              disabled={!rating}
              sx={{
                borderRadius: 8,
                px: 4,
                py: 1,
                background: `linear - gradient(145deg, ${theme.palette.primary.main}, ${theme.palette.primary.dark})`,
                transition: "all 0.3s",
                "&:hover": {
                  transform: "translateY(-2px)",
                  boxShadow: "0 5px 15px rgba(157, 132, 183, 0.4)",
                },
              }}
            >
              Submit Review
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={cancelDialog}
          onClose={() => setCancelDialog(false)}
          PaperProps={{
            style: {
              borderRadius: 16,
              padding: 8,
              maxWidth: 450,
            },
          }}
          BackdropProps={{
            style: {
              backgroundColor: alpha("#000", 0.6),
              backdropFilter: "blur(5px)",
            },
          }}
        >
          <DialogTitle
            sx={{
              textAlign: "center",
              fontWeight: "bold",
              color: theme.palette.error.main,
            }}
          >
            Cancel Consultation
          </DialogTitle>
          <DialogContent>
            <Typography variant="body1" sx={{ textAlign: "center" }}>
              Are you sure you want to cancel this consultation? This action cannot be undone.
            </Typography>
          </DialogContent>
          <DialogActions sx={{ px: 3, pb: 3, justifyContent: "center", gap: 2 }}>
            <Button
              onClick={() => setCancelDialog(false)}
              variant="outlined"
              sx={{
                borderRadius: 8,
                px: 3,
                borderColor: theme.palette.primary.main,
                color: theme.palette.primary.main,
              }}
            >
              No, Keep it
            </Button>
            <Button
              variant="contained"
              onClick={handleCancelConsultation}
              color="error"
              sx={{
                borderRadius: 8,
                px: 3,
                py: 1,
                background: `linear - gradient(145deg, ${theme.palette.error.main}, ${theme.palette.error.dark})`,
              }}
            >
              Yes, Cancel
            </Button>
          </DialogActions>
        </Dialog>
      </Container >
    </MotionBox >
  );
};

export default ConsultationDetail;