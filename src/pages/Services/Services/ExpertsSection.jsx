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

const experts = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    serviceId: 1,
    title: "Clinical Psychologist",
    experience: "15+ years",
    specializations: ["LGBTQAI+ Counseling", "Anxiety", "Depression"],
    rating: 4.9,
    availability: true,
    languages: ["English", "Hindi"],
    consultationFee: "₹1500",
    nextAvailable: "Today",
  },
  {
    id: 2,
    name: "Adv. Priya Mehta",
    serviceId: 2,
    title: "Human Rights Lawyer",
    experience: "12+ years",
    specializations: [
      "LGBTQAI+ Rights",
      "Family Law",
      "Workplace Discrimination",
    ],
    rating: 4.8,
    availability: true,
    languages: ["English", "Hindi", "Gujarati"],
    consultationFee: "₹2000",
    nextAvailable: "Tomorrow",
  },
  {
    id: 3,
    name: "Dr. Rajesh Patel",
    serviceId: 3,
    title: "General Physician",
    experience: "20+ years",
    specializations: [
      "General Medicine",
      "Sexual Health",
      "Gender-affirming Care",
    ],
    rating: 4.9,
    availability: true,
    languages: ["English", "Hindi", "Gujarati"],
    consultationFee: "₹1000",
    nextAvailable: "Today",
  },
  {
    id: 4,
    name: "Ms. Deepa Shah",
    serviceId: 4,
    title: "Career Counselor",
    experience: "10+ years",
    specializations: [
      "Career Guidance",
      "Resume Building",
      "Interview Preparation",
    ],
    rating: 4.7,
    availability: true,
    languages: ["English", "Hindi"],
    consultationFee: "₹1200",
    nextAvailable: "Tomorrow",
  },
];

const ExpertsSection = ({ selectedService, onBookExpert }) => {
  const filteredExperts = experts.filter(
    (expert) => expert.serviceId === selectedService?.id
  );

  if (!selectedService) {
    return null;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 8, mb: 6 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 700,
          textAlign: "center",
          mb: 4,
        }}
      >
        {selectedService.category} Experts
      </Typography>
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
                    border: `2px solid ${selectedService.color}`,
                  }}
                />
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {expert.name}
                  </Typography>
                  <Typography color="text.secondary">{expert.title}</Typography>
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
                  <Typography variant="body1">{expert.experience}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Languages
                  </Typography>
                  <Typography variant="body1">
                    {expert.languages.join(", ")}
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
                  {expert.specializations.map((spec, index) => (
                    <Chip
                      key={index}
                      label={spec}
                      size="small"
                      sx={{
                        bgcolor: `${selectedService.color}15`,
                        color: selectedService.color,
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
                  bgcolor: selectedService.color,
                  "&:hover": {
                    bgcolor: selectedService.color,
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
