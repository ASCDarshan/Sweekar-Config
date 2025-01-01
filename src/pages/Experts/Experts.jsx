import { useState } from "react";
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
} from "@mui/material";

const experts = [
  {
    name: "Dr. Sarah Johnson",
    type: "Mental Health Professional",
    specializations: ["LGBTQAI+ Counseling", "Anxiety", "Depression"],
    rating: 4.8,
    experience: "10+ years",
    languages: ["English", "Hindi"],
    image: "/path/to/image",
  },
];

const Experts = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");

  return (
    <Box>
      <Box
        sx={{
          bgcolor: "primary.light",
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
            Connect with LGBTQAI+ friendly and women-centric professionals
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
        sx={{ mt: -6, mb: 4, position: "relative", zIndex: 1 }}
      >
        <Card sx={{ p: 3, mb: 4 }}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                label="Search Experts"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                select
                label="Expert Type"
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
              >
                <MenuItem value="all">All Types</MenuItem>
                <MenuItem value="mental-health">Mental Health</MenuItem>
                <MenuItem value="legal">Legal</MenuItem>
                <MenuItem value="medical">Medical</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Card>
      </Container>
      <Container sx={{ my: 4 }}>
        <Grid container spacing={3}>
          {experts.map((expert, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <CardContent>
                  <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                    <Avatar
                      src={expert.image}
                      sx={{ width: 80, height: 80, mr: 2 }}
                    />
                    <Box>
                      <Typography variant="h6">{expert.name}</Typography>
                      <Typography color="text.secondary" gutterBottom>
                        {expert.type}
                      </Typography>
                      <Rating value={expert.rating} readOnly size="small" />
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Experience: {expert.experience}
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {expert.specializations.map((spec) => (
                      <Chip
                        key={spec}
                        label={spec}
                        size="small"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    {expert.languages.map((lang) => (
                      <Chip
                        key={lang}
                        label={lang}
                        size="small"
                        variant="outlined"
                        sx={{ mr: 0.5 }}
                      />
                    ))}
                  </Box>
                  <Button variant="contained" fullWidth>
                    Book Consultation
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Experts;
