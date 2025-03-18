/* eslint-disable react/prop-types */
import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
} from "@mui/material";
import { useState } from "react";
import { toast } from "react-toastify";
import ajaxCall from "../../../../helpers/ajaxCall";

const CreateEventDialog = ({ open, onClose, ProfessionalData, setCount }) => {
    const professional = ProfessionalData?.id;
    const [title, setTitle] = useState("");
    const [start, setStart] = useState("");
    const [end, setEnd] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (event) => {
        setLoading(true);
        event.preventDefault();

        if (!title || !start || !end || !professional) {
            toast.error("All fields are required.");
            return;
        }

        const formData = {
            professional,
            title,
            start_date: start,
            end_date: end,
        };

        try {
            const response = await ajaxCall(
                "professionals/event-create/",
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("loginInfo")).accessToken
                            }`,
                    },
                    method: "POST",
                    body: JSON.stringify(formData),
                },
                8000
            );

            if ([200, 201].includes(response.status)) {
                toast.success("Event Created Successfully.");
                setCount((prevCount) => prevCount + 1);
                onClose();
            } else {
                toast.error("Some Problem Occurred. Please try again.");
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to create event.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
            <DialogTitle>Create New Slot</DialogTitle>
            <DialogContent>
                <TextField
                    fullWidth
                    margin="normal"
                    label="Event Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    type="datetime-local"
                    label="Start Time"
                    value={start}
                    onChange={(e) => setStart(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    required
                />
                <TextField
                    fullWidth
                    margin="normal"
                    type="datetime-local"
                    label="End Time"
                    value={end}
                    onChange={(e) => setEnd(e.target.value)}
                    InputLabelProps={{ shrink: true }}
                    required
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} disabled={loading}>
                    Cancel
                </Button>
                <Button variant="contained" onClick={handleSubmit} disabled={loading}>
                    {loading ? <CircularProgress size={24} color="inherit" /> : "Create"}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateEventDialog;
