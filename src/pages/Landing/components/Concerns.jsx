import { useState } from "react";
import { Box, Container, Typography, Chip } from "@mui/material";

const concerns = [
  "Anxiety Disorders",
  "Depressive Disorders",
  "Adult ADHD",
  "Relationship Skills",
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
    <Container maxWidth="md" sx={{ textAlign: "start", py: 6, pl: 2 }}>
      <Typography
        variant="h4"
        sx={{
          fontWeight: "bold",
          mb: 1,
          textAlign: "left",
        }}
      >
        Find A Mental Health Professional <br />
        Who Understands Your Needs.
      </Typography>

      <Typography
        variant="subtitle1"
        sx={{
          textTransform: "uppercase",
          color: "text.secondary",
          mb: 3,
          textAlign: "left",
        }}
      >
        Choose up to 3 of the closest options
      </Typography>

      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 1,
          justifyContent: "flex-start",
        }}
      >
        {concerns.map((concern) => (
          <Chip
            key={concern}
            label={concern}
            onClick={() => handleConcernClick(concern)}
            sx={{
              px: 2.5,
              py: 1,
              fontSize: "16px",
              fontWeight: "500",
              cursor: "pointer",
              color: "black",
              border: "1px solid transparent",
              borderRadius: "25px",
              backgroundClip: "padding-box",
              backgroundColor: selectedConcerns.includes(concern)
                ? "rgba(222, 148, 243, 0.49)"
                : "transparent",
              "&:hover": {
                backgroundColor: "rgba(255, 140, 0, 0.2)",
              },
              position: "relative",

              "&::before": {
                content: '""',
                position: "absolute",
                inset: 0,
                borderRadius: "inherit",
                padding: "3px",
                background:
                  " linear-gradient(to bottom,rgba(240, 81, 139, 0.76), #fbb03b)",
                WebkitMask:
                  "linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)",
                WebkitMaskComposite: "xor",
                maskComposite: "exclude",
              },
            }}
          />
        ))}
      </Box>
    </Container>
  );
};

export default Concerns;
