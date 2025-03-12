import { Box, Container, Typography, Link, useMediaQuery, useTheme } from "@mui/material";

const Footer = () => {
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
        backgroundColor: theme.palette.mode === "light"
          ? theme.palette.grey[200]
          : theme.palette.grey[800],
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body1" align="center">
          © {new Date().getFullYear()} Consultation Portal. All rights reserved.
        </Typography>
        <Typography variant="body2" align="center" color="text.secondary">
          <Link color="inherit" href="/privacy" style={{ textDecoration: "none" }}>
            Privacy Policy
          </Link>
          {" | "}
          <Link href="/terms" color="inherit" style={{ textDecoration: "none" }}>
            Terms of Service
          </Link>
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
