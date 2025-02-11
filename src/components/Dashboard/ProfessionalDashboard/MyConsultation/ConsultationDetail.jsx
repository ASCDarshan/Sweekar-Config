import { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Grid,
  Button,
  Chip,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Rating,
} from "@mui/material";
import ajaxCall from "../../../../helpers/ajaxCall";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ConsultationDetail = () => {
  const { id } = useParams();
  const userType = JSON.parse(localStorage.getItem("loginInfo"))?.user_type;
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [reviewDialog, setReviewDialog] = useState(false);
  const [consultation, setConsultation] = useState([]);
  const [cancelDialog, setCancelDialog] = useState(false);

  const fetchData = async (url, setData) => {
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
    }
  };

  useEffect(() => {
    fetchData(`consultations/consultation-update/${id}/`, setConsultation);
  }, [id]);

  const handleCancelConsultation = async () => {
    try {
      const response = await ajaxCall(
        `consultations/consultation-cancel/${id}/`,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
              }`,
          },
          method: "PATCH",
        },
        8000
      );
      if ([200, 201].includes(response.status)) {
        toast.success("Consultation Cancelled Successfully.");
        setCancelDialog(false);
        fetchData(`consultations/consultation-update/${id}/`, setConsultation);
      } else if ([400, 404].includes(response.status)) {
        toast.error("Some Problem Occurred. Please try again.");
      } else if ([401].includes(response.status)) {
        toast.error("Invalid Credentials.");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Consultation Details
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            {userType === "CLIENT" && (
              <Typography variant="subtitle1">Professional</Typography>
            )}
            {userType === "PROFESSIONAL" && (
              <Typography variant="subtitle1">Client</Typography>
            )}
            <Typography variant="h6">
              {userType === "CLIENT" &&
                consultation?.professional_details?.user?.username}
              {userType === "PROFESSIONAL" &&
                consultation?.client_details?.user?.username}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Status</Typography>
            <Chip
              label={consultation?.status}
              color={
                consultation?.status === "COMPLETED" ? "success" : "primary"
              }
            />
          </Grid>
          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Date & Time</Typography>
            <Typography>
              {new Date(consultation?.scheduled_time).toLocaleString()}
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Type</Typography>
            <Typography>{consultation?.consultation_type}</Typography>
          </Grid>
          {consultation?.notes && (
            <Grid item xs={6}>
              <Typography variant="subtitle1">Notes</Typography>
              <Typography>{consultation?.notes}</Typography>
            </Grid>
          )}
          <Grid item xs={6}>
            <Typography variant="subtitle1">Concerns</Typography>
            <Typography>{consultation?.concerns}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography variant="subtitle1">Payment Status</Typography>
            <Typography>{consultation?.payment_status}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ mt: 3, display: "flex", gap: 2 }}>
              {consultation?.status === "SCHEDULED" && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => setCancelDialog(true)}
                >
                  Cancel Consultation
                </Button>
              )}

              {consultation?.status === "COMPLETED" &&
                !consultation?.review && (
                  <Button
                    variant="contained"
                    onClick={() => setReviewDialog(true)}
                  >
                    Leave Review
                  </Button>
                )}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      <Dialog open={reviewDialog} onClose={() => setReviewDialog(false)}>
        <DialogTitle>Leave a Review</DialogTitle>
        <DialogContent>
          <Box sx={{ mt: 2 }}>
            <Typography component="legend">Rating</Typography>
            <Rating
              value={rating}
              onChange={(event, newValue) => {
                setRating(newValue);
              }}
            />
            <TextField
              fullWidth
              multiline
              rows={4}
              label="Your Review"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              sx={{ mt: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setReviewDialog(false)}>Cancel</Button>
          <Button variant="contained">Submit Review</Button>
        </DialogActions>
      </Dialog>

      <Dialog open={cancelDialog} onClose={() => setCancelDialog(false)}>
        <DialogTitle>Are you sure you want to cancel this consultation?</DialogTitle>
        <DialogActions>
          <Button onClick={() => setCancelDialog(false)}>No</Button>
          <Button
            variant="contained"
            onClick={handleCancelConsultation}
            size="small"
          >
            Yes, Cancel
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ConsultationDetail;