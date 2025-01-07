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
import { useEffect, useState } from "react";

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
  const selectedServiceId = selectedService?.id;
  const staticData = StaticColor.find((s) => s.id === selectedServiceId);
  const [experts, setExperts] = useState([]);

  const fetchData = async (url, setData) => {
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
    }
  };

  useEffect(() => {
    fetchData(`professionals/professional-filter/?professional_type=${selectedService?.id}`, setExperts);
  }, [selectedServiceId]);

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
        <Typography variant="h6" color="textSecondary">
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
      <Grid container spacing={3}>
        {experts.map((expert) => (
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
                  <Typography color="text.secondary">{expert?.professional_type?.title} Specialist </Typography>
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
                  <Typography variant="body1">{expert?.years_of_experience} + years</Typography>
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
              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  bgcolor: expert.availability
                    ? "success.light"
                    : "warning.light",
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
                    {expert.nextAvailable}
                  </Typography>
                </Box>
                <Typography variant="h6" fontWeight="bold" color="primary">
                  {expert.consultationFee}
                </Typography>
              </Box>
              <Button
                fullWidth
                variant="contained"
                onClick={() => onBookExpert(expert)}
                sx={{
                  mt: 2,
                  bgcolor: staticData.color,
                  "&:hover": {
                    bgcolor: staticData.color,
                    opacity: 0.9,
                  },
                }}
              >
                Book Consultation
              </Button>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ExpertsSection;
