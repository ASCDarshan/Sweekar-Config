/* eslint-disable no-prototype-builtins */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Grid,
  IconButton,
  InputAdornment,
  Divider,
  Fade,
  useTheme,
  useMediaQuery,
  Stepper,
  Step,
  StepLabel,
} from "@mui/material";
import {
  Person,
  Email,
  Lock,
  Phone,
  Home,
  Visibility,
  VisibilityOff,
  ArrowBack,
  ArrowForward,
} from "@mui/icons-material";
import * as Yup from "yup";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import ajaxCall from "../../helpers/ajaxCall";
import Loading from "../UI/Loading";

const initialValues = {
  username: "",
  email: "",
  password: "",
  password2: "",
  first_name: "",
  last_name: "",
  phone: "",
  user_type: "",
  address: "",
};

const steps = [
  "Personal Information",
  "Account Details",
  "Contact Information",
];

// Password validation regex patterns
const hasUpperCase = /[A-Z]/;
const hasLowerCase = /[a-z]/;
const hasNumber = /[0-9]/;
const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]+/;
const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const phoneRegex = /^\d{10,15}$/;
const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;

const Register = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: Yup.object({
      username: Yup.string()
        .required("Username is required")
        .min(3, "Username must be at least 3 characters")
        .max(20, "Username cannot exceed 20 characters")
        .matches(
          usernameRegex,
          "Username can only contain letters, numbers, and underscores"
        ),
      email: Yup.string()
        .required("Email is required")
        .email("Invalid email format")
        .matches(emailRegex, "Invalid email format"),
      password: Yup.string()
        .required("Password is required")
        .min(8, "Password must be at least 8 characters")
        .max(50, "Password cannot exceed 50 characters")
        .test(
          "hasUpperCase",
          "Password must contain at least one uppercase letter",
          (value) => hasUpperCase.test(value)
        )
        .test(
          "hasLowerCase",
          "Password must contain at least one lowercase letter",
          (value) => hasLowerCase.test(value)
        )
        .test(
          "hasNumber",
          "Password must contain at least one number",
          (value) => hasNumber.test(value)
        )
        .test(
          "hasSpecialChar",
          "Password must contain at least one special character",
          (value) => hasSpecialChar.test(value)
        ),
      password2: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm Password is required"),
      first_name: Yup.string()
        .required("First Name is required")
        .min(2, "First name must be at least 2 characters")
        .max(50, "First name cannot exceed 50 characters")
        .matches(/^[a-zA-Z\s]+$/, "First name can only contain letters"),
      last_name: Yup.string()
        .required("Last Name is required")
        .min(2, "Last name must be at least 2 characters")
        .max(50, "Last name cannot exceed 50 characters")
        .matches(/^[a-zA-Z\s]+$/, "Last name can only contain letters"),
      phone: Yup.string()
        .required("Phone number is required")
        .matches(phoneRegex, "Phone number must be between 10-15 digits"),
      address: Yup.string()
        .required("Address is required")
        .max(200, "Address cannot exceed 200 characters"),
    }),
    onSubmit: (values) => {
      const signupData = {
        username: values.username,
        email: values.email,
        password: values.password,
        password2: values.password2,
        first_name: values.first_name,
        last_name: values.last_name,
        phone: values.phone,
        user_type: "CLIENT",
        address: values.address,
      };
      fetchData("users/register/", signupData);
    },
  });

  const isStepValid = () => {
    const currentStepFields = {
      0: ["first_name", "last_name"],
      1: ["username", "email", "password", "password2"],
      2: ["phone", "address"],
    };

    const fieldsToCheck = currentStepFields[activeStep];

    fieldsToCheck.forEach((field) => {
      formik.setFieldTouched(field, true, false);
    });

    return !fieldsToCheck.some((field) => formik.errors[field]);
  };

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

      if (response?.status === 201) {
        toast.success("Registration successful.");
        setisLoading(false);
        formik.resetForm();
        navigate("/login");
      } else if (response.status === 400) {
        const errors = response.data;
        let errorMessage = "";

        for (const key in errors) {
          if (errors.hasOwnProperty(key)) {
            errorMessage += `${key}: ${errors[key].join(", ")}\n`;
          }
        }

        toast.error(errorMessage.trim());
      } else {
        toast.error("Registration failed. Please try again");
      }
    } catch (error) {
      console.log(error);
      toast.error("An unexpected error occurred. Please try again.");
    } finally {
      setisLoading(false);
    }
  };

  const handleNext = () => {
    if (isStepValid()) {
      setActiveStep((prev) => prev + 1);
    } else {
      toast.error("Please check all the required fields");
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  const getPasswordStrength = (password) => {
    if (!password) return { strength: 0, label: "" };

    let strength = 0;
    if (password.length >= 8) strength += 1;
    if (hasUpperCase.test(password)) strength += 1;
    if (hasLowerCase.test(password)) strength += 1;
    if (hasNumber.test(password)) strength += 1;
    if (hasSpecialChar.test(password)) strength += 1;

    let label = "";
    let color = "";

    if (strength === 0 || strength === 1) {
      label = "Very Weak";
      color = "#ff0000";
    } else if (strength === 2) {
      label = "Weak";
      color = "#ff8c00";
    } else if (strength === 3) {
      label = "Medium";
      color = "#ffff00";
    } else if (strength === 4) {
      label = "Strong";
      color = "#9acd32";
    } else {
      label = "Very Strong";
      color = "#008000";
    }

    return { strength, label, color };
  };

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name*"
                name="first_name"
                value={formik.values.first_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.first_name && Boolean(formik.errors.first_name)
                }
                helperText={
                  formik.touched.first_name && formik.errors.first_name
                }
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name*"
                name="last_name"
                value={formik.values.last_name}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.last_name && Boolean(formik.errors.last_name)
                }
                helperText={formik.touched.last_name && formik.errors.last_name}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        );
      case 1:
        const passwordStrength = getPasswordStrength(formik.values.password);

        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Username*"
                name="username"
                value={formik.values.username}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.username && Boolean(formik.errors.username)
                }
                helperText={formik.touched.username && formik.errors.username}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Person color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email*"
                name="email"
                type="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.email && Boolean(formik.errors.email)}
                helperText={formik.touched.email && formik.errors.email}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Password*"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formik.values.password}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password && Boolean(formik.errors.password)
                }
                helperText={formik.touched.password && formik.errors.password}
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
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              {formik.values.password && (
                <Box sx={{ mt: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                    <Box
                      sx={{
                        width: '100%',
                        height: 4,
                        borderRadius: 2,
                        bgcolor: 'grey.300',
                        mr: 1,
                      }}
                    >
                      <Box
                        sx={{
                          height: '100%',
                          borderRadius: 2,
                          width: `${(passwordStrength.strength / 5) * 100}%`,
                          bgcolor: passwordStrength.color,
                        }}
                      />
                    </Box>
                    <Typography variant="caption" color={passwordStrength.color}>
                      {passwordStrength.label}
                    </Typography>
                  </Box>
                  <Typography variant="caption" color="text.secondary">
                    Password must have at least 8 characters with uppercase, lowercase, number, and special character.
                  </Typography>
                </Box>
              )}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Confirm Password*"
                name="password2"
                type={showConfirmPassword ? "text" : "password"}
                value={formik.values.password2}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={
                  formik.touched.password2 && Boolean(formik.errors.password2)
                }
                helperText={formik.touched.password2 && formik.errors.password2}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="primary" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                        edge="end"
                      >
                        {showConfirmPassword ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        );
      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Phone*"
                name="phone"
                value={formik.values.phone}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.phone && Boolean(formik.errors.phone)}
                helperText={formik.touched.phone && formik.errors.phone}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Phone color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
              {formik.values.phone && !phoneRegex.test(formik.values.phone) && (
                <Typography variant="caption" color="error" sx={{ mt: 0.5 }}>
                  Phone number should contain 10-15 digits only
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Address"
                name="address"
                multiline
                rows={3}
                value={formik.values.address}
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                error={formik.touched.address && Boolean(formik.errors.address)}
                helperText={formik.touched.address && formik.errors.address}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Home color="primary" />
                    </InputAdornment>
                  ),
                }}
              />
            </Grid>
          </Grid>
        );
      default:
        return null;
    }
  };

  const validateCurrentStep = () => {
    if (activeStep === steps.length - 1) {
      return formik.isValid && Object.keys(formik.touched).length > 0;
    }
    return true;
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        background: `rgb(227 221 206)`,
        py: 4,
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={3} justifyContent="center" alignItems="center">
          {!isMobile && (
            <Grid item xs={12} md={5}>
              <Fade in timeout={1000}>
                <Box>
                  <Typography
                    variant="h2"
                    gutterBottom
                    color="primary.dark"
                    sx={{ fontWeight: 700 }}
                  >
                    Join Sweekar
                  </Typography>
                  <Typography
                    variant="h6"
                    color="text.secondary"
                    sx={{ mb: 4, opacity: 0.9 }}
                  >
                    Create an account to access inclusive support and
                    professional services
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ opacity: 0.8 }}
                    color="text.secondary"
                  >
                    Already have an account?
                  </Typography>
                  <Button
                    variant="outlined"
                    color="inherit"
                    size="large"
                    endIcon={<ArrowForward />}
                    onClick={() => navigate("/login")}
                    sx={{
                      mt: 2,
                      "&:hover": {
                        borderColor: "white",
                        backgroundColor: "rgba(255, 255, 255, 0.1)",
                      },
                    }}
                  >
                    Sign In
                  </Button>
                </Box>
              </Fade>
            </Grid>
          )}
          <Grid item xs={12} md={7}>
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
                    Create Account
                  </Typography>
                  <Typography color="text.secondary">
                    Fill in your details to get started
                  </Typography>
                </Box>
                <Stepper
                  activeStep={activeStep}
                  alternativeLabel
                  sx={{ mb: 4 }}
                >
                  {steps.map((label) => (
                    <Step key={label}>
                      <StepLabel>{label}</StepLabel>
                    </Step>
                  ))}
                </Stepper>
                <form
                  onSubmit={
                    activeStep === steps.length - 1
                      ? formik.handleSubmit
                      : undefined
                  }
                >
                  {getStepContent(activeStep)}
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mt: 4,
                    }}
                  >
                    <Button
                      disabled={activeStep === 0}
                      onClick={handleBack}
                      startIcon={<ArrowBack />}
                    >
                      Back
                    </Button>
                    {activeStep === steps.length - 1 ? (
                      isLoading ? (
                        <Loading />
                      ) : (
                        <Button
                          type="submit"
                          variant="contained"
                          size="large"
                          sx={{ px: 4 }}
                          onClick={formik.handleSubmit}
                          disabled={!validateCurrentStep()}
                        >
                          Register
                        </Button>
                      )
                    ) : (
                      <Button
                        variant="contained"
                        onClick={handleNext}
                        endIcon={<ArrowForward />}
                        size="large"
                        sx={{ px: 4 }}
                      >
                        Next
                      </Button>
                    )}
                  </Box>
                </form>
                {isMobile && (
                  <>
                    <Divider sx={{ my: 3 }}>
                      <Typography color="text.secondary">
                        Already have an account?
                      </Typography>
                    </Divider>
                    <Button
                      fullWidth
                      variant="outlined"
                      size="large"
                      onClick={() => navigate("/login")}
                      sx={{ borderRadius: 2 }}
                    >
                      Sign In
                    </Button>
                  </>
                )}
              </Paper>
            </Fade>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Register;