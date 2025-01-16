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
  const [credentials, setCredentials] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loginMethod, setLoginMethod] = useState("password");
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [isLoading, setisLoading] = useState(false);

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
    setisLoading(true);
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
        if (result?.user?.user_type === "PROFESSIONAL") {
          navigate("/Professional/Dashboard");
          setisLoading(false);
        } else if (result?.user?.user_type === "CLIENT") {
          navigate("/Client/Dashboard");
          setisLoading(false);
        } else {
          navigate("/");
        }
      } else if (response.status === 401) {
        if (response.data.error === "Invalid credentials") {
          toast.error(response.data.error);
          setisLoading(false);
        } else {
          toast.error(
            "Email not verified. Please verify your email to log in."
          );
        }
      } else if (response.status === 404) {
        toast.error("Username or Password is wrong, Please try again...");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleGoogleSuccess = async () => {
    setisLoading(true);
    try {
      const googleData = {
        email: credentials.email,
        family_name: credentials.family_name,
        given_name: credentials.given_name,
        aud: credentials.aud,
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
        },
        8000
      );

      if (response?.status === 200) {
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
        toast.success("Google Login Successful");
        if (result?.user?.user_type === "PROFESSIONAL") {
          navigate("/Professional/Dashboard");
        } else if (result?.user?.user_type === "CLIENT") {
          navigate("/Client/Dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.error("Google login failed. Please try again.");
    } finally {
      setisLoading(false);
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
                  <>
                    <form onSubmit={formik.handleSubmit}>
                      <TextField
                        fullWidth
                        label="Username"
                        name="email"
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        onBlur={formik.handleBlur}
                        error={
                          formik.touched.email && Boolean(formik.errors.email)
                        }
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
                      >
                        {isLoading ? <Loading /> : "Login"}
                      </Button>
                    </form>

                    <Box
                      sx={{ mb: 2, display: "flex", justifyContent: "center" }}
                    >
                      <GoogleLogin
                        onSuccess={(credentialResponse) => {
                          handleGoogleSuccess(
                            setCredentials(
                              jwtDecode(credentialResponse.credential)
                            )
                          );
                        }}
                        onError={() => {
                          toast.error("Login Failed");
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
