import { Link as RouterLink } from 'react-router-dom';
import { Google } from '@mui/icons-material';
import { Alert, Button, Grid2 as Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from './../../hooks/useForm';
import { useDispatch, useSelector } from 'react-redux';
import { startGoogleSignIn, startLoginWithEmailPassword } from '../../store/auth/thunks';
import { useMemo } from 'react';

const formData = {
    email:'',
    password:''
}

export const LoginPage = () => {

    const { status, errorMessage } = useSelector( state => state.auth );

    const dispatch = useDispatch();

    const { email, password, onInputChange } = useForm( formData )

    const isAuthenticating = useMemo( () => status === 'checking', [status] );

    const onSubmit = (e) => {
        e.preventDefault();

        dispatch( startLoginWithEmailPassword({ email, password }) );
    }

    const onGoogleSignIn = () => {
        console.log( 'OnGoogleSignIn');
        dispatch( startGoogleSignIn() );
    }

    return (

        <AuthLayout title='Login'>

            <form onSubmit={ onSubmit }>
                <Grid container spacing={2}>
                    <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    placeholder="correo@google.com"
                    type="email"
                    variant="outlined"
                    autoComplete="off"
                    value={ email }
                    onChange={ onInputChange }
                    />
        
                    <TextField
                    fullWidth
                    label="Password"
                    name="password"
                    placeholder="password"
                    type="password"
                    variant="outlined"
                    autoComplete="off"
                    value={ password }
                    onChange={ onInputChange }
                    />
        
                    <Grid container size={12} spacing={2}>

                        <Grid container size={12} spacing={2}
                        display={!!errorMessage ? '' : 'none'}>
                            <Alert severity='error'>{ errorMessage }</Alert>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>
                            <Button disabled={ isAuthenticating } 
                            type='submit' 
                            fullWidth variant="contained">
                            Login
                            </Button>
                        </Grid>
        
                        <Grid size={{ xs: 12, md: 6 }}>
                            <Button  disabled={ isAuthenticating } 
                            fullWidth 
                            variant="contained" onClick={ onGoogleSignIn }>
                            <Google />
                            <Typography marginLeft={1}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justifyContent="end" size={12}>
                        <Link color="inherit" component={RouterLink} to="/auth/register">
                            Crear una cuenta
                        </Link>
                    </Grid>

                </Grid>
            </form>

        </AuthLayout>
        
        
    );
};