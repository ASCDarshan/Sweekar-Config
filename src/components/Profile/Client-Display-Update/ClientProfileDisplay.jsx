/* eslint-disable react/prop-types */
import {
    Container,
    Grid,
    Avatar,
    Typography,
    Box,
    Card,
    Button,
    Tabs,
    Tab,
    alpha,
    useTheme,
    useMediaQuery,
} from "@mui/material";
import {
    Cake,
    Edit,
    Favorite,
    LocalHospital,
    MedicalInformation,
    Medication,
    Person,
    Phone,
    Translate,
    WarningAmber,
    Work,
    ArrowBack,
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import ajaxCall from "../../../helpers/ajaxCall";
import ClientUpdateDrawer from "./ClientUpdateDrawer";
import UserProfileShimmer from "../../UI/UserProfileShimmer";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionContainer = motion(Container);
const MotionAvatar = motion(Avatar);
const MotionTypography = motion(Typography);

const ProfileDetail = ({ icon, label, value }) => {
    const theme = useTheme();

    return (
        <Grid item xs={12} sm={6} md={4}>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 12,
                }}
                whileHover={{
                    y: -5,
                    transition: { duration: 0.2 },
                }}
            >
                <Box
                    sx={{
                        display: "flex",
                        gap: 2,
                        p: 2.5,
                        borderRadius: 3,
                        background: "rgba(255, 255, 255, 0.7)",
                        backdropFilter: "blur(5px)",
                        border: `1px solid ${alpha(theme.palette.primary.light, 0.5)}`,
                        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.05)",
                        transition: "all 0.2s",
                        "&:hover": {
                            background: "rgba(255, 255, 255, 0.9)",
                            transform: "translateY(-4px)",
                            boxShadow: "0 15px 25px rgba(157, 132, 183, 0.2)",
                        },
                        height: "100%",
                    }}
                >
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "flex-start",
                            pt: 0.5,
                        }}
                    >
                        {icon}
                    </Box>
                    <Box>
                        <Typography
                            variant="subtitle2"
                            color="text.secondary"
                            gutterBottom
                            sx={{ fontWeight: 500 }}
                        >
                            {label}
                        </Typography>
                        <Typography variant="body1" sx={{ fontWeight: 600 }}>
                            {value}
                        </Typography>
                    </Box>
                </Box>
            </motion.div>
        </Grid >
    );
};

const formatDate = (dateString) => {
    if (!dateString) return "Not provided";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
    });
};

const generateBackgroundElements = (count) => {
    return Array.from({ length: count }).map((_, index) => ({
        id: index,
        size: Math.floor(Math.random() * 300) + 100,
        x: Math.floor(Math.random() * 100),
        y: Math.floor(Math.random() * 100),
        opacity: Math.random() * 0.08 + 0.02,
        duration: Math.random() * 40 + 20,
        delay: Math.random() * 5,
    }));
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.1,
            duration: 0.5,
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

const ClientProfileDisplay = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const userId = JSON.parse(localStorage.getItem("loginInfo")).user;
    const user = JSON.parse(localStorage.getItem("loginInfo"));
    const [client, setClients] = useState({});
    const [openUpdateDrawer, setOpenUpdateDrawer] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);
    const [count, setCount] = useState(0);

    const fetchData = async (url, setData) => {
        setLoading(true);
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
        fetchData(`clients/profile-user/?user=${userId}`, setClients);
    }, [userId, count]);

    const handleUpdateClick = () => {
        setOpenUpdateDrawer(true);
    };

    const closeUpdateDrawer = () => {
        setOpenUpdateDrawer(false);
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const bgElements = generateBackgroundElements(6);

    const fullName = `${client?.user?.first_name || ""} ${client?.user?.last_name || ""}`;

    const goBack = () => {
        navigate("/Client/Dashboard");
    };

    if (loading) {
        return (
            <Container maxWidth="lg" sx={{ mt: 8 }}>
                <UserProfileShimmer />
            </Container>
        );
    }

    return (
        <MotionBox
            initial="hidden"
            animate="visible"
            variants={containerVariants}
            sx={{
                position: "relative",
                minHeight: "100vh",
                background: "linear-gradient(145deg, #F3EFFF, #E5E0FF)",
                pt: { xs: 2, md: 4 },
                pb: 8,
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
                        x: ["-20px", "20px", "-20px"],
                        y: ["-30px", "30px", "-30px"],
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

            <MotionContainer
                maxWidth="lg"
                sx={{ position: "relative", zIndex: 1 }}
            >
                <MotionBox
                    variants={itemVariants}
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        mb: 3,
                        gap: 2,
                    }}
                >
                    <Button
                        variant="contained"
                        startIcon={<ArrowBack />}
                        onClick={goBack}
                        sx={{
                            bgcolor: "rgba(255,255,255,0.9)",
                            color: theme.palette.primary.main,
                            borderRadius: 8,
                            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                            backdropFilter: "blur(10px)",
                            px: 3,
                            py: 1.2,
                            "&:hover": {
                                bgcolor: "white",
                                boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                                transform: "translateY(-3px)",
                            },
                            transition: "all 0.3s ease",
                        }}
                    >
                        <span className="sr-only">Back</span>
                    </Button>
                    <Typography variant="h4" component="h1" fontWeight="bold">
                        Your Profile
                    </Typography>
                </MotionBox>

                <MotionCard
                    variants={itemVariants}
                    elevation={0}
                    sx={{
                        mb: 4,
                        borderRadius: 3,
                        position: "relative",
                        overflow: "hidden",
                        background: "rgba(255, 255, 255, 0.8)",
                        backdropFilter: "blur(10px)",
                        border: `1px solid ${alpha(theme.palette.primary.light, 0.5)}`,
                        boxShadow: "0 10px 30px rgba(106, 90, 205, 0.15)",
                    }}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: isMobile ? 150 : 180,
                            background: `linear - gradient(145deg, ${theme.palette.primary.light}, ${alpha(theme.palette.primary.main, 0.8)})`,
                            zIndex: 0,
                            "&::after": {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background: "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.1) 100%)",
                                zIndex: 1,
                            },
                        }}
                    />

                    <MotionBox
                        sx={{
                            position: "absolute",
                            top: 40,
                            right: { xs: 20, md: 100 },
                            width: { xs: 60, md: 80 },
                            height: { xs: 60, md: 80 },
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.2)",
                            zIndex: 1,
                        }}
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.5, 0.3],
                        }}
                        transition={{
                            duration: 6,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    <MotionBox
                        sx={{
                            position: "absolute",
                            top: 70,
                            right: { xs: 80, md: 40 },
                            width: { xs: 30, md: 40 },
                            height: { xs: 30, md: 40 },
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.25)",
                            zIndex: 1,
                        }}
                        animate={{
                            scale: [1, 1.3, 1],
                            opacity: [0.4, 0.6, 0.4],
                        }}
                        transition={{
                            duration: 5,
                            delay: 1,
                            repeat: Infinity,
                            ease: "easeInOut",
                        }}
                    />

                    <Box
                        sx={{
                            position: "relative",
                            pt: { xs: 8, md: 10 },
                            pb: 3,
                            px: { xs: 2, md: 4 },
                            zIndex: 1,
                        }}
                    >
                        <Grid
                            container
                            spacing={3}
                            alignItems="center"
                            justifyContent="space-between"
                        >
                            <Grid
                                item
                                xs={12}
                                md={8}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 3,
                                    flexWrap: { xs: "wrap", md: "nowrap" },
                                }}
                            >
                                <MotionAvatar
                                    initial={{ scale: 0, opacity: 0 }}
                                    animate={{
                                        scale: 1,
                                        opacity: 1,
                                        transition: {
                                            type: "spring",
                                            stiffness: 100,
                                            damping: 10,
                                            delay: 0.2,
                                        },
                                    }}
                                    whileHover={{
                                        scale: 1.05,
                                        boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                                        transition: { duration: 0.2 },
                                    }}
                                    sx={{
                                        width: { xs: 90, md: 120 },
                                        height: { xs: 90, md: 120 },
                                        fontSize: { xs: "2rem", md: "2.8rem" },
                                        fontWeight: "bold",
                                        bgcolor: theme.palette.primary.main,
                                        color: "white",
                                        border: "4px solid rgba(255,255,255,0.8)",
                                        boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
                                    }}
                                >
                                    {client?.user?.first_name?.charAt(0) || ""}
                                    {client?.user?.last_name?.charAt(0) || ""}
                                </MotionAvatar>

                                <Box>
                                    <MotionTypography
                                        variant={isMobile ? "h4" : "h3"}
                                        fontWeight="bold"
                                        color="white"
                                        sx={{
                                            textShadow: "0 2px 10px rgba(0,0,0,0.2)",
                                            mb: 0.5,
                                        }}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{
                                            x: 0,
                                            opacity: 1,
                                            transition: {
                                                type: "spring",
                                                stiffness: 100,
                                                damping: 10,
                                                delay: 0.4,
                                            },
                                        }}
                                    >
                                        {fullName || "User"}
                                    </MotionTypography>
                                    <MotionTypography
                                        variant="h6"
                                        sx={{
                                            color: "white",
                                            opacity: 0.9,
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 1,
                                            textShadow: "0 1px 2px rgba(0,0,0,0.1)",
                                            fontSize: { xs: "1rem", md: "1.25rem" },
                                        }}
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{
                                            x: 0,
                                            opacity: 1,
                                            transition: {
                                                type: "spring",
                                                stiffness: 100,
                                                damping: 10,
                                                delay: 0.5,
                                            },
                                        }}
                                    >
                                        <MedicalInformation fontSize="small" />
                                        {client.professional_type?.title || "Patient"}
                                    </MotionTypography>
                                </Box>
                            </Grid>

                            {user.user_type === "CLIENT" && client?.user?.id === user.user && (
                                <Grid item xs={12} md={4} sx={{
                                    textAlign: { xs: "left", md: "right" },
                                    pl: { xs: 12, md: 2 },
                                    mt: { xs: -2, md: 0 },
                                }}>
                                    <MotionBox
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{
                                            opacity: 1,
                                            y: 0,
                                            transition: {
                                                delay: 0.6,
                                                duration: 0.5,
                                            },
                                        }}
                                    >
                                        <Button
                                            variant="contained"
                                            startIcon={<Edit />}
                                            onClick={handleUpdateClick}
                                            sx={{
                                                bgcolor: "rgba(255,255,255,0.9)",
                                                color: theme.palette.primary.main,
                                                borderRadius: 8,
                                                boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
                                                backdropFilter: "blur(10px)",
                                                px: 3,
                                                py: 1.2,
                                                "&:hover": {
                                                    bgcolor: "white",
                                                    boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
                                                    transform: "translateY(-3px)",
                                                },
                                                transition: "all 0.3s ease",
                                            }}
                                        >
                                            Edit Profile
                                        </Button>
                                    </MotionBox>
                                </Grid>
                            )}
                        </Grid>
                    </Box>

                    <MotionBox
                        sx={{
                            bgcolor: "rgba(255,255,255,0.9)",
                            backdropFilter: "blur(10px)",
                            borderRadius: "24px 24px 0 0",
                            mt: -3,
                            position: "relative",
                            zIndex: 2,
                            boxShadow: "0 -4px 30px rgba(0,0,0,0.1)",
                        }}
                        initial={{ y: 30, opacity: 0 }}
                        animate={{
                            y: 0,
                            opacity: 1,
                            transition: {
                                type: "spring",
                                stiffness: 100,
                                damping: 15,
                                delay: 0.7,
                            },
                        }}
                    >
                        <Tabs
                            value={activeTab}
                            onChange={handleTabChange}
                            variant="fullWidth"
                            sx={{
                                "& .MuiTabs-indicator": {
                                    height: 4,
                                    borderRadius: 2,
                                    background: `linear - gradient(to right, ${theme.palette.primary.light}, ${theme.palette.primary.main})`,
                                },
                                "& .MuiTab-root": {
                                    py: 2,
                                    fontWeight: "600",
                                    fontSize: { xs: "0.875rem", md: "1rem" },
                                    color: "text.primary",
                                    transition: "all 0.3s ease",
                                    "&.Mui-selected": {
                                        color: theme.palette.primary.main,
                                    },
                                },
                            }}
                        >
                            <Tab
                                label="Medical Info"
                                icon={<LocalHospital />}
                                iconPosition={isMobile ? "top" : "start"}
                            />
                            <Tab
                                label="Personal Details"
                                icon={<Person />}
                                iconPosition={isMobile ? "top" : "start"}
                            />
                        </Tabs>
                    </MotionBox>
                </MotionCard>

                <Box
                    sx={{
                        display: activeTab === 0 ? "block" : "none",
                    }}
                >
                    <Grid container spacing={3}>
                        <Grid item xs={12}>
                            <MotionCard
                                variants={itemVariants}
                                sx={{
                                    mb: 3,
                                    borderRadius: 3,
                                    background: "rgba(255, 255, 255, 0.8)",
                                    backdropFilter: "blur(10px)",
                                    boxShadow: "0 10px 30px rgba(106, 90, 205, 0.15)",
                                    overflow: "hidden",
                                    transition: "transform 0.3s, box-shadow 0.3s",
                                    "&:hover": {
                                        transform: "translateY(-4px)",
                                        boxShadow: "0 15px 35px rgba(157, 132, 183, 0.25)",
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        p: 0.5,
                                        borderBottom: "1px solid",
                                        borderColor: alpha(theme.palette.primary.light, 0.3),
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1.5,
                                        backgroundColor: alpha(theme.palette.primary.light, 0.1),
                                        pl: 3,
                                    }}
                                >
                                    <MedicalInformation color="primary" />
                                    <Typography
                                        variant="h6"
                                        color="primary.main"
                                        fontWeight="medium"
                                        sx={{ py: 2 }}
                                    >
                                        Medical History
                                    </Typography>
                                </Box>
                                <Box sx={{ p: 3 }}>
                                    <Typography
                                        variant="body1"
                                        color="text.secondary"
                                        sx={{
                                            whiteSpace: "pre-line",
                                            fontSize: "1rem",
                                            letterSpacing: 0.3,
                                        }}
                                    >
                                        {client.medical_history || "No medical history provided."}
                                    </Typography>
                                </Box>
                            </MotionCard>

                            <Grid container spacing={3}>
                                <Grid item xs={12} md={6}>
                                    <MotionCard
                                        variants={itemVariants}
                                        sx={{
                                            mb: 3,
                                            borderRadius: 3,
                                            background: "rgba(255, 255, 255, 0.8)",
                                            backdropFilter: "blur(10px)",
                                            boxShadow: "0 10px 30px rgba(106, 90, 205, 0.15)",
                                            overflow: "hidden",
                                            height: "100%",
                                            transition: "transform 0.3s, box-shadow 0.3s",
                                            "&:hover": {
                                                transform: "translateY(-4px)",
                                                boxShadow: "0 15px 35px rgba(157, 132, 183, 0.25)",
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                p: 0.5,
                                                borderBottom: "1px solid",
                                                borderColor: alpha(theme.palette.secondary.light, 0.3),
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1.5,
                                                backgroundColor: alpha(theme.palette.secondary.light, 0.1),
                                                pl: 3,
                                            }}
                                        >
                                            <WarningAmber color="secondary" />
                                            <Typography
                                                variant="h6"
                                                color="secondary.main"
                                                fontWeight="medium"
                                                sx={{ py: 2 }}
                                            >
                                                Allergies
                                            </Typography>
                                        </Box>
                                        <Box sx={{ p: 3 }}>
                                            <Typography
                                                variant="body1"
                                                color="text.secondary"
                                                sx={{
                                                    whiteSpace: "pre-line",
                                                    fontSize: "1rem",
                                                    letterSpacing: 0.3,
                                                }}
                                            >
                                                {client.allergies || "No allergies recorded."}
                                            </Typography>
                                        </Box>
                                    </MotionCard>
                                </Grid>

                                <Grid item xs={12} md={6}>
                                    <MotionCard
                                        variants={itemVariants}
                                        sx={{
                                            mb: 3,
                                            borderRadius: 3,
                                            background: "rgba(255, 255, 255, 0.8)",
                                            backdropFilter: "blur(10px)",
                                            boxShadow: "0 10px 30px rgba(106, 90, 205, 0.15)",
                                            overflow: "hidden",
                                            height: "100%",
                                            transition: "transform 0.3s, box-shadow 0.3s",
                                            "&:hover": {
                                                transform: "translateY(-4px)",
                                                boxShadow: "0 15px 35px rgba(157, 132, 183, 0.25)",
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                p: 0.5,
                                                borderBottom: "1px solid",
                                                borderColor: alpha(theme.palette.primary.dark, 0.3),
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1.5,
                                                backgroundColor: alpha(theme.palette.primary.dark, 0.08),
                                                pl: 3,
                                            }}
                                        >
                                            <Medication sx={{ color: theme.palette.primary.dark }} />
                                            <Typography
                                                variant="h6"
                                                sx={{ color: theme.palette.primary.dark, py: 2, fontWeight: "medium" }}
                                            >
                                                Current Medications
                                            </Typography>
                                        </Box>
                                        <Box sx={{ p: 3 }}>
                                            <Typography
                                                variant="body1"
                                                color="text.secondary"
                                                sx={{
                                                    whiteSpace: "pre-line",
                                                    fontSize: "1rem",
                                                    letterSpacing: 0.3,
                                                }}
                                            >
                                                {client.current_medications || "No medications listed."}
                                            </Typography>
                                        </Box>
                                    </MotionCard>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                </Box>

                <Box
                    sx={{
                        display: activeTab === 1 ? "block" : "none",
                    }}
                >
                    <MotionCard
                        variants={itemVariants}
                        sx={{
                            mb: 3,
                            borderRadius: 3,
                            background: "rgba(255, 255, 255, 0.8)",
                            backdropFilter: "blur(10px)",
                            boxShadow: "0 10px 30px rgba(106, 90, 205, 0.15)",
                            p: { xs: 2, md: 3 },
                        }}
                    >
                        <Grid container spacing={{ xs: 2, md: 3 }}>
                            <ProfileDetail
                                icon={<LocalHospital sx={{ color: theme.palette.secondary.main }} />}
                                label="Blood Group"
                                value={client?.blood_group || "Not specified"}
                            />

                            <ProfileDetail
                                icon={<Cake sx={{ color: theme.palette.primary.main }} />}
                                label="Date of Birth"
                                value={formatDate(client?.date_of_birth)}
                            />

                            <ProfileDetail
                                icon={<Phone sx={{ color: theme.palette.primary.dark }} />}
                                label="Emergency Contact"
                                value={client?.emergency_contact_phone || "Not provided"}
                            />

                            <ProfileDetail
                                icon={<Person sx={{ color: theme.palette.primary.main }} />}
                                label="Emergency Contact Name"
                                value={client?.emergency_contact_name || "Not provided"}
                            />

                            <ProfileDetail
                                icon={<Favorite sx={{ color: theme.palette.secondary.main }} />}
                                label="Emergency Contact Relationship"
                                value={
                                    client?.emergency_contact_relationship || "Not specified"
                                }
                            />

                            <ProfileDetail
                                icon={<Work sx={{ color: theme.palette.primary.dark }} />}
                                label="Occupation"
                                value={client?.occupation || "Not specified"}
                            />

                            <ProfileDetail
                                icon={<Translate sx={{ color: theme.palette.primary.main }} />}
                                label="Preferred Language"
                                value={client?.preferred_language || "Not specified"}
                            />
                        </Grid>
                    </MotionCard>
                </Box>

                <ClientUpdateDrawer
                    ExpertDetails={client}
                    open={openUpdateDrawer}
                    onClose={closeUpdateDrawer}
                    setCount={setCount}
                />
            </MotionContainer>
        </MotionBox >
    );
};

export default ClientProfileDisplay;