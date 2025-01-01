import { useState, useEffect } from "react";
import {
  Stepper,
  Step,
  StepLabel,
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
  Chip,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { format } from "date-fns";

const steps = ["Select Professional", "Choose Time", "Confirm Details"];

const BookConsultation = ({ preSelectedService, preSelectedExpert }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [professionals, setProfessionals] = useState([]);
  const [selectedProfessional, setSelectedProfessional] = useState(
    preSelectedExpert || null
  );
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [consultationType, setConsultationType] = useState("");
  const [notes, setNotes] = useState("");
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   const fetchProfessionals = async () => {
  //     try {
  //       const response = await axiosInstance.get('/professionals/public/');
  //       // If preSelectedService is provided, filter professionals by service
  //       const filteredProfessionals = preSelectedService
  //         ? response.data.filter(prof => prof.serviceId === preSelectedService.id)
  //         : response.data;
  //       setProfessionals(filteredProfessionals);
  //     } catch (error) {
  //       console.error('Error fetching professionals:', error);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchProfessionals();
  // }, [preSelectedService]);

  useEffect(() => {
    if (preSelectedExpert) {
      setSelectedProfessional(preSelectedExpert);
      setActiveStep(1); // Skip to time selection if expert is pre-selected
    }
  }, [preSelectedExpert]);

  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    // try {
    //   const consultationData = {
    //     professional: selectedProfessional.id,
    //     scheduled_time: selectedDateTime.toISOString(),
    //     consultation_type: consultationType,
    //     notes: notes,
    //     duration: 30,
    //   };
    //   const response = await axiosInstance.post('/consultations/consultations/', consultationData);
    //   window.location.href = `/consultation/${response.data.id}`;
    // } catch (error) {
    //   console.error('Error booking consultation:', error);
    // }
  };

  const renderTimeSlots = () => {
    const slots = [];
    const startHour = 9;
    const endHour = 17;

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute of [0, 30]) {
        const time = new Date();
        time.setHours(hour, minute, 0);
        slots.push({
          time,
          available: Math.random() > 0.3, // Simulate availability
        });
      }
    }

    return (
      <Grid container spacing={1} sx={{ mt: 2 }}>
        {slots.map((slot, index) => (
          <Grid item xs={4} sm={3} key={index}>
            <Button
              variant={slot.available ? "outlined" : "text"}
              disabled={!slot.available}
              onClick={() => setSelectedDateTime(slot.time)}
              fullWidth
              sx={{
                py: 1,
                bgcolor:
                  selectedDateTime &&
                  selectedDateTime.getTime() === slot.time.getTime()
                    ? "primary.light"
                    : "inherit",
              }}
            >
              {format(slot.time, "HH:mm")}
            </Button>
          </Grid>
        ))}
      </Grid>
    );
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
                    cursor: "pointer",
                    border:
                      selectedProfessional?.id === professional.id ? 2 : 0,
                    borderColor: "primary.main",
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "translateY(-4px)",
                    },
                  }}
                  onClick={() => setSelectedProfessional(professional)}
                >
                  <CardContent>
                    <Typography variant="h6">{professional.name}</Typography>
                    <Typography color="textSecondary">
                      {professional.title}
                    </Typography>
                    <Typography variant="body2">
                      Experience: {professional.experience}
                    </Typography>
                    <Typography variant="body2">
                      Languages: {professional.languages.join(", ")}
                    </Typography>
                    <Box sx={{ mt: 1 }}>
                      {professional.specializations.map((spec, index) => (
                        <Chip
                          key={index}
                          label={spec}
                          size="small"
                          sx={{ m: 0.5 }}
                        />
                      ))}
                    </Box>
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
                label="Consultation Type"
              >
                <MenuItem value="VIDEO">Video Call</MenuItem>
                <MenuItem value="AUDIO">Audio Call</MenuItem>
                <MenuItem value="CHAT">Chat</MenuItem>
                <MenuItem value="IN_PERSON">In Person</MenuItem>
              </Select>
            </FormControl>

            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                value={selectedDateTime}
                onChange={(date) => {
                  const currentTime = selectedDateTime || new Date();
                  date.setHours(
                    currentTime.getHours(),
                    currentTime.getMinutes()
                  );
                  setSelectedDateTime(date);
                }}
                renderInput={(params) => <TextField {...params} />}
                minDate={new Date()}
                shouldDisableDate={(date) =>
                  date.getDay() === 0 || date.getDay() === 6
                }
              />
            </LocalizationProvider>

            {renderTimeSlots()}
          </Box>
        );

      case 2:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Consultation Details
            </Typography>
            <Typography>Professional: {selectedProfessional?.name}</Typography>
            <Typography>
              Date & Time: {selectedDateTime?.toLocaleString()}
            </Typography>
            <Typography>Type: {consultationType}</Typography>
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
    <Box sx={{ p: 2 }}>
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {renderStepContent(activeStep)}

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
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
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={
              (activeStep === 0 && !selectedProfessional) ||
              (activeStep === 1 && (!selectedDateTime || !consultationType))
            }
          >
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default BookConsultation;
