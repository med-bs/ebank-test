import { Box } from "@mui/material";
import Header from "../../components/Header";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import CircularProgressBar from "../../components/CircularProgressBar";
import ErrorBar from "../../components/ErrorBar";
import { getCustomer, reset } from "../../api/bank/customerSlice";
import Accounts from "../../components/bank/Accounts";
import AccountForm from "../../components/bank/AccountForm";

const Operations = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { customer, isErrorCus, isLoadingCus, messageCus } = useSelector(
        (state) => state.customers
    );

    let { customerId } = useParams();

    useEffect(() => {

        dispatch(getCustomer(customerId));

        if (isErrorCus) {
            dispatch(reset());
            navigate('/customers')
        }

    }, [customerId, navigate, isErrorCus, messageCus, dispatch])

    if (isLoadingCus) {
        return (
            <Box m="20px" justifyContent="center" display="flex">
                <CircularProgressBar />
            </Box>
        );
    } else {

        return (
            <Box m="20px">
                {/* HEADER */}
                <Box display="flex" justifyContent="space-between" alignItems="center">

                    <Header title={customer?.name} subtitle={customer?.email} />

                </Box>

                <ErrorBar isOpen={isErrorCus} title={"Customer Operation"} message={messageCus} />

                {/* GRID & CHARTS */}
                <Box
                    display="grid"
                    gridTemplateColumns="repeat(12, 1fr)"
                    gridAutoRows="390px"
                    gap="15px"
                >

                    <Accounts custumerId={customer?.id} />

                    <AccountForm />

                </Box>
            </Box>
        );
    }
};

export default Operations;
