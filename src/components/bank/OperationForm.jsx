import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { BottomNavigation, BottomNavigationAction, Box, Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Formik } from "formik";
import * as yup from "yup";
import AccountForm from "./AccountForm";
import { useDispatch, useSelector } from "react-redux";
import { credit, debit, transfer } from "../../api/bank/accountSlice";
import ErrorBar from "../ErrorBar";

const OperationForm = ({ account }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const dispatch = useDispatch();

    const { isErrorAcc, messageAcc } = useSelector(
        (state) => state.accounts
    );

    const [value, setValue] = useState(0);

    const handleSubmitDebit = (values) => {
        dispatch(debit({ ...values, accountId: account.id }));
    }
    const handleSubmitCredit = (values) => {
        dispatch(credit({ ...values, accountId: account.id }));
    }
    const handleSubmitTransfer = (values) => {
        dispatch(transfer({ ...values, accountSource: account.id }));
    }

    const checkoutDebitSchema = yup.object().shape({
        description: yup.string().required("required"),
        amount: yup.number("must be integer")
            .integer("must be integer")
            .positive("must be positive")
            .max(account?.balance, `Amount must be less than $ ${account?.balance}`)
            .required("required")
    });

    const checkoutCreditSchema = yup.object().shape({
        description: yup.string().required("required"),
        amount: yup.number("must be integer")
            .integer("must be integer")
            .positive("must be positive")
            .required("required")
    });

    const checkoutTransferSchema = yup.object().shape({
        description: yup.string().required("required"),
        amount: yup.number("must be integer")
            .integer("must be integer")
            .positive("must be positive")
            .max(account?.balance, `Amount must be less than $ ${account?.balance}`)
            .required("required"),
        accountDestination: yup.string().required("required")
            .matches(/^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/, 'Invalid accountId')
    });

    const operationform = [
        (
            <Formik
                onSubmit={handleSubmitCredit}
                initialValues={initialValues}
                validationSchema={checkoutCreditSchema}
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
                                label="Amount"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.amount}
                                name="amount"
                                error={!!touched.amount && !!errors.amount}
                                helperText={touched.amount && errors.amount}
                                sx={{ gridColumn: "span 4" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Description"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.description}
                                name="description"
                                error={!!touched.description && !!errors.description}
                                helperText={touched.description && errors.description}
                                sx={{ gridColumn: "span 4" }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ gridColumn: "span 4", bgcolor: colors.greenAccent[500] }}
                            >
                                Credit
                            </Button>

                        </Box>

                    </form>
                )}
            </Formik>
        ),
        (
            <Formik
                onSubmit={handleSubmitDebit}
                initialValues={initialValues}
                validationSchema={checkoutDebitSchema}
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
                                label="Amount"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.amount}
                                name="amount"
                                error={!!touched.amount && !!errors.amount}
                                helperText={touched.amount && errors.amount}
                                sx={{ gridColumn: "span 4" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Description"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.description}
                                name="description"
                                error={!!touched.description && !!errors.description}
                                helperText={touched.description && errors.description}
                                sx={{ gridColumn: "span 4" }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ gridColumn: "span 4", bgcolor: colors.redAccent[500] }}
                            >
                                Debit
                            </Button>

                        </Box>

                    </form>
                )}
            </Formik>
        ),
        (
            <Formik
                onSubmit={handleSubmitTransfer}
                initialValues={initialTransferValues}
                validationSchema={checkoutTransferSchema}
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
                                type="text"
                                label="Account Destination Id"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.accountDestination}
                                name="accountDestination"
                                error={!!touched.accountDestination && !!errors.accountDestination}
                                helperText={touched.accountDestination && errors.accountDestination}
                                sx={{ gridColumn: "span 4" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="number"
                                label="Amount"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.amount}
                                name="amount"
                                error={!!touched.amount && !!errors.amount}
                                helperText={touched.amount && errors.amount}
                                sx={{ gridColumn: "span 4" }}
                            />

                            <TextField
                                fullWidth
                                variant="filled"
                                type="text"
                                label="Description"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                value={values.description}
                                name="description"
                                error={!!touched.description && !!errors.description}
                                helperText={touched.description && errors.description}
                                sx={{ gridColumn: "span 4" }}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                sx={{ gridColumn: "span 4", bgcolor: colors.blueAccent[500] }}
                            >
                                Transfer
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
            <AccountForm />
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                borderTop={`4px solid ${colors.primary[500]}`}
                borderBottom={`4px solid ${colors.primary[500]}`}
                colors={colors.grey[100]}
                p="10px"
            >
                <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                    Operations
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
                    <BottomNavigationAction sx={{ bgcolor: colors.greenAccent[500], margin: "3px" }} label="CREDIT" />
                    <BottomNavigationAction sx={{ bgcolor: colors.redAccent[500], margin: "3px" }} label="DEBIT" />
                    <BottomNavigationAction sx={{ bgcolor: colors.blueAccent[500], margin: "3px" }} label="TRANSFER" />
                </BottomNavigation>
            </Box>
            <Box m="20px">

                {account?.id ? operationform[value] : (<Typography color={colors.grey[100]} textAlign="center" variant="h5" fontWeight="600">
                    Select account to do some Operations
                </Typography>)}
                <ErrorBar isOpen={isErrorAcc} title={"Operation Form"} message={messageAcc} />
            </Box>

        </Box>
    );



}

const initialValues = {
    //accountId:
    amount: 0,
    description: ""
};

const initialTransferValues = {
    //"accountSource": "string",
    accountDestination: "",
    amount: 0,
    description: ""
};


export default OperationForm;