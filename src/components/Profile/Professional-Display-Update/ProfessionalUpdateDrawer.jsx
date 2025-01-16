import { Close } from "@mui/icons-material"
import { Box, IconButton, SwipeableDrawer, Typography } from "@mui/material"
import BasicInformation from "./Update-Professional-Component/BasicInformation"
import Award from "./Update-Professional-Component/Award"
import Concern from "./Update-Professional-Component/Concern"

// eslint-disable-next-line react/prop-types
const ProfessionalUpdateDrawer = ({ ExpertDetails, open, onClose }) => {
    return (
        <SwipeableDrawer
            anchor="right"
            open={open}
            onClose={onClose}
            onOpen={() => { }}
            PaperProps={{
                sx: {
                    width: { xs: "100%", sm: 800 },
                    p: 3,
                },
            }}
        >
            <Box
                sx={{
                    mb: 3,
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="h5" fontWeight="bold">
                    Update Profile
                </Typography>
                <IconButton onClick={onClose}>
                    <Close />
                </IconButton>
            </Box>
            <Typography variant="h6" gutterBottom fontWeight="bold">
                Basic Information
            </Typography>
            <Box sx={{ mb: 3 }}>
                <BasicInformation ExpertDetails={ExpertDetails} />
            </Box>
            <Typography variant="h6" gutterBottom fontWeight="bold">
                Concerns
            </Typography>
            <Box sx={{ mb: 3 }}>
                <Concern expertId={ExpertDetails?.id} />
            </Box>
            <Typography variant="h6" gutterBottom fontWeight="bold">
                Awards
            </Typography>
            <Box sx={{ mb: 3 }}>
                <Award expertId={ExpertDetails?.id} />
            </Box>
        </SwipeableDrawer>
    )
}

export default ProfessionalUpdateDrawer
