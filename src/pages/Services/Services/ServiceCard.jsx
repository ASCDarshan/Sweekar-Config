import { ArrowForward, CheckCircle, Info } from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Grow,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";

const ServiceCard = ({ service, onSelect, isSelected, onBooking }) => {
  const theme = useTheme();

  return (
    <Grow in={true}>
      <Card
        elevation={isSelected ? 12 : 3}
        sx={{
          height: "100%",
          cursor: "pointer",
          transition: "all 0.3s ease",
          transform: isSelected ? "scale(1.02)" : "scale(1)",
          "&:hover": {
            transform: "scale(1.02)",
            boxShadow: theme.shadows[12],
          },
          position: "relative",
          overflow: "visible",
          bgcolor: isSelected ? `${service.color}10` : "background.paper",
          border: isSelected ? `2px solid ${service.color}` : "none",
        }}
      >
        <CardContent sx={{ p: 3 }}>
          {isSelected && (
            <Chip
              icon={<CheckCircle />}
              label="Selected"
              color="primary"
              sx={{
                position: "absolute",
                top: -16,
                right: 16,
                backgroundColor: service.color,
              }}
            />
          )}

          <Box onClick={() => onSelect(service)}>
            <Avatar
              sx={{
                bgcolor: service.color,
                width: 60,
                height: 60,
                mb: 2,
              }}
            >
              {service.icon}
            </Avatar>

            <Typography variant="h5" gutterBottom fontWeight="bold">
              {service.category}
            </Typography>

            <Typography color="text.secondary" paragraph>
              {service.shortDescription}
            </Typography>

            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
              {service.features.slice(0, 3).map((feature, idx) => (
                <Chip
                  key={idx}
                  label={feature}
                  size="small"
                  sx={{
                    bgcolor: `${service.color}20`,
                    color: service.color,
                  }}
                />
              ))}
              {service.features.length > 3 && (
                <Tooltip title={service.features.slice(3).join(", ")}>
                  <Chip
                    icon={<Info />}
                    label={`+${service.features.length - 3} more`}
                    size="small"
                    sx={{
                      bgcolor: `${service.color}20`,
                      color: service.color,
                    }}
                  />
                </Tooltip>
              )}
            </Box>

            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                mt: "auto",
              }}
            >
              {Object.entries(service.stats).map(([key, value]) => (
                <Box key={key} sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h6"
                    color={service.color}
                    fontWeight="bold"
                  >
                    {value}+
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    {key}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>

          <Button
            fullWidth
            variant="contained"
            size="large"
            onClick={(e) => {
              e.stopPropagation();
              onBooking(service);
            }}
            endIcon={<ArrowForward />}
            sx={{
              mt: 2,
              bgcolor: service.color,
              "&:hover": {
                bgcolor: service.color,
                opacity: 0.9,
              },
            }}
          >
            Book Consultation
          </Button>
        </CardContent>
      </Card>
    </Grow>
  );
};

export default ServiceCard;
