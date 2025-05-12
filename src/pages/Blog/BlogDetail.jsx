import {
  Card,
  CardContent,
  Container,
  Grid,
  styled,
  Typography,
  Button,
} from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import ajaxCall from "../../helpers/ajaxCall";
import { useEffect, useState } from "react";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

const BlogDetail = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const blogId = location?.state;

  const [blogData, setBlogData] = useState([]);

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
    fetchData(`blog/blogretupddelview/${blogId}/`, setBlogData);
  }, [blogId]);

  const BackgroundImage = styled("div")(({ bgImage }) => ({
    width: "100%",
    height: "400px",
    backgroundImage: `url(${bgImage})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative",
  }));

  return (
    <>
      <Container sx={{ mt: 1, my: 2 }}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate(-1)}
          sx={{
            bgcolor: "rgba(255, 255, 255, 0.9)",
            borderRadius: 8,
            boxShadow: "0 10px 25px rgba(0,0,0,0.1)",
            backdropFilter: "blur(10px)",
            px: 3,
            py: 1.2,
            "&:hover": {
              bgcolor: "white",
              boxShadow: "0 15px 30px rgba(0,0,0,0.15)",
              transform: "translateY(-3px)",
            },
            transition: "all 0.3s ease",
          }}
        >
          Go Back
        </Button>

        <Card sx={{ mt: 4, boxShadow: "0 4px 8px rgba(163, 163, 163, 0.5)" }}>
          <Grid container>
            <Grid item xs={12}>
              <BackgroundImage bgImage={blogData.image} />
            </Grid>
          </Grid>
          <Grid container>
            <CardContent>
              <Typography variant="h4" gutterBottom>
                {blogData.title}
              </Typography>

              <Typography
                variant="body2"
                color="text.secondary"
                sx={{ mb: 2 }}
                dangerouslySetInnerHTML={{ __html: blogData.text }}
              />
            </CardContent>
          </Grid>
        </Card>
      </Container>
    </>
  );
};

export default BlogDetail;
