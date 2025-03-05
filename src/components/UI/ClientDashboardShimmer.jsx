import { Container, Grid, Skeleton } from "@mui/material";

const ClientDashboardShimmer = () => {
    return (
        <Container maxWidth="lg" sx={{ mt: 4, mb: 8, py: 4 }}>
            <Skeleton variant="text" width="50%" height={60} />
            <Grid container spacing={3} sx={{ mt: 2 }}>
                <Grid item xs={12} md={7}>
                    <Skeleton variant="rectangular" height={120} sx={{ mb: 3, borderRadius: 2 }} />
                    <Skeleton variant="text" width="30%" height={40} />
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        <Grid item xs={12}>
                            <Skeleton variant="rectangular" height={160} sx={{ borderRadius: 2 }} />
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={5}>
                    <Skeleton variant="text" width="40%" height={40} />
                    <Grid container spacing={2} sx={{ mt: 1 }}>
                        {[1, 2, 3, 4].map((item) => (
                            <Grid item xs={12} sm={6} key={item}>
                                <Skeleton variant="rectangular" height={180} sx={{ borderRadius: 2 }} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Container>
    );
};

export default ClientDashboardShimmer;
