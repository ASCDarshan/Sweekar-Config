import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Button,
  TextField,
  MenuItem,
  Divider,
} from "@mui/material";
import { Search, AccessTime } from "@mui/icons-material";
import { useEffect, useState } from "react";
import ajaxCall from "../../helpers/ajaxCall";

const blogPosts = [
  {
    title: "Understanding LGBTQAI+ Mental Health Needs",
    category: "Mental Health",
    date: "Dec 15, 2024",
    readTime: "5 min read",
    excerpt:
      "Exploring the unique mental health challenges and support systems needed for the LGBTQAI+ community.",
    image: "/path/to/image",
    tags: ["Mental Health", "LGBTQAI+", "Support"],
  },
];

const Blog = () => {

  const [blogs, setBlogs] = useState([]);

  const fetchData = async (url, setData) => {
    try {
      const response = await ajaxCall(
        url,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          method: "GET",
        },
        8000
      );
      if (response?.status === 200) {
        setData(response?.data || []);
      } else {
        console.error("Fetch error:", response);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  useEffect(() => {
    fetchData("blogs/blogs/", setBlogs);
  }, []);

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
            Insights & Stories
          </Typography>
          <Typography
            variant="h6"
            align="center"
            color="text.secondary"
            sx={{ maxWidth: "800px", mx: "auto", mb: 4 }}
          >
            Resources, stories and updates from the Sweekar community
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
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search articles..."
                InputProps={{
                  startAdornment: <Search color="action" sx={{ mr: 1 }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField fullWidth select label="Category" defaultValue="all">
                <MenuItem value="all">All Categories</MenuItem>
                <MenuItem value="mental-health">Mental Health</MenuItem>
                <MenuItem value="legal">Legal Rights</MenuItem>
                <MenuItem value="community">Community Stories</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        </Card>
      </Container>
      <Container sx={{ mb: 6 }}>
        <Grid container spacing={4}>
          {blogPosts.map((post, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "transform 0.2s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={post.image}
                  alt={post.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ mb: 2 }}>
                    <Chip label={post.category} color="primary" size="small" />
                  </Box>
                  <Typography variant="h5" gutterBottom>
                    {post.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{ mb: 2 }}
                  >
                    {post.excerpt}
                  </Typography>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      color: "text.secondary",
                      mb: 2,
                    }}
                  >
                    <AccessTime sx={{ fontSize: 16, mr: 0.5 }} />
                    <Typography variant="caption">{post.readTime}</Typography>
                    <Divider orientation="vertical" flexItem sx={{ mx: 1 }} />
                    <Typography variant="caption">{post.date}</Typography>
                  </Box>
                  <Box sx={{ mt: "auto" }}>
                    <Button variant="outlined" fullWidth>
                      Read More
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Blog;
