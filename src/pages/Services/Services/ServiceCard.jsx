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
import {
  Psychology,
  Gavel,
  LocalHospital,
  Work,
} from "@mui/icons-material";

const servicess = [
  {
    id: 1,
    color: "#9D84B7",
    stats: { professionals: 50, sessions: 1000, satisfaction: 98 },
    icon: <Psychology sx={{ fontSize: 40 }} />,
  },
  {
    id: 2,
    color: "#7A5BA1",
    stats: { professionals: 30, cases: 500, success: 95 },
    icon: <Gavel sx={{ fontSize: 40 }} />,
  },
  {
    id: 3,
    color: "#FF6B6B",
    stats: { doctors: 40, patients: 2000, satisfaction: 97 },
    icon: <LocalHospital sx={{ fontSize: 40 }} />,
  },
  {
    id: 4,
    color: "#4ECDC4",
    stats: { companies: 100, placements: 750, success: 92 },
    icon: <Work sx={{ fontSize: 40 }} />,
  },
];

const ServiceCard = ({ service, onSelect, isSelected, onBooking }) => {

  const theme = useTheme();
  const staticData = servicess.find((s) => s.id === service.id);

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
          bgcolor: isSelected ? `${staticData.color}10` : "background.paper",
          border: isSelected ? `2px solid ${staticData.color}` : "none",
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
                backgroundColor: staticData.color,
              }}
            />
          )}
          <Box onClick={() => onSelect(service)}>
            <Avatar
              sx={{
                bgcolor: staticData.color,
                width: 60,
                height: 60,
                mb: 2,
              }}
            >
              {staticData.icon}
            </Avatar>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              {service.title}
            </Typography>
            <Typography color="text.secondary" paragraph>
              {service.description}
            </Typography>
            <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap", mb: 2 }}>
              {service.concern.slice(0, 3).map((feature, idx) => (
                <Chip
                  key={feature.id}
                  label={feature.name}
                  size="small"
                  sx={{
                    bgcolor: `${staticData.color}20`,
                    color: staticData.color,
                  }}
                />
              ))}

              {service.concern.length > 3 && (
                <Tooltip title={service.concern.slice(3).map((feature) => feature.name).join(", ")}>
                  <Chip
                    icon={<Info />}
                    label={`+${service.concern.length - 3} more`}
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
              {Object.entries(staticData.stats).map(([key, value]) => (
                <Box key={key} sx={{ textAlign: "center" }}>
                  <Typography
                    variant="h6"
                    color={staticData.color}
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
              bgcolor: staticData.color,
              "&:hover": {
                bgcolor: staticData.color,
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
