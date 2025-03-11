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
    color: "#7A5BA1",
  },
  {
    id: 3,
    color: "#FF6B6B",
  },
  {
    id: 4,
    color: "#4ECDC4",
  },
];

const ExpertsSection = ({ selectedService, onBookExpert }) => {
  const navigate = useNavigate();
  const selectedServiceId = selectedService?.id;
  const staticData = StaticColor.find((s) => s.id === selectedServiceId);
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
    fetchData(`professionals/concern-filter/?concern_type=${selectedService?.id}`, setConcerns);
  }, [selectedService?.id, selectedServiceId, concerns?.id]);

  const handleFilter = (concernName) => {
    setSelectedConcern(concernName);
  };

  const filteredExperts = selectedConcern === "All"
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
            imageHeight={250}
            caption
            row={1}
            col={3}
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
        }}
      >
        <Typography variant="h5" color="red">
          No expert available for this service.
        </Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 6 }}>
      {selectedService && (
        <Typography
          variant="h4"
          gutterBottom
          sx={{
            fontWeight: 700,
            textAlign: "center",
            mb: 4,
          }}
        >
          {selectedService?.title} Experts
        </Typography>
      )}

      <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 4 }}>
        <Button variant={selectedConcern === "All" ? "contained" : "outlined"} onClick={() => handleFilter("All")} size="small">
          All
        </Button>
        {concerns.map((concern) => (
          <Button
            key={concern.id}
            variant={selectedConcern === concern.name ? "contained" : "outlined"}
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
            There is no expert for this selected concern.
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredExperts.map((expert) => (
            <Grid item xs={12} md={4} key={expert.id}>
              <Paper
                elevation={3}
                sx={{
                  p: 3,
                  borderRadius: 4,
                  height: "100%",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mr: 2,
                      border: `2px solid ${staticData.color}`,
                    }}
                  />
                  <Box>
                    <Typography variant="h6" gutterBottom>
                      {expert?.user?.username}
                    </Typography>
                    <Typography color="text.secondary">
                      {expert?.professional_type?.title} Specialist{" "}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", mt: 0.5 }}>
                      <Rating value={expert.rating} readOnly size="small" />
                      <Typography variant="body2" sx={{ ml: 1 }}>
                        ({expert.rating})
                      </Typography>
                    </Box>
                  </Box>
                </Box>
                <Divider sx={{ my: 2 }} />
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Experience
                    </Typography>
                    <Typography variant="body1">
                      {expert?.years_of_experience} + years
                    </Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="body2" color="text.secondary">
                      Languages
                    </Typography>
                    <Typography variant="body1">
                      {expert?.languages_spoken}
                    </Typography>
                  </Grid>
                </Grid>
                {expert.concerns && expert.concerns.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="body2" color="text.secondary">
                      Specializations
                    </Typography>
                    <Box
                      sx={{ mt: 1, display: "flex", flexWrap: "wrap", gap: 0.5 }}
                    >
                      {expert.concerns.map((spec, index) => (
                        <Chip
                          key={index}
                          label={spec.name}
                          size="small"
                          sx={{
                            bgcolor: `${staticData.color}15`,
                            color: staticData.color,
                          }}
                        />
                      ))}
                    </Box>
                  </Box>
                )}
                <Box
                  sx={{
                    mt: 3,
                    p: 2,
                    bgcolor: expert.availability ? "success.light" : "#90EE90",
                    borderRadius: 2,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Box>
                    <Typography variant="subtitle2" color="text.secondary">
                      Next Available
                    </Typography>
                    <Typography variant="body1" fontWeight="medium">
                      {expert?.events[0]?.start_date
                        ? formatDate(expert.events[0].start_date)
                        : "N/A"}
                    </Typography>
                  </Box>
                  <Typography variant="h6" fontWeight="bold" color="primary">
                    {expert?.consultation}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between" sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    onClick={() => handleViewConsultation(expert)}
                    sx={{
                      width: "48%",
                      bgcolor: staticData.color,
                      "&:hover": {
                        bgcolor: staticData.color,
                        opacity: 0.9,
                      },
                    }}
                  >
                    View Details
                  </Button>

                  <Button
                    variant="contained"
                    onClick={() => onBookExpert(expert)}
                    sx={{
                      width: "48%",
                      bgcolor: staticData.color,
                      "&:hover": {
                        bgcolor: staticData.color,
                        opacity: 0.9,
                      },
                    }}
                  >
                    Book Consultation
                  </Button>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>)}
    </Container>
  );
};

export default ExpertsSection;
