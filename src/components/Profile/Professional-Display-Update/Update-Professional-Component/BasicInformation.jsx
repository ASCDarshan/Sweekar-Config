/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import {
    Box,
    Grid,
    TextField,
    Button,
} from '@mui/material';
import { toast } from 'react-toastify';
import ajaxCall from '../../../../helpers/ajaxCall';

const BasicInformation = ({ setCount, onClose }) => {
    const user = JSON.parse(localStorage.getItem("loginInfo")).user;
    const [profile, setProfile] = useState({});
    const [loading, setLoading] = useState(true);
    const [expert, setExpert] = useState({});

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

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
                setProfile(response?.data || {});
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
        fetchData(`professionals/professional-user/?user=${user}`, setExpert);
    }, []);

    const handleUpdate = async (event) => {
        event.preventDefault();
        setLoading(true);

        const formData = new FormData();
        Object.keys(profile).forEach((key) => {
            formData.append(key, profile[key]);
        });

        try {
            const response = await ajaxCall(
                `professionals/professional-update/${expert.id}/`,
                {
                    headers: {
                        Accept: "application/json",
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("loginInfo")).accessToken}`,
                    },
                    method: "PATCH",
                    body: formData,
                },
                8000
            );
            if ([200, 201].includes(response.status)) {
                toast.success("Profile Updated Successfully.");
                setCount((prevCount) => prevCount + 1);
                onClose();
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
        <Box sx={{ p: 2 }}>
            <form onSubmit={handleUpdate}>
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="License Number"
                            name="license_number"
                            value={profile.license_number}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Years of Experience"
                            type="number"
                            name="years_of_experience"
                            value={profile.years_of_experience}
                            onChange={handleChange}
                            InputProps={{ inputProps: { min: 0 } }}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            multiline
                            rows={4}
                            label="Biography"
                            name="biography"
                            value={profile.biography}
                            onChange={handleChange}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Consultation Fee"
                            type="number"
                            name="hourly_rate"
                            value={profile.hourly_rate}
                            onChange={handleChange}
                            InputProps={{ inputProps: { min: 0 } }}
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Languages Spoken"
                            name="languages_spoken"
                            value={profile.languages_spoken}
                            onChange={handleChange}
                            helperText="Separate languages with commas"
                            InputLabelProps={{ shrink: true }}
                        />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                        <TextField
                            fullWidth
                            label="Session Duration"
                            type="number"
                            name="session_duration"
                            value={profile.session_duration}
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
    );
};

export default BasicInformation;