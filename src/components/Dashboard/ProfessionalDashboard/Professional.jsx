import { useEffect, useState } from "react";
import {
  Container,
  Grid,
  Typography,
  Box,
  Button,
  Card,
  CardContent,
} from "@mui/material";
import moment from "moment";
import "draft-js/dist/Draft.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Add, Assessment, Event } from "@mui/icons-material";
import { Calendar, momentLocalizer } from "react-big-calendar";
import ajaxCall from "../../../helpers/ajaxCall";
import CreateEventDialog from "../ProfessionalDashboard/CreateSlot/CreateEventDialog";
import DashboardShimmer from "../../UI/DashboardShimmer";
import { motion } from "framer-motion";
import backgroundImage from "../../../assets/HeroBanner.jpg";
const MotionBox = motion(Box);

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.1,
      duration: 0.5,
    },
  },
};

const generateBackgroundElements = (count) => {
  return Array.from({ length: count }).map((_, index) => ({
    id: index,
    size: Math.floor(Math.random() * 300) + 100,
    x: Math.floor(Math.random() * 100),
    y: Math.floor(Math.random() * 100),
    opacity: Math.random() * 0.08 + 0.02,
    duration: Math.random() * 40 + 20,
    delay: Math.random() * 5,
  }));
};

const localizer = momentLocalizer(moment);

const Professional = () => {
  const userId = JSON.parse(localStorage.getItem("loginInfo")).user;
  const [consultationList, setConsultationList] = useState([]);
  const [calendarEvents, setCalendarEvents] = useState([]);
  const [createEventDialogOpen, setCreateEventDialogOpen] = useState(false);
  const [expert, setExpert] = useState({});
  const [professionalEvent, setProfessionalEvent] = useState([]);
  const [loading, setLoading] = useState(true);
  const [count, setCount] = useState(0);

  const transformToCalendarEvents = (consultations) => {
    return consultations.map((consultation) => ({
      title: consultation.concerns || "Consultation",
      start: new Date(consultation.scheduled_time),
      end: new Date(
        new Date(consultation.scheduled_time).getTime() +
        moment.duration(consultation.duration).asMilliseconds()
      ),
    }));
  };

  const transformProfessionalEvents = (events) => {
    const eventArray = Array.isArray(events) ? events : [events];

    return eventArray.map((event) => ({
      title: event.title || "Professional Event",
      start: new Date(event.start_date),
      end: new Date(event.end_date),
    }));
  };

  const fetchData = async (url, setData, transformFunction) => {
    setLoading(true);
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
        const data = response?.data || [];
        setData(data);
        return transformFunction ? transformFunction(data) : [];
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
    const fetchAllData = async () => {
      const consultationEvents = await fetchData(
        `consultations/consultation-user/?user=${userId}`,
        setConsultationList,
        transformToCalendarEvents
      );
      const professionalEvents = await fetchData(
        `professionals/event-user/?user=${userId}`,
        setProfessionalEvent,
        transformProfessionalEvents
      );
      await fetchData(
        `professionals/professional-user/?user=${userId}`,
        setExpert
      );

      setCalendarEvents([...consultationEvents, ...professionalEvents]);
    };
    fetchAllData();
  }, [count, userId]);

  const getUpcomingEvents = (events) => {
    const today = new Date();
    return events.filter((event) => new Date(event.start) >= today);
  };

  const bgElements = generateBackgroundElements(6);
  const upcomingEvents = getUpcomingEvents(calendarEvents);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <DashboardShimmer />
      </Container>
    );
  }

  return (
    <MotionBox
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      sx={{
        position: "relative",
        minHeight: "100vh",
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        pt: { xs: 2, md: 4 },
        pb: 8,
        overflow: "hidden",
      }}
    >
      {bgElements.map((el) => (
        <MotionBox
          key={el.id}
          sx={{
            position: "fixed",
            width: el.size,
            height: el.size,
            borderRadius: "50%",
            background: "linear-gradient(145deg, #D8CCFF, #B5A6FF)",
            filter: "blur(60px)",
            left: `${el.x}%`,
            top: `${el.y}%`,
            opacity: el.opacity,
            zIndex: 0,
          }}
          animate={{
            x: ["-20px", "20px", "-20px"],
            y: ["-30px", "30px", "-30px"],
          }}
          transition={{
            duration: el.duration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
            delay: el.delay,
          }}
        />
      ))}
      <Container>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom mt={3}>
            Professional Dashboard
          </Typography>
        </Box>
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} md={6} lg={3}>
            <Card elevation={3}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Assessment fontSize="large" color="primary" />
                  <Box ml={2}>
                    <Typography variant="h6">Total Consultations</Typography>
                    <Typography variant="h4">
                      {consultationList?.length}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <Card elevation={3}>
              <CardContent>
                <Box display="flex" alignItems="center">
                  <Event fontSize="large" color="secondary" />
                  <Box ml={2}>
                    <Typography variant="h6">Upcoming Events</Typography>
                    <Typography variant="h4">
                      {upcomingEvents.length}
                    </Typography>
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
        <Box sx={{ mb: 4, p: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "flex-start", mb: 2 }}>
            <Button
              variant="contained"
              startIcon={<Add />}
              onClick={() => setCreateEventDialogOpen(true)}
            >
              Add Slot
            </Button>
          </Box>

          <Card
            sx={{
              p: 2,
              boxShadow: 3,
              borderRadius: 2,
              border: "1px solid #ddd",
              bgcolor: "white",
            }}
          >
            <Calendar
              localizer={localizer}
              events={calendarEvents}
              startAccessor="start"
              endAccessor="end"
              style={{ height: 500, padding: "10px" }}
            />
          </Card>
        </Box>

        <CreateEventDialog
          open={createEventDialogOpen}
          onClose={() => setCreateEventDialogOpen(false)}
          ProfessionalData={expert}
          setCount={setCount}
        />
      </Container>
    </MotionBox>
  );
};

export default Professional;
