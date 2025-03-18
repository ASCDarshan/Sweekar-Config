import { useEffect, useState } from "react";
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
} from "@mui/material";
import { ShimmerSimpleGallery } from "react-shimmer-effects";
import { Search, AccessTime } from "@mui/icons-material";
import ajaxCall from "../../helpers/ajaxCall";
import { useNavigate } from "react-router-dom";
import ServiceShimmer from "../../components/UI/ServiceShimmer";
import BackgroundImg from "../../assets/HeroBanner.jpg";

const Blog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState(""); // Search state
  const [loading, setLoading] = useState(true);
  const [loadingBlogs, setLoadingBlogs] = useState(false);

  const fetchData = async (url, setData, isCategoryChange = false) => {
    try {
      if (isCategoryChange) setLoadingBlogs(true);
      const response = await ajaxCall(url, { method: "GET" }, 8000);
      if (response?.status === 200) {
        if (url.includes("categorylistview")) {
          setData(response?.data || []);
        } else {
          setData(response?.data?.blog || []);
        }
      } else {
        console.error("Fetch error:", response);
      }
    } catch (error) {
      console.error("Network error:", error);
    } finally {
      if (isCategoryChange) setLoadingBlogs(false);
      else setLoading(false);
    }
  };

  useEffect(() => {
    fetchData("blog/categorylistview/", setCategoryList);
    fetchData("blog/bloglistview/", setBlogs);
  }, []);

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);

    const url =
      categoryId === "All"
        ? "blog/bloglistview/"
        : `blog/bloglistview/?category_id=${categoryId}`;

    fetchData(url, setBlogs, true);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredBlogs = blogs.filter((post) =>
    post.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleReadMore = (blogName, BlogId) => {
    navigate(`/blogs/${blogName.toLowerCase().replace(/\s+/g, "-")}`, {
      state: BlogId,
    });
  };

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 8 }}>
        <Box sx={{ mb: 6 }}>
          <ServiceShimmer />
        </Box>
      </Container>
    );
  }

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url(${BackgroundImg})`,
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
            Resources, stories, and updates from the Sweekar community
          </Typography>
        </Container>
      </Box>

      {/* Search & Category Filters */}
      <Container maxWidth="lg" sx={{ mt: -6, mb: 4, position: "relative", zIndex: 1 }}>
        <Card sx={{ p: 3 }}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                placeholder="Search articles..."
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: <Search color="action" sx={{ mr: 1 }} />,
                }}
              />
            </Grid>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                select
                label="Category"
                value={selectedCategory || ""}
                onChange={handleCategoryChange}
              >
                <MenuItem value="All">All</MenuItem>
                {categoryList.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    {category.name}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>
        </Card>
      </Container>

      {loadingBlogs ? (
        <Container sx={{ mb: 6 }}>
          <ShimmerSimpleGallery card imageHeight={250} caption row={1} col={3} />
        </Container>
      ) : (
        <Container sx={{ mb: 6 }}>
          {filteredBlogs.length === 0 ? (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                width: "100%",
                height: "200px",
                textAlign: "center",
                borderRadius: "8px",
                p: 2,
              }}
            >
              <Typography variant="h5" color="red">
                No blogs found for this search.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={4}>
              {filteredBlogs.map((post) => (
                <Grid item xs={12} md={4} key={post.id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "transform 0.2s",
                      "&:hover": { transform: "translateY(-5px)" },
                      position: "relative",
                      bgcolor: "white",
                      border: "3px solid transparent",
                      backgroundImage: `linear-gradient(white, white), linear-gradient(to bottom, #d4145a, #fbb03b)`,
                      backgroundOrigin: "border-box",
                      backgroundClip: "padding-box, border-box",
                    }}
                  >
                    <CardMedia component="img" height="200" image={post.image} alt={post.title} />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box sx={{ mb: 2 }}>
                        <Chip label={post.category?.name || "Uncategorized"} color="primary" size="small" />
                      </Box>
                      <Typography variant="h5" gutterBottom>
                        {post.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                        {post.text.slice(0, 100)}...
                      </Typography>
                      <Button variant="contained" onClick={() => handleReadMore(post.title, post.id)} fullWidth>
                        Read More
                      </Button>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </Container>
      )}
    </Box>
  );
};

export default Blog;
