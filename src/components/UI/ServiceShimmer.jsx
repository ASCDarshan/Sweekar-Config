import { Box, Container } from "@mui/material";
import { ShimmerSimpleGallery, ShimmerTitle, ShimmerText } from "react-shimmer-effects";

const ServiceShimmer = () => {
    return (
        <Box>
            <Box
                sx={{
                    py: { xs: 6, md: 10 },
                    position: "relative",
                    overflow: "hidden",
                }}
            >
                <Container maxWidth="lg">
                    <ShimmerTitle line={1} variant="primary" />
                    <Box sx={{ mt: 2 }}>
                        <ShimmerText line={2} gap={10} />
                    </Box>
                </Container>
            </Box>

            <Container maxWidth="lg" sx={{ mt: -6, mb: 4, position: "relative", zIndex: 1 }}>
                <ShimmerSimpleGallery card imageHeight={200} caption row={2} col={4} />
            </Container>
        </Box>
    );
};

export default ServiceShimmer;