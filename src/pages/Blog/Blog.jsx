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

const Blog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [loading, setLoading] = useState(true);
  const [loadingBlogs, setLoadingBlogs] = useState(false);

  const fetchData = async (url, setData, isCategoryChange = false) => {
    try {
      if (isCategoryChange) setLoadingBlogs(true);
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
        if (url === "blog/categorylistview/") {
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

    if (categoryId === "All") {
      fetchData("blog/bloglistview/", setBlogs, true);
    } else {
      fetchData(`blog/bloglistview/?category_id=${categoryId}`, setBlogs, true);
    }
  };

  const getExcerpt = (text, wordLimit) => {
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = text;
    const plainText = tempDiv.textContent || tempDiv.innerText;
    return plainText.split(/\s+/).slice(0, wordLimit).join(" ");
  };

  const slugify = (text) => text.toLowerCase().replace(/\s+/g, "-");

  const handleReadMore = (blogName, BlogId) => {
    navigate(`/blogs/${slugify(blogName)}`, { state: BlogId });
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
      <Box
        sx={{
          bgcolor: "#f5f1e8",
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
          <ShimmerSimpleGallery
            card
            imageHeight={250}
            caption
            row={1}
            col={3}
          />
        </Container>
      ) : (
        <Container sx={{ mb: 6 }}>
          {blogs.length === 0 ? (
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
                There is no blog for this category.
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={4}>
              {blogs.map((post) => (
                <Grid item xs={12} md={4} key={post.id}>
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
                        <Chip
                          label={post.category.name || "Uncategorized"}
                          color="primary"
                          size="small"
                        />
                      </Box>
                      <Typography variant="h5" gutterBottom>
                        {post.title}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2 }}
                        dangerouslySetInnerHTML={{
                          __html: getExcerpt(post.text, 30),
                        }}
                      />
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          color: "text.secondary",
                          mb: 2,
                        }}
                      >
                        <AccessTime sx={{ fontSize: 16, mr: 0.5 }} />
                        <Typography variant="caption">
                          {post.date || "Unknown Date"}
                        </Typography>
                      </Box>
                      <Box sx={{ mt: "auto" }}>
                        <Button
                          variant="contained"
                          onClick={() => handleReadMore(post.title, post.id)}
                          fullWidth
                        >
                          Read More
                        </Button>
                      </Box>
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