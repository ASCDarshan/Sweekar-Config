import { useState } from "react";
import { Box, Container, Typography, Chip, Paper } from "@mui/material";

const concerns = [
  "Anxiety disorders",
  "Depressive disorders",
  "Adult ADHD",
  "Relationship skills",
];

const Concerns = () => {
  const [selectedConcerns, setSelectedConcerns] = useState([]);

  const handleConcernClick = (concern) => {
    if (selectedConcerns.includes(concern)) {
      setSelectedConcerns((prev) => prev.filter((c) => c !== concern));
    } else if (selectedConcerns.length < 3) {
      setSelectedConcerns((prev) => [...prev, concern]);
    }
  };

  return (
    <Container
      maxWidth="lg"
      sx={{ mt: -4, mb: 6, position: "relative", zIndex: 2 }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          borderRadius: 4,
          backgroundColor: "white",
        }}
      >
        <Typography variant="h5" gutterBottom>
          Find a mental health professional who understands your needs.
        </Typography>
        <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 2 }}>
          CHOOSE UP TO 3 OF THE CLOSEST OPTIONS
        </Typography>
        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 1,
          }}
        >
          {concerns.map((concern) => (
            <Chip
              key={concern}
              label={concern}
              onClick={() => handleConcernClick(concern)}
              sx={{
                borderRadius: "16px",
                px: 2,
                backgroundColor: selectedConcerns.includes(concern)
                  ? "primary.main"
                  : "grey.100",
                color: selectedConcerns.includes(concern)
                  ? "white"
                  : "text.primary",
                "&:hover": {
                  backgroundColor: selectedConcerns.includes(concern)
                    ? "primary.dark"
                    : "grey.200",
                },
              }}
            />
          ))}
        </Box>
      </Paper>
    </Container>
  );
};

export default Concerns;
