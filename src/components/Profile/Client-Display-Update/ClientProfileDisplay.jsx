import {
    Container,
    Paper,
    Grid,
    Avatar,
    Typography,
    Box,
    Card,
    CardContent,
    CardHeader,
    Stack,
    Button,
} from "@mui/material";
import { Edit } from "@mui/icons-material";
import { useEffect, useState } from "react";
import ajaxCall from "../../../helpers/ajaxCall";
import ClientUpdateDrawer from "./ClientUpdateDrawer";
import UserProfileShimmer from "../../UI/UserProfileShimmer";

const ClientProfileDisplay = () => {
    const userId = JSON.parse(localStorage.getItem("loginInfo")).user;
    const user = JSON.parse(localStorage.getItem("loginInfo"));
    const [client, setClients] = useState([]);
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
        fetchData(`clients/profile-user/?user=${userId}`, setClients);
    }, []);

    const handleUpdateClick = () => {
        setOpenUpdateDrawer(true);
    };

    const closeUpdateDrawer = () => {
        setOpenUpdateDrawer(false);
    };

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ mt: 8 }}>
                <UserProfileShimmer />
            </Container>
        );
    }
    return (
        <Container maxWidth="lg" sx={{ py: 6 }}>
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
                                {client?.user?.first_name?.charAt(0)}
                                {client?.user?.last_name?.charAt(0)}
                            </Avatar>
                        </Box>
                    </Grid>
                    <Grid item xs={12} md={7}>
                        <Typography variant="h4" gutterBottom>
                            {client?.user?.first_name} {client?.user?.last_name}
                        </Typography>
                        <Typography variant="h6" color="text.secondary" gutterBottom>
                            {client.professional_type?.title}
                        </Typography>
                    </Grid>
                </Grid>
            </Paper>

            {user.user_type === "CLIENT" && client?.user?.id === user.user && (
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
                        <CardHeader title="Medical History" />
                        <CardContent>
                            <Typography variant="body1" color="text.secondary">
                                {client.medical_history}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ mb: 3 }}>
                        <CardHeader title="Allergies" />
                        <CardContent>
                            <Typography variant="body1" color="text.secondary">
                                {client.allergies}
                            </Typography>
                        </CardContent>
                    </Card>
                    <Card sx={{ mb: 3 }}>
                        <CardHeader title="Current Medications" />
                        <CardContent>
                            <Typography variant="body1" color="text.secondary">
                                {client.current_medications}
                            </Typography>
                        </CardContent>
                    </Card>
                </Grid>

                <Grid item xs={12} md={4}>
                    <Card sx={{ mb: 3 }}>
                        <CardContent>
                            <Stack spacing={2}>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Blood Group
                                    </Typography>
                                    <Typography variant="body1">{client?.blood_group}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Date of Birth
                                    </Typography>
                                    <Typography variant="body1">
                                        {client?.date_of_birth}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Emergency Contact Number
                                    </Typography>
                                    <Typography variant="body1">
                                        {client?.emergency_contact_phone}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Emergency Contact Name
                                    </Typography>
                                    <Typography variant="body1">
                                        {client?.emergency_contact_name}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Emergency Contact Relationship
                                    </Typography>
                                    <Typography variant="body1">
                                        {client?.emergency_contact_relationship}
                                    </Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Occupation
                                    </Typography>
                                    <Typography variant="body1">{client?.occupation}</Typography>
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" color="text.secondary">
                                        Preferred Language
                                    </Typography>
                                    <Typography variant="body1">
                                        {client?.preferred_language}
                                    </Typography>
                                </Box>
                            </Stack>
                        </CardContent>
                    </Card>
                </Grid>
            </Grid>

            <ClientUpdateDrawer
                ExpertDetails={client}
                open={openUpdateDrawer}
                onClose={closeUpdateDrawer}
            />
        </Container>
    );
};

export default ClientProfileDisplay;
