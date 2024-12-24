// src/components/consultation/BookConsultation.jsx
import { useState, useEffect } from 'react';
import {
  Container,
  Stepper,
  Step,
  StepLabel,
  Paper,
  Typography,
  Box,
  Grid,
  Card,
  CardContent,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
} from '@mui/material';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import axiosInstance from '../../services/axios';

const steps = ['Select Professional', 'Choose Time', 'Confirm Details'];

const BookConsultation = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [professionals, setProfessionals] = useState([]);
  const [selectedProfessional, setSelectedProfessional] = useState(null);
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [consultationType, setConsultationType] = useState('');
  const [notes, setNotes] = useState('');

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const response = await api.get('/professionals/public/');
        setProfessionals(response.data);
      } catch (error) {
        console.error('Error fetching professionals:', error);
      }
    };

    fetchProfessionals();
  }, []);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    try {
      const consultationData = {
        professional: selectedProfessional.id,
        scheduled_time: selectedDateTime.toISOString(),
        consultation_type: consultationType,
        notes: notes,
        duration: 30,
      };

      const response = await api.post('/consultations/consultations/', consultationData);
      window.location.href = `/consultation/${response.data.id}`;
    } catch (error) {
      console.error('Error booking consultation:', error);
    }
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            {professionals.map((professional) => (
              <Grid item xs={12} md={6} key={professional.id}>
                <Card
                  sx={{
                    cursor: 'pointer',
                    border: selectedProfessional?.id === professional.id ? 2 : 0,
                    borderColor: 'primary.main'
                  }}
                  onClick={() => setSelectedProfessional(professional)}
                >
                  <CardContent>
                    <Typography variant="h6">
                      {professional.user.first_name} {professional.user.last_name}
                    </Typography>
                    <Typography color="textSecondary">
                      {professional.professional_type}
                    </Typography>
                    <Typography variant="body2">
                      Experience: {professional.years_of_experience} years
                    </Typography>
                    <Typography variant="body2">
                      Rating: {professional.rating}/5
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        );

      case 1:
        return (
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Consultation Type</InputLabel>
              <Select
                value={consultationType}
                onChange={(e) => setConsultationType(e.target.value)}
              >
                <MenuItem value="VIDEO">Video Call</MenuItem>
                <MenuItem value="AUDIO">Audio Call</MenuItem>
                <MenuItem value="CHAT">Chat</MenuItem>
                <MenuItem value="IN_PERSON">In Person</MenuItem>
              </Select>
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DateTimePicker
                label="Choose Date and Time"
                value={selectedDateTime}
                onChange={setSelectedDateTime}
                renderInput={(params) => <TextField {...params} fullWidth />}
                minDate={new Date()}
                minTime={new Date(0, 0, 0, 9)}
                maxTime={new Date(0, 0, 0, 17)}
              />
            </LocalizationProvider>
          </Box>
        );

      case 2:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Consultation Details
            </Typography>
            <Typography>
              Professional: {selectedProfessional?.user.first_name} {selectedProfessional?.user.last_name}
            </Typography>
            <Typography>
              Date & Time: {selectedDateTime?.toLocaleString()}
            </Typography>
            <Typography>
              Type: {consultationType}
            </Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Notes for the consultation"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              sx={{ mt: 2 }}
            />
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md">
      <Paper sx={{ p: 4, mt: 4 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Book Consultation
        </Typography>
        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        {renderStepContent(activeStep)}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          {activeStep !== 0 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          {activeStep === steps.length - 1 ? (
            <Button variant="contained" onClick={handleSubmit}>
              Book Now
            </Button>
          ) : (
            <Button variant="contained" onClick={handleNext}>
              Next
            </Button>
          )}
        </Box>
      </Paper>
    </Container>
  );
};

export default BookConsultation;