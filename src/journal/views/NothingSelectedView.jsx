import { StarOutline } from "@mui/icons-material"
import { Grid2 as Grid, Typography } from "@mui/material"

export const NothingSelectedView = () => {
    return (
        <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        sx={{ 
            minHeight: 'calc(100vh - 110px)', 
            backgroundColor: 'primary.main', 
            borderRadius: 3 
        }}
        >
            <Grid xs={ 12 }>
                <StarOutline sx={{ fontSize: 100, color: 'white' }}/>
            </Grid>

            <Grid xs={ 12 }>
                <Typography color="white" variant="h5">
                    Seleccione o crea una entrada
                </Typography>
            </Grid>
        
        </Grid>
    )
}
