import {
    Container,
    Paper,
    Grid,
    Avatar,
    Typography,
    Box,
    Chip,
    Card,
    CardContent,
    CardHeader,
    Divider,
    Rating,
    Stack,
    Button,
} from "@mui/material";
import {
    Language,
    LocationOn,
    AccessTime,
    Psychology,
    EmojiEvents,
    People,
    VerifiedUser,
    Edit,
} from "@mui/icons-material";
import ajaxCall from "../../../helpers/ajaxCall";
import { useEffect, useState } from "react";
import ProfessionalUpdateDrawer from "./ProfessionalUpdateDrawer";

const ProfessionalProfileDisplay = () => {
    const userId = JSON.parse(localStorage.getItem("loginInfo")).user;
    const user = JSON.parse(localStorage.getItem("loginInfo"));
    const [expert, setExpert] = useState({});
    const [openUpdateDrawer, setOpenUpdateDrawer] = useState(false);

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
        }
    };

    useEffect(() => {
        fetchData(`professionals/professional-user/?user=${userId}`, setExpert);
    }, []);

    const handleUpdateClick = () => {
        setOpenUpdateDrawer(true);
    };

    const closeUpdateDrawer = () => {
        setOpenUpdateDrawer(false);
    };

    return (
        <Container maxWidth="lg" sx={{ py: 4 }}>
            <Paper elevation={3} sx={{ mb: 3, p: 3 }}>
                <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} md={2} sx={{ textAlign: "center" }}>
                        <Box position="relative" display="inline-block">
                            <Avatar
                                sx={{
                                    width: 120,
                                    height: 120,
                                    fontSize: "2.5rem",
                                    bgcolor: "primary.main",
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
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Typography variant="h4" gutterBottom>
                            {expert?.user?.first_name} {expert?.user?.last_name}
                        </Typography>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            {expert.professional_type?.title}
                        </Typography>
                        <Stack direction="row" spacing={1} sx={{ mt: 2 }}>
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
                    </Grid>
                    <Grid item xs={12} md={3} sx={{ textAlign: "center" }}>
                        <Typography variant="h4" color="primary" gutterBottom>
                            ₹{expert?.hourly_rate}
                        </Typography>
                        <Typography variant="subtitle2" color="text.secondary" gutterBottom>
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
                    </Grid>
                </Grid>
            </Paper>

            {user.user_type === "PROFESSIONAL" && expert?.user?.id === user.user && (
                <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", mb: 2 }}>
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<Edit />}
                        onClick={handleUpdateClick}
                    >
                        Update Profile
                    </Button>
                </Box>
            )}

            <Grid container spacing={3}>
                <Grid item xs={12} md={8}>
                    <Card sx={{ mb: 3 }}>
                        <CardHeader title="About" />
                        <CardContent>
                            <Typography variant="body1" color="text.secondary">
                                {expert.biography}
                            </Typography>
                        </CardContent>
                    </Card>

                    {expert?.awards?.length > 0 && (
                        <Card>
                            <CardHeader
                                title="Awards & Achievements"
                                avatar={<EmojiEvents color="primary" />}
                            />
                            <CardContent>
                                <Stack spacing={2}>
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
                            </CardContent>
                        </Card>
                    )}
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card sx={{ mb: 3 }}>
                        <CardHeader title="Professional Info" />
                        <CardContent>
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
                                        Languages
                                    </Typography>
                                    <Typography variant="body1">
                                        {expert?.languages_spoken}
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
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Rating
                                    </Typography>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <Rating value={expert?.rating} precision={0.1} readOnly />
                                        <Typography>({expert?.rating?.toFixed(1)})</Typography>
                                    </Box>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Total Consultations
                                    </Typography>
                                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                        <People />
                                        <Typography>{expert?.total_consultations}</Typography>
                                    </Box>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader
                            title="Specializations"
                            avatar={<Psychology color="primary" />}
                        />
                        <CardContent>
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
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <ProfessionalUpdateDrawer
                ExpertDetails={expert}
                open={openUpdateDrawer}
                onClose={closeUpdateDrawer}
            />
        </Container>
    );
};

export default ProfessionalProfileDisplay;
