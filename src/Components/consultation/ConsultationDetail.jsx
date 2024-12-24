import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
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
} from '@mui/material';
import api from '../../services/axios';

const ConsultationDetail = () => {
  const { id } = useParams();
  const [consultation, setConsultation] = useState(null);
  const [reviewDialog, setReviewDialog] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConsultation();
  }, [id]);

  const fetchConsultation = async () => {
    try {
      const response = await api.get(`/consultations/consultations/${id}/`);
      setConsultation(response.data);
    } catch (error) {
      console.error('Error fetching consultation:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async () => {
    try {
      await api.post(`/consultations/consultations/${id}/cancel/`);
      fetchConsultation();
    } catch (error) {
      console.error('Error cancelling consultation:', error);
    }
  };

  const handleSubmitReview = async () => {
    try {
      await api.post('/consultations/reviews/', {
        consultation: id,
        rating,
        comment,
      });
      setReviewDialog(false);
      fetchConsultation();
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  if (loading || !consultation) {
    return <div>Loading...</div>;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Consultation Details
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Professional</Typography>
            <Typography variant="h6">
              {consultation.professional_name}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Status</Typography>
            <Chip
              label={consultation.status}
              color={consultation.status === 'COMPLETED' ? 'success' : 'primary'}
            />
          </Grid>

          <Grid item xs={12}>
            <Divider sx={{ my: 2 }} />
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Date & Time</Typography>
            <Typography>
              {new Date(consultation.scheduled_time).toLocaleString()}
            </Typography>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="subtitle1">Type</Typography>
            <Typography>{consultation.consultation_type}</Typography>
          </Grid>

          {consultation.notes && (
            <Grid item xs={12}>
              <Typography variant="subtitle1">Notes</Typography>
              <Typography>{consultation.notes}</Typography>
            </Grid>
          )}

          <Grid item xs={12}>
            <Box sx={{ mt: 3, display: 'flex', gap: 2 }}>
              {consultation.status === 'SCHEDULED' && (
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleCancel}
                >
                  Cancel Consultation
                </Button>
              )}

              {consultation.status === 'COMPLETED' && !consultation.review && (
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
          <Button onClick={handleSubmitReview} variant="contained">
            Submit Review
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default ConsultationDetail;