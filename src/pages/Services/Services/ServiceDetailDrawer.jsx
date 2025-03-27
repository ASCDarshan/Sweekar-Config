/* eslint-disable react/prop-types */
import { ArrowForward, CheckCircle, Close } from "@mui/icons-material";
import {
  Box,
  Button,
  Chip,
  IconButton,
  SwipeableDrawer,
  Typography,
} from "@mui/material";

const ServiceDetailDrawer = ({ service, open, onClose, onBooking }) => {
  if (!service) return null;

  return (
    <SwipeableDrawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: {
          width: { xs: "100%", sm: 400 },
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
          {service.title}
        </Typography>
        <IconButton onClick={onClose}>
          <Close />
        </IconButton>
      </Box>
      <Typography paragraph color="text.secondary">
        {service.description}
      </Typography>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Features
      </Typography>
      <Box sx={{ mb: 3 }}>
        {service?.concern?.map((feature, idx) => (
          <Chip key={idx} label={feature.name || feature} sx={{ m: 0.5 }} />
        ))}
      </Box>
      <Typography variant="h6" gutterBottom fontWeight="bold">
        Benefits
      </Typography>
      <Box sx={{ mb: 3 }}>
        {service?.benifits?.map((benefit, idx) => (
          <Box
            key={idx}
            sx={{
              display: "flex",
              alignItems: "center",
              mb: 1,
              p: 1,
              bgcolor: "grey.50",
              borderRadius: 1,
            }}
          >
            <CheckCircle color="primary" sx={{ mr: 1, fontSize: 20 }} />
            <Typography variant="body2">{benefit.name || benefit}</Typography>
          </Box>
        ))}
      </Box>

      <Button
        fullWidth
        variant="contained"
        size="large"
        onClick={() => onBooking(service)}
        endIcon={<ArrowForward />}
        sx={{
          mt: "auto",
          bgcolor: service.color,
          "&:hover": {
            bgcolor: service.color,
            opacity: 0.9,
          },
        }}
      >
        Book Consultation
      </Button>
    </SwipeableDrawer>
  );
};

export default ServiceDetailDrawer;
