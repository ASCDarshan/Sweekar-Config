import { Button, Container, Paper, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NeedHelp = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/contact");
  };

  return (
    <Container maxWidth="lg" sx={{ mb: 6 }}>
      <Paper
        elevation={3}
        sx={{
          p: 6,
          textAlign: "center",
          borderRadius: 4,
          background: "rgb(227 221 206)",
          color: "black",
        }}
      >
        <Typography variant="h4" gutterBottom fontWeight="bold">
          Need Help Choosing a Service?
        </Typography>
        <Typography
          variant="body1"
          paragraph
          sx={{ mb: 3, maxWidth: 600, mx: "auto" }}
        >
          Our team is here to guide you to the right service based on your
          needs. Get personalized support to find the best match for your
          requirements.
        </Typography>
        <Button
          variant="contained"
          size="large"
          sx={{
            bgcolor: "white",
            color: "primary.main",
            px: 4,
            py: 1.5,
            "&:hover": {
              bgcolor: "rgba(255, 255, 255, 0.9)",
            },
          }}
          onClick={handleClick}
        >
          Contact Us
        </Button>
      </Paper>
    </Container>
  );
};

export default NeedHelp;
