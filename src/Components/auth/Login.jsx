import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Paper,
  Grid,
  IconButton,
  InputAdornment,
  Divider,
  Fade,
  Link,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person,
  Lock,
  ArrowForward,
  Phone,
} from "@mui/icons-material";
import ForgotPasswordDialog from "./ForgotPasswordDialog";
// import OTPVerificationDialog from "./OTPVerificationDialog";

const Login = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [loginMethod, setLoginMethod] = useState("password");
  // const [formData, setFormData] = useState({
  //   username: "",
  //   password: "",
  // });
  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  // const [otpDialogOpen, setOtpDialogOpen] = useState(false);


  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: `linear-gradient(45deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          {!isMobile && (
            <Grid item xs={12} md={6}>
              <Fade in timeout={1000}>
                <Box sx={{ color: "white", pr: 4 }}>
                  <Typography
                    variant="h2"
                    gutterBottom
                    sx={{ fontWeight: 700 }}
                  >
                    Welcome Back
                  </Typography>
                  <Typography variant="h5" sx={{ mb: 4, opacity: 0.9 }}>
                    Sign in to access your account
                  </Typography>
                  <Typography variant="body1" sx={{ opacity: 0.8 }}>
                    Don&apos;t have an account?
                  </Typography>
                  <Button
                    variant="outlined"
                    color="inherit"
                    size="large"
                    endIcon={<ArrowForward />}
                    onClick={() => navigate("/register")}
                    sx={{
                      mt: 2,
                      borderColor: "white",
                      color: "white",
                      "&:hover": {
                        borderColor: "white",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                  >
                    Create Account
                  </Button>
                </Box>
              </Fade>
            </Grid>
          )}

          <Grid item xs={12} md={6}>
            <Fade in timeout={1000}>
              <Paper
                elevation={24}
                sx={{
                  p: 4,
                  borderRadius: 4,
                  backdropFilter: "blur(20px)",
                  background: "rgba(255, 255, 255, 0.95)",
                }}
              >
                <Box sx={{ mb: 4, textAlign: "center" }}>
                  <Typography
                    variant="h4"
                    gutterBottom
                    sx={{ fontWeight: 700 }}
                  >
                    Sign In
                  </Typography>
                </Box>



                <Box sx={{ mb: 3 }}>
                  <Button
                    fullWidth
                    variant={
                      loginMethod === "password" ? "contained" : "outlined"
                    }
                    onClick={() => setLoginMethod("password")}
                    sx={{ mb: 1 }}
                  >
                    Login with Password
                  </Button>
                  <Button
                    fullWidth
                    variant={loginMethod === "otp" ? "contained" : "outlined"}
                    onClick={() => setLoginMethod("otp")}
                  >
                    Login with OTP
                  </Button>
                </Box>

                {loginMethod === "password" ? (
                  <form onSubmit={""}>
                    <TextField
                      fullWidth
                      label="Username"
                      name="username"
                      // value={formData.username}
                      onChange={""}
                      required
                      sx={{ mb: 2 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Person color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <TextField
                      fullWidth
                      label="Password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      // value={formData.password}
                      onChange={""}
                      required
                      sx={{ mb: 1 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Lock color="primary" />
                          </InputAdornment>
                        ),
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={() => setShowPassword(!showPassword)}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Box sx={{ textAlign: "right", mb: 2 }}>
                      <Link
                        component="button"
                        type="button"
                        variant="body2"
                        onClick={() => setForgotPasswordOpen(true)}
                      >
                        Forgot Password?
                      </Link>
                    </Box>
                    <Button
                      type="submit"
                      fullWidth
                      variant="contained"
                      size="large"
                      sx={{ mb: 2 }}
                    >
                      Sign In
                    </Button>
                  </form>
                ) : (
                  <Box>
                    <TextField
                      fullWidth
                      label="Phone Number"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                      sx={{ mb: 2 }}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Phone color="primary" />
                          </InputAdornment>
                        ),
                      }}
                    />
                    <Button
                      fullWidth
                      variant="contained"
                      size="large"
                      onClick={""}
                      disabled={!phone}
                      sx={{ mb: 2 }}
                    >
                      Send OTP
                    </Button>
                  </Box>
                )}

                {isMobile && (
                  <>
                    <Divider sx={{ my: 2 }}>
                      <Typography color="text.secondary">
                        New to Sweekar?
                      </Typography>
                    </Divider>
                    <Button
                      fullWidth
                      variant="outlined"
                      onClick={() => navigate("/register")}
                    >
                      Create Account
                    </Button>
                  </>
                )}
              </Paper>
            </Fade>
          </Grid>
        </Grid>
      </Container>

      <ForgotPasswordDialog
        open={forgotPasswordOpen}
        onClose={() => setForgotPasswordOpen(false)}
      />
      {/* 
      <OTPVerificationDialog
        open={otpDialogOpen}
        onClose={() => setOtpDialogOpen(false)}
        phone={phone}
        onVerificationComplete={""}
      /> */}
    </Box>
  );
};

export default Login;
