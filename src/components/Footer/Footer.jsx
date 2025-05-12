import {
  Box,
  Container,
  Typography,
  Link,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Footer = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  return (
    <Box
      component="footer"
      sx={{
        py: 3,
        px: 2,
        mt: "auto",
        mb: isMobile ? 5 : 0,
        backgroundColor:
          theme.palette.mode === "light"
            ? theme.palette.grey[200]
            : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          © {new Date().getFullYear()} Consultation Portal. All rights reserved.
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary">
          <Link
            color="inherit"
            onClick={() => navigate("/privacy")}
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            Privacy Policy
          </Link>
          {" | "}
          <Link
            onClick={() => navigate("/terms")}
            color="inherit"
            style={{ textDecoration: "none", cursor: "pointer" }}
          >
            Terms of Service
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
