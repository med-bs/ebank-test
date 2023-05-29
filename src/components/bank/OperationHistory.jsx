import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { Box, Pagination, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import CircularProgressBar from "../CircularProgressBar";
import { getAccountHistoryPage, reset } from "../../api/bank/operationHistorySlice";
import ErrorBar from "../ErrorBar";


const OperationHistory = ({ requestHistory }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const dispatch = useDispatch();

    const { accountHistory, isErrorOpHis, isLoadingOpHis, messageOpHis } = useSelector(
        (state) => state.accountHistory
    );

    const [page, setPage] = useState(1);
    const handleChange = (e, value) => {
        setPage(value);
        const data = { ...requestHistory, accountId: requestHistory.accountId.id, page: value - 1 }
        dispatch(getAccountHistoryPage(data));
    };

    useEffect(() => {

        if (!isNaN(requestHistory.customerId)) {
            const data = { ...requestHistory, accountId: requestHistory.accountId.id }
            dispatch(getAccountHistoryPage(data));
        }

        if(!isErrorOpHis){
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
                        Account Operations History
                    </Typography>

                </Box>

                <Box
                    key={`${requestHistory?.accountId?.id}`}
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    borderBottom={`4px solid ${colors.primary[500]}`}
                    p="15px"
                >
                    <Box>
                        <Typography
                            color={
                                requestHistory?.accountId?.type === "SavingAccount" ?
                                    colors.greenAccent[500] :
                                    colors.redAccent[500]
                            }
                            variant="h5"
                            fontWeight="600"
                        >
                            {requestHistory?.accountId?.type}
                        </Typography>
                        <Typography color={colors.grey[100]}>
                            {requestHistory?.accountId?.id}
                        </Typography>
                    </Box>
                    <Box
                        backgroundColor={colors.greenAccent[500]}
                        p="5px 10px"
                        borderRadius="4px"
                    >
                        ${requestHistory?.accountId?.balance}
                    </Box>
                </Box>

                <Box
                    display="flex"
                    justifyContent="center"
                    alignItems="center"
                    borderBottom={`4px solid ${colors.primary[500]}`}
                    colors={colors.grey[100]}
                    p="10px"
                >
                    <Pagination count={accountHistory?.totalPages} page={page} onChange={handleChange} variant="outlined" />

                </Box>

                {accountHistory?.accountOperationDTOS?.map((transaction, i) => (
                    <Box
                        key={`${transaction.id}-${i}`}
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        borderBottom={`4px solid ${colors.primary[500]}`}
                        p="15px"
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