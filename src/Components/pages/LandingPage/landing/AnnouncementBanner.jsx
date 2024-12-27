import { Box, Button } from '@mui/material';
import { ArrowForward } from '@mui/icons-material';

const AnnouncementBanner = () => {
  return (
    <Box
      sx={{
        width: '100%',
        py: 1,
        px: 2,
        backgroundColor: '#FFE4E0',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2
      }}
    >
      <Button
        endIcon={<ArrowForward />}
        size="small"
        sx={{
          textTransform: 'none',
          '&:hover': {
            backgroundColor: 'rgba(0, 0, 0, 0.04)'
          }
        }}
      >
        Know More
      </Button>
    </Box>
  );
};

export default AnnouncementBanner;