import { useState } from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Box,
  Avatar,
  Container,
  useScrollTrigger,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  AccountCircle,
  Menu as MenuIcon,
  Close as CloseIcon,
} from "@mui/icons-material";
import { useNavigate } from "react-router-dom";

const navItems = [
  { label: "Services", path: "/services" },
  { label: "Experts", path: "/experts" },
  { label: "Centres", path: "/centres" },
  { label: "Blog", path: "/blog" },
  { label: "Resources", path: "/resources" },
  { label: "Reach Us", path: "/contact" },
];

const Navbar = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 50,
  });

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    handleClose();
  };

  const handleProfile = () => {
    if (user.user_type === "CLIENT") {
      navigate("/client/profile");
    } else {
      navigate("/professional/profile");
    }
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
          backdropFilter: trigger ? "blur(10px)" : "none",
          boxShadow: trigger ? "0 4px 20px rgba(0, 0, 0, 0.1)" : "none",
          transition: "all 0.3s ease-in-out",
          height: trigger ? "64px" : "80px",
        }}
      >
        <Container maxWidth="lg">
          <Toolbar
            sx={{
              minHeight: trigger ? "64px !important" : "80px !important",
              transition: "all 0.3s ease-in-out",
              justifyContent: "space-between",
              padding: "0 !important",
            }}
          >
            {isMobile ? (
              <>
                <IconButton
                  color="inherit"
                  edge="start"
                  onClick={handleDrawerToggle}
                  sx={{ color: trigger || isMobile ? "white" : "black" }}
                >
                  <MenuIcon />
                </IconButton>

                <Typography
                  variant="h6"
                  component="div"
                  onClick={() => navigate("/")}
                  sx={{
                    color: trigger || isMobile ? "white" : "black",
                    fontWeight: "bold",
                    fontSize: "1.2rem",
                  }}
                >
                  SWEEKAR
                </Typography>

                {!user?.id && (
                  <Button
                    variant="contained"
                    onClick={() => navigate("/login")}
                    sx={{
                      bgcolor: "white",
                      color: "#9D84B7",
                      "&:hover": {
                        bgcolor: "rgba(255,255,255,0.9)",
                      },
                    }}
                  >
                    Login
                  </Button>
                )}
              </>
            ) : (
              <>
                <Typography
                  variant="h6"
                  component="div"
                  onClick={() => navigate("/")}
                  sx={{
                    cursor: "pointer",
                    color: trigger ? "white" : "black",
                    fontWeight: "bold",
                    fontSize: "1.5rem",
                    minWidth: "120px",
                  }}
                >
                  SWEEKAR
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    gap: 3,
                    mx: 4,
                    flexGrow: 1,
                  }}
                >
                  {navItems.map((item) => (
                    <Button
                      key={item.label}
                      onClick={() => navigate(item.path)}
                      sx={{
                        color: trigger ? "white" : "black",
                        fontSize: "0.95rem",
                        textTransform: "none",
                        position: "relative",
                        padding: "6px 8px",
                        "&::after": {
                          content: '""',
                          position: "absolute",
                          width: "0%",
                          height: "2px",
                          bottom: "0",
                          left: "50%",
                          transform: "translateX(-50%)",
                          backgroundColor: trigger ? "white" : "primary.main",
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
                </Box>

                <Box
                  sx={{
                    display: "flex",
                    gap: 2,
                    alignItems: "center",
                    justifyContent: "flex-end",
                    minWidth: "200px",
                  }}
                >
                  {user?.id ? (
                    <>
                      <Button
                        onClick={() => navigate("/consultations")}
                        sx={{
                          color: trigger ? "white" : "black",
                          textTransform: "none",
                        }}
                      >
                        My Consultations
                      </Button>
                      <IconButton
                        onClick={handleMenu}
                        size="small"
                        sx={{ color: trigger ? "white" : "black" }}
                      >
                        {user.profile_picture ? (
                          <Avatar
                            src={user.profile_picture}
                            sx={{ width: 32, height: 32 }}
                          />
                        ) : (
                          <AccountCircle />
                        )}
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
                        <MenuItem onClick={handleProfile}>Profile</MenuItem>
                        <MenuItem onClick={handleLogout}>Logout</MenuItem>
                      </Menu>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="text"
                        onClick={() => navigate("/login")}
                        sx={{
                          color: trigger ? "white" : "black",
                          "&:hover": {
                            backgroundColor: "rgba(255,255,255,0.1)",
                          },
                        }}
                      >
                        Login
                      </Button>
                      <Button
                        variant="contained"
                        onClick={() => navigate("/register")}
                        sx={{
                          bgcolor: "white",
                          color: "#9D84B7",
                          "&:hover": {
                            bgcolor: "rgba(255,255,255,0.9)",
                          },
                        }}
                      >
                        Register
                      </Button>
                    </>
                  )}
                </Box>
              </>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      <Drawer
        variant="temporary"
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true,
        }}
      >
        <Box sx={{ width: 250, height: "100%", bgcolor: "white" }}>
          <Box sx={{ p: 2, display: "flex", justifyContent: "flex-end" }}>
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </Box>
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
          </List>
        </Box>
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
