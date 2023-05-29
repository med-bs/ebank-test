import { CircularProgress, useMediaQuery, useTheme } from '@mui/material';
import React from 'react';
import { tokens } from '../theme';


const CircularProgressBar = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const isNonMobile = useMediaQuery("(min-width:600px)");

    return (
        <CircularProgress size={isNonMobile ? 250 : 50} style={{ color: colors.greenAccent[700] }} />
    );
};

export default CircularProgressBar;
