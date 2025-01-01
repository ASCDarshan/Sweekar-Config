import { Box, Chip } from "@mui/material";
import { useState } from "react";

const locations = [
  "All centres",
  "Indiranagar",
  "Whitefield",
  "Koramangala",
  "JP Nagar",
];

const Location = () => {
  const [selectedLocation, setSelectedLocation] = useState("All centres");

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 1,
      }}
    >
      {locations.map((location) => (
        <Chip
          key={location}
          label={location}
          onClick={() => setSelectedLocation(location)}
          sx={{
            borderRadius: "16px",
            px: 2,
            backgroundColor:
              selectedLocation === location ? "primary.main" : "white",
            color: selectedLocation === location ? "white" : "text.primary",
            border: "1px solid",
            borderColor:
              selectedLocation === location ? "primary.main" : "grey.300",
            "&:hover": {
              backgroundColor:
                selectedLocation === location ? "primary.dark" : "grey.100",
            },
          }}
        />
      ))}
    </Box>
  );
};

export default Location;
