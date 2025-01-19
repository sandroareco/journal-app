import { DeleteOutline, SaveOutlined, UploadOutlined } from "@mui/icons-material"
import { Button, Grid2 as Grid, IconButton, TextField, Typography } from "@mui/material"
import { ImageGallery } from "../components/ImageGallery"
import { useForm } from './../../hooks/useForm';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useMemo, useRef } from "react";
import { setActiveNote } from "../../store/journal/journalSlice";
import { startDeletingNote, startSaveNote, startUploadingFiles } from "../../store/journal/thunks";
import Swal from "sweetalert2";
import 'sweetalert2/dist/sweetalert2.css';

export const NoteView = () => {

    const dispatch = useDispatch();
    const { active: note, messageSaved, isSaving } = useSelector( state => state.journal );
    const { body, title, date, onInputChange, formState } = useForm( note );

    const dateString = useMemo(() => {
        const newDate = new Date( date );

        return newDate.toUTCString();

    },[date])

    const fileInputRef = useRef();

    useEffect(() => {
        dispatch( setActiveNote(formState) );
    }, [formState])

    useEffect(() => {
        if( messageSaved.length > 0 ){
            Swal.fire({
                title: 'Nota actualizada',
                text: messageSaved,
                icon: 'success',
                timer: 2000, 
                timerProgressBar: true, 
            });
        }
    },[messageSaved])

    const onSaveNote = () => {
        dispatch( startSaveNote() );
    }

    const onFileInputChange = ({ target }) => {
        if( target.files === 0 ) return;

        dispatch( startUploadingFiles( target.files ) );
    }

    const onDelete = () => {
        dispatch( startDeletingNote() );
    }

    return (
    
    <Grid sx={{ mb: 1 }}>

        <Grid container 
        direction='row' 
        justifyContent='space-between' 
        alignItems='center'>
            <Grid>
                <Typography fontSize={ 39 } fontWeight='Light'>
                    { dateString }
                </Typography>
            </Grid>
            <Grid>

                <input type="file" multiple
                ref={ fileInputRef }
                onChange={ onFileInputChange }
                style={{ display: 'none' }}/>

                <IconButton color='primary' disabled={ isSaving }
                onClick={ () => fileInputRef.current.click() }>
                    <UploadOutlined />
                </IconButton>
                <Button onClick={ onSaveNote } disabled={ isSaving }>
                    <SaveOutlined sx={{ fontSize: 30, mr: 1 }} />
                    Guardar
                </Button>
            </Grid>
        </Grid>

        <Grid>
                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    placeholder="Ingrese un título"
                    label="Título"
                    sx={{ border: "none", mb: 1 }}
                    name="title"
                    value={ title }
                    onChange={ onInputChange }
                />

                <TextField
                    type="text"
                    variant="filled"
                    fullWidth
                    multiline
                    placeholder="¿Qué sucedió hoy?"
                    label="Descripción"
                    minRows={5}
                    name="body"
                    value={ body }
                    onChange={ onInputChange }
                />
        </Grid>

        <Grid container justifyContent='end'>
            <Button onClick={ onDelete } sx={{ mt:2 }} color="error" >
                <DeleteOutline />
                Borrar
            </Button>
        </Grid>

        <ImageGallery images={ note.imageUrls } />

    </Grid>
    )
}
