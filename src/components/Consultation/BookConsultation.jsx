/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
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
import { StaticDatePicker } from "@mui/x-date-pickers/StaticDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { CircularProgress } from "@mui/material";
import ajaxCall from "../../helpers/ajaxCall";
import Loading from "../UI/Loading";
import { toast } from "react-toastify";

const steps = ["Select Professional", "Choose Time", "Confirm Details"];

const BookConsultation = ({
  preSelectedExpert,
  onClose,
  preSelectedExpertType,
  setCount,
}) => {
  const userId = JSON.parse(localStorage.getItem("loginInfo"))?.user;
  const contentRef = useRef(null);

  const [professionals, setProfessionals] = useState([]);
  const [clientData, setClientData] = useState([]);

  const [selectedProfessional, setSelectedProfessional] = useState(
    preSelectedExpert || null
  );
  const [selectedDateTime, setSelectedDateTime] = useState(null);
  const [consultationType, setConsultationType] = useState("");
  const [concern, setConcern] = useState("");
  const [notes, setNotes] = useState("");
  const [eventData, setEventsData] = useState(null);

  const [loading, setLoading] = useState(true);
  const [btnLoading, setBtnLoading] = useState(false);
  const [activeStep, setActiveStep] = useState(0);

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
    if (preSelectedExpertType) {
      fetchData(
        `professionals/professional-filter/?professional_type=${preSelectedExpertType}`,
        setProfessionals
      );
    } else {
      fetchData("professionals/professionalist/", setProfessionals);
    }

    fetchData(`clients/profile-user/?user=${userId}`, setClientData);
  }, [preSelectedExpertType, userId]);

  const fetchEventData = async (url, setData) => {
    try {
      const response = await ajaxCall(
        url,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
              }`,
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
    if (selectedProfessional) {
      fetchEventData(
        `professionals/event-user/?user=${selectedProfessional?.user?.id}`,
        setEventsData
      );
    }
  }, [selectedProfessional]);

  const handleBookConsultant = async () => {
    setBtnLoading(true);
    try {
      const response = await ajaxCall(
        `consultations/consultation/create/`,
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
        setCount((prevCount) => prevCount + 1);
        toast.success("Consultation Booked Successfully.");
        onClose();
      } else {
        toast.error("Failed to book consultation. Please try again later.");
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      setBtnLoading(false);
    }
  };

  useEffect(() => {
    if (preSelectedExpert) {
      setSelectedProfessional(preSelectedExpert);
      setActiveStep(1);
    }
  }, [preSelectedExpert]);

  useEffect(() => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }, [activeStep]);

  const handleNext = () => {
    setActiveStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const renderTimeSlots = () => {
    if (!eventData || eventData.length === 0)
      return <Typography>No slots available for this expert</Typography>;

    const startDate = new Date(eventData[0].start_date);
    const endDate = new Date(eventData[0].end_date);

    const slots = [];
    const startHour = startDate.getUTCHours();
    const startMinute = startDate.getUTCMinutes();
    const endHour = endDate.getUTCHours();
    const endMinute = endDate.getUTCMinutes();

    for (let hour = startHour; hour <= endHour; hour++) {
      for (let minute of [0, 30]) {
        if (hour === startHour && minute < startMinute) continue;
        if (hour === endHour && minute > endMinute) continue;

        const time = new Date(startDate);
        time.setUTCHours(hour, minute, 0, 0);

        slots.push({
          time,
          available: true,
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
                    selectedDateTime.toISOString() === slot.time.toISOString()
                    ? "primary.light"
                    : "inherit",
              }}
            >
              {slot.time.getUTCHours().toString().padStart(2, "0")}:
              {slot.time.getUTCMinutes().toString().padStart(2, "0")}
            </Button>
          </Grid>
        ))}
      </Grid>
    );
  };

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

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            {professionals.length === 0 ? (
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  align="center"
                  sx={{ color: "text.secondary" }}
                >
                  There is no expert available for this category.
                </Typography>
              </Grid>
            ) : (
              professionals.map((professional) => {
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
                          {professional?.user?.username}
                        </Typography>
                        <Typography color="textSecondary">
                          {professional?.professional_type?.title}
                        </Typography>
                        <Typography variant="body2">
                          Experience: {professional?.years_of_experience}
                        </Typography>
                        <Typography variant="body2">
                          Languages: {professional?.languages_spoken}
                        </Typography>
                        <Box sx={{ mt: 1 }}>
                          <Typography variant="body2">
                            Specializations:{" "}
                            {professional?.professional_type?.concern.map(
                              (spec, index) => (
                                <Chip
                                  key={index}
                                  label={spec.name}
                                  size="small"
                                  sx={{ m: 0.5 }}
                                />
                              )
                            )}
                          </Typography>
                        </Box>
                      </CardContent>
                    </Card>
                  </Grid>
                );
              })
            )}
          </Grid>
        );

      case 1: {
        if (!eventData || eventData.length === 0) {
          return (
            <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
              <Typography variant="h6" color="textSecondary">
                There are no slots for this expert.
              </Typography>
            </Box>
          );
        }
        const startDate = new Date(eventData[0].start_date);

        return (
          <Box sx={{ mt: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Consultation Type* </InputLabel>
              <Select
                value={consultationType}
                onChange={(e) => setConsultationType(e.target.value)}
                label="Consultation Type"
              >
                {selectedProfessional?.is_available_online && (
                  <MenuItem value="AUDIO">Audio Call</MenuItem>
                )}
                {selectedProfessional?.is_available_in_person && (
                  <MenuItem value="IN_PERSON">In Person</MenuItem>
                )}
              </Select>
              <TextField
                fullWidth
                sx={{ mt: 2 }}
                label="List of concerns to be discussed (Preferred)"
                placeholder="Preferred list of concerns to be discussed"
                value={concern}
                onChange={(e) => setConcern(e.target.value)}
                variant="outlined"
              />
            </FormControl>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <StaticDatePicker
                displayStaticWrapperAs="desktop"
                value={selectedDateTime || startDate}
                onChange={(date) => {
                  const currentTime = selectedDateTime || startDate;
                  date.setHours(
                    currentTime.getHours(),
                    currentTime.getMinutes()
                  );
                  setSelectedDateTime(date);
                }}
                renderInput={(params) => <TextField {...params} />}
                minDate={startDate}
                maxDate={startDate}
                shouldDisableDate={(date) => {
                  return date.toDateString() !== startDate.toDateString();
                }}
              />
            </LocalizationProvider>
            {renderTimeSlots()}
          </Box>
        );
      }

      case 2:
        return (
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" gutterBottom>
              Consultation Details
            </Typography>
            <Typography>
              Professional: {selectedProfessional.user.username}
            </Typography>
            <Typography>Date & Time: {formatDate(selectedDateTime)}</Typography>
            <Typography>Type: {consultationType}</Typography>
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Notes for the consultation"
              value={notes}
              placeholder="Notes for the consultation"
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
      <div ref={contentRef} />
      <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        renderStepContent(activeStep)
      )}

      <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
        {activeStep !== 0 && (
          <Button onClick={handleBack} sx={{ mr: 1 }}>
            Back
          </Button>
        )}
        {activeStep === steps.length - 1 ? (
          btnLoading ? (
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
