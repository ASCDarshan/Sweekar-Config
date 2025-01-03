import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from "@mui/material";
import { Phone, LocationOn, Send, AccessTime } from "@mui/icons-material";
import { toast } from "react-toastify";
import { useState } from "react";
import ajaxCall from "../../helpers/ajaxCall";
import Loading from "../../components/UI/Loading";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
    phone: "",
  });
  const [isLoading, setisLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    setisLoading(true);
    event.preventDefault();

    try {
      const response = await ajaxCall(
        "contact/contact/",
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify(formData),
        },
        8000
      );
      if ([200, 201].includes(response.status)) {
        toast.success("Message Sent Successfully.");
        setisLoading(false);
        setFormData({ name: "", email: "", message: "", phone: "" });
      } else if ([400, 404].includes(response.status)) {
        toast.error("Some Problem Occurred. Please try again.");
        setisLoading(false);
      }
      else if ([401].includes(response.status)) {
        toast.error("Invalid Credentials.");
        setisLoading(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Box>
      <Box
        sx={{
          bgcolor: "primary.light",
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
            <Card
              elevation={3}
              sx={{
                height: "100%",
                bgcolor: "primary.main",
                color: "white",
                position: "relative",
                overflow: "hidden",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom fontWeight="bold">
                  Get in Touch
                </Typography>
                <List sx={{ mt: 4 }}>
                  <ListItem sx={{ mb: 3 }}>
                    <ListItemIcon>
                      <Phone sx={{ color: "white", fontSize: 28 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="h6" sx={{ mb: 1 }}>
                          Phone
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body1" sx={{ color: "white" }}>
                          (+91) 85111 26808
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem sx={{ mb: 3 }}>
                    <ListItemIcon>
                      <LocationOn sx={{ color: "white", fontSize: 28 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="h6" sx={{ mb: 1 }}>
                          Address
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body1" sx={{ color: "white" }}>
                          Shri Maharani Chimnabai Stree Udyogalaya,
                          <br />
                          Opp. Sursagar Lake,
                          <br />
                          Vadodara. 390001
                        </Typography>
                      }
                    />
                  </ListItem>
                  <ListItem sx={{ mb: 3 }}>
                    <ListItemIcon>
                      <AccessTime sx={{ color: "white", fontSize: 28 }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Typography variant="h6" sx={{ mb: 1 }}>
                          Working Hours
                        </Typography>
                      }
                      secondary={
                        <Typography variant="body1" sx={{ color: "white" }}>
                          Monday - Saturday
                          <br />
                          9:00 AM - 6:00 PM
                        </Typography>
                      }
                    />
                  </ListItem>
                </List>
                <Box
                  sx={{
                    position: "absolute",
                    bottom: -50,
                    right: -50,
                    width: 200,
                    height: 200,
                    borderRadius: "50%",
                    background: "rgba(255, 255, 255, 0.1)",
                  }}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={7}>
            <Card elevation={3}>
              <CardContent sx={{ p: 4 }}>
                <Typography variant="h4" gutterBottom fontWeight="bold">
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
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      type="text"
                      label="Full Name"
                      variant="outlined"
                      name="name"
                      onChange={handleChange}
                      value={formData.name}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        },
                      }}
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      fullWidth
                      label="Email"
                      type="email"
                      variant="outlined"
                      name="email"
                      onChange={handleChange}
                      value={formData.email}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="number"
                      label="Phone Number"
                      variant="outlined"
                      name="phone"
                      onChange={handleChange}
                      value={formData.phone}
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: 2,
                        },
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      type="text"
                      label="How can we help you?"
                      multiline
                      rows={4}
                      variant="outlined"
                      name="message"
                      onChange={handleChange}
                      value={formData.message}
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
                        onClick={handleSubmit}
                      >
                        Send Message
                      </Button>
                    )}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
      <Box sx={{ bgcolor: "grey.100", py: 8 }}>
        <Container maxWidth="lg">
          <Typography
            variant="h4"
            align="center"
            gutterBottom
            fontWeight="bold"
          >
            Visit Us
          </Typography>
          <Typography
            variant="body1"
            align="center"
            color="text.secondary"
            sx={{ mb: 4 }}
          >
            Find us at our location opposite to Sursagar Lake
          </Typography>
          <Paper elevation={3} sx={{ height: 400, borderRadius: 4 }}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1845.6838688858468!2d73.203417!3d22.301928!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x395fc5f564000001%3A0x209077d9d0bca2cf!2sSHREE%20MAHARANI%20CHIMNABAI%20STREE%20UDYOGALAYA!5e0!3m2!1sen!2sin!4v1734520014817!5m2!1sen!2sin"
              width="100%"
              height="100%"
              style={{ border: 0, borderRadius: 16 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </Paper>
        </Container>
      </Box>
    </Box>
  );
};

export default Contact;
