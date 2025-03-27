/* eslint-disable react/prop-types */
import { Box, Container } from "@mui/material";
import {
    ShimmerSimpleGallery,
    ShimmerTitle,
    ShimmerText,
} from "react-shimmer-effects";

const ServiceShimmer = ({
    imageHeight = 200,
    galleryRow = 2,
    galleryCol = 4
}) => {
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

            <Container
                maxWidth="lg"
                sx={{ mt: -6, mb: 4, position: "relative", zIndex: 1 }}
            >
                <ShimmerSimpleGallery
                    card
                    imageHeight={imageHeight}
                    caption
                    row={galleryRow}
                    col={galleryCol}
                />
            </Container>
        </Box>
    );
};

export default ServiceShimmer;