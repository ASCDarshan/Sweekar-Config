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
import { format } from "date-fns";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ajaxCall from "../../helpers/ajaxCall";
import { toast } from "react-toastify";
import Loading from "../UI/Loading";

const steps = ["Select Professional", "Choose Time", "Confirm Details"];

const BookConsultation = ({ preSelectedExpert, onClose }) => {
  const userId = JSON.parse(localStorage.getItem("loginInfo")).user;
  const [activeStep, setActiveStep] = useState(0);
  const [professionals, setProfessionals] = useState([]);
  const [clientData, setClientData] = useState([]);
  const [selectedProfessional, setSelectedProfessional] = useState(
    preSelectedExpert || null
  );
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [consultationType, setConsultationType] = useState("");
  const [concern, setConcern] = useState("");
  const [notes, setNotes] = useState("");
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
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData("professionals/professionalist/", setProfessionals);
    fetchData(`clients/profile-user/?user=${userId}`, setClientData);

  }, []);

  const handleBookConsultant = async () => {
    setLoading(true);
    try {
      const response = await ajaxCall(
        `consultations/consultations/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
              }`,
          },
          method: "POST",
          body: JSON.stringify({
            professional: selectedProfessional.id,
            client: clientData?.id,
            consultation_type: consultationType,
            scheduled_time: selectedDateTime,
            duration: 3600,
            status: "SCHEDULED",
            amount: selectedProfessional.hourly_rate,
            notes: notes,
            concerns: concern,
          }),
        },
        8000
      );

      if ([200, 201].includes(response.status)) {
        toast.success("Consultation Booked Successfully.");
        onClose();
      } else {
        toast.error("Failed to book consultation. Please try again later.");

      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (preSelectedExpert) {
      setSelectedProfessional(preSelectedExpert);
      setActiveStep(1);
    }
  }, [preSelectedExpert]);

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
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
          available: Math.random() > 0.3,
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
            {professionals.map((professional) => {
              return (
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
                      <Typography variant="h6">
                        {professional.user.username}
                      </Typography>
                      <Typography color="textSecondary">
                        {professional.professional_type.title}
                      </Typography>
                      <Typography variant="body2">
                        Experience: {professional.years_of_experience}
                      </Typography>
                      <Typography variant="body2">
                        Languages: {professional.languages_spoken}
                      </Typography>
                      <Box sx={{ mt: 1 }}>
                        <Typography variant="body2">
                          Specializations:{" "}
                          {professional.concerns.map((spec, index) => (
                            <Chip
                              key={index}
                              label={spec.name}
                              size="small"
                              sx={{ m: 0.5 }}
                            />
                          ))}
                        </Typography>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
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
                {selectedProfessional.is_available_online && (
                  <MenuItem value="VIDEO">Video Call</MenuItem>
                )}
                <MenuItem value="CHAT">Chat</MenuItem>
                <MenuItem value="AUDIO">Audio Call</MenuItem>
                {selectedProfessional.is_available_in_person && (
                  <MenuItem value="IN_PERSON">In Person</MenuItem>
                )}
              </Select>
              <TextField
                fullWidth
                sx={{ mt: 2 }}
                label="List of concerns to be discussed"
                value={concern}
                onChange={(e) => setConcern(e.target.value)}
                variant="outlined"
              />
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
            <Typography>
              Professional: {selectedProfessional.user.username}
            </Typography>
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
          loading ? (
            <Loading />
          ) : (
            <Button variant="contained" onClick={handleBookConsultant}>
              Book Now
            </Button>
          )
        ) : (
          <Button
            variant="contained"
            onClick={handleNext}
          // disabled={
          //   (activeStep === 0 && !selectedProfessional) ||
          //   (activeStep === 1 && (!selectedDateTime || !consultationType))
          // }
          >
            Next
          </Button>
        )}
      </Box>
    </Box>
  );
};

export default BookConsultation;
