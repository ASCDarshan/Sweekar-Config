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
} from "@mui/material";
import { CircularProgress } from "@mui/material";
import ajaxCall from "../../helpers/ajaxCall";
import { useNavigate } from "react-router-dom";

const Experts = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [experts, setExperts] = useState([]);
  const [loading, setLoading] = useState(true);

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
    finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData("professionals/professionalist/", setExperts);
  }, []);

  const handleViewConsultation = (experts) => {
    console.log(experts);
    navigate(`/experts/${experts.id}`);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress />
      </Box>
    );
  }

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
                      <Typography variant="h6">{expert?.user?.first_name} {expert?.user?.last_name}</Typography>
                      <Typography color="text.secondary" gutterBottom>
                        {expert.professional_type.title}
                      </Typography>
                      <Rating value={expert?.user?.rating} readOnly size="small" />
                    </Box>
                  </Box>
                  <Typography variant="body2" sx={{ mb: 2 }}>
                    Experience: {expert.years_of_experience} years
                  </Typography>
                  <Box sx={{ mb: 2 }}>
                    {expert.concerns.map((spec) => (
                      <Chip
                        key={spec.id}
                        label={spec.name}
                        size="small"
                        sx={{ mr: 0.5, mb: 0.5 }}
                      />
                    ))}
                  </Box>
                  <Box sx={{ mb: 2 }}>
                    <Chip
                      key={expert.languages_spoken}
                      label={expert.languages_spoken}
                      size="small"
                      variant="outlined"
                      sx={{ mr: 0.5 }}
                    />
                  </Box>
                  <Button variant="contained"
                    fullWidth
                    onClick={() => handleViewConsultation(expert)}>
                    View Profile
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
