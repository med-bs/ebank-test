import { useTheme } from "@emotion/react";
import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import { tokens } from "../../theme";
import AccountHeader from "../../components/bank/AccountHeader";
import OperationForm from "../../components/bank/OperationForm";

const AccountDetails = () => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    let { customerId, accountId } = useParams();

    return (
        <Box
            gridColumn="span 5"
            gridRow="span 2"
            backgroundColor={colors.primary[400]}
            overflow="auto"
            margin="10px"
        >
            <AccountHeader title={"Account Details"} customerId={customerId} accountId={accountId} />

            <OperationForm accountId={accountId} />

        </Box>
    )
}

export default AccountDetails