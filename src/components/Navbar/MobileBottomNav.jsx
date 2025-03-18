import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import {
    Paper,
    BottomNavigation,
    BottomNavigationAction,
    Box,
} from "@mui/material";
import { Home, Psychology, MenuBook, Login, Logout } from "@mui/icons-material";

const MobileBottomNav = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [value, setValue] = useState("/");
    const [isMobile, setIsMobile] = useState(false);
    const user = JSON.parse(localStorage.getItem("loginInfo"));

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 960);
        };

        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    useEffect(() => {
        const path = location.pathname;
        setValue(
            path === "/"
                ? "/"
                : path === "/services"
                    ? "/services"
                    : path === "/resources"
                        ? "/resources"
                        : path === "/login"
                            ? "/login"
                            : "/"
        );
    }, [location]);

    const handleAuthAction = () => {
        if (user) {
            localStorage.clear();
            navigate("/");
        } else {
            navigate("/login");
        }
    };

    if (!isMobile) return null;

    return (
        <Box
            sx={{
                position: "fixed",
                bottom: 0,
                left: 0,
                right: 0,
                zIndex: 1000,
                display: { xs: "block", sm: "block", md: "none" },
            }}
        >
            <Paper elevation={3}>
                <BottomNavigation
                    value={value}
                    onChange={(event, newValue) => {
                        if (newValue === "auth") {
                            handleAuthAction();
                            return;
                        }
                        setValue(newValue);
                        navigate(newValue);
                    }}
                    sx={{
                        bgcolor: "white",
                        "& .Mui-selected": {
                            "& .MuiBottomNavigationAction-label": {
                                fontSize: "0.75rem",
                                color: "#9D84B7",
                            },
                            "& .MuiSvgIcon-root": {
                                color: "#9D84B7",
                            },
                        },
                    }}
                >
                    <BottomNavigationAction label="Home" value="/" icon={<Home />} />
                    <BottomNavigationAction
                        label="Services"
                        value="/services"
                        icon={<Psychology />}
                    />
                    <BottomNavigationAction
                        label="Resources"
                        value="/resources"
                        icon={<MenuBook />}
                    />
                    <BottomNavigationAction
                        label={user ? "Logout" : "Login"}
                        value="auth"
                        icon={user ? <Logout /> : <Login />}
                    />
                </BottomNavigation>
            </Paper>
        </Box>
    );
};

export default MobileBottomNav;
