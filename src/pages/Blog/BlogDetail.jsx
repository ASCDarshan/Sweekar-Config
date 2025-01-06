import { Card, CardContent, Container, Grid, styled, Typography } from "@mui/material"
import { useLocation } from "react-router-dom";
import ajaxCall from "../../helpers/ajaxCall";
import { useEffect, useState } from "react";

const BlogDetail = () => {
    const location = useLocation();
    const blogId = location.state;

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
    }, []);

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
            <Container sx={{ mt: 1, my: 4 }} >
                <Card
                    sx={{ mt: 4, boxShadow: "0 4px 8px rgba(163, 163, 163, 0.5)" }}
                >
                    <Grid container>
                        <Grid item xs={12}>
                            <BackgroundImage bgImage={blogData.image} />
                        </Grid>
                    </Grid>
                    <Grid container>
                        <Grid item xs={12} md={8} mt={4}>
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
                    </Grid>
                </Card>
            </Container>
        </>
    )
}

export default BlogDetail
