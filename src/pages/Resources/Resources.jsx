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
  Grid,
  MenuItem,
} from "@mui/material";
import { Article, Download, Search } from "@mui/icons-material";
import LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
import BackgroundImg from "../../assets/HeroBanner.jpg";
import ajaxCall from "../../helpers/ajaxCall";
import { useEffect, useState } from "react";

const Resources = () => {
  const [resourcesData, setResourceData] = useState([]);
  const [categoryList, setCategoryList] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

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
    fetchData("resource/resources/", setResourceData);
    fetchData("resource/categories/", setCategoryList);
  }, []);

  const handleCategoryChange = (event) => {
    const categoryId = event.target.value;
    setSelectedCategory(categoryId);

    if (categoryId === "All") {
      fetchData("resource/resources/", setResourceData);
    } else {
      fetchData(`resource/resource-category/?category_id=${categoryId}`, setResourceData);
    }
  };

  const filteredResources = resourcesData.filter((category) =>
    category?.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    category?.description?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
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
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
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

      <Container sx={{ mb: 6 }}>
        {filteredResources.length > 0 ? (
          filteredResources.map((category, index) => (
            <Card key={index} sx={{ mb: 4 }}>
              <CardContent>
                <Box sx={{ display: "flex", alignItems: "center", mb: 3 }}>
                  <IconButton
                    sx={{
                      bgcolor: "primary.light",
                      "&:hover": { bgcolor: "primary.main" },
                    }}
                  >
                    <LibraryBooksIcon />
                  </IconButton>

                  <Typography variant="h5" sx={{ ml: 2 }}>
                    {category?.category_name}
                  </Typography>
                </Box>
                <List>
                  <ListItem
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
                      primary={category?.title}
                      secondary={category?.description}
                    />
                    <Button
                      variant="contained"
                      startIcon={<Download />}
                      href={category.file_url}
                      download
                    >
                      Download
                    </Button>
                  </ListItem>
                </List>
              </CardContent>
            </Card>
          ))
        ) : (
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
              No Resources found for this search.
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  );
};

export default Resources;
