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
} from "@mui/icons-material";
import { useEffect, useState } from "react";
import ajaxCall from "../../../helpers/ajaxCall";
import ClientUpdateDrawer from "./ClientUpdateDrawer";
import UserProfileShimmer from "../../UI/UserProfileShimmer";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionContainer = motion(Container);
const MotionAvatar = motion(Avatar);
const MotionTypography = motion(Typography);

const ProfileDetail = ({ icon, label, value }) => {
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
                        p: 2,
                        borderRadius: 3,
                        background: "rgba(255, 255, 255, 0.5)",
                        backdropFilter: "blur(5px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.05)",
                        transition: "all 0.2s",
                        "&:hover": {
                            background: "rgba(255, 255, 255, 0.7)",
                            transform: "translateX(4px)",
                            boxShadow: "0 15px 25px rgba(0, 0, 0, 0.08)",
                        },
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
        </Grid>
    );
};

const generateGradient = (name) => {
    const hash = name?.split("").reduce((acc, char) => {
        return char.charCodeAt(0) + ((acc << 5) - acc);
    }, 0);

    const h = Math.abs(hash % 360);
    return `linear-gradient(135deg, hsl(${h}, 80%, 50%), hsl(${(h + 40) % 360
        }, 80%, 60%))`;
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

const generateRandomFloatingElements = (count) => {
    return Array.from({ length: count }).map((_, index) => ({
        id: index,
        size: Math.floor(Math.random() * 100) + 50,
        x: Math.floor(Math.random() * 100),
        y: Math.floor(Math.random() * 100),
        opacity: Math.random() * 0.3 + 0.1,
        duration: Math.random() * 20 + 10,
        delay: Math.random() * 5,
    }));
};

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            when: "beforeChildren",
            staggerChildren: 0.3,
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

const fadeInVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            duration: 0.8,
        },
    },
};

const ClientProfileDisplay = () => {
    const userId = JSON.parse(localStorage.getItem("loginInfo")).user;
    const user = JSON.parse(localStorage.getItem("loginInfo"));
    const [client, setClients] = useState([]);
    const [openUpdateDrawer, setOpenUpdateDrawer] = useState(false);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState(0);

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
    }, [userId]);

    const handleUpdateClick = () => {
        setOpenUpdateDrawer(true);
    };

    const closeUpdateDrawer = () => {
        setOpenUpdateDrawer(false);
    };

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    const floatingElements = generateRandomFloatingElements(10);

    const fullName = `${client?.user?.first_name || ""} ${client?.user?.last_name || ""
        }`;

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
                minHeight: "100vh",
                pt: 4,
                pb: 8,
                position: "relative",
                overflow: "hidden",
                background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
            }}
        >
            {floatingElements.map((el) => (
                <MotionBox
                    key={el.id}
                    sx={{
                        position: "absolute",
                        width: el.size,
                        height: el.size,
                        borderRadius: "50%",
                        background:
                            "linear-gradient(135deg, rgba(255,255,255,0.2) 0%, rgba(255,255,255,0) 70%)",
                        filter: "blur(8px)",
                        left: `${el.x}%`,
                        top: `${el.y}%`,
                        opacity: el.opacity,
                        zIndex: 0,
                    }}
                    animate={{
                        x: ["-20px", "20px", "-20px"],
                        y: ["-30px", "30px", "-30px"],
                        rotate: [0, 360],
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

            <MotionBox
                sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage:
                        "linear-gradient(rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255, 255, 255, 0.05) 1px, transparent 1px)",
                    backgroundSize: "40px 40px",
                    zIndex: 0,
                }}
                animate={{
                    backgroundPosition: ["0px 0px", "40px 40px"],
                }}
                transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                }}
            />

            <MotionBox
                sx={{
                    position: "absolute",
                    width: "200%",
                    height: "1px",
                    background:
                        "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)",
                    top: "30%",
                    left: "-50%",
                    transform: "rotate(-15deg)",
                    zIndex: 0,
                }}
                animate={{
                    opacity: [0.2, 0.5, 0.2],
                    y: [0, 30, 0],
                }}
                transition={{
                    duration: 15,
                    repeat: Infinity,
                    ease: "easeInOut",
                }}
            />

            <MotionBox
                sx={{
                    position: "absolute",
                    width: "200%",
                    height: "1px",
                    background:
                        "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(255,255,255,0.3) 50%, rgba(255,255,255,0) 100%)",
                    top: "60%",
                    left: "-50%",
                    transform: "rotate(20deg)",
                    zIndex: 0,
                }}
                animate={{
                    opacity: [0.2, 0.6, 0.2],
                    y: [0, -30, 0],
                }}
                transition={{
                    duration: 18,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 5,
                }}
            />

            <MotionContainer
                maxWidth="lg"
                sx={{ position: "relative", zIndex: 1 }}
                variants={fadeInVariants}
            >
                <MotionCard
                    variants={itemVariants}
                    elevation={0}
                    sx={{
                        mb: 4,
                        borderRadius: 4,
                        position: "relative",
                        overflow: "hidden",
                        background: "rgba(255, 255, 255, 0.1)",
                        backdropFilter: "blur(10px)",
                        border: "1px solid rgba(255, 255, 255, 0.2)",
                        boxShadow: "0 25px 50px rgba(0,0,0,0.15)",
                    }}
                >
                    <Box
                        sx={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            right: 0,
                            height: 180,
                            background: generateGradient(fullName),
                            zIndex: 0,
                            borderRadius: "16px 16px 0 0",
                            "&::after": {
                                content: '""',
                                position: "absolute",
                                top: 0,
                                left: 0,
                                right: 0,
                                bottom: 0,
                                background:
                                    "linear-gradient(to bottom, rgba(0,0,0,0) 0%, rgba(0,0,0,0.2) 100%)",
                                zIndex: 1,
                            },
                        }}
                    />

                    <MotionBox
                        sx={{
                            position: "absolute",
                            top: 40,
                            right: 100,
                            width: 80,
                            height: 80,
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.1)",
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
                            right: 40,
                            width: 40,
                            height: 40,
                            borderRadius: "50%",
                            background: "rgba(255,255,255,0.15)",
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
                            pt: 10,
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
                                        width: 120,
                                        height: 120,
                                        fontSize: "2.8rem",
                                        fontWeight: "bold",
                                        background: generateGradient(fullName),
                                        border: "4px solid rgba(255,255,255,0.8)",
                                        boxShadow: "0 15px 35px rgba(0,0,0,0.2)",
                                    }}
                                >
                                    {client?.user?.first_name?.charAt(0)}
                                    {client?.user?.last_name?.charAt(0)}
                                </MotionAvatar>

                                <Box>
                                    <MotionTypography
                                        variant="h3"
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
                                        {fullName}
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

                            {user.user_type === "CLIENT" &&
                                client?.user?.id === user.user && (
                                    <Grid item xs={12} md={4} sx={{ textAlign: "right" }}>
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
                                                color="primary"
                                                startIcon={<Edit />}
                                                onClick={handleUpdateClick}
                                                sx={{
                                                    bgcolor: "rgba(255,255,255,0.9)",
                                                    color: "primary.main",
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
                                    background: "linear-gradient(to right, #667eea, #764ba2)",
                                },
                                "& .MuiTab-root": {
                                    py: 2,
                                    fontWeight: "600",
                                    fontSize: "1rem",
                                    color: "text.primary",
                                    transition: "all 0.3s ease",
                                    "&.Mui-selected": {
                                        color: "#764ba2",
                                    },
                                },
                            }}
                        >
                            <Tab
                                label="Medical Info"
                                icon={<LocalHospital />}
                                iconPosition="start"
                            />
                            <Tab
                                label="Personal Details"
                                icon={<Person />}
                                iconPosition="start"
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
                                    borderRadius: 4,
                                    background: "rgba(255, 255, 255, 0.8)",
                                    backdropFilter: "blur(10px)",
                                    boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
                                    overflow: "hidden",
                                    transition: "transform 0.3s, box-shadow 0.3s",
                                    "&:hover": {
                                        transform: "translateY(-4px)",
                                        boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                                    },
                                }}
                            >
                                <Box
                                    sx={{
                                        p: 0.5,
                                        borderBottom: "1px solid",
                                        borderColor: "divider",
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1.5,
                                        backgroundColor: (theme) =>
                                            alpha(theme.palette.info.light, 0.08),
                                        pl: 3,
                                    }}
                                >
                                    <MedicalInformation color="info" />
                                    <Typography
                                        variant="h6"
                                        color="info.main"
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
                                            borderRadius: 4,
                                            background: "rgba(255, 255, 255, 0.8)",
                                            backdropFilter: "blur(10px)",
                                            boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
                                            overflow: "hidden",
                                            height: "100%",
                                            transition: "transform 0.3s, box-shadow 0.3s",
                                            "&:hover": {
                                                transform: "translateY(-4px)",
                                                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                p: 0.5,
                                                borderBottom: "1px solid",
                                                borderColor: "divider",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1.5,
                                                backgroundColor: (theme) =>
                                                    alpha(theme.palette.warning.light, 0.08),
                                                pl: 3,
                                            }}
                                        >
                                            <WarningAmber color="warning" />
                                            <Typography
                                                variant="h6"
                                                color="warning.main"
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
                                            borderRadius: 4,
                                            background: "rgba(255, 255, 255, 0.8)",
                                            backdropFilter: "blur(10px)",
                                            boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
                                            overflow: "hidden",
                                            height: "100%",
                                            transition: "transform 0.3s, box-shadow 0.3s",
                                            "&:hover": {
                                                transform: "translateY(-4px)",
                                                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.15)",
                                            },
                                        }}
                                    >
                                        <Box
                                            sx={{
                                                p: 0.5,
                                                borderBottom: "1px solid",
                                                borderColor: "divider",
                                                display: "flex",
                                                alignItems: "center",
                                                gap: 1.5,
                                                backgroundColor: (theme) =>
                                                    alpha(theme.palette.success.light, 0.08),
                                                pl: 3,
                                            }}
                                        >
                                            <Medication color="success" />
                                            <Typography
                                                variant="h6"
                                                color="success.main"
                                                fontWeight="medium"
                                                sx={{ py: 2 }}
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
                            borderRadius: 4,
                            background: "rgba(255, 255, 255, 0.8)",
                            backdropFilter: "blur(10px)",
                            boxShadow: "0 15px 35px rgba(0, 0, 0, 0.1)",
                            p: 3,
                        }}
                    >
                        <Grid container spacing={3}>
                            <ProfileDetail
                                icon={<LocalHospital color="error" />}
                                label="Blood Group"
                                value={client?.blood_group || "Not specified"}
                            />

                            <ProfileDetail
                                icon={<Cake color="primary" />}
                                label="Date of Birth"
                                value={formatDate(client?.date_of_birth)}
                            />

                            <ProfileDetail
                                icon={<Phone color="success" />}
                                label="Emergency Contact"
                                value={client?.emergency_contact_phone || "Not provided"}
                            />

                            <ProfileDetail
                                icon={<Person color="info" />}
                                label="Emergency Contact Name"
                                value={client?.emergency_contact_name || "Not provided"}
                            />

                            <ProfileDetail
                                icon={<Favorite color="error" />}
                                label="Emergency Contact Relationship"
                                value={
                                    client?.emergency_contact_relationship || "Not specified"
                                }
                            />

                            <ProfileDetail
                                icon={<Work color="warning" />}
                                label="Occupation"
                                value={client?.occupation || "Not specified"}
                            />

                            <ProfileDetail
                                icon={<Translate color="primary" />}
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
                />
            </MotionContainer>
        </MotionBox>
    );
};

export default ClientProfileDisplay;
