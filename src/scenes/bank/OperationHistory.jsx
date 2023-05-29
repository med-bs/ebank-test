import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { Box, Pagination, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CircularProgressBar from "../../components/CircularProgressBar";
import { getAccountHistoryPage, reset } from "../../api/bank/operationHistorySlice";
import ErrorBar from "../../components/ErrorBar";
import AccountHeader from "../../components/bank/AccountHeader";


const OperationHistory = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const dispatch = useDispatch();

    let { customerId, accountId } = useParams();

    const { accountHistory, isErrorOpHis, isLoadingOpHis, messageOpHis } = useSelector(
        (state) => state.accountHistory
    );

    const [requestHistory, setRequestHistory] = useState({
        accountId, customerId, page: 0, size: 10
    })

    const handleChange = (e, value) => {
        setRequestHistory({ ...requestHistory, page: value - 1 });
        dispatch(getAccountHistoryPage(requestHistory));
    };

    useEffect(() => {

        dispatch(getAccountHistoryPage(requestHistory));

        if (!isErrorOpHis) {
            dispatch(reset())
        }


    }, [dispatch, requestHistory, isErrorOpHis])

    if (isLoadingOpHis) {
        return (
            <Box m="20px" justifyContent="center" display="flex">
                <CircularProgressBar />
            </Box>
        );
    } else {
        return (
            <Box
                gridColumn="span 5"
                gridRow="span 2"
                backgroundColor={colors.primary[400]}
                overflow="auto"
                margin="10px"
            >
                <AccountHeader title={"Account Operations History"} customerId={customerId} accountId={accountId}/>

                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    borderBottom={`4px solid ${colors.primary[500]}`}
                    colors={colors.grey[100]}
                    p="10px"
                >
                    <Pagination count={accountHistory?.totalPages} page={requestHistory.page + 1} onChange={handleChange} variant="outlined" />

                </Box>

                {accountHistory?.accountOperationDTOS?.map((transaction, i) => (
                    <Box
                        key={`${transaction.id}-${i}`}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom={`4px solid ${colors.primary[500]}`}
                        p="10px"
                    >

                        <Box>
                            <Typography
                                color={
                                    transaction.type === "DEBIT" ?
                                        colors.redAccent[500] :
                                        colors.greenAccent[500]
                                }
                                variant="h5"
                                fontWeight="600"
                            >
                                {transaction.type}
                            </Typography>
                            <Typography color={colors.grey[100]}>
                                {transaction.description}
                            </Typography>
                        </Box>
                        <Box color={colors.grey[100]}>{new Date(transaction.operationDate).toLocaleString('en-US')}</Box>
                        <Box
                            backgroundColor={
                                transaction.type === "DEBIT" ?
                                    colors.redAccent[500] :
                                    colors.greenAccent[500]
                            }
                            p="5px 10px"
                            borderRadius="4px"
                        >
                            ${transaction.amount}
                        </Box>
                    </Box>
                ))}
                <ErrorBar isOpen={isErrorOpHis} title={"Operation History"} message={messageOpHis} />
            </Box>
        );
    }
}

export default OperationHistory;