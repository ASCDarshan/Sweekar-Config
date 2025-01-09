import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Container,
  useScrollTrigger,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Stack,
  ListItemIcon,
  Collapse,
} from "@mui/material";
import {
  AccountCircle,
  Menu as MenuIcon,
  Close as CloseIcon,
  Dashboard as DashboardIcon,
  AccountCircle as AccountCircleIcon,
  Logout as LogoutIcon,
  ExpandLess,
  ExpandMore,
} from "@mui/icons-material";
import logo from "../../assets/sweekar-Logo.png";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Services", path: "/services" },
  { label: "Experts", path: "/experts" },
  { label: "Centres", path: "/centres" },
  { label: "Blog", path: "/blog" },
  { label: "Resources", path: "/resources" },
  { label: "Reach Us", path: "/contact" },
];
const Navbar = () => {
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [openDropdown, setOpenDropdown] = useState(false);
  const user = JSON.parse(localStorage.getItem("loginInfo"));

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 960);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleDropdownToggle = () => {
    setOpenDropdown(!openDropdown);
  };

  const handleDashboard = () => {
    if (user.user_type === "CLIENT") {
      navigate("/Client/Dashboard");
    } else {
      navigate("/Professional/Dashboard");
    }
    handleClose();
  };

  const handleProfile = () => {
    if (user.user_type === "CLIENT") {
      navigate("/Client/Profile");
    } else {
      navigate("/Professional/Profile");
    }
    handleClose();
  };

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
    handleClose();
  };

  return (
    <>
      <AppBar
        position="fixed"
        sx={{
          backgroundColor: trigger
            ? "rgba(157, 132, 183, 0.95)"
            : "transparent",
          height: trigger ? "64px" : "80px",
          transition: "all 0.3s ease-in-out",
          backdropFilter: trigger ? "blur(10px)" : "none",
          boxShadow: trigger ? "0 4px 20px rgba(0, 0, 0, 0.1)" : "none",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              padding: "0 !important",
              transition: "all 0.3s ease-in-out",
              minHeight: trigger ? "64px !important" : "80px !important",
            }}
          >
            {isMobile ? (
              <>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={handleDrawerToggle}
                  sx={{ color: trigger ? "white" : "black" }}
                >
                  <MenuIcon />
                </IconButton>
                <Box
                  sx={{
                    flexGrow: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                  onClick={() => navigate("/")}
                >
                  <img src={logo} alt="Sweekar" style={{ height: "40px" }} />
                </Box>
              </>
            ) : (
              <>
                <Box
                  sx={{
                    display: "flex",
                    minWidth: "200px",
                    alignItems: "center",
                  }}
                  onClick={() => navigate("/")}
                >
                  <img src={logo} alt="Sweekar" style={{ height: "40px" }} />
                </Box>
                <Stack
                  spacing={3}
                  direction="row"
                  sx={{
                    flexGrow: 1,
                    justifyContent: "center",
                  }}
                >
                  {navItems.map((item) => (
                    <Button
                      key={item.label}
                      onClick={() => navigate(item.path)}
                      sx={{
                        padding: "6px 8px",
                        fontSize: "0.95rem",
                        position: "relative",
                        textTransform: "none",
                        color: trigger ? "white" : "black",
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          width: "0",
                          height: "2px",
                          bottom: 0,
                          left: "50%",
                          transform: "translateX(-50%)",
                          backgroundColor: trigger ? "white" : "#9D84B7",
                          transition: "width 0.3s ease-in-out",
                        },
                        "&:hover::after": {
                          width: "80%",
                        },
                      }}
                    >
                      {item.label}
                    </Button>
                  ))}
                </Stack>
                <Box
                  sx={{
                    gap: 2,
                    display: "flex",
                    minWidth: "200px",
                    alignItems: "center",
                    justifyContent: "flex-end",
                  }}
                >
                  {user?.user ? (
                    <>
                      {user.user_type !== "CLIENT" && (
                        <Button
                          variant="contained"
                          onClick={() => navigate("/consultations")}
                          sx={{
                            bgcolor: "#9D84B7",
                            "&:hover": {
                              bgcolor: "rgba(157, 132, 183, 0.9)",
                            },
                          }}
                        >
                          My Consultations
                        </Button>
                      )}

                      <IconButton
                        onClick={handleMenu}
                        sx={{
                          color: "rgba(255, 255, 255, 0.7)",
                          bgcolor: "#9D84B7",
                          "&:hover": {
                            bgcolor: "rgba(157, 132, 183, 0.9)",
                          },
                        }}
                      >
                        <AccountCircle />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                        anchorOrigin={{
                          vertical: "bottom",
                          horizontal: "right",
                        }}
                        transformOrigin={{
                          vertical: "top",
                          horizontal: "right",
                        }}
                        PaperProps={{
                          elevation: 3,
                          sx: {
                            mt: 1.5,
                            minWidth: 150,
                            borderRadius: 2,
                          },
                        }}
                      >
                        <MenuItem onClick={handleDashboard}>
                          <ListItemIcon>
                            <DashboardIcon fontSize="small" />
                          </ListItemIcon>
                          Dashboard
                        </MenuItem>
                        <MenuItem onClick={handleProfile}>
                          <ListItemIcon>
                            <AccountCircleIcon fontSize="small" />
                          </ListItemIcon>
                          Profile
                        </MenuItem>
                        <MenuItem onClick={handleLogout}>
                          <ListItemIcon>
                            <LogoutIcon fontSize="small" />
                          </ListItemIcon>
                          Logout
                        </MenuItem>
                      </Menu>
                    </>
                  ) : (
                    <Stack direction="row" spacing={2}>
                      <Button
                        variant="contained"
                        onClick={() => navigate("/login")}
                        sx={{
                          bgcolor: "#9D84B7",
                          "&:hover": {
                            bgcolor: "rgba(157, 132, 183, 0.9)",
                          },
                        }}
                      >
                        Login
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => navigate("/register")}
                        sx={{
                          bgcolor: "#9D84B7",
                          "&:hover": {
                            bgcolor: "rgba(157, 132, 183, 0.9)",
                          },
                        }}
                      >
                        Register
                      </Button>
                    </Stack>
                  )}
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>
      <Drawer
        anchor="left"
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            width: 250,
            bgcolor: "white",
          },
        }}
      >
        <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
          <IconButton onClick={handleDrawerToggle}>
            <CloseIcon />
          </IconButton>
        </Box>

        {user?.user && (
          <Box sx={{ px: 2, pb: 2 }}>
            <Button
              fullWidth
              variant="contained"
              onClick={() => {
                navigate("/consultations");
                handleDrawerToggle();
              }}
              sx={{
                bgcolor: "#9D84B7",
                "&:hover": {
                  bgcolor: "rgba(157, 132, 183, 0.9)",
                },
              }}
            >
              My Consultations
            </Button>
          </Box>
        )}

        <List>
          {navItems.map((item) => (
            <ListItem
              button
              key={item.label}
              onClick={() => {
                navigate(item.path);
                handleDrawerToggle();
              }}
              sx={{ py: 1.5 }}
            >
              <ListItemText
                primary={item.label}
                sx={{
                  "& .MuiListItemText-primary": {
                    fontSize: "1.1rem",
                    fontWeight: 500,
                  },
                }}
              />
            </ListItem>
          ))}

          {user?.user ? (
            <>
              <ListItem
                button
                onClick={handleDropdownToggle}
                sx={{
                  borderTop: "1px solid rgba(0, 0, 0, 0.08)",
                }}
              >
                <ListItemIcon>
                  <AccountCircleIcon />
                  {openDropdown ? <ExpandLess /> : <ExpandMore />}
                </ListItemIcon>
              </ListItem>
              <Collapse in={openDropdown} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  <ListItem
                    button
                    onClick={() => {
                      handleDashboard();
                      handleDrawerToggle();
                    }}
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon>
                      <DashboardIcon />
                    </ListItemIcon>
                    <ListItemText primary="Dashboard" />
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => {
                      handleProfile();
                      handleDrawerToggle();
                    }}
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon>
                      <AccountCircleIcon />
                    </ListItemIcon>
                    <ListItemText primary="Profile" />
                  </ListItem>
                  <ListItem
                    button
                    onClick={() => {
                      handleLogout();
                      handleDrawerToggle();
                    }}
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon>
                      <LogoutIcon />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </ListItem>
                </List>
              </Collapse>
            </>
          ) : (
            <>
              <ListItem
                button
                onClick={() => {
                  navigate("/login");
                  handleDrawerToggle();
                }}
              >
                <ListItemText primary="Login" />
              </ListItem>
              <ListItem
                button
                onClick={() => {
                  navigate("/register");
                  handleDrawerToggle();
                }}
              >
                <ListItemText primary="Register" />
              </ListItem>
            </>
          )}
        </List>
      </Drawer>
      <Toolbar
        sx={{
          minHeight: trigger ? "64px !important" : "80px !important",
          transition: "all 0.3s ease-in-out",
        }}
      />
    </>
  );
};

export default Navbar;
