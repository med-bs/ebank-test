import { useContext, useEffect } from "react";
import { Box, IconButton, useTheme } from "@mui/material";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { LogoutOutlined } from "@mui/icons-material";

import { useNavigate } from "react-router-dom";

import { ColorModeContext } from "../../theme";
import { useDispatch, useSelector } from "react-redux";
import { logout, reset } from '../../api/auth/authSlice'

const TopBar = () => {
    const theme = useTheme();
    const colorMode = useContext(ColorModeContext);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user } = useSelector((state) => state.auth);

    useEffect(() => {
        if (!user) {
          navigate('/signin')
        }
      }, [user, navigate, dispatch])
    

    const handleLogout = () => {
        dispatch(logout())
        dispatch(reset())
        navigate('/signin')
    }
    return (
        <Box display="flex" justifyContent="space-between" p={2}>

            <Box display="flex">
                <IconButton onClick={colorMode.toggleColorMode}>
                    {theme.palette.mode === "dark" ? (
                        <DarkModeOutlinedIcon />
                    ) : (
                        <LightModeOutlinedIcon />
                    )}
                </IconButton>
            </Box>

            <Box display="flex">
                <IconButton onClick={handleLogout} >
                    <LogoutOutlined />
                </IconButton>
            </Box>
        </Box>
    );
};

export default TopBar;