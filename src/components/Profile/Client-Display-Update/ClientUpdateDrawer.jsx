/* eslint-disable react/prop-types */
import {
    Bloodtype,
    Cake,
    Close,
    ContactEmergency,
    HealthAndSafety,
    MedicalServices,
    Medication,
    People,
    Phone,
    Save,
    Translate,
    Warning,
} from "@mui/icons-material";
import {
    alpha,
    Box,
    Button,
    Chip,
    CircularProgress,
    FormControl,
    Grid,
    IconButton,
    InputAdornment,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    SwipeableDrawer,
    TextField,
    Typography,
    useTheme,
} from "@mui/material";
import { useEffect, useState } from "react";
import ajaxCall from "../../../helpers/ajaxCall";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 12,
        },
    },
};

const ClientUpdateDrawer = ({ open, onClose, setCount }) => {
    const theme = useTheme();
    const user = JSON.parse(localStorage.getItem("loginInfo")).user;
    const [loading, setLoading] = useState(false);
    const [submitLoading, setSubmitLoading] = useState(false);
    const [profile, setProfile] = useState({});
    const [sections, setSections] = useState({
        personal: true,
        emergency: true,
        medical: true,
    });

    const fetchData = async (url, setData) => {
        try {
            const response = await ajaxCall(
                url,
                {
                    headers: {
                        Accept: "application/json",
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("loginInfo")).accessToken
                            }`,
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
    }, [user]);

    const handleChange = (e) => {
        setProfile({
            ...profile,
            [e.target.name]: e.target.value,
        });
    };

    const handleUpdate = async (event) => {
        event.preventDefault();
        setLoading(true);
        setSubmitLoading(true);

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
            setSubmitLoading(false);
        }
    };

    const toggleSection = (section) => {
        setSections({
            ...sections,
            [section]: !sections[section],
        });
    };

    return (
        <SwipeableDrawer
            anchor="right"
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: {
                    width: { xs: "100%", sm: 800 },
                    p: 0,
                    overflow: "auto",
                    background:
                        theme.palette.mode === "dark"
                            ? alpha(theme.palette.background.paper, 0.9)
                            : "linear-gradient(to right, #f8f9fa, #ffffff)",
                },
            }}
        >
            <Box
                sx={{
                    py: 2,
                    px: 3,
                    background: "linear-gradient(90deg, #7366ff, #a66bff)",
                    color: "white",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    boxShadow: "0 4px 20px rgba(115, 102, 255, 0.15)",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <HealthAndSafety />
                    <Typography variant="h5" fontWeight="700">
                        Update Health Profile
                    </Typography>
                </Box>
                <IconButton onClick={onClose} sx={{ color: "white" }}>
                    <Close />
                </IconButton>
            </Box>

            {loading ? (
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        height: "80vh",
                    }}
                >
                    <CircularProgress color="primary" />
                    <Typography variant="body1" sx={{ ml: 2 }}>
                        Loading your health profile...
                    </Typography>
                </Box>
            ) : (
                <MotionBox
                    component="form"
                    onSubmit={handleUpdate}
                    sx={{ p: 3 }}
                    initial="hidden"
                    animate="visible"
                    variants={containerVariants}
                >
                    <MotionPaper
                        variants={itemVariants}
                        sx={{
                            p: 3,
                            mb: 3,
                            borderRadius: 2,
                            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
                            border: "1px solid rgba(0, 0, 0, 0.05)",
                            overflow: "hidden",
                        }}
                        elevation={0}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: sections.personal ? 3 : 0,
                                cursor: "pointer",
                            }}
                            onClick={() => toggleSection("personal")}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Chip
                                    icon={<Cake />}
                                    label="Personal Information"
                                    sx={{
                                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                                        color: theme.palette.primary.main,
                                        fontWeight: 600,
                                        fontSize: "0.9rem",
                                        py: 2.5,
                                    }}
                                />
                            </Box>
                            <IconButton size="small">
                                {sections.personal ? (
                                    <Close fontSize="small" />
                                ) : (
                                    <Cake fontSize="small" />
                                )}
                            </IconButton>
                        </Box>

                        {sections.personal && (
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Date of Birth"
                                        type="date"
                                        name="date_of_birth"
                                        value={profile.date_of_birth || ""}
                                        onChange={handleChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Cake color="primary" fontSize="small" />
                                                </InputAdornment>
                                            ),
                                        }}
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <FormControl fullWidth variant="outlined">
                                        <InputLabel id="blood-group-label">Blood Group</InputLabel>
                                        <Select
                                            labelId="blood-group-label"
                                            name="blood_group"
                                            value={profile.blood_group || ""}
                                            label="Blood Group"
                                            onChange={handleChange}
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <Bloodtype color="primary" fontSize="small" />
                                                </InputAdornment>
                                            }
                                        >
                                            <MenuItem value="A+">A Positive</MenuItem>
                                            <MenuItem value="B+">B Positive</MenuItem>
                                            <MenuItem value="A-">A Negative</MenuItem>
                                            <MenuItem value="B-">B Negative</MenuItem>
                                            <MenuItem value="O+">O Positive</MenuItem>
                                            <MenuItem value="O-">O Negative</MenuItem>
                                            <MenuItem value="AB+">AB Positive</MenuItem>
                                            <MenuItem value="AB-">AB Negative</MenuItem>
                                        </Select>
                                    </FormControl>
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Preferred Language"
                                        name="preferred_language"
                                        value={profile.preferred_language || ""}
                                        onChange={handleChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Translate color="primary" fontSize="small" />
                                                </InputAdornment>
                                            ),
                                        }}
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </MotionPaper>

                    <MotionPaper
                        variants={itemVariants}
                        sx={{
                            p: 3,
                            mb: 3,
                            borderRadius: 2,
                            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
                            border: "1px solid rgba(0, 0, 0, 0.05)",
                            overflow: "hidden",
                        }}
                        elevation={0}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: sections.emergency ? 3 : 0,
                                cursor: "pointer",
                            }}
                            onClick={() => toggleSection("emergency")}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Chip
                                    icon={<ContactEmergency />}
                                    label="Emergency Contact"
                                    sx={{
                                        bgcolor: alpha(theme.palette.error.main, 0.1),
                                        color: theme.palette.error.main,
                                        fontWeight: 600,
                                        fontSize: "0.9rem",
                                        py: 2.5,
                                    }}
                                />
                            </Box>
                            <IconButton size="small">
                                {sections.emergency ? (
                                    <Close fontSize="small" />
                                ) : (
                                    <ContactEmergency fontSize="small" />
                                )}
                            </IconButton>
                        </Box>

                        {sections.emergency && (
                            <Grid container spacing={3}>
                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Emergency Contact Name"
                                        type="text"
                                        name="emergency_contact_name"
                                        value={profile.emergency_contact_name || ""}
                                        onChange={handleChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <People color="error" fontSize="small" />
                                                </InputAdornment>
                                            ),
                                        }}
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                    />
                                </Grid>

                                <Grid item xs={12} sm={6}>
                                    <TextField
                                        fullWidth
                                        label="Emergency Contact Number"
                                        type="tel"
                                        name="emergency_contact_phone"
                                        value={profile.emergency_contact_phone || ""}
                                        onChange={handleChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <Phone color="error" fontSize="small" />
                                                </InputAdornment>
                                            ),
                                        }}
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Emergency Contact Relationship"
                                        type="text"
                                        name="emergency_contact_relationship"
                                        value={profile.emergency_contact_relationship || ""}
                                        onChange={handleChange}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    <People color="error" fontSize="small" />
                                                </InputAdornment>
                                            ),
                                        }}
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </MotionPaper>

                    <MotionPaper
                        variants={itemVariants}
                        sx={{
                            p: 3,
                            mb: 3,
                            borderRadius: 2,
                            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.05)",
                            border: "1px solid rgba(0, 0, 0, 0.05)",
                            overflow: "hidden",
                        }}
                        elevation={0}
                    >
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                                mb: sections.medical ? 3 : 0,
                                cursor: "pointer",
                            }}
                            onClick={() => toggleSection("medical")}
                        >
                            <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                <Chip
                                    icon={<MedicalServices />}
                                    label="Medical Information"
                                    sx={{
                                        bgcolor: alpha(theme.palette.info.main, 0.1),
                                        color: theme.palette.info.main,
                                        fontWeight: 600,
                                        fontSize: "0.9rem",
                                        py: 2.5,
                                    }}
                                />
                            </Box>
                            <IconButton size="small">
                                {sections.medical ? (
                                    <Close fontSize="small" />
                                ) : (
                                    <MedicalServices fontSize="small" />
                                )}
                            </IconButton>
                        </Box>

                        {sections.medical && (
                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Medical History"
                                        name="medical_history"
                                        value={profile.medical_history || ""}
                                        onChange={handleChange}
                                        multiline
                                        rows={4}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start" sx={{ mt: 1, mr: 1 }}>
                                                    <MedicalServices color="info" fontSize="small" />
                                                </InputAdornment>
                                            ),
                                        }}
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                        placeholder="Enter any relevant medical history information..."
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Allergies"
                                        name="allergies"
                                        value={profile.allergies || ""}
                                        onChange={handleChange}
                                        multiline
                                        rows={4}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start" sx={{ mt: 1, mr: 1 }}>
                                                    <Warning color="warning" fontSize="small" />
                                                </InputAdornment>
                                            ),
                                        }}
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                        placeholder="List any allergies you have..."
                                    />
                                </Grid>

                                <Grid item xs={12}>
                                    <TextField
                                        fullWidth
                                        label="Current Medications"
                                        name="current_medications"
                                        value={profile.current_medications || ""}
                                        onChange={handleChange}
                                        multiline
                                        rows={4}
                                        InputProps={{
                                            startAdornment: (
                                                <InputAdornment position="start" sx={{ mt: 1, mr: 1 }}>
                                                    <Medication color="secondary" fontSize="small" />
                                                </InputAdornment>
                                            ),
                                        }}
                                        InputLabelProps={{ shrink: true }}
                                        variant="outlined"
                                        placeholder="List any medications you are currently taking..."
                                    />
                                </Grid>
                            </Grid>
                        )}
                    </MotionPaper>

                    <MotionBox
                        variants={itemVariants}
                        sx={{
                            display: "flex",
                            justifyContent: "space-between",
                            mt: 4,
                            pt: 3,
                            borderTop: "1px solid rgba(0, 0, 0, 0.1)",
                        }}
                    >
                        <Button
                            variant="outlined"
                            onClick={onClose}
                            startIcon={<Close />}
                            sx={{
                                borderRadius: "8px",
                                py: 1.2,
                                px: 3,
                            }}
                        >
                            Cancel
                        </Button>

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={submitLoading}
                            startIcon={
                                submitLoading ? (
                                    <CircularProgress size={20} color="inherit" />
                                ) : (
                                    <Save />
                                )
                            }
                            sx={{
                                borderRadius: "8px",
                                py: 1.2,
                                px: 4,
                                background: "linear-gradient(90deg, #7366ff, #a66bff)",
                                boxShadow: "0 4px 15px rgba(115, 102, 255, 0.3)",
                                "&:hover": {
                                    background: "linear-gradient(90deg, #6355ee, #9559ff)",
                                },
                            }}
                        >
                            {submitLoading ? "Saving Changes..." : "Save Changes"}
                        </Button>
                    </MotionBox>
                </MotionBox>
            )}
        </SwipeableDrawer>
    );
};

export default ClientUpdateDrawer;
