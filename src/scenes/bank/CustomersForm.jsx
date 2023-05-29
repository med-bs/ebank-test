import { Box, Button, TextField } from "@mui/material";
import { Formik } from "formik";
import * as yup from "yup";
import useMediaQuery from "@mui/material/useMediaQuery";
import Header from "../../components/Header";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import CircularProgressBar from "../../components/CircularProgressBar";
import ErrorBar from "../../components/ErrorBar";
import { createCustomer, reset } from "../../api/bank/customerSlice";
import { useEffect } from "react";

const CustomerForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { isErrorCus, isLoadingCus, isSuccessCus, messageCus } = useSelector(
        (state) => state.customers
    );

    useEffect(() => {
        if (!isErrorCus) {
            dispatch(reset());
        }
    }, [isErrorCus, isSuccessCus, messageCus, dispatch])

    const isNonMobile = useMediaQuery("(min-width:600px)");

    const handleFormSubmit = (values) => {
        const data = { name: values.firstName + " " + values.lastName, email: values.email }

        dispatch(createCustomer(data)).then(() => {
            if (!isErrorCus) {
                navigate('/');
            }
        });
    };

    if (isLoadingCus) {
        return (
            <Box m="20px" justifyContent="center" display="flex">
                <CircularProgressBar />
            </Box>
        );
    } else {

        return (

            <Box m="20px">
                <Header title="CREATE CUSTOMER" subtitle="Create a New Customer Profile" />

                <ErrorBar isOpen={isErrorCus} title={"Customer Form"} message={messageCus} />

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
                        <form onSubmit={handleSubmit}>
                            <Box
                                display="grid"
                                gap="30px"
                                gridTemplateColumns="repeat(4, minmax(0, 1fr))"
                                sx={{
                                    "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
                                }}
                            >
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="First Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.firstName}
                                    name="firstName"
                                    error={!!touched.firstName && !!errors.firstName}
                                    helperText={touched.firstName && errors.firstName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Last Name"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.lastName}
                                    name="lastName"
                                    error={!!touched.lastName && !!errors.lastName}
                                    helperText={touched.lastName && errors.lastName}
                                    sx={{ gridColumn: "span 2" }}
                                />
                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email}
                                    name="email"
                                    error={!!touched.email && !!errors.email}
                                    helperText={touched.email && errors.email}
                                    sx={{ gridColumn: "span 4" }}
                                />

                                <TextField
                                    fullWidth
                                    variant="filled"
                                    type="text"
                                    label="Confirm Email"
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    value={values.email2}
                                    name="email2"
                                    error={!!touched.email2 && !!errors.email2}
                                    helperText={touched.email2 && errors.email2}
                                    sx={{ gridColumn: "span 4" }}
                                />

                                <Button
                                    type="submit"
                                    color="secondary"
                                    variant="contained"
                                    sx={{ gridColumn: "span 4" }}
                                >
                                    Create New Customer
                                </Button>

                            </Box>

                        </form>
                    )}
                </Formik>
            </Box>
        );
    }
}

const checkoutSchema = yup.object().shape({
    firstName: yup.string().required("required"),
    lastName: yup.string().required("required"),
    email: yup.string().email("invalid email").required("required"),
    email2: yup.string()
        .email("invalid email")
        .oneOf([yup.ref('email'), null], "Email Does not match !")
        .required("required")
});

const initialValues = {
    firstName: "",
    lastName: "",
    email: "",
    email2: ""
};

export default CustomerForm;