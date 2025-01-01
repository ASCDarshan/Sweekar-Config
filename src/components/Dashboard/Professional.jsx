import { useState } from "react";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Card,
  CardContent,
  CircularProgress,
} from "@mui/material";
import moment from "moment";
import "draft-js/dist/Draft.css";
import { Editor, EditorState } from "draft-js";
import "react-big-calendar/lib/css/react-big-calendar.css";
import { Add, Assessment, Event } from "@mui/icons-material";
import { Calendar, momentLocalizer } from "react-big-calendar";

const localizer = momentLocalizer(moment);

const Professional = () => {
  const consultation = null;
  const calendarEvents = [];
  const latestConsultations = [];

  const [dialogOpen, setDialogOpen] = useState(false);
  const [createEventDialogOpen, setCreateEventDialogOpen] = useState(false);
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  return (
    <Container>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
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
                  <Typography variant="h4">152</Typography>
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
                  <Typography variant="h4">8</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} lg={6}>
          <Paper sx={{ p: 2, height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Latest Consultations
            </Typography>
            {latestConsultations.length > 0 ? (
              latestConsultations.map((consultation, index) => (
                <Box
                  key={index}
                  display="flex"
                  justifyContent="space-between"
                  mb={1}
                >
                  <Typography>{consultation.title}</Typography>
                  <Typography color="text.secondary">
                    {moment(consultation.date).format("MMM D, YYYY")}
                  </Typography>
                </Box>
              ))
            ) : (
              <Typography color="text.secondary">
                No consultations available
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
      <Box sx={{ mb: 4 }}>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setCreateEventDialogOpen(true)}
          sx={{ mb: 2 }}
        >
          Create Event
        </Button>
        <Calendar
          localizer={localizer}
          events={calendarEvents}
          startAccessor="start"
          endAccessor="end"
          style={{ height: 500 }}
        />
      </Box>
      <ConsultationDialog
        consultation={consultation}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        editorState={editorState}
        setEditorState={setEditorState}
      />
      <CreateEventDialog
        open={createEventDialogOpen}
        onClose={() => setCreateEventDialogOpen(false)}
      />
    </Container>
  );
};

const ConsultationDialog = ({
  consultation,
  open,
  onClose,
  editorState,
  setEditorState,
}) => {
  const loading = false;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      <DialogTitle>Consultation Details</DialogTitle>
      <DialogContent dividers>
        <Box sx={{ mb: 2 }}>
          <Typography>{consultation?.title}</Typography>
          <Typography variant="body2" color="text.secondary">
            {moment(consultation?.scheduled_time).format("MMMM D, YYYY h:mm A")}
          </Typography>
        </Box>
        <Box>
          <Editor editorState={editorState} onChange={setEditorState} />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          variant="contained"
          disabled={loading}
        >
          {loading ? <CircularProgress size={24} /> : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const CreateEventDialog = ({ open, onClose, onCreate }) => {
  const [title, setTitle] = useState("");
  const [start, setStart] = useState("");
  const [end, setEnd] = useState("");

  const handleSubmit = () => {
    const newEvent = {
      title,
      start: new Date(start),
      end: new Date(end),
    };
    onCreate(newEvent);
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>Create New Event</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          margin="normal"
          label="Event Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          type="datetime-local"
          label="Start Time"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
        <TextField
          fullWidth
          margin="normal"
          type="datetime-local"
          label="End Time"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          InputLabelProps={{ shrink: true }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button variant="contained" onClick={handleSubmit}>
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Professional;
