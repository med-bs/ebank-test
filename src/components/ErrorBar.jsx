import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import { useState } from 'react';
import { useTheme } from '@mui/material';
import { tokens } from '../theme';



const ErrorBar = ({ isOpen, title, message }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [open, setOpen] = useState(isOpen);

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Stack spacing={2} sx={{ width: '100%' }}>
            <Snackbar anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                open={open} autoHideDuration={5000} onClose={handleClose}>
                <Alert
                    severity="error"
                    style={{ color: colors.redAccent[100], bgcolor: colors.redAccent[500] }}
                >
                    <AlertTitle>{title}</AlertTitle>
                    {message} — <strong>check it out!</strong>
                </Alert>
            </Snackbar>

        </Stack>
    );
}

export default ErrorBar;
