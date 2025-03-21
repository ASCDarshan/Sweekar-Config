import { Box, Chip } from "@mui/material";
import { useState } from "react";

const locations = ["Mental-Health", "Legal-Aid", "Medical-Services", "Placement-Services"];

const Location = () => {
  const [selectedLocation, setSelectedLocation] = useState("");

  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          gap: 0.5,
        }}
      >
        {locations.map((location) => (
          <Chip
            key={location}
            label={location}
            onClick={() => setSelectedLocation(location)}
            sx={{
              borderRadius: "16px",
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
    </>
  );
};

export default Location;
