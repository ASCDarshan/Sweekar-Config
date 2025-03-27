/* eslint-disable react/prop-types */
import { Close } from "@mui/icons-material";
import { Box, IconButton, SwipeableDrawer, Typography } from "@mui/material";
import BasicInformation from "./Update-Professional-Component/BasicInformation";
import Award from "./Update-Professional-Component/Award";

const ProfessionalUpdateDrawer = ({
  ExpertDetails,
  open,
  onClose,
  setCount,
}) => {
  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 800 },
          p: 3,
        },
      }}
    >
      <Box
        sx={{
          mb: 3,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" fontWeight="bold">
          Update Profile
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Basic Information
      </Typography>
      <Box sx={{ mb: 3 }}>
        <BasicInformation
          ExpertDetails={ExpertDetails}
          setCount={setCount}
          onClose={onClose}
        />
      </Box>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Awards
      </Typography>
      <Box sx={{ mb: 3 }}>
        <Award
          expertId={ExpertDetails?.id}
          setCount={setCount}
          onClose={onClose}
        />
      </Box>
    </SwipeableDrawer>
  );
};

export default ProfessionalUpdateDrawer;
