/* eslint-disable react/prop-types */
import {
  Avatar,
  Box,
  Button,
  Chip,
  Container,
  Divider,
  Grid,
  Paper,
  Rating,
  Typography,
} from "@mui/material";
import ajaxCall from "../../../helpers/ajaxCall";
import { ShimmerSimpleGallery } from "react-shimmer-effects";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const StaticColor = [
  {
    id: 1,
    color: "#9D84B7",
  },
  {
    id: 2,
    color: "#9D84B7",
  },
  {
    id: 3,
    color: "#9D84B7",
  },
  {
    id: 4,
    color: "#9D84B7",
  },
];

const ExpertsSection = ({ selectedService, onBookExpert }) => {
  const navigate = useNavigate();
  const selectedServiceId = selectedService?.id;
  const staticData =
    StaticColor.find((s) => s.id === selectedServiceId) || StaticColor[0];
  const [experts, setExperts] = useState([]);
  const [concerns, setConcerns] = useState([]);
  const [selectedConcern, setSelectedConcern] = useState("All");
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
      `professionals/professional-filter/?professional_type=${selectedService?.id}`,
      setExperts
    );
    fetchData(
      `professionals/concern-filter/?concern_type=${selectedService?.id}`,
      setConcerns
    );
  }, [selectedService?.id, selectedServiceId, concerns?.id]);

  const handleFilter = (concernName) => {
    setSelectedConcern(concernName);
  };

  const filteredExperts =
    selectedConcern === "All"
      ? experts
      : experts.filter((expert) =>
        expert.concerns?.some((c) => c.name === selectedConcern)
      );

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
      timeZone: "UTC",
    };
    return new Date(dateString).toLocaleString("en-US", options);
  };

  const handleViewConsultation = (expert) => {
    navigate(`/experts/${expert.id}`);
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Box sx={{ mb: 6 }}>
          <ShimmerSimpleGallery
            card
            imageHeight={200}
            caption
            row={1}
            col={4}
          />
        </Box>
      </Container>
    );
  }

  if (!experts || experts.length === 0) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "200px",
          textAlign: "center",
          bgcolor: "#f9f9f9",
          borderRadius: "8px",
          p: 2,
          mb: 4,
        }}
      >
        <Typography variant="h5" color="red">
          No expert available for {selectedService?.title}.
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 6, mb: 6 }}>
      {selectedService && (
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 700,
            textAlign: "center",
            mb: 3,
          }}
        >
          {selectedService?.title} Experts
        </Typography>
      )}

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          gap: 1,
          mb: 3,
          flexWrap: "wrap",
        }}
      >
        <Button
          variant={selectedConcern === "All" ? "contained" : "outlined"}
          onClick={() => handleFilter("All")}
          size="small"
        >
          All
        </Button>
        {concerns.map((concern) => (
          <Button
            key={concern.id}
            variant={
              selectedConcern === concern.name ? "contained" : "outlined"
            }
            onClick={() => handleFilter(concern.name)}
            size="small"
          >
            {concern.name}
          </Button>
        ))}
      </Box>
      {filteredExperts.length === 0 ? (
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "200px",
            textAlign: "center",
            bgcolor: "#f9f9f9",
            borderRadius: "8px",
            p: 2,
          }}
        >
          <Typography variant="h6" color="red">
            There is no expert for this {selectedConcern} concern.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={2}>
          {filteredExperts.map((expert) => (
            <Grid item xs={12} sm={6} md={3} key={expert.id}>
              <Paper
                elevation={2}
                sx={{
                  p: 2,
                  borderRadius: 3,
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s",
                  position: "relative",
                  overflow: "visible",
                  bgcolor: "white",
                  border: "3px solid transparent",
                  backgroundImage: `linear-gradient(white, white), linear-gradient(to bottom, #d4145a, #fbb03b)`,
                  backgroundOrigin: "border-box",
                  backgroundClip: "padding-box, border-box",
                  "&:hover": {
                    transform: "translateY(-5px)",
                    boxShadow: 6,
                  },
                }}
              >
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    mb: 1.5,
                    height: "60px",
                  }}
                >
                  <Avatar
                    sx={{
                      width: 60,
                      height: 60,
                      mr: 1.5,
                      border: `2px solid ${staticData.color}`,
                    }}
                  >
                    {expert?.user?.first_name?.charAt(0) || ""}
                  </Avatar>
                  <Box>
                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                      {expert?.user?.username || "Expert"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {expert?.professional_type?.title || "Professional"}{" "}
                      Specialist{" "}
                    </Typography>
                    <Box sx={{ display: "flex", gap: 0.5, mt: 0.5 }}>
                      <Chip
                        label={expert?.verification_status === "VERIFIED" ? "Verified" : "Not Verified"}
                        size="small"
                        sx={{
                          height: "20px",
                          "& .MuiChip-label": { px: 1, py: 0, fontSize: "0.7rem" },
                          bgcolor: expert?.verification_status === "VERIFIED" ? "green" : "#FF6B6B",
                          color: "white",
                        }}
                      />
                      <Chip
                        label={expert?.sensitize ? "Sensitized" : "Not Sensitized"}
                        size="small"
                        sx={{
                          height: "20px",
                          "& .MuiChip-label": { px: 1, py: 0, fontSize: "0.7rem" },
                          bgcolor: expert?.sensitize ? "green" : "#FF6B6B",
                          color: "white",
                        }}
                      />
                    </Box>
                    {expert?.rating?.length > 0 && expert?.rating && (
                      <Box
                        sx={{ display: "flex", alignItems: "center", mt: 0.5 }}
                      >
                        <Rating
                          value={expert.rating || 0}
                          readOnly
                          size="small"
                        />
                        <Typography variant="caption" sx={{ ml: 0.5 }}>
                          ({expert.rating || 0})
                        </Typography>
                      </Box>
                    )}
                  </Box>
                </Box>

                <Divider sx={{ my: 1 }} />

                <Grid container spacing={1} sx={{ minHeight: "50px" }}>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">
                      Experience
                    </Typography>
                    <Typography variant="body2">
                      {expert?.years_of_experience
                        ? `${expert.years_of_experience} + years`
                        : "N/A"}
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="caption" color="text.secondary">
                      Languages
                    </Typography>
                    <Typography variant="body2">
                      {expert?.languages_spoken || "N/A"}
                    </Typography>
                  </Grid>
                </Grid>

                <Box sx={{ mt: 1, minHeight: "60px", mb: 1 }}>
                  <Typography variant="caption" color="text.secondary">
                    Specializations
                  </Typography>
                  <Box
                    sx={{
                      mt: 0.5,
                      display: "flex",
                      flexWrap: "wrap",
                      gap: 0.5,
                      maxHeight: "50px",
                      overflow: "hidden"
                    }}
                  >
                    {expert.concerns && expert.concerns.length > 0 ? (
                      expert.concerns.slice(0, 3).map((spec, index) => (
                        <Chip
                          key={index}
                          label={spec.name}
                          size="small"
                          sx={{
                            height: "20px",
                            "& .MuiChip-label": { px: 1, py: 0, fontSize: "0.7rem" },
                            bgcolor: `${staticData.color}15`,
                            color: staticData.color,
                          }}
                        />
                      ))
                    ) : (
                      <Typography variant="body2">
                        No specializations listed
                      </Typography>
                    )}
                    {expert.concerns && expert.concerns.length > 3 && (
                      <Typography variant="caption" sx={{ color: staticData.color }}>
                        +{expert.concerns.length - 3} more
                      </Typography>
                    )}
                  </Box>
                </Box>

                <Box
                  sx={{
                    mt: "auto",
                    py: 1.5,
                    px: 1.5,
                    bgcolor: expert.availability ? "success.light" : "#90EE90",
                    borderRadius: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    minHeight: "60px",
                  }}
                >
                  <Box>
                    <Typography variant="caption" color="text.secondary">
                      Next Available
                    </Typography>
                    <Typography variant="body2" fontWeight="medium">
                      {expert?.events &&
                        expert.events.length > 0 &&
                        expert.events[0]?.start_date
                        ? formatDate(expert.events[0].start_date)
                        : "Not scheduled"}
                    </Typography>
                  </Box>
                </Box>

                <Box
                  display="flex"
                  justifyContent="space-between"
                  sx={{ mt: 1.5, height: "36px" }}
                >
                  <Button
                    variant="contained"
                    onClick={() => handleViewConsultation(expert)}
                    sx={{
                      width: "48%",
                      py: 0.5,
                      bgcolor: staticData.color,
                      "&:hover": {
                        bgcolor: staticData.color,
                        opacity: 0.9,
                      },
                    }}
                    size="small"
                  >
                    View
                  </Button>

                  <Button
                    variant="contained"
                    onClick={() => onBookExpert(expert)}
                    sx={{
                      width: "48%",
                      py: 0.5,
                      bgcolor: staticData.color,
                      "&:hover": {
                        bgcolor: staticData.color,
                        opacity: 0.9,
                      },
                    }}
                    size="small"
                  >
                    Book
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default ExpertsSection;