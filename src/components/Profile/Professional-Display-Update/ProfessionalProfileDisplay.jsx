import {
    Container,
    Paper,
    Grid,
    Avatar,
    Typography,
    Box,
    Chip,
    Divider,
    Rating,
    Stack,
    Button,
} from "@mui/material";
import {
    Language,
    LocationOn,
    AccessTime,
    EmojiEvents,
    VerifiedUser,
    Edit,
} from "@mui/icons-material";
import ajaxCall from "../../../helpers/ajaxCall";
import { useEffect, useState } from "react";
import ProfessionalUpdateDrawer from "./ProfessionalUpdateDrawer";
import UserProfileShimmer from "../../UI/UserProfileShimmer";

const ProfessionalProfileDisplay = () => {
    const userId = JSON.parse(localStorage.getItem("loginInfo")).user;
    const user = JSON.parse(localStorage.getItem("loginInfo"));
    const [expert, setExpert] = useState({});
    const [openUpdateDrawer, setOpenUpdateDrawer] = useState(false);
    const [loading, setLoading] = useState(true);

    const fetchData = async (url, setData) => {
        setLoading(true);
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
        fetchData(`professionals/professional-user/?user=${userId}`, setExpert);
    }, [userId]);

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ mt: 8 }}>
                <UserProfileShimmer />
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Grid container spacing={4}>
                <Grid item xs={12} md={4}>
                    <Paper elevation={3} sx={{ p: 4, textAlign: "center" }}>
                        <Box position="relative" display="inline-block" mb={3}>
                            <Avatar
                                sx={{
                                    width: 180,
                                    height: 180,
                                    fontSize: "3rem",
                                    bgcolor: "primary.main",
                                    mb: 2,
                                }}
                            >
                                {expert?.user?.first_name?.charAt(0)}
                                {expert?.user?.last_name?.charAt(0)}
                            </Avatar>
                            <Chip
                                icon={<VerifiedUser />}
                                label={expert.verification_status}
                                color={
                                    expert.verification_status === "PENDING"
                                        ? "warning"
                                        : "success"
                                }
                                size="small"
                                sx={{
                                    position: "absolute",
                                    top: -10,
                                    right: -20,
                                }}
                            />
                        </Box>

                        <Typography variant="h4" gutterBottom>
                            {expert?.user?.first_name} {expert?.user?.last_name}
                        </Typography>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            {expert.professional_type?.title}
                        </Typography>

                        <Box sx={{ mt: 4, mb: 3 }}>
                            <Typography variant="h6" gutterBottom>
                                Average user rating
                            </Typography>
                            <Typography variant="h3" color="primary" gutterBottom>
                                {expert?.rating?.toFixed(1)}
                            </Typography>
                            <Rating
                                value={expert?.rating || 0}
                                precision={0.1}
                                readOnly
                                size="large"
                            />
                            <Typography variant="body2" color="text.secondary">
                                ({expert?.total_consultations} consultations)
                            </Typography>
                        </Box>

                        <Box sx={{ mt: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Session Details
                            </Typography>
                            <Typography variant="h4" color="primary" gutterBottom>
                                ₹{expert?.hourly_rate}
                            </Typography>
                            <Typography
                                variant="subtitle2"
                                color="text.secondary"
                                gutterBottom
                            >
                                per session
                            </Typography>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    mt: 1,
                                }}
                            >
                                <AccessTime sx={{ fontSize: 20, mr: 1 }} />
                                <Typography variant="body2">
                                    {expert?.session_duration} min session
                                </Typography>
                            </Box>
                        </Box>

                        <Stack
                            direction="row"
                            spacing={1}
                            sx={{ mt: 3, justifyContent: "center" }}
                        >
                            {expert?.is_available_online && (
                                <Chip
                                    icon={<Language />}
                                    label="Online Available"
                                    variant="outlined"
                                    size="small"
                                />
                            )}
                            {expert?.is_available_in_person && (
                                <Chip
                                    icon={<LocationOn />}
                                    label="In-Person Available"
                                    variant="outlined"
                                    size="small"
                                />
                            )}
                        </Stack>
                    </Paper>
                </Grid>

                <Grid item xs={12} md={8}>
                    <Stack spacing={4}>
                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="h5" gutterBottom color="primary">
                                About me
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {expert.biography}
                            </Typography>
                        </Paper>

                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="h5" gutterBottom color="primary">
                                Languages known
                            </Typography>
                            <Typography variant="body1" color="text.secondary">
                                {expert?.languages_spoken}
                            </Typography>
                        </Paper>

                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="h5" gutterBottom color="primary">
                                Professional Info
                            </Typography>
                            <Stack spacing={2}>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Experience
                                    </Typography>
                                    <Typography variant="body1">
                                        {expert?.years_of_experience} years
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        License Number
                                    </Typography>
                                    <Typography variant="body1">
                                        {expert?.license_number}
                                    </Typography>
                                </Box>
                            </Stack>
                        </Paper>

                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="h5" gutterBottom color="primary">
                                Area of expertise
                            </Typography>
                            <Stack direction="row" flexWrap="wrap" gap={1}>
                                {expert?.concerns?.map((concern) => (
                                    <Chip
                                        key={concern.id}
                                        label={concern.name}
                                        variant="outlined"
                                        size="small"
                                    />
                                ))}
                            </Stack>
                        </Paper>

                        <Paper elevation={3} sx={{ p: 3 }}>
                            <Typography variant="h5" gutterBottom color="primary">
                                Specializations
                            </Typography>
                            <Stack direction="row" flexWrap="wrap" gap={1}>
                                {expert?.specializations?.map((spec, index) => (
                                    <Chip
                                        key={index}
                                        label={spec}
                                        variant="outlined"
                                        size="small"
                                    />
                                ))}
                            </Stack>
                        </Paper>

                        {expert?.awards?.length > 0 && (
                            <Paper elevation={3} sx={{ p: 3 }}>
                                <Typography
                                    variant="h5"
                                    gutterBottom
                                    color="primary"
                                    sx={{ display: "flex", alignItems: "center", gap: 1 }}
                                >
                                    <EmojiEvents />
                                    Awards & Achievements
                                </Typography>
                                <Stack spacing={3}>
                                    {expert?.awards.map((award) => (
                                        <Box key={award.id}>
                                            <Typography variant="h6" gutterBottom>
                                                {award.title}
                                            </Typography>
                                            <Typography
                                                variant="subtitle2"
                                                color="text.secondary"
                                                gutterBottom
                                            >
                                                {new Date(award.date_received).toLocaleDateString()}
                                            </Typography>
                                            <Typography variant="body2">
                                                {award.description}
                                            </Typography>
                                            <Divider sx={{ mt: 2 }} />
                                        </Box>
                                    ))}
                                </Stack>
                            </Paper>
                        )}
                    </Stack>
                </Grid>
            </Grid>

            {user.user_type === "PROFESSIONAL" && expert?.user?.id === user.user && (
                <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end" }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Edit />}
                        onClick={() => setOpenUpdateDrawer(true)}
                    >
                        Update Profile
                    </Button>
                </Box>
            )}

            <ProfessionalUpdateDrawer
                ExpertDetails={expert}
                open={openUpdateDrawer}
                onClose={() => setOpenUpdateDrawer(false)}
            />
        </Container>
    );
};

export default ProfessionalProfileDisplay;
