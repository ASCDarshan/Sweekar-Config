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
  Phone,
} from "@mui/icons-material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import ajaxCall from "../../helpers/ajaxCall";
import ForgotPassword from "./ForgotPassword";
import Loading from "../UI/Loading";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [phone, setPhone] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState("password");
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().required("Username is required"),
      password: Yup.string().required("Password is required"),
    }),
    onSubmit: (values) => {
      const loginCredentials = {
        username: values.email,
        password: values.password,
      };
      fetchData("users/login/", loginCredentials);
    },
  });

  const fetchData = async (url, data) => {
    setIsLoading(true);
    try {
      const response = await ajaxCall(
        url,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(data),
        },
        8000
      );
      handleLoginResponse(response);
    } catch (error) {
      console.log(error);
      toast.error("Login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLoginResponse = (response) => {
    if (response?.status === 200) {
      formik.resetForm();
      const result = response?.data;
      localStorage.setItem(
        "loginInfo",
        JSON.stringify({
          user: result?.user?.id,
          user_type: result?.user?.user_type,
          accessToken: result?.tokens?.access,
          refreshToken: result?.tokens?.refresh,
        })
      );
      toast.success("Login Successful");
      navigateBasedOnUserType(result?.user?.user_type);
    } else if (response?.status === 401) {
      if (response.data.error === "Invalid credentials") {
        toast.error(response.data.error);
      } else {
        toast.error("Email not verified. Please verify your email to log in.");
      }
    } else if (response?.status === 404) {
      toast.error("Username or Password is wrong, Please try again...");
    }
  };

  const navigateBasedOnUserType = (userType) => {
    switch (userType) {
      case "PROFESSIONAL":
        navigate("/Professional/Dashboard");
        break;
      case "CLIENT":
        navigate("/Client/Dashboard");
        break;
      default:
        navigate("/");
    }
  };

  const handleGoogleSuccess = async (credentialResponse) => {
    if (!credentialResponse?.credential) {
      toast.error("Google login failed. Missing credentials.");
      return;
    }

    setIsLoading(true);
    try {
      const decodedCredentials = jwtDecode(credentialResponse.credential);
      const googleData = {
        email: decodedCredentials.email,
        family_name: decodedCredentials.family_name,
        given_name: decodedCredentials.given_name,
        aud: decodedCredentials.aud,
      };

      const response = await ajaxCall(
        "auth/google/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(googleData),
          withCredentials: true

        },
        8000
      );

      handleLoginResponse(response);
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Box
      sx={{
        py: 4,
        display: "flex",
        minHeight: "100vh",
        alignItems: "center",
        background: `linear-gradient(45deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.main} 100%)`,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center" alignItems="center">
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
                  <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                    Sign In
                  </Typography>
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Button
                    fullWidth
                    variant={loginMethod === "password" ? "contained" : "outlined"}
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
                  <>
                    <form onSubmit={formik.handleSubmit}>
                      <TextField
                        fullWidth
                        label="Username"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={formik.touched.email && Boolean(formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
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
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.password &&
                          Boolean(formik.errors.password)
                        }
                        helperText={
                          formik.touched.password && formik.errors.password
                        }
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
                      <Box
                        sx={{
                          mb: 2,
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Link
                          component="button"
                          type="button"
                          variant="body2"
                          style={{ textDecoration: "none" }}
                          onClick={() => setForgotPasswordOpen(true)}
                        >
                          Forgot Password?
                        </Link>
                        <Link
                          component="button"
                          type="button"
                          variant="body2"
                          style={{ textDecoration: "none" }}
                          onClick={() => navigate("/register")}
                        >
                          Don&apos;t have an account?
                        </Link>
                      </Box>
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        size="small"
                        sx={{ mb: 2 }}
                        disabled={isLoading}
                      >
                        {isLoading ? <Loading /> : "Login"}
                      </Button>
                    </form>

                    <Box sx={{ mb: 2, display: "flex", justifyContent: "center" }}>
                      <GoogleLogin
                        onSuccess={handleGoogleSuccess}
                        onError={() => {
                          toast.error("Google login failed");
                        }}
                      />
                    </Box>
                  </>
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
      <Box>
        {forgotPasswordOpen && (
          <ForgotPassword
            open={forgotPasswordOpen}
            onClose={() => setForgotPasswordOpen(false)}
          />
        )}
      </Box>
    </Box>
  );
};

export default Login;