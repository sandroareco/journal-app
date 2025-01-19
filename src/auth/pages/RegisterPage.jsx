import { Link as RouterLink } from 'react-router-dom';
import { Alert, Button, Grid2 as Grid, Link, TextField, Typography } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useForm } from '../../hooks/useForm';
import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { startCreatingUserWithEmailPassword } from '../../store/auth/thunks';

const formData = {
    email:'',
    password:'',
    displayName: ''
}

const formValidations = {
    email: [(value) => value.includes('@'), 'El correo debe tener un @'],
    password: [(value) => value.length >= 6, 'El password debe tener mas de 6 caracteres'],
    displayName: [(value) => value.length >= 1, 'El nombre debe tener mas de 1 letra']
}

export const RegisterPage = () => {

    const dispatch = useDispatch();

    const [formSubmitted, setFormSubmitted] = useState(false);
    const { status, errorMessage } = useSelector( state => state.auth );

    const isCheckingAuthentication = useMemo( () => status === 'checking', [status] );

    const { 
        displayName, email, password, onInputChange, formState,
        isFormValid, displayNameValid, emailValid, passwordValid
    } = useForm( formData, formValidations );

    const onSubmit = ( e ) => {
        e.preventDefault();
        setFormSubmitted(true);

        if( !isFormValid ) return;

        dispatch( startCreatingUserWithEmailPassword( formState ) );
    }

    return (

        <AuthLayout title='Crear Cuenta'>

            <form onSubmit={ onSubmit }>
                <Grid container spacing={2}>
                    <TextField
                    fullWidth
                    label="nombre completo"
                    placeholder="Sandro Areco"
                    type="text"
                    variant="outlined"
                    autoComplete="off"
                    name="displayName"
                    value={ displayName }
                    onChange={ onInputChange }
                    error={ !!displayNameValid && formSubmitted }
                    helperText={ displayNameValid }

                    />

                    <TextField
                    fullWidth
                    label="Email"
                    placeholder="correo@google.com"
                    type="email"
                    variant="outlined"
                    autoComplete="off"
                    name="email"
                    value={ email }
                    onChange={ onInputChange }
                    error={ !!emailValid && formSubmitted }
                    helperText={ emailValid }
                    />
        
                    <TextField
                    fullWidth
                    label="Password"
                    placeholder="password"
                    type="password"
                    variant="outlined"
                    autoComplete="off"
                    name="password"
                    value={ password }
                    onChange={ onInputChange }
                    error={ !!passwordValid && formSubmitted }
                    helperText={ passwordValid }
                    />

                    <Grid container size={12} spacing={2}
                    display={!!errorMessage ? '' : 'none'}>
                        <Alert severity='error'>{ errorMessage }</Alert>
                    </Grid>
        
                    <Grid container size={12} spacing={2}>
                        <Grid size={{ xs: 12 }}>
                            <Button
                            disabled={ isCheckingAuthentication } 
                            type='submit' fullWidth variant="contained">
                            Crear Cuenta
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justifyContent="end" size={12}>
                        <Typography sx={{ mr: 1 }}>¿Ya tienes cuenta?</Typography>
                        <Link color="inherit" component={RouterLink} to="/auth/login">
                            ingresar
                        </Link>
                    </Grid>

                </Grid>
            </form>

        </AuthLayout>
        
        
    );
};
