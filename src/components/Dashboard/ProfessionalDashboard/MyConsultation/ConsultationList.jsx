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

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <DataTableShimmer />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, py: 4 }}>
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
  );
};

export default ConsultationList;
