import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { Box, Typography } from "@mui/material"
import { getAccount } from "../../api/bank/accountSlice";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AccountHeader = ({ title, customerId, accountId }) => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const { account, isErrorAcc } = useSelector(
        (state) => state.accounts
    );

    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(() => {

        dispatch(getAccount({ customerId, accountId }));

    }, [customerId, accountId, dispatch])

    if (isErrorAcc) {
        navigate('/customers')
    }

    return (
        <div>
            <Box
                display="flex"
                justifyContent="center"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                colors={colors.grey[100]}
                p="15px"
            >
                <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                    {title}
                </Typography>

            </Box>

            <Box
                key={`${accountId}`}
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                borderBottom={`4px solid ${colors.primary[500]}`}
                p="15px"
            >
                <Box>
                    <Typography
                        variant="h5"
                        fontWeight="600"
                    >
                        Customer name:
                    </Typography>
                    <Typography
                        fontWeight="300"
                        color={colors.grey[100]}
                    >
                        {account?.clientDTO.name}
                    </Typography>
                </Box>
                <Box>
                    <Typography
                        color={
                            account?.type === "SavingAccount" ?
                                colors.greenAccent[500] :
                                colors.redAccent[500]
                        }
                        variant="h5"
                        fontWeight="600"
                    >
                        {account?.type}
                    </Typography>
                    <Typography color={colors.grey[100]}>
                        {accountId}
                    </Typography>
                </Box>
                <Box
                    backgroundColor={colors.greenAccent[500]}
                    p="5px 10px"
                    borderRadius="4px"
                >
                    ${account?.balance}
                </Box>
            </Box>
        </div>
    )
}

export default AccountHeader;