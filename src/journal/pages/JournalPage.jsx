import { IconButton } from "@mui/material";
import { JournalLayout } from "../layout/JournalLayout"
import { NoteView } from "../views/NoteView"
import { NothingSelectedView } from './../views/NothingSelectedView';
import { AddOutlined } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { startNewNot } from "../../store/journal/thunks";

export const JournalPage = () => {

    const dispatch = useDispatch();
    const { isSaving, active } = useSelector(state => state.journal);

    const OnClickButton = () => {
        dispatch(startNewNot() );
    }

    return (
        <JournalLayout>
            {
                (!!active) ? <NoteView/> : <NothingSelectedView/>  
            }

            <IconButton
            disabled={ isSaving }
            onClick={OnClickButton}
            size="large"
            sx={{
                color:'white',
                backgroundColor:'error.main',
                ':hover': { backgroundColor: 'error.main', opacity: 0.9 },
                position:'fixed',
                right: 50,
                bottom: 50
            }}>
                <AddOutlined sx={{ fontSize: 30 }}/>

            </IconButton>
        </JournalLayout>
    )
}
