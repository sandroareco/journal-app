import { Grid2 as Grid, Typography } from "@mui/material"

export const AuthLayout = ({ children, title = '' }) => {
    return (
        <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ minHeight: '100vh', backgroundColor: 'primary.main', padding: 4 }}
        >
            <Grid
                className="box-shadow"
                size={{ xs: 10, sm: 8, md: 6 }}
                sx={{ width:{ md: 450 }, backgroundColor: 'white', padding: 2, borderRadius: 2 }}
            >
                <Typography variant="h5" sx={{ mb: 1 }}>
                    { title }
                </Typography>

                { children }
            </Grid>
        
        </Grid>
    )
}
