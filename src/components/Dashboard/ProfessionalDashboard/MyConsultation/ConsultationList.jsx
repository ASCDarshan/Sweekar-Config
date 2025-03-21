import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  CircularProgress,
} from "@mui/material";
import ajaxCall from "../../../../helpers/ajaxCall";
import { useNavigate } from "react-router-dom";
import { DataTableShimmer } from "../../../UI/DataTableShimmer";
import { motion } from "framer-motion";

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

const getStatusColor = (status) => {
  switch (status) {
    case "SCHEDULED":
      return "primary";
    case "IN_PROGRESS":
      return "warning";
    case "COMPLETED":
      return "success";
    case "CANCELLED":
      return "error";
    default:
      return "default";
  }
};

const ConsultationList = () => {
  const navigate = useNavigate();
  const userId = JSON.parse(localStorage.getItem("loginInfo")).user;
  const [statusFilter, setStatusFilter] = useState("");
  const [consultationList, setConsultationList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterLoading, setFilterLoading] = useState(false);
  const loginInfo = JSON.parse(localStorage.getItem("loginInfo"));

  const fetchData = async (url, setData, isFilterChange = false) => {
    if (isFilterChange) {
      setFilterLoading(true);
    } else {
      setLoading(true);
    }
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
        setData([]);
      }
    } catch (error) {
      console.error("Network error:", error);
      setData([]);
    } finally {
      if (isFilterChange) {
        setFilterLoading(false);
      } else {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    let url = `consultations/consultation-user/?user=${userId}`;
    if (statusFilter) {
      url = `consultations/consultation-status/?user=${userId}&status=${statusFilter}`;
    }
    fetchData(url, setConsultationList, Boolean(statusFilter));
  }, [statusFilter, userId]);

  function formatScheduledTime(dateString) {
    const date = new Date(dateString);
    const options = { year: "numeric", month: "long", day: "numeric" };
    const formattedDate = date.toLocaleDateString("en-US", options);
    const hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, "0");
    const isAM = hours < 12;
    const formattedTime = `${hours % 12 || 12}:${minutes} ${isAM ? "AM" : "PM"
      }`;
    return `${formattedDate}, ${formattedTime}`;
  }

  const handleViewDetails = (consultationId) => {
    navigate(`/consultation/${consultationId}`);
  };

  const bgElements = generateBackgroundElements(6);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <DataTableShimmer />
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
        background: "rgb(227 221 206)",
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
      <Container
        maxWidth="lg"
        sx={{ mt: 4, py: 4, background: "rgb(227 221 206)" }}
      >
        <Paper sx={{ p: 3 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Typography variant="h5">My Consultations</Typography>
            <FormControl sx={{ width: 200 }}>
              <InputLabel>Status Filter</InputLabel>
              <Select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                label="Status Filter"
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="SCHEDULED">Scheduled</MenuItem>
                <MenuItem value="IN_PROGRESS">In Progress</MenuItem>
                <MenuItem value="COMPLETED">Completed</MenuItem>
                <MenuItem value="CANCELLED">Cancelled</MenuItem>
              </Select>
            </FormControl>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Date & Time</TableCell>
                  <TableCell>
                    {loginInfo.user.user_type === "CLIENT"
                      ? "Professional"
                      : "Client"}
                  </TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filterLoading ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      <CircularProgress />
                    </TableCell>
                  </TableRow>
                ) : consultationList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} align="center">
                      There is no consultation available for this status.
                    </TableCell>
                  </TableRow>
                ) : (
                  consultationList.map((consultation) => (
                    <TableRow key={consultation.id}>
                      <TableCell>
                        {formatScheduledTime(consultation.scheduled_time)}
                      </TableCell>
                      <TableCell>
                        {loginInfo.user.user_type === "CLIENT"
                          ? consultation.professional_details?.user.username
                          : consultation.client_details?.user.username}
                      </TableCell>
                      <TableCell>{consultation.consultation_type}</TableCell>
                      <TableCell>
                        <Chip
                          label={consultation.status}
                          color={getStatusColor(consultation.status)}
                        />
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleViewDetails(consultation.id)}
                        >
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>
      </Container>
    </MotionBox>
  );
};

export default ConsultationList;
