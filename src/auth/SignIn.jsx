import { useContext, useState, useEffect } from "react";
import { useSelector, useDispatch } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import { Formik } from "formik";
import * as yup from "yup";
import { Avatar, Box, Button, Container, CssBaseline, IconButton, InputAdornment, TextField, Typography, useTheme } from "@mui/material";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import { login, reset } from '../api/auth/authSlice'

import Header from "../components/Header";
import { ColorModeContext, tokens } from "../theme";
import CircularProgressBar from "../components/CircularProgressBar";
import ErrorBar from "../components/ErrorBar";

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { user, isLoading, isError, isSuccess, message } = useSelector(
        (state) => state.auth
    );

    useEffect(() => {

        if (isSuccess || user) {
            navigate('/')
        }

        dispatch(reset())
    }, [user, isError, isSuccess, message, navigate, dispatch])

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const colorMode = useContext(ColorModeContext);

    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => setShowPassword(!showPassword);

    const handleFormSubmit = (values) => {
        dispatch(login(values))
    };

    if (isLoading) {
        return (
            <Box m="20px" justifyContent="center" display="flex">
                <CircularProgressBar />
            </Box>
        );
    } else {

        return (

            <Container maxWidth="sm" sx={{ backgroundColor: colors.primary[400], borderRadius: '5%' }}>
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                    }}
                >
                    <ErrorBar isOpen={isError} title={"Connector Form"} message={message} />

                    <IconButton sx={{ m: 3 }} onClick={colorMode.toggleColorMode}>
                        {theme.palette.mode === "dark" ? (
                            <DarkModeOutlinedIcon />
                        ) : (
                            <LightModeOutlinedIcon />
                        )}
                    </IconButton>

                    <CssBaseline />

                    <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                        <LockOutlinedIcon />
                    </Avatar>

                    <Header title="Sign In" subtitle="" />

                    <Formik
                        onSubmit={handleFormSubmit}
                        initialValues={initialValues}
                        validationSchema={checkoutSchema}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleBlur,
                            handleChange,
                            handleSubmit,
                        }) => (
                            <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="email"
                                    label="username"
                                    name="username"
                                    autoComplete="username"

                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.username}
                                    error={!!touched.username && !!errors.username}
                                    helperText={touched.username && errors.username}
                                />
                                <TextField
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type={showPassword ? "text" : "password"}
                                    id="password"
                                    autoComplete="current-password"

                                    InputProps={{ // <-- This is where the toggle button is added.
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={handleClickShowPassword}
                                                >
                                                    {showPassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        )
                                    }}

                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.password}
                                    error={!!touched.password && !!errors.password}
                                    helperText={touched.password && errors.password}
                                />

                                <Button
                                    type="submit"
                                    fullWidth
                                    color="secondary"
                                    variant="contained"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Sign In
                                </Button>

                            </Box>

                        )}
                    </Formik>
                </Box>
                <Copyright sx={{ m: 3, p: 3 }} />
            </Container>

        );
    }
}


const checkoutSchema = yup.object().shape({
    username: yup.string().required("required"),
    password: yup.string().required("required"),
});

const initialValues = {
    username: "",
    password: "",
};

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit" href="#">
                Ben Salem Mohamed Amine
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

export default SignIn;