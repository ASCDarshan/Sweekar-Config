import {
  Box,
  Container,
  Typography,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Button,
  TextField,
  IconButton,
} from "@mui/material";
import { Article, LocalHospital, Gavel, Download } from "@mui/icons-material";

const resources = [
  {
    category: "Healthcare Resources",
    icon: <LocalHospital />,
    items: [
      {
        title: "LGBTQAI+ Healthcare Guide",
        description:
          "Comprehensive guide for accessing inclusive healthcare services",
        downloadLink: "#",
      },
    ],
  },
  {
    category: "Legal Resources",
    icon: <Gavel />,
    items: [
      {
        title: "Rights & Protection Guide",
        description:
          "Understanding your legal rights and available protections",
        downloadLink: "#",
      },
    ],
  },
];

const Resources = () => {
  return (
    <Box>
      <Box
        sx={{
          bgcolor: "primary.light",
          py: { xs: 6, md: 10 },
          position: "relative",
          overflow: "hidden",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            gutterBottom
            align="center"
            sx={{
              fontWeight: 700,
              fontSize: { xs: "2.5rem", md: "3.5rem" },
              color: "primary.dark",
            }}
          >
            Resources
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ maxWidth: "800px", mx: "auto", mb: 4 }}
          >
            Helpful guides, Documents, and Information for Our community
          </Typography>
        </Container>
        <Box
          sx={{
            position: "absolute",
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: "50%",
            background: "rgba(157, 132, 183, 0.1)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            bottom: -30,
            left: -30,
            width: 150,
            height: 150,
            borderRadius: "50%",
            background: "rgba(157, 132, 183, 0.1)",
          }}
        />
      </Box>
      <Container
        maxWidth="lg"
        sx={{ mt: -6, mb: 4, position: "relative", zIndex: 1 }}
      >
        <Card sx={{ p: 3 }}>
          <TextField
            fullWidth
            placeholder="Search resources..."
            variant="outlined"
          />
        </Card>
      </Container>
      <Container sx={{ mb: 6 }}>
        {resources.map((category, index) => (
          <Card key={index} sx={{ mb: 4 }}>
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                <IconButton
                  sx={{
                    bgcolor: "primary.light",
                    "&:hover": { bgcolor: "primary.main" },
                  }}
                >
                  {category.icon}
                </IconButton>

                <Typography variant="h5" sx={{ ml: 2 }}>
                  {category.category}
                </Typography>
              </Box>
              <List>
                {category.items.map((item, idx) => (
                  <ListItem
                    key={idx}
                    sx={{
                      border: "1px solid",
                      borderColor: "divider",
                      borderRadius: 1,
                      mb: 2,
                    }}
                  >
                    <ListItemIcon>
                      <Article color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={item.title}
                      secondary={item.description}
                    />
                    <Button
                      variant="contained"
                      startIcon={<Download />}
                      href={item.downloadLink}
                    >
                      Download
                    </Button>
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        ))}
      </Container>
    </Box>
  );
};

export default Resources;
