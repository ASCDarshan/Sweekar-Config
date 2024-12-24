import { useState } from 'react';
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
  Rating
} from '@mui/material';

const experts = [
  {
    name: "Dr. Sarah Johnson",
    type: "Mental Health Professional",
    specializations: ["LGBTQAI+ Counseling", "Anxiety", "Depression"],
    rating: 4.8,
    experience: "10+ years",
    languages: ["English", "Hindi"],
    image: "/path/to/image"
  },
];


const ExpertsPage = () => {
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');


  return (
    <Box>
      <Box sx={{ bgcolor: 'primary.light', py: 6 }}>
        <Container>
          <Typography variant="h3" gutterBottom align="center">
            Our Verified Experts
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary">
            Connect with LGBTQAI+ friendly and women-centric professionals
          </Typography>
        </Container>
      </Box>

      <Container sx={{ mt: -4 }}>
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
                  height: '100%',
                  transition: 'transform 0.2s',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                  }
                }}
              >
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
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

export default ExpertsPage;