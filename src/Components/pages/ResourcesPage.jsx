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
  TextField
} from '@mui/material';
import {
  Article,
  LocalHospital,
  Gavel,
  Download
} from '@mui/icons-material';

const resources = [
  {
    category: "Healthcare Resources",
    icon: <LocalHospital />,
    items: [
      {
        title: "LGBTQAI+ Healthcare Guide",
        description: "Comprehensive guide for accessing inclusive healthcare services",
        downloadLink: "#"
      },
    ]
  },
  {
    category: "Legal Resources",
    icon: <Gavel />,
    items: [
      {
        title: "Rights & Protection Guide",
        description: "Understanding your legal rights and available protections",
        downloadLink: "#"
      },
    ]
  },
];

const ResourcesPage = () => {
  return (
    <Box>
      <Box sx={{ bgcolor: 'primary.light', py: 6 }}>
        <Container>
          <Typography variant="h3" gutterBottom align="center">
            Resources
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary">
            Helpful guides, documents, and information for our community
          </Typography>
        </Container>
      </Box>

      <Container sx={{ mt: -4, mb: 6 }}>
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
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                {category.icon}
                <Typography variant="h5" sx={{ ml: 2 }}>
                  {category.category}
                </Typography>
              </Box>
              <List>
                {category.items.map((item, idx) => (
                  <ListItem
                    key={idx}
                    sx={{
                      border: '1px solid',
                      borderColor: 'divider',
                      borderRadius: 1,
                      mb: 2
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

export default ResourcesPage;