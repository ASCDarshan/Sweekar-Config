import { Close } from "@mui/icons-material";
import {
    Box,
    Button,
    Grid,
    IconButton,
    SwipeableDrawer,
    TextField,
    Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import ajaxCall from "../../../helpers/ajaxCall";
import { toast } from "react-toastify";


const ClientUpdateDrawer = ({ open, onClose }) => {
    const user = JSON.parse(localStorage.getItem("loginInfo")).user;
    const [loading, setLoading] = useState(false);
    const [profile, setProfile] = useState({});

    const fetchData = async (url, setData) => {
        try {
            const response = await ajaxCall(
                url,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("loginInfo")).accessToken}`,
                    },
                    method: "GET",
                },
                8000
            );
            if (response?.status === 200) {
                setData(response?.data || {});
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
        fetchData(`clients/profile-user/?user=${user}`, setProfile);
    }, []);

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData();
        Object.keys(profile).forEach((key) => {
            formData.append(key, profile[key]);
        });

        try {
            const response = await ajaxCall(
                `clients/profile-update/${profile.id}/`,
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("loginInfo")).accessToken
                            }`,
                    },
                    method: "PATCH",
                    body: formData,
                },
                8000
            );
            if ([200, 201].includes(response.status)) {
                toast.success("Profile Updated Successfully.");
            } else if ([400, 404].includes(response.status)) {
                toast.error("Some Problem Occurred. Please try again.");
            } else if ([401].includes(response.status)) {
                toast.error("Invalid Credentials.");
            }
        } catch (error) {
            console.error("Update error:", error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <SwipeableDrawer
            anchor="right"
            open={open}
            onClose={onClose}
            onOpen={() => { }}
            PaperProps={{
                sx: {
                    width: { xs: "100%", sm: 800 },
                    p: 3,
                },
            }}
        >
            <Box
                sx={{
                    mb: 3,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="h5" fontWeight="bold">
                    Update Profile
                </Typography>
                <IconButton onClick={onClose}>
                    <Close />
                </IconButton>
            </Box>

            <Box sx={{ p: 2 }}>
                <form onSubmit={handleUpdate}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Allergies"
                                name="allergies"
                                value={profile.allergies}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Date of Birth"
                                type="date"
                                name="date_of_birth"
                                value={profile.date_of_birth}
                                onChange={handleChange}
                                InputProps={{ inputProps: { min: 0 } }}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type="text"
                                multiline
                                rows={4}
                                label="Blood Group"
                                name="blood_group"
                                value={profile.blood_group}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Current Medications"
                                type="text"
                                name="current_medications"
                                value={profile.current_medications}
                                onChange={handleChange}
                                InputProps={{ inputProps: { min: 0 } }}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Preferred Language"
                                name="preferred_language"
                                value={profile.preferred_language}
                                onChange={handleChange}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Emergency Contact Name"
                                type="text"
                                name="emergency_contact_name"
                                value={profile.emergency_contact_name}
                                onChange={handleChange}
                                InputProps={{ inputProps: { min: 0 } }}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Emergency Contact Number"
                                type="number"
                                name="emergency_contact_phone"
                                value={profile.emergency_contact_phone}
                                onChange={handleChange}
                                InputProps={{ inputProps: { min: 0 } }}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Emergency Contact Relationship"
                                type="text"
                                name="emergency_contact_relationship"
                                value={profile.emergency_contact_relationship}
                                onChange={handleChange}
                                InputProps={{ inputProps: { min: 0 } }}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Medical History"
                                type="text"
                                name="medical_history"
                                value={profile.medical_history}
                                onChange={handleChange}
                                InputProps={{ inputProps: { min: 0 } }}
                                InputLabelProps={{ shrink: true }}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={loading}
                                sx={{ mt: 2 }}
                            >
                                {loading ? "Updating..." : "Update Profile"}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>

        </SwipeableDrawer>

    );
};

export default ClientUpdateDrawer;
