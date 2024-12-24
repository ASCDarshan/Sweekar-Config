import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Card,
  CardContent,
  Button,
  Avatar,
  IconButton,
  Chip,
  Tooltip,
  Rating,
  Divider,
  SwipeableDrawer,
  useTheme,
  Grow,
} from '@mui/material';
import {
  Psychology,
  Gavel,
  LocalHospital,
  Work,
  ArrowForward,
  Close,
  CheckCircle,
  Info,
} from '@mui/icons-material';

const services = [
  {
    id: 1,
    category: "Mental Health",
    icon: <Psychology sx={{ fontSize: 40 }} />,
    shortDescription: "Professional mental health support in a safe environment",
    description: "Access professional mental health support specifically designed for LGBTQAI+ individuals and women. Our services ensure a safe, understanding, and confidential environment.",
    features: [
      "Individual Counseling",
      "Group Support Sessions",
      "Crisis Intervention",
      "Family Counseling",
    ],
    benefits: [
      "24/7 Emergency Support",
      "Online & In-person Sessions",
      "Specialized LGBTQAI+ Expertise",
      "Confidential Environment"
    ],
    color: "#9D84B7",
    stats: {
      professionals: 50,
      sessions: 1000,
      satisfaction: 98
    }
  },
  {
    id: 2,
    category: "Legal Aid",
    icon: <Gavel sx={{ fontSize: 40 }} />,
    shortDescription: "Expert legal support for rights and justice",
    description: "Comprehensive legal assistance for protecting rights and ensuring justice for the LGBTQAI+ community and women.",
    features: [
      "Rights Advocacy",
      "Documentation Support",
      "Family Law",
      "Workplace Rights"
    ],
    benefits: [
      "Expert LGBTQAI+ Lawyers",
      "Pro-bono Services",
      "Complete Privacy",
      "Regular Workshops"
    ],
    color: "#7A5BA1",
    stats: {
      professionals: 30,
      cases: 500,
      success: 95
    }
  },
  {
    id: 3,
    category: "Medical Services",
    icon: <LocalHospital sx={{ fontSize: 40 }} />,
    shortDescription: "Inclusive healthcare for your well-being",
    description: "Access to LGBTQAI+ friendly healthcare providers offering comprehensive medical services in a respectful environment.",
    features: [
      "General Healthcare",
      "Gender-affirming Care",
      "Sexual Health Services",
      "Regular Health Checkups"
    ],
    benefits: [
      "LGBTQAI+ Friendly Doctors",
      "Private Consultations",
      "Specialized Care Plans",
      "Inclusive Healthcare"
    ],
    color: "#FF6B6B",
    stats: {
      doctors: 40,
      patients: 2000,
      satisfaction: 97
    }
  },
  {
    id: 4,
    category: "Placement Services",
    icon: <Work sx={{ fontSize: 40 }} />,
    shortDescription: "Career opportunities in inclusive workplaces",
    description: "Connect with LGBTQAI+ friendly employers and access career development resources for professional growth.",
    features: [
      "Job Placements",
      "Career Counseling",
      "Resume Building",
      "Interview Preparation"
    ],
    benefits: [
      "Verified Inclusive Employers",
      "Career Guidance",
      "Skill Development",
      "Networking Opportunities"
    ],
    color: "#4ECDC4",
    stats: {
      companies: 100,
      placements: 750,
      success: 92
    }
  }
];

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
    nextAvailable: "Today"
  },
  {
    id: 2,
    name: "Adv. Priya Mehta",
    serviceId: 2,
    title: "Human Rights Lawyer",
    experience: "12+ years",
    specializations: ["LGBTQAI+ Rights", "Family Law", "Workplace Discrimination"],
    rating: 4.8,
    availability: true,
    languages: ["English", "Hindi", "Gujarati"],
    consultationFee: "₹2000",
    nextAvailable: "Tomorrow"
  },
  {
    id: 3,
    name: "Dr. Rajesh Patel",
    serviceId: 3,
    title: "General Physician",
    experience: "20+ years",
    specializations: ["General Medicine", "Sexual Health", "Gender-affirming Care"],
    rating: 4.9,
    availability: true,
    languages: ["English", "Hindi", "Gujarati"],
    consultationFee: "₹1000",
    nextAvailable: "Today"
  },
  {
    id: 4,
    name: "Ms. Deepa Shah",
    serviceId: 4,
    title: "Career Counselor",
    experience: "10+ years",
    specializations: ["Career Guidance", "Resume Building", "Interview Preparation"],
    rating: 4.7,
    availability: true,
    languages: ["English", "Hindi"],
    consultationFee: "₹1200",
    nextAvailable: "Tomorrow"
  }
];

const ServiceCard = ({ service, onSelect, isSelected }) => {
  const theme = useTheme();

  return (
    <Grow in={true}>
      <Card
        elevation={isSelected ? 12 : 3}
        sx={{
          height: '100%',
          cursor: 'pointer',
          transition: 'all 0.3s ease',
          transform: isSelected ? 'scale(1.02)' : 'scale(1)',
          '&:hover': {
            transform: 'scale(1.02)',
            boxShadow: theme.shadows[12],
          },
          position: 'relative',
          overflow: 'visible',
          bgcolor: isSelected ? `${service.color}10` : 'background.paper',
          border: isSelected ? `2px solid ${service.color}` : 'none',
        }}
        onClick={() => onSelect(service)}
      >
        <CardContent sx={{ p: 3 }}>
          {isSelected && (
            <Chip
              icon={<CheckCircle />}
              label="Selected"
              color="primary"
              sx={{
                position: 'absolute',
                top: -16,
                right: 16,
                backgroundColor: service.color,
              }}
            />
          )}

          <Avatar
            sx={{
              bgcolor: service.color,
              width: 60,
              height: 60,
              mb: 2,
            }}
          >
            {service.icon}
          </Avatar>

          <Typography variant="h5" gutterBottom fontWeight="bold">
            {service.category}
          </Typography>

          <Typography color="text.secondary" paragraph>
            {service.shortDescription}
          </Typography>

          <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
            {service.features.slice(0, 3).map((feature, idx) => (
              <Chip
                key={idx}
                label={feature}
                size="small"
                sx={{
                  bgcolor: `${service.color}20`,
                  color: service.color,
                }}
              />
            ))}
            {service.features.length > 3 && (
              <Tooltip title={service.features.slice(3).join(', ')}>
                <Chip
                  icon={<Info />}
                  label={`+${service.features.length - 3} more`}
                  size="small"
                  sx={{
                    bgcolor: `${service.color}20`,
                    color: service.color,
                  }}
                />
              </Tooltip>
            )}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 'auto' }}>
            {Object.entries(service.stats).map(([key, value]) => (
              <Box key={key} sx={{ textAlign: 'center' }}>
                <Typography variant="h6" color={service.color} fontWeight="bold">
                  {value}+
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {key}
                </Typography>
              </Box>
            ))}
          </Box>
        </CardContent>
      </Card>
    </Grow>
  );
};

const ServiceDetailDrawer = ({ service, open, onClose }) => {

  if (!service) return null;

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      onOpen={() => { }}
      PaperProps={{
        sx: {
          width: { xs: '100%', sm: 400 },
          p: 3,
        }
      }}
    >
      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography variant="h5" fontWeight="bold">
          {service.category}
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>

      <Typography paragraph color="text.secondary">
        {service.description}
      </Typography>

      <Typography variant="h6" gutterBottom fontWeight="bold">
        Features
      </Typography>
      <Box sx={{ mb: 3 }}>
        {service.features.map((feature, idx) => (
          <Chip
            key={idx}
            label={feature}
            sx={{ m: 0.5 }}
          />
        ))}
      </Box>

      <Typography variant="h6" gutterBottom fontWeight="bold">
        Benefits
      </Typography>
      <Box sx={{ mb: 3 }}>
        {service.benefits.map((benefit, idx) => (
          <Box
            key={idx}
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 1,
              p: 1,
              bgcolor: 'grey.50',
              borderRadius: 1,
            }}
          >
            <CheckCircle color="primary" sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="body2">{benefit}</Typography>
          </Box>
        ))}
      </Box>

      <Button
        fullWidth
        variant="contained"
        size="large"
        endIcon={<ArrowForward />}
        sx={{
          mt: 'auto',
          bgcolor: service.color,
          '&:hover': {
            bgcolor: service.color,
            opacity: 0.9,
          }
        }}
      >
        Book Consultation
      </Button>
    </SwipeableDrawer>
  );
};

const ExpertsSection = ({ selectedService }) => {
  const filteredExperts = experts.filter(expert => expert.serviceId === selectedService?.id);

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
          textAlign: 'center',
          mb: 4
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
                height: '100%',
                transition: 'transform 0.2s',
                '&:hover': {
                  transform: 'translateY(-5px)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Avatar
                  sx={{
                    width: 80,
                    height: 80,
                    mr: 2,
                    border: `2px solid ${selectedService.color}`
                  }}
                />
                <Box>
                  <Typography variant="h6" gutterBottom>
                    {expert.name}
                  </Typography>
                  <Typography color="text.secondary">
                    {expert.title}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
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
                    {expert.experience}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Languages
                  </Typography>
                  <Typography variant="body1">
                    {expert.languages.join(', ')}
                  </Typography>
                </Grid>
              </Grid>

              <Box sx={{ mt: 2 }}>
                <Typography variant="body2" color="text.secondary">
                  Specializations
                </Typography>
                <Box sx={{ mt: 1, display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
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
                  bgcolor: expert.availability ? 'success.light' : 'warning.light',
                  borderRadius: 2,
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
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
                <Typography
                  variant="h6"
                  fontWeight="bold"
                  color="primary"               >
                  {expert.consultationFee}
                </Typography>
              </Box>

              <Button
                fullWidth
                variant="contained"
                sx={{
                  mt: 2,
                  bgcolor: selectedService.color,
                  '&:hover': {
                    bgcolor: selectedService.color,
                    opacity: 0.9,
                  }
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

const ServicesPage = () => {
  const theme = useTheme();
  const [selectedService, setSelectedService] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const handleServiceSelect = (service) => {
    setSelectedService(service);
    setDetailOpen(true);
  };

  return (
    <Box>
      <Box
        sx={{
          background: `linear-gradient(45deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
          py: 8,
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            align="center"
            gutterBottom
            sx={{
              fontWeight: 700,
              color: 'white',
              mb: 3
            }}
          >
            Our Services
          </Typography>
          <Typography
            variant="h5"
            align="center"
            sx={{
              maxWidth: 800,
              mx: 'auto',
              mb: 4,
              color: 'rgba(255, 255, 255, 0.9)'
            }}
          >
            Comprehensive support services designed for LGBTQAI+ individuals and women
          </Typography>
        </Container>

        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(255, 255, 255, 0.1)',
          }}
        />
      </Box>

      <Container maxWidth="lg" sx={{ mt: -6, mb: 4, position: 'relative', zIndex: 1 }}>
        <Grid container spacing={3}>
          {services.map((service) => (
            <Grid
              item
              xs={12}
              md={6}
              lg={3}
              key={service.id}
            >
              <ServiceCard
                service={service}
                onSelect={handleServiceSelect}
                isSelected={selectedService?.id === service.id}
              />
            </Grid>
          ))}
        </Grid>
      </Container>

      <ExpertsSection selectedService={selectedService} />

      <Container maxWidth="lg" sx={{ mb: 6 }}>
        <Paper
          elevation={3}
          sx={{
            p: 6,
            textAlign: 'center',
            borderRadius: 4,
            background: 'linear-gradient(45deg, #9D84B7 0%, #7A5BA1 100%)',
            color: 'white',
          }}
        >
          <Typography variant="h4" gutterBottom fontWeight="bold">
            Need Help Choosing a Service?
          </Typography>
          <Typography variant="body1" paragraph sx={{ mb: 3, maxWidth: 600, mx: 'auto' }}>
            Our team is here to guide you to the right service based on your needs.
            Get personalized support to find the best match for your requirements.
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: 'white',
              color: 'primary.main',
              px: 4,
              py: 1.5,
              '&:hover': {
                bgcolor: 'rgba(255, 255, 255, 0.9)',
              }
            }}
          >
            Contact Us
          </Button>
        </Paper>
      </Container>

      <ServiceDetailDrawer
        service={selectedService}
        open={detailOpen}
        onClose={() => setDetailOpen(false)}
      />
    </Box>
  );
};

export default ServicesPage;