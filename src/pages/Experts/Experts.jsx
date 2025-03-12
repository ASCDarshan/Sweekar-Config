import { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Avatar,
  Chip,
  TextField,
  MenuItem,
  Button,
  Rating,
  alpha,
  useTheme,
  Paper,
  InputAdornment,
  Tooltip,
  Divider,
} from "@mui/material";
import { ShimmerSimpleGallery } from "react-shimmer-effects";
import ajaxCall from "../../helpers/ajaxCall";
import { useNavigate } from "react-router-dom";
import ServiceShimmer from "../../components/UI/ServiceShimmer";
import {
  AccessTime,
  ArrowForward,
  Gavel,
  Language,
  LocalHospital,
  LocationOn,
  MedicalServices,
  PersonPin,
  Psychology,
  Search,
  Sort,
  Verified,

} from "@mui/icons-material";
import CallIcon from '@mui/icons-material/Call';
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionPaper = motion(Paper);

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

const filterOptions = [
  { value: "all", label: "All Experts", icon: <PersonPin /> },
  { value: "1", label: "Mental Health", icon: <Psychology /> },
  { value: "2", label: "Legal Services", icon: <Gavel /> },
  { value: "3", label: "Medical Specialists", icon: <LocalHospital /> },
];

const Experts = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingCards, setLoadingCards] = useState(false);
  const [sortOption, setSortOption] = useState("recommended");

  const fetchData = async (url, setData) => {
    setLoadingCards(true);
    try {
      const response = await ajaxCall(
        url,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "GET",
        },
        8000
      );
      if (response?.status === 200) {
        setData(response?.data || []);
      } else {
        setData([]);
        console.error("Fetch error:", response);
      }
    } catch (error) {
      console.error("Network error:", error);
      setData([]);
    } finally {
      setLoading(false);
      setLoadingCards(false);
    }
  };

  useEffect(() => {
    if (filterType === "all") {
      fetchData("professionals/professionalist/", setExperts);
    } else {
      fetchData(
        `professionals/professional-type/?professional_type=${filterType}`,
        setExperts
      );
    }
  }, [filterType]);

  const handleViewConsultation = (expert) => {
    navigate(`/experts/${expert.id}`);
  };

  const filteredExperts = experts.filter((expert) => {
    const expertName = `${expert?.user?.first_name || ""} ${expert?.user?.last_name || ""
      }`.toLowerCase();
    const expertType = expert?.professional_type?.title?.toLowerCase() || "";
    const searchLower = searchQuery.toLowerCase();

    return expertName.includes(searchLower) || expertType.includes(searchLower);
  });

  const sortedExperts = [...filteredExperts].sort((a, b) => {
    if (sortOption === "rating") {
      return (b?.user?.rating || 0) - (a?.user?.rating || 0);
    } else if (sortOption === "experience") {
      return (b.years_of_experience || 0) - (a.years_of_experience || 0);
    } else {
      const aScore =
        (a?.user?.rating || 0) * 0.7 + (a.years_of_experience || 0) * 0.3;
      const bScore =
        (b?.user?.rating || 0) * 0.7 + (b.years_of_experience || 0) * 0.3;
      return bScore - aScore;
    }
  });

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Box sx={{ mb: 6 }}>
          <ServiceShimmer />
        </Box>
      </Container>
    );
  }

  return (
    <MotionBox
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      sx={{ overflow: "hidden", position: "relative" }}
    >
      <Box
        sx={{
          bgcolor: "#f5f1e8",
          py: { xs: 6, md: 10 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            gutterBottom
            align="center"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              color: "primary.dark",
            }}
          >
            Our Verified Experts
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ maxWidth: "800px", mx: "auto", mb: 4 }}
          >
            Connect with our network of LGBTQAI+ friendly and women-centric
            professionals dedicated to providing inclusive care
          </Typography>
        </Container>
        <Box
          sx={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(157, 132, 183, 0.1)",
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
            background: "rgba(157, 132, 183, 0.1)",
          }}
        />
      </Box>

      <Container
        maxWidth="lg"
        sx={{ mt: { xs: -5, md: -7 }, mb: 4, position: "relative", zIndex: 2 }}
      >
        <MotionPaper
          elevation={3}
          sx={{
            p: { xs: 2, md: 3 },
            borderRadius: 4,
            background: "white",
            boxShadow: "0 10px 40px rgba(0, 0, 0, 0.1)",
            overflow: "hidden",
          }}
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={5}>
              <TextField
                fullWidth
                label="Search by name or specialty"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Search color="primary" />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 2 },
                }}
                sx={{ bgcolor: alpha(theme.palette.background.default, 0.6) }}
              />
            </Grid>

            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                label="Expert Type"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                InputProps={{
                  sx: { borderRadius: 2 },
                }}
                sx={{ bgcolor: alpha(theme.palette.background.default, 0.6) }}
              >
                {filterOptions.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      {option.icon}
                      {option.label}
                    </Box>
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                select
                label="Sort By"
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Sort color="primary" />
                    </InputAdornment>
                  ),
                  sx: { borderRadius: 2 },
                }}
                sx={{ bgcolor: alpha(theme.palette.background.default, 0.6) }}
              >
                <MenuItem value="recommended">Recommended</MenuItem>
                <MenuItem value="rating">Highest Rated</MenuItem>
                <MenuItem value="experience">Most Experienced</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </MotionPaper>
      </Container>

      <Container sx={{ mb: 8 }}>
        {loadingCards ? (
          <ShimmerSimpleGallery
            card
            imageHeight={250}
            caption
            row={2}
            col={3}
          />
        ) : sortedExperts.length === 0 ? (
          <MotionPaper
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "200px",
              textAlign: "center",
              borderRadius: 4,
              p: 4,
              background: "linear-gradient(to right, #f3e7ff, #f9f0ff)",
              boxShadow: "0 10px 30px rgba(0, 0, 0, 0.05)",
            }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <Box>
              <MedicalServices
                sx={{
                  fontSize: 60,
                  color: alpha(theme.palette.primary.main, 0.5),
                  mb: 2,
                }}
              />
              <Typography
                variant="h5"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 600,
                  mb: 1,
                }}
              >
                No experts available
              </Typography>
              <Typography variant="body1" color="text.primary">
                Try adjusting your filters or check back later
              </Typography>
            </Box>
          </MotionPaper>
        ) : (
          <Grid container spacing={3}>
            {sortedExperts.map((expert, index) => {
              return (
                <Grid item xs={12} md={4} key={index}>
                  <MotionCard
                    sx={{
                      height: "100%",
                      borderRadius: 4,
                      overflow: "visible",
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.07)",
                      position: "relative",
                      border: "1px solid",
                      borderColor: alpha(theme.palette.divider, 0.1),
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: index * 0.05 }}
                    whileHover={{
                      y: -10,
                      boxShadow: "0 20px 40px rgba(0, 0, 0, 0.1)",
                      transition: { duration: 0.3 },
                    }}
                  >
                    <Box
                      sx={{
                        height: 100,
                        background: `linear-gradient(135deg, ${alpha(
                          "#f5f1e8",
                          0.8
                        )}, ${alpha("#4B0082", 0.8)})`,
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <Box
                        sx={{
                          position: "absolute",
                          top: -20,
                          right: -20,
                          width: 100,
                          height: 100,
                          borderRadius: "50%",
                          background: "rgba(255, 255, 255, 0.1)",
                        }}
                      />
                      <Box
                        sx={{
                          position: "absolute",
                          bottom: -10,
                          left: -10,
                          width: 60,
                          height: 60,
                          borderRadius: "50%",
                          background: "rgba(255, 255, 255, 0.1)",
                        }}
                      />
                    </Box>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        mt: -6,
                      }}
                    >
                      <Avatar
                        src={expert.image}
                        sx={{
                          width: 100,
                          height: 100,
                          border: "4px solid white",
                          boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)",
                          fontSize: "2.5rem",
                          bgcolor: theme.palette.primary.main,
                        }}
                      >
                        {expert?.user?.first_name?.charAt(0) || ""}
                      </Avatar>
                    </Box>

                    <CardContent sx={{ pt: 1 }}>
                      <Box sx={{ textAlign: "center", mb: 2 }}>
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 0.5,
                          }}
                        >
                          <Typography variant="h5" sx={{ fontWeight: 600 }}>
                            {expert?.user?.first_name} {expert?.user?.last_name}
                          </Typography>
                          {expert?.is_verified && (
                            <Tooltip title="Verified Expert">
                              <Verified color="primary" fontSize="small" />
                            </Tooltip>
                          )}
                        </Box>

                        <Typography
                          color="text.primary"
                          gutterBottom
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 0.5,
                          }}
                        >
                          {expert?.professional_type?.title}
                        </Typography>

                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 0.5,
                            mb: 0.5,
                          }}
                        >
                          <Rating
                            value={expert?.user?.rating || 4.5}
                            precision={0.5}
                            readOnly
                            size="small"
                          />
                          <Typography variant="body2" color="text.primary">
                            (
                            {expert?.reviews_count ||
                              Math.floor(Math.random() * 100) + 10}
                            )
                          </Typography>
                        </Box>
                      </Box>

                      <Divider sx={{ my: 1.5 }} />

                      <Grid container spacing={1} sx={{ mb: 2 }}>
                        <Grid item xs={6}>
                          <Typography
                            variant="body2"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                              color: "text.primary",
                            }}
                          >
                            <AccessTime fontSize="small" color="action" />
                            {expert.years_of_experience} years exp.
                          </Typography>
                        </Grid>
                        <Grid item xs={6}>
                          <Typography
                            variant="body2"
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 0.5,
                              color: "text.primary",
                            }}
                          >
                            <Language fontSize="small" color="action" />
                            {expert.languages_spoken}
                          </Typography>
                        </Grid>
                      </Grid>

                      {expert.concerns && expert.concerns.length > 0 && <Typography
                        variant="subtitle2"
                        sx={{ mb: 1, fontWeight: 600 }}
                      >
                        Specializations
                      </Typography>}

                      <Box sx={{ mt: 2, minHeight: "80px" }}>
                        <Box sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 0.5 }}>
                          {expert?.concerns?.slice(0, 3).map((spec, index) => (
                            <Chip
                              key={index}
                              label={spec.name}
                              size="small"
                              sx={(theme) => ({
                                bgcolor: alpha(theme.palette.primary.light, 0.1),
                                color: theme.palette.primary.main,
                                fontWeight: 500,
                                mb: 0.5,
                              })}
                            />
                          ))}

                          {expert?.concerns?.length > 3 && (
                            <Chip
                              label={`+${expert.concerns.length - 3} more`}
                              size="small"
                              variant="outlined"
                              sx={{ mb: 0.5 }}
                            />
                          )}
                        </Box>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          mb: 2,
                          justifyContent: "center",
                        }}
                      >
                        {expert.is_available_online && (
                          <Tooltip title="Video Consultations">
                            <Chip
                              icon={<CallIcon />}
                              label="Audio"
                              size="small"
                              sx={{
                                bgcolor: alpha(
                                  theme.palette.success.light,
                                  0.1
                                ),
                                color: theme.palette.success.main,
                              }}
                            />
                          </Tooltip>
                        )}

                        {expert.is_available_in_person && (
                          <Tooltip title="In-Person Consultations">
                            <Chip
                              icon={<LocationOn />}
                              label="In-person"
                              size="small"
                              sx={{
                                bgcolor: alpha(
                                  theme.palette.warning.light,
                                  0.1
                                ),
                                color: theme.palette.warning.main,
                              }}
                            />
                          </Tooltip>
                        )}
                      </Box>
                      <Box sx={{ mt: 2, height: "50px" }}>
                        <Button
                          variant="contained"
                          fullWidth
                          onClick={() => handleViewConsultation(expert)}
                          endIcon={<ArrowForward />}
                          sx={{
                            borderRadius: 2,
                            py: 1,
                            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.primary.main})`,
                            textTransform: "none",
                            fontWeight: 600,
                            boxShadow: `0 4px 15px ${alpha(
                              theme.palette.primary.main,
                              0.3
                            )}`,
                          }}
                        >
                          View Profile
                        </Button>
                      </Box>
                    </CardContent>
                  </MotionCard>
                </Grid>
              );
            })}
          </Grid>
        )}
      </Container>
    </MotionBox>
  );
};

export default Experts;
