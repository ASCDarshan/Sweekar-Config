import {
    Container,
    Typography,
    Button,
    CardContent,
    Box,
    IconButton,
    Paper,
    Card,
    useTheme,
    alpha,
    Avatar,
    Badge,
    Chip,
    BottomNavigation,
    BottomNavigationAction,
    Fab,
    SwipeableDrawer,
    List,
    ListItem,
    ListItemText,
    ListItemIcon,
    Divider,
    Grid,
} from "@mui/material";
import {
    AccessTime,
    Add,
    ArrowForward,
    Close,
    Dashboard,
    Gavel,
    Home,
    LocationOn,
    MedicalServices,
    Menu,
    PhoneOutlined,
    Psychology,
    Schedule,
    VideocamOutlined,
    Work,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import BookConsultation from "../../Consultation/BookConsultation";
import ajaxCall from "../../../helpers/ajaxCall";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import ClientDashboardShimmer from "../../UI/ClientDashboardShimmer";

const MotionBox = motion(Box);
const MotionPaper = motion(Paper);
const MotionCard = motion(Card);

const services = [
    {
        id: 1,
        title: "Mental Health",
        description: "Connect with therapists and counselors",
        icon: <Psychology fontSize="medium" />,
        color: "#6A5ACD",
    },
    {
        id: 2,
        title: "Medical Services",
        description: "Access LGBTQAI+ friendly healthcare",
        icon: <MedicalServices fontSize="medium" />,
        color: "#4DAA57",
    },
    {
        id: 3,
        title: "Legal Aid",
        description: "Find legal professionals for your rights",
        icon: <Gavel fontSize="medium" />,
        color: "#F4A259",
    },
    {
        id: 4,
        title: "Placement Services",
        description: "Discover inclusive job opportunities",
        icon: <Work fontSize="medium" />,
        color: "#5899E2",
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
            duration: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { y: 15, opacity: 0 },
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

const generateBackgroundElements = (count) => {
    return Array.from({ length: count }).map((_, index) => ({
        id: index,
        size: Math.floor(Math.random() * 200) + 50,
        x: Math.floor(Math.random() * 100),
        y: Math.floor(Math.random() * 100),
        opacity: Math.random() * 0.08 + 0.02,
        duration: Math.random() * 30 + 20,
        delay: Math.random() * 5,
    }));
};

const filterUpcomingSessions = (consultations) => {
    const currentDateTime = new Date();

    const futureConsultations = consultations.filter((consultation) => {
        const consultationDateTime = new Date(consultation.scheduled_time);
        return (
            consultationDateTime > currentDateTime &&
            consultation.status !== "CANCELLED"
        );
    });

    futureConsultations.sort((a, b) => {
        return new Date(a.scheduled_time) - new Date(b.scheduled_time);
    });

    return futureConsultations.slice(0, 3);
};

const getConsultationTypeIcon = (type) => {
    switch (type?.toLowerCase()) {
        case "video":
            return <VideocamOutlined fontSize="small" />;
        case "phone":
            return <PhoneOutlined fontSize="small" />;
        default:
            return <LocationOn fontSize="small" />;
    }
};

const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    let prefix = "";
    if (date.toDateString() === today.toDateString()) {
        prefix = "Today";
    } else if (date.toDateString() === tomorrow.toDateString()) {
        prefix = "Tomorrow";
    }

    const formattedDate = date.toLocaleDateString("en-US", {
        weekday: "short",
        month: "short",
        day: "numeric",
    });

    const formattedTime = date.toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return prefix
        ? `${prefix}, ${formattedTime}`
        : `${formattedDate}, ${formattedTime}`;
};

const MobileClient = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const userId = JSON.parse(localStorage.getItem("loginInfo")).user;
    const [service, setService] = useState([]);
    const [openBooking, setOpenBooking] = useState(false);
    const [upcomingConsultations, setUpcomingconsultations] = useState([]);
    const [userName, setUserName] = useState();
    const [loading, setLoading] = useState(false);
    const [count, setCount] = useState(0);
    const [activeTab, setActiveTab] = useState(0);
    const [menuOpen, setMenuOpen] = useState(false);

    const fetchData = async (url, setData) => {
        setLoading(true);
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
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData(
            `consultations/consultation-client/?user=${userId}`,
            setUpcomingconsultations
        );
        fetchData(`clients/profile-user/?user=${userId}`, setUserName);
    }, [count, userId]);

    const handleOpenBooking = (service) => {
        setService(service);
        setOpenBooking(true);
    };

    const handleClose = () => {
        setOpenBooking(false);
    };

    const handleViewDetails = (consultationId) => {
        navigate(`/consultation/${consultationId}`);
    };

    const bgElements = generateBackgroundElements(4);
    const filteredConsultations = filterUpcomingSessions(upcomingConsultations);

    if (loading) {
        return <ClientDashboardShimmer />;
    }

    const renderHomeTab = () => (
        <MotionBox
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            sx={{ pb: 8 }}
        >
            <MotionPaper
                elevation={2}
                variants={itemVariants}
                sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: 3,
                    background: `linear-gradient(145deg, ${theme.palette.primary.light
                        }, ${alpha(theme.palette.primary.main, 0.8)})`,
                    color: "white",
                    boxShadow: "0 10px 30px rgba(106, 90, 205, 0.15)",
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                    <Avatar
                        sx={{
                            width: 48,
                            height: 48,
                            bgcolor: "white",
                            color: theme.palette.primary.main,
                            boxShadow: "0 5px 15px rgba(0,0,0,0.1)",
                            mr: 2,
                        }}
                    >
                        {userName?.user?.username?.charAt(0).toUpperCase() || "U"}
                    </Avatar>
                    <Box>
                        <Typography variant="h6" fontWeight="bold">
                            Hi, {userName?.user?.username || "User"}
                        </Typography>
                        <Typography variant="body2" sx={{ opacity: 0.9 }}>
                            Welcome back
                        </Typography>
                    </Box>
                </Box>

                {filteredConsultations.length > 0 && (
                    <Chip
                        size="small"
                        color="secondary"
                        icon={<Schedule fontSize="small" />}
                        label={`Next: ${formatDateTime(
                            filteredConsultations[0].scheduled_time
                        )}`}
                        sx={{
                            mt: 1,
                            fontWeight: 500,
                            "& .MuiChip-icon": {
                                fontSize: "0.875rem",
                            },
                        }}
                    />
                )}
            </MotionPaper>

            {filteredConsultations.length > 0 && (
                <MotionBox variants={itemVariants}>
                    <Typography
                        variant="subtitle1"
                        fontWeight="600"
                        sx={{ mb: 2, pl: 1, display: "flex", alignItems: "center", gap: 1 }}
                    >
                        <Badge
                            badgeContent={filteredConsultations.length}
                            color="primary"
                            sx={{
                                "& .MuiBadge-badge": {
                                    fontSize: "0.7rem",
                                    height: 16,
                                    minWidth: 16,
                                },
                            }}
                        >
                            <Schedule color="primary" fontSize="small" />
                        </Badge>
                        Upcoming Session
                    </Typography>

                    <MotionCard
                        elevation={1}
                        variants={itemVariants}
                        sx={{
                            borderRadius: 3,
                            overflow: "visible",
                            position: "relative",
                            background: "rgba(255, 255, 255, 0.8)",
                            backdropFilter: "blur(10px)",
                            border: "1px solid rgba(255, 255, 255, 0.6)",
                            mb: 3,
                        }}
                    >
                        <CardContent sx={{ p: 2 }}>
                            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                                <Avatar
                                    sx={{
                                        bgcolor: theme.palette.primary.light,
                                        width: 40,
                                        height: 40,
                                        mr: 1.5,
                                    }}
                                >
                                    {filteredConsultations[0].professional_name
                                        ?.charAt(0)
                                        .toUpperCase() || "P"}
                                </Avatar>
                                <Box>
                                    <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                                        {filteredConsultations[0].professional_name}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        color="text.secondary"
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 0.5,
                                        }}
                                    >
                                        {getConsultationTypeIcon(
                                            filteredConsultations[0].consultation_type
                                        )}
                                        {filteredConsultations[0].consultation_type || "In-person"}{" "}
                                        Session
                                    </Typography>
                                </Box>
                            </Box>

                            <Box
                                sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}
                            >
                                <AccessTime fontSize="small" color="action" />
                                <Typography variant="body2" color="text.secondary">
                                    {formatDateTime(filteredConsultations[0].scheduled_time)}
                                </Typography>
                            </Box>

                            <Button
                                fullWidth
                                variant="contained"
                                color="primary"
                                onClick={() => handleViewDetails(filteredConsultations[0].id)}
                                sx={{
                                    borderRadius: 8,
                                    textTransform: "none",
                                    fontWeight: 500,
                                    boxShadow: "0 5px 15px rgba(106, 90, 205, 0.2)",
                                }}
                            >
                                View Details
                            </Button>
                        </CardContent>
                    </MotionCard>
                </MotionBox>
            )}

            <MotionBox variants={itemVariants}>
                <Typography variant="subtitle1" fontWeight="600" sx={{ mb: 2, pl: 1 }}>
                    Book a Consultation
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        overflowX: "auto",
                        pb: 1,
                        px: 1,
                        gap: 2,
                        WebkitOverflowScrolling: "touch",
                    }}
                >
                    {services.map((service) => (
                        <MotionCard
                            key={service.id}
                            elevation={1}
                            variants={itemVariants}
                            whileTap={{ scale: 0.95 }}
                            sx={{
                                minWidth: 140,
                                maxWidth: 140,
                                borderRadius: 3,
                                transition: "transform 0.2s",
                                background: "rgba(255, 255, 255, 0.7)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255, 255, 255, 0.6)",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                                justifyContent: "center",
                                p: 2,
                                cursor: "pointer",
                            }}
                            onClick={() => handleOpenBooking(service)}
                        >
                            <Avatar
                                sx={{
                                    bgcolor: alpha(service.color, 0.1),
                                    color: service.color,
                                    width: 48,
                                    height: 48,
                                    mb: 1.5,
                                }}
                            >
                                {service.icon}
                            </Avatar>
                            <Typography
                                variant="body2"
                                align="center"
                                sx={{ fontWeight: 600, color: service.color, mb: 1 }}
                            >
                                {service.title}
                            </Typography>
                            <Typography
                                variant="caption"
                                color="text.secondary"
                                align="center"
                                sx={{
                                    display: "-webkit-box",
                                    WebkitLineClamp: 2,
                                    WebkitBoxOrient: "vertical",
                                    overflow: "hidden",
                                    textOverflow: "ellipsis",
                                }}
                            >
                                {service.description}
                            </Typography>
                        </MotionCard>
                    ))}
                </Box>
            </MotionBox>

            {filteredConsultations.length > 1 && (
                <MotionBox variants={itemVariants} sx={{ mt: 4 }}>
                    <Typography
                        variant="subtitle1"
                        fontWeight="600"
                        sx={{ mb: 2, pl: 1 }}
                    >
                        More Upcoming Sessions
                    </Typography>

                    {filteredConsultations.slice(1).map((consultation) => (
                        <MotionCard
                            key={consultation.id}
                            elevation={1}
                            variants={itemVariants}
                            sx={{
                                borderRadius: 3,
                                overflow: "hidden",
                                position: "relative",
                                background: "rgba(255, 255, 255, 0.8)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255, 255, 255, 0.6)",
                                mb: 2,
                            }}
                        >
                            <CardContent sx={{ p: 2 }}>
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        alignItems: "flex-start",
                                    }}
                                >
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            mb: 1,
                                            flex: 1,
                                        }}
                                    >
                                        <Avatar
                                            sx={{
                                                bgcolor: theme.palette.primary.light,
                                                width: 36,
                                                height: 36,
                                                mr: 1.5,
                                            }}
                                        >
                                            {consultation.professional_name
                                                ?.charAt(0)
                                                .toUpperCase() || "P"}
                                        </Avatar>
                                        <Box sx={{ overflow: "hidden" }}>
                                            <Typography
                                                variant="body1"
                                                sx={{
                                                    fontWeight: 600,
                                                    whiteSpace: "nowrap",
                                                    overflow: "hidden",
                                                    textOverflow: "ellipsis",
                                                }}
                                            >
                                                {consultation.professional_name}
                                            </Typography>
                                            <Box
                                                sx={{ display: "flex", alignItems: "center", gap: 0.5 }}
                                            >
                                                {getConsultationTypeIcon(
                                                    consultation.consultation_type
                                                )}
                                                <Typography
                                                    variant="caption"
                                                    color="text.secondary"
                                                    sx={{
                                                        whiteSpace: "nowrap",
                                                        overflow: "hidden",
                                                        textOverflow: "ellipsis",
                                                    }}
                                                >
                                                    {formatDateTime(consultation.scheduled_time)}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    </Box>

                                    <IconButton
                                        color="primary"
                                        size="small"
                                        onClick={() => handleViewDetails(consultation.id)}
                                        sx={{
                                            bgcolor: alpha(theme.palette.primary.main, 0.1),
                                            mt: 0.5,
                                        }}
                                    >
                                        <ArrowForward fontSize="small" />
                                    </IconButton>
                                </Box>
                            </CardContent>
                        </MotionCard>
                    ))}
                </MotionBox>
            )}

            {filteredConsultations.length === 0 && (
                <MotionCard
                    elevation={0}
                    variants={itemVariants}
                    sx={{
                        borderRadius: 3,
                        bgcolor: alpha(theme.palette.primary.light, 0.1),
                        border: `1px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
                        p: 3,
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(255, 255, 255, 0.4)",
                        backdropFilter: "blur(10px)",
                        mt: 2,
                    }}
                >
                    <Schedule
                        sx={{
                            fontSize: 48,
                            mb: 2,
                            color: alpha(theme.palette.primary.main, 0.7),
                        }}
                    />
                    <Typography variant="h6" color="text.primary" gutterBottom>
                        No Upcoming Sessions
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        Book a consultation to start your wellness journey!
                    </Typography>
                </MotionCard>
            )}
        </MotionBox>
    );

    const renderSessionsTab = () => (
        <MotionBox
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            sx={{ pb: 8 }}
        >
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                }}
            >
                <Schedule color="primary" />
                My Sessions
            </Typography>

            {upcomingConsultations.length > 0 ? (
                <>
                    <Box sx={{ mb: 4 }}>
                        <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            sx={{ mb: 2, pl: 1 }}
                        >
                            Upcoming Sessions
                        </Typography>

                        {filterUpcomingSessions(upcomingConsultations).map(
                            (consultation) => (
                                <MotionCard
                                    key={consultation.id}
                                    elevation={1}
                                    variants={itemVariants}
                                    whileTap={{ scale: 0.98 }}
                                    sx={{
                                        borderRadius: 3,
                                        overflow: "hidden",
                                        background: "rgba(255, 255, 255, 0.8)",
                                        backdropFilter: "blur(10px)",
                                        border: "1px solid rgba(255, 255, 255, 0.6)",
                                        mb: 2,
                                    }}
                                >
                                    <CardContent sx={{ p: 2 }}>
                                        <Box
                                            sx={{ display: "flex", alignItems: "center", mb: 1.5 }}
                                        >
                                            <Avatar
                                                sx={{
                                                    bgcolor: theme.palette.primary.light,
                                                    width: 40,
                                                    height: 40,
                                                    mr: 1.5,
                                                }}
                                            >
                                                {consultation.professional_name
                                                    ?.charAt(0)
                                                    .toUpperCase() || "P"}
                                            </Avatar>
                                            <Box>
                                                <Typography variant="body1" sx={{ fontWeight: 600 }}>
                                                    {consultation.professional_name}
                                                </Typography>
                                                <Box
                                                    sx={{
                                                        display: "flex",
                                                        alignItems: "center",
                                                        gap: 0.5,
                                                    }}
                                                >
                                                    {getConsultationTypeIcon(
                                                        consultation.consultation_type
                                                    )}
                                                    <Typography variant="caption" color="text.secondary">
                                                        {consultation.consultation_type || "In-person"}{" "}
                                                        Session
                                                    </Typography>
                                                </Box>
                                            </Box>
                                        </Box>

                                        <Box
                                            sx={{
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1,
                                                mb: 2,
                                                p: 1,
                                                borderRadius: 2,
                                                bgcolor: alpha(theme.palette.primary.main, 0.05),
                                            }}
                                        >
                                            <AccessTime fontSize="small" color="primary" />
                                            <Typography
                                                variant="body2"
                                                fontWeight={500}
                                                color="text.secondary"
                                            >
                                                {formatDateTime(consultation.scheduled_time)}
                                            </Typography>
                                        </Box>

                                        <Box sx={{ display: "flex", gap: 2 }}>
                                            <Button
                                                fullWidth
                                                variant="outlined"
                                                color="primary"
                                                size="small"
                                                sx={{
                                                    borderRadius: 8,
                                                    textTransform: "none",
                                                }}
                                            >
                                                Reschedule
                                            </Button>
                                            <Button
                                                fullWidth
                                                variant="contained"
                                                color="primary"
                                                size="small"
                                                onClick={() => handleViewDetails(consultation.id)}
                                                sx={{
                                                    borderRadius: 8,
                                                    textTransform: "none",
                                                    boxShadow: "0 5px 15px rgba(106, 90, 205, 0.2)",
                                                }}
                                            >
                                                Details
                                            </Button>
                                        </Box>
                                    </CardContent>
                                </MotionCard>
                            )
                        )}
                    </Box>

                    <Box>
                        <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            sx={{ mb: 2, pl: 1 }}
                        >
                            Past Sessions
                        </Typography>

                        <MotionCard
                            elevation={1}
                            variants={itemVariants}
                            sx={{
                                borderRadius: 3,
                                p: 3,
                                textAlign: "center",
                                background: alpha(theme.palette.background.paper, 0.7),
                                backdropFilter: "blur(10px)",
                            }}
                        >
                            <Typography variant="body1" color="text.secondary">
                                Your session history will appear here
                            </Typography>
                        </MotionCard>
                    </Box>
                </>
            ) : (
                <MotionCard
                    elevation={0}
                    variants={itemVariants}
                    sx={{
                        borderRadius: 3,
                        bgcolor: alpha(theme.palette.primary.light, 0.1),
                        border: `1px dashed ${alpha(theme.palette.primary.main, 0.3)}`,
                        p: 3,
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        background: "rgba(255, 255, 255, 0.4)",
                        backdropFilter: "blur(10px)",
                    }}
                >
                    <Schedule
                        sx={{
                            fontSize: 48,
                            mb: 2,
                            color: alpha(theme.palette.primary.main, 0.7),
                        }}
                    />
                    <Typography variant="h6" color="text.primary" gutterBottom>
                        No Sessions Found
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                        You haven&apos;t booked any sessions yet
                    </Typography>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={() => setOpenBooking(true)}
                        sx={{
                            borderRadius: 8,
                            textTransform: "none",
                            fontWeight: 500,
                            boxShadow: "0 5px 15px rgba(106, 90, 205, 0.2)",
                        }}
                    >
                        Book Your First Session
                    </Button>
                </MotionCard>
            )}
        </MotionBox>
    );

    const renderServicesTab = () => (
        <MotionBox
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            sx={{ pb: 8 }}
        >
            <Typography
                variant="h6"
                sx={{
                    fontWeight: 600,
                    mb: 3,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                }}
            >
                <Dashboard color="primary" />
                Our Services
            </Typography>

            <Grid container spacing={2}>
                {services.map((service) => (
                    <Grid item xs={12} key={service.id}>
                        <MotionCard
                            elevation={1}
                            variants={itemVariants}
                            whileTap={{ scale: 0.98 }}
                            sx={{
                                borderRadius: 3,
                                overflow: "hidden",
                                position: "relative",
                                background: "rgba(255, 255, 255, 0.7)",
                                backdropFilter: "blur(10px)",
                                border: "1px solid rgba(255, 255, 255, 0.6)",
                                transition: "transform 0.2s",
                            }}
                            onClick={() => handleOpenBooking(service)}
                        >
                            <Box sx={{ p: 2 }}>
                                <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
                                    <Avatar
                                        sx={{
                                            bgcolor: alpha(service.color, 0.1),
                                            color: service.color,
                                            width: 56,
                                            height: 56,
                                        }}
                                    >
                                        {service.icon}
                                    </Avatar>
                                    <Box>
                                        <Typography
                                            variant="h6"
                                            sx={{ fontWeight: 600, color: service.color }}
                                        >
                                            {service.title}
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {service.description}
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Box
                                sx={{
                                    px: 2,
                                    pb: 2,
                                    display: "flex",
                                    justifyContent: "flex-end",
                                }}
                            >
                                <Button
                                    variant="contained"
                                    size="small"
                                    endIcon={<ArrowForward />}
                                    sx={{
                                        textTransform: "none",
                                        fontWeight: 500,
                                        borderRadius: 8,
                                        bgcolor: service.color,
                                        "&:hover": {
                                            bgcolor: alpha(service.color, 0.9),
                                        },
                                        boxShadow: `0 4px 12px ${alpha(service.color, 0.3)}`,
                                    }}
                                >
                                    Book Now
                                </Button>
                            </Box>
                        </MotionCard>
                    </Grid>
                ))}
            </Grid>

            <Paper
                elevation={0}
                sx={{
                    mt: 4,
                    p: 3,
                    borderRadius: 3,
                    bgcolor: alpha(theme.palette.secondary.light, 0.2),
                    border: `1px solid ${alpha(theme.palette.secondary.main, 0.3)}`,
                }}
            >
                <Typography
                    variant="subtitle1"
                    fontWeight={600}
                    color="secondary.dark"
                    gutterBottom
                >
                    Need Help?
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    Our team is ready to assist you in finding the right service for your
                    needs.
                </Typography>
                <Button
                    variant="outlined"
                    color="secondary"
                    fullWidth
                    sx={{
                        borderRadius: 8,
                        textTransform: "none",
                    }}
                >
                    Contact Support
                </Button>
            </Paper>
        </MotionBox>
    );

    return (
        <MotionBox
            sx={{
                position: "relative",
                minHeight: "100vh",
                background: "linear-gradient(145deg, #F3EFFF, #E5E0FF)",
                pt: 2,
                pb: 7,
                overflow: "hidden",
            }}
        >
            {bgElements.map((el) => (
                <MotionBox
                    key={el.id}
                    sx={{
                        position: "fixed",
                        width: el.size,
                        height: el.size,
                        borderRadius: "50%",
                        background: "linear-gradient(145deg, #D8CCFF, #B5A6FF)",
                        filter: "blur(60px)",
                        left: `${el.x}%`,
                        top: `${el.y}%`,
                        opacity: el.opacity,
                        zIndex: 0,
                    }}
                    animate={{
                        x: ["-10px", "10px", "-10px"],
                        y: ["-15px", "15px", "-15px"],
                    }}
                    transition={{
                        duration: el.duration,
                        repeat: Infinity,
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: el.delay,
                    }}
                />
            ))}

            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    px: 2,
                    pb: 1,
                    position: "relative",
                    zIndex: 2,
                }}
            >
                <Typography
                    variant="h6"
                    component="h1"
                    sx={{ fontWeight: 700, color: theme.palette.primary.main }}
                >
                    Wellness Hub
                </Typography>
                <IconButton
                    onClick={() => setMenuOpen(true)}
                    sx={{
                        bgcolor: alpha(theme.palette.primary.main, 0.1),
                        color: theme.palette.primary.main,
                    }}
                >
                    <Menu />
                </IconButton>
            </Box>

            <Container
                maxWidth="sm"
                sx={{
                    position: "relative",
                    zIndex: 1,
                    px: 2,
                }}
            >
                {activeTab === 0 && renderHomeTab()}
                {activeTab === 1 && renderSessionsTab()}
                {activeTab === 2 && renderServicesTab()}

                <BottomNavigation
                    value={activeTab}
                    onChange={(_, newValue) => {
                        setActiveTab(newValue);
                    }}
                    showLabels
                    sx={{
                        position: "fixed",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 64,
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                        boxShadow: "0 -2px 10px rgba(0,0,0,0.08)",
                        background: "rgba(255, 255, 255, 0.9)",
                        backdropFilter: "blur(10px)",
                        zIndex: 10,
                    }}
                >
                    <BottomNavigationAction label="Home" icon={<Home />} />
                    <BottomNavigationAction label="Sessions" icon={<Schedule />} />
                    <BottomNavigationAction label="Services" icon={<Dashboard />} />
                </BottomNavigation>

                <SwipeableDrawer
                    anchor="bottom"
                    open={openBooking}
                    onClose={handleClose}
                    onOpen={() => { }}
                    sx={{
                        "& .MuiBackdrop-root": {
                            backgroundColor: alpha(theme.palette.common.black, 0.5),
                            backdropFilter: "blur(3px)",
                        },
                        "& .MuiDrawer-paper": {
                            height: "92%",
                            borderTopLeftRadius: 24,
                            borderTopRightRadius: 24,
                            overflow: "hidden",
                        },
                    }}
                >
                    <Box
                        sx={{
                            position: "relative",
                            overflow: "hidden",
                            background: service?.color
                                ? `linear-gradient(135deg, ${service.color}, ${alpha(
                                    service.color,
                                    0.8
                                )})`
                                : `linear-gradient(135deg, ${theme.palette.primary.main
                                }, ${alpha(theme.palette.primary.dark, 0.85)})`,
                            color: theme.palette.common.white,
                            pt: 4,
                            pb: 5,
                        }}
                    >
                        <Box
                            sx={{
                                width: 40,
                                height: 4,
                                borderRadius: 2,
                                bgcolor: "rgba(255,255,255,0.3)",
                                position: "absolute",
                                top: 8,
                                left: "50%",
                                transform: "translateX(-50%)",
                            }}
                        />

                        <IconButton
                            onClick={handleClose}
                            aria-label="close"
                            sx={{
                                position: "absolute",
                                top: 8,
                                right: 8,
                                color: theme.palette.common.white,
                                bgcolor: alpha(theme.palette.common.white, 0.15),
                            }}
                        >
                            <Close />
                        </IconButton>

                        <Box
                            sx={{
                                position: "relative",
                                zIndex: 1,
                                textAlign: "center",
                                px: 3,
                                pt: 2,
                            }}
                        >
                            {service?.icon && (
                                <Avatar
                                    sx={{
                                        mx: "auto",
                                        bgcolor: theme.palette.common.white,
                                        color: service.color || theme.palette.primary.main,
                                        width: 64,
                                        height: 64,
                                        mb: 2,
                                    }}
                                >
                                    {service.icon}
                                </Avatar>
                            )}

                            <Typography variant="h6" fontWeight="bold" gutterBottom>
                                Book {service?.title || "a Consultation"}
                            </Typography>
                            <Typography
                                variant="body2"
                                sx={{ opacity: 0.9, maxWidth: "85%", mx: "auto" }}
                            >
                                {service?.description ||
                                    "Find the right professional for your needs"}
                            </Typography>
                        </Box>

                        <Box
                            sx={{
                                position: "absolute",
                                bottom: -2,
                                left: 0,
                                width: "100%",
                                height: "30px",
                                overflow: "hidden",
                                zIndex: 2,
                            }}
                        >
                            <svg
                                viewBox="0 0 500 150"
                                preserveAspectRatio="none"
                                style={{ height: "100%", width: "100%" }}
                            >
                                <path
                                    d="M0.00,49.98 C150.00,150.00 349.20,-50.00 500.00,49.98 L500.00,150.00 L0.00,150.00 Z"
                                    style={{
                                        stroke: "none",
                                        fill: theme.palette.background.paper,
                                    }}
                                ></path>
                            </svg>
                        </Box>
                    </Box>

                    <Box
                        sx={{
                            px: 2,
                            py: 3,
                            height: "calc(100% - 180px)",
                            overflow: "auto",
                            "&::-webkit-scrollbar": {
                                width: "4px",
                            },
                            "&::-webkit-scrollbar-track": {
                                background: alpha(theme.palette.primary.light, 0.1),
                                borderRadius: "4px",
                            },
                            "&::-webkit-scrollbar-thumb": {
                                background: alpha(theme.palette.primary.main, 0.2),
                                borderRadius: "4px",
                            },
                        }}
                    >
                        <BookConsultation
                            preSelectedExpertType={service?.id}
                            setCount={setCount}
                            onClose={handleClose}
                        />
                    </Box>

                    <Box
                        sx={{
                            position: "sticky",
                            bottom: 0,
                            left: 0,
                            right: 0,
                            py: 2,
                            px: 2,
                            borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
                            background: theme.palette.background.paper,
                            zIndex: 3,
                            display: "flex",
                            justifyContent: "center",
                        }}
                    >
                        <Button
                            fullWidth
                            variant="outlined"
                            color="primary"
                            onClick={handleClose}
                            sx={{
                                textTransform: "none",
                                fontWeight: 500,
                                borderRadius: 8,
                                maxWidth: 400,
                            }}
                        >
                            Cancel
                        </Button>
                    </Box>
                </SwipeableDrawer>

                <SwipeableDrawer
                    anchor="right"
                    open={menuOpen}
                    onClose={() => setMenuOpen(false)}
                    onOpen={() => { }}
                    sx={{
                        "& .MuiBackdrop-root": {
                            backgroundColor: alpha(theme.palette.common.black, 0.5),
                            backdropFilter: "blur(3px)",
                        },
                        "& .MuiDrawer-paper": {
                            width: "80%",
                            maxWidth: 300,
                            borderTopLeftRadius: 16,
                            borderBottomLeftRadius: 16,
                            background: "rgba(255, 255, 255, 0.95)",
                            backdropFilter: "blur(10px)",
                        },
                    }}
                >
                    <Box sx={{ p: 3 }}>
                        <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                            <Avatar
                                sx={{
                                    width: 48,
                                    height: 48,
                                    bgcolor: theme.palette.primary.main,
                                    mr: 2,
                                }}
                            >
                                {userName?.user?.username?.charAt(0).toUpperCase() || "U"}
                            </Avatar>
                            <Box>
                                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                                    {userName?.user?.username || "User"}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    View Profile
                                </Typography>
                            </Box>
                        </Box>

                        <Divider sx={{ mb: 2 }} />

                        <List component="nav">
                            <ListItem button>
                                <ListItemIcon>
                                    <Home color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Home" />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <Schedule color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="My Sessions" />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <MedicalServices color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Services" />
                            </ListItem>
                            <ListItem button>
                                <ListItemIcon>
                                    <Psychology color="primary" />
                                </ListItemIcon>
                                <ListItemText primary="Support" />
                            </ListItem>
                        </List>
                    </Box>
                </SwipeableDrawer>
            </Container>
        </MotionBox>
    );
};
export default MobileClient;
