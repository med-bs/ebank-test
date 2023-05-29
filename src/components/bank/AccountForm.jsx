import { Typography, Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { BottomNavigation, BottomNavigationAction, Button, TextField } from "@mui/material";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addCurrentAccount, addSavingAccount } from "../../api/bank/accountSlice";
import ErrorBar from "../ErrorBar";

const AccountForm = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const dispatch = useDispatch();

    let { customerId } = useParams();

    const { isErrorAcc, messageAcc } = useSelector(
        (state) => state.accounts
    );

    const [value, setValue] = useState(0);

    const handleSubmitCurrent = (values, { resetForm }) => {
        dispatch(addCurrentAccount({ ...values, balance: values.balance1, clientDTO: { id: customerId } }));
        // Reset the form fields
        resetForm()
    }
    const handleSubmitSaving = (values, { resetForm }) => {
        dispatch(addSavingAccount({ ...values, clientDTO: { id: customerId } }))
        // Reset the form fields
        resetForm();
    }

    const checkoutSavingSchema = yup.object().shape({
        interestRate: yup.number("must be number")
            .positive("must be positive")
            .required("required"),
        balance: yup.number("must be number")
            .positive("must be positive")
            .required("required")
    });

    const checkoutCurrentSchema = yup.object().shape({
        overDraft: yup.number("must be number")
            .positive("must be positive")
            .required("required"),
        balance1: yup.number("must be integer")
            .integer("must be integer")
            .positive("must be positive")
            .required("required")
    });

    const accountform = [
        (
            <Formik
                onSubmit={handleSubmitSaving}
                initialValues={initialSavingValues}
                validationSchema={checkoutSavingSchema}
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
                                "& > div": "span 4",
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="balance"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.balance}
                                name="balance"
                                error={!!touched.balance && !!errors.balance}
                                helperText={touched.balance && errors.balance}
                                sx={{ gridColumn: "span 4" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Interest Rate"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.interestRate}
                                name="interestRate"
                                error={!!touched.interestRate && !!errors.interestRate}
                                helperText={touched.interestRate && errors.interestRate}
                                sx={{ gridColumn: "span 4" }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ gridColumn: "span 4", bgcolor: colors.greenAccent[500] }}
                            >
                                Create Saving Account
                            </Button>

                        </Box>

                    </form>
                )}
            </Formik>
        ),
        (
            <Formik
                onSubmit={handleSubmitCurrent}
                initialValues={initialCurrentValues}
                validationSchema={checkoutCurrentSchema}
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
                                "& > div": "span 4",
                            }}
                        >
                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Balance"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.balance1}
                                name="balance1"
                                error={!!touched.balance1 && !!errors.balance1}
                                helperText={touched.balance1 && errors.balance1}
                                sx={{ gridColumn: "span 4" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Over Draft"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.overDraft}
                                name="overDraft"
                                error={!!touched.overDraft && !!errors.overDraft}
                                helperText={touched.overDraft && errors.overDraft}
                                sx={{ gridColumn: "span 4" }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ gridColumn: "span 4", bgcolor: colors.redAccent[500] }}
                            >
                                Create Current Account
                            </Button>

                        </Box>

                    </form>
                )}
            </Formik>
        )
    ];

    return (
        <Box
            gridColumn="span 4"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
        >
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                colors={colors.grey[100]}
                p="15px"
            >
                <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                    Create Account
                </Typography>
            </Box>

            <Box
                borderBottom={`4px solid ${colors.primary[500]}`}
                colors={colors.grey[100]}
            >
                <BottomNavigation
                    showLabels
                    value={value}
                    onChange={(event, newValue) => {
                        setValue(newValue);
                    }}

                >
                    <BottomNavigationAction sx={{ bgcolor: colors.greenAccent[500], margin: "3px" }} label="Saving" />
                    <BottomNavigationAction sx={{ bgcolor: colors.redAccent[500], margin: "3px" }} label="Current" />
                </BottomNavigation>
            </Box>
            <Box m="20px">
                {accountform[value]}
                <ErrorBar isOpen={isErrorAcc} title={"Account Form"} message={messageAcc} />
            </Box>
        </Box>
    );
};

const initialSavingValues = {
    //accountId:
    balance: 0,
    interestRate: 0
};

const initialCurrentValues = {
    //accountId:
    balance1: 1,
    overDraft: 0
};

export default AccountForm;