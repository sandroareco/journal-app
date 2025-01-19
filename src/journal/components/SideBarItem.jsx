import { TurnedInNot } from '@mui/icons-material'
import { Grid2 as Grid, ListItemButton, ListItemIcon, ListItemText } from '@mui/material'
import React, { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveNote } from '../../store/journal/journalSlice'

export const SideBarItem = ({ title = '', body, id, date, imageUrls = [] }) => {

    const dispatch = useDispatch();

    const onClickNote = () => {
        dispatch( setActiveNote({ title, body, id, date, imageUrls }) );
    }

    const newTitle = useMemo( () => {
        return title.length > 17 
        ? title.substring(0,17) + '...'
        : title;
    },[ title ])

    return (
        <ListItemButton key={ id } onClick={ onClickNote }>
            <ListItemIcon>
                <TurnedInNot/>
            </ListItemIcon>

            <Grid>
                <ListItemText primary={ newTitle } />
                <ListItemText secondary={ body } />
            </Grid>
        </ListItemButton>
)
}
