import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../theme";

const Header = ({ title, subtitle }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    return (
        <Box mb="20px">
            <Typography
                variant="h2"
                color={colors.grey[100]}
                fontWeight="bold"
                sx={{ m: "0 0 5px 0" }}
                align="center"
            >
                {title}
            </Typography>
            <Typography variant="h5" color={colors.greenAccent[400]} align="center" >
                {subtitle}
            </Typography>
        </Box>
    );
};

export default Header;