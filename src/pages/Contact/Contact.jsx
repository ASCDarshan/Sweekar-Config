import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,

  Paper,
  Divider,
  Link,
} from "@mui/material";
import { Send, DirectionsWalk } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useState } from "react";
import ajaxCall from "../../helpers/ajaxCall";
import Loading from "../../components/UI/Loading";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const services = [
  {
    id: 1,
    title: "Medical Services",
    description:
      "Access to LGBTQAI+ friendly healthcare providers and medical professionals.",
    icon: "🏥",
  },
  {
    id: 2,
    title: "Mental Health",
    description:
      "Connect with therapists and counselors who understand your unique needs.",
    icon: "🧠",
  },
  {
    id: 3,
    title: "Legal Aid",
    description:
      "Find legal professionals committed to protecting your rights and dignity.",
    icon: "⚖️",
  },
  {
    id: 4,
    title: "Placement Services",
    description: "Discover inclusive workplaces and employment opportunities.",
    icon: "💼",
  },
];

const validationSchema = Yup.object({
  name: Yup.string()
    .required("Name is required")
    .min(2, "Name must be at least 2 characters"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  phone: Yup.string()
    .matches(/^[0-9]+$/, "Phone number must contain only digits")
    .min(10, "Phone number must be at least 10 digits")
    .required("Phone number is required"),
  message: Yup.string()
    .required("Message is required")
});

const Contact = () => {
  const initialValues = {
    name: "",
    email: "",
    phone: "",
    message: "",
  };
  const [isLoading, setisLoading] = useState(false);



  const handleSubmit = async (values, { resetForm }) => {
    setisLoading(true);

    try {
      const response = await ajaxCall(
        "contact/contact",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(values),
        },
        8000
      );

      if ([200, 201].includes(response.status)) {
        toast.success("Message Sent Successfully.");
        resetForm();
      } else if ([400, 404].includes(response.status)) {
        toast.error("Some Problem Occurred. Please try again.");
      } else {
        toast.error("An unexpected error occurred. Please try again later.");
      }
    } catch (error) {
      console.log(error);
      toast.error("Failed to send message. Please check your connection.");
    } finally {
      setisLoading(false);
    }
  };
  return (
    <Box>
      <Box
        sx={{
          bgcolor: "#f5f1e8",
          py: { xs: 6, md: 10 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            gutterBottom
            align="center"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              color: "primary.dark",
            }}
          >
            Connect With Us
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ maxWidth: "800px", mx: "auto", mb: 4 }}
          >
            Have questions or need support? We&apos;re here to help you connect
            with the right resources and support services.
          </Typography>
        </Container>
        <Box
          sx={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(157, 132, 183, 0.1)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -30,
            left: -30,
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: "rgba(157, 132, 183, 0.1)",
          }}
        />
      </Box>
      <Container
        maxWidth="lg"
        sx={{ mt: -6, mb: 4, position: "relative", zIndex: 1 }}
      >
        <Grid container spacing={4}>
          <Grid item xs={12} md={5}>
            <Card elevation={3}>
              <Paper
                elevation={3}
                sx={{ height: 240, borderRadius: "0px", overflow: "hidden" }}
              >
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1845.6838688858468!2d73.203417!3d22.301928!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc5f564000001%3A0x209077d9d0bca2cf!2sSHREE%20MAHARANI%20CHIMNABAI%20STREE%20UDYOGALAYA!5e0!3m2!1sen!2sin!4v1734520014817!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </Paper>

              <CardContent sx={{ p: 4 }}>
                <Box sx={{ display: 'flex', gap: 3, mb: 4 }}>
                  <Box sx={{ flex: 1 }}>
                    <Box sx={{ mb: 3 }}>
                      <Typography
                        variant="h6"
                        fontWeight="500"
                        sx={{ mb: 1.5, color: 'primary.main' }}
                      >
                        Address
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.6
                        }}
                      >
                        Shri Maharani Chimnabai Stree Udyogalaya,
                        <br />
                        Opp. Sursagar Lake,
                        <br />
                        Vadodara. 390001
                      </Typography>
                    </Box>

                    <Box>
                      <Typography
                        variant="h6"
                        fontWeight="500"
                        sx={{ mb: 1.5, color: 'primary.main' }}
                      >
                        Working Hours
                      </Typography>
                      <Typography
                        variant="body2"
                        sx={{
                          color: 'text.secondary',
                          lineHeight: 1.6
                        }}
                      >
                        Monday - Saturday:
                        <br />
                        9:00 AM - 6:00 PM
                      </Typography>
                    </Box>
                  </Box>

                  <Divider orientation="vertical" flexItem />

                  <Box sx={{ flex: 1 }}>
                    <Typography
                      variant="h6"
                      fontWeight="500"
                      sx={{ mb: 1.5, color: 'primary.main' }}
                    >
                      Contact
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'text.secondary',
                        lineHeight: 1.6
                      }}
                    >
                      Phone:
                      <br />
                      <Link
                        href="tel:+918511126808"
                        sx={{
                          color: 'primary.main',
                          textDecoration: 'none',
                          '&:hover': {
                            textDecoration: 'underline'
                          }
                        }}
                      >
                        (+91) 85111 26808
                      </Link>
                    </Typography>
                  </Box>
                </Box>

                <Button
                  variant="contained"
                  size="small"
                  startIcon={<DirectionsWalk />}
                  fullWidth
                  sx={{
                    borderRadius: 2,
                    textTransform: 'none',
                  }}
                  onClick={() =>
                    window.open(
                      "https://maps.google.com?q=Maharani+Chimnabai+Stree+Udyogalaya+Vadodara"
                    )
                  }
                >
                  Get Directions
                </Button>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={7}>
            <Card elevation={3}>
              <CardContent sx={{ p: 4 }}>
                <Typography
                  variant="h4"
                  gutterBottom
                  fontWeight="bold"
                  sx={{ color: 'primary.main' }}
                >
                  Send us a Message
                </Typography>
                <Typography
                  variant="body1"
                  color="text.secondary"
                  sx={{ mb: 4 }}
                >
                  Fill out the form below and we&apos;ll get back to you as soon
                  as possible.
                </Typography>

                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ errors, touched, isValid, dirty }) => (
                    <Form>
                      <Grid container spacing={3}>
                        <Grid item xs={12} sm={6}>
                          <Field
                            as={TextField}
                            fullWidth
                            type="text"
                            label="Full Name"
                            variant="outlined"
                            name="name"
                            error={touched.name && Boolean(errors.name)}
                            helperText={touched.name && errors.name}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                          <Field
                            as={TextField}
                            fullWidth
                            label="Email"
                            type="email"
                            variant="outlined"
                            name="email"
                            error={touched.email && Boolean(errors.email)}
                            helperText={touched.email && errors.email}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            fullWidth
                            label="Phone Number"
                            variant="outlined"
                            name="phone"
                            error={touched.phone && Boolean(errors.phone)}
                            helperText={touched.phone && errors.phone}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          <Field
                            as={TextField}
                            fullWidth
                            label="How can we help you?"
                            multiline
                            rows={4}
                            variant="outlined"
                            name="message"
                            error={touched.message && Boolean(errors.message)}
                            helperText={touched.message && errors.message}
                            sx={{
                              "& .MuiOutlinedInput-root": {
                                borderRadius: 2,
                              },
                            }}
                          />
                        </Grid>
                        <Grid item xs={12}>
                          {isLoading ? (
                            <Loading />
                          ) : (
                            <Button
                              variant="contained"
                              size="small"
                              fullWidth
                              startIcon={<Send />}
                              type="submit"
                              disabled={!(isValid && dirty)}
                              sx={{
                                borderRadius: 2,
                                textTransform: 'none',
                              }}
                            >
                              Send Message
                            </Button>
                          )}
                        </Grid>
                      </Grid>
                    </Form>
                  )}
                </Formik>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Box sx={{ bgcolor: "grey.100", py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {services.map((service, index) => (
              <Grid item xs={12} md={3} key={index}>
                <Card
                  sx={{
                    height: "100%",
                    boxShadow: 2,
                    transition: "transform 0.2s",
                    "&:hover": {
                      transform: "translateY(-5px)",
                    },
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <CardContent
                    sx={{
                      flexGrow: 1,
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h2"
                        sx={{
                          fontSize: "3rem",
                          mb: 2,
                          textAlign: "center",
                        }}
                      >
                        {service.icon}
                      </Typography>
                      <Typography
                        variant="h6"
                        gutterBottom
                        sx={{ textAlign: "center" }}
                      >
                        {service.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2, textAlign: "center" }}
                      >
                        {service.description}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default Contact;
