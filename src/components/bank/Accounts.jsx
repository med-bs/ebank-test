import { useTheme } from "@emotion/react";
import { tokens } from "../../theme";
import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import HistoryToggleOffOutlinedIcon from '@mui/icons-material/HistoryToggleOffOutlined';
import PriceChangeOutlinedIcon from '@mui/icons-material/PriceChangeOutlined';
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { getAllAccounts } from "../../api/bank/accountSlice";
import CircularProgressBar from "../CircularProgressBar";
import ErrorBar from "../ErrorBar";


const Accounts = ({ custumerId }) => {

    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const { accounts, isErrorAcc, isLoadingAcc, messageAcc } = useSelector(
        (state) => state.accounts
    );

    const viewHistory = (account) => {
        navigate("/accounts/" + account.clientDTO.id + "/" + account.id)
    }

    const viewAccount = (account) => {
        navigate("/operations/" + account.clientDTO.id + "/" + account.id)
    }

    useEffect(() => {

        if (!isNaN(custumerId)) {
            dispatch(getAllAccounts(custumerId));
        }
    }, [custumerId, dispatch])

    if (isLoadingAcc) {
        return (
            <Box m="20px" justifyContent="center" display="flex">
                <CircularProgressBar />
            </Box>
        );
    } else {

        const columns = [
            { field: "id", headerName: "ID" },
            {
                field: "type",
                headerName: "Type",
                headerAlign: "center",
                flex: 1,
                renderCell: (row) => {
                    return (
                        <Box
                            width="60%"
                            m="0 auto"
                            p="5px"
                            display="flex"
                            justifyContent="center"
                            borderRadius="4px"
                        >
                            <Typography
                                color={
                                    row.row.type === "SavingAccount" ?
                                        colors.greenAccent[500] :
                                        colors.redAccent[500]
                                }
                                variant="h5"
                                fontWeight="600"
                            >
                                {row.row.type}
                            </Typography>
                        </Box>
                    );
                },
            },
            {
                field: "createdAt",
                headerName: "Created at",
                headerAlign: "center",
                flex: 1,
                renderCell: (row) => {
                    return (
                        <Box
                            width="60%"
                            m="0 auto"
                            p="5px"
                            display="flex"
                            justifyContent="center"
                            borderRadius="4px"
                        >
                            <Typography
                                color={colors.grey[100]}
                                variant="h5"
                                fontWeight="600"
                            >
                                {new Date(row.row.createdAt).toLocaleString('fr')}
                            </Typography>
                        </Box>
                    );
                },
            },
            {
                field: "balance",
                headerName: "Balance",
                headerAlign: "center",
                flex: 1,
                renderCell: (row) => {
                    return (
                        <Box
                            width="60%"
                            m=" auto"
                            p="5px"
                            display="flex"
                            justifyContent="center"
                            borderRadius="4px"
                            backgroundColor={
                                row.row.type === "SavingAccount" ?
                                    colors.greenAccent[500] :
                                    colors.redAccent[500]
                            }
                        >
                            ${row.row.balance}
                        </Box>
                    );
                },
            },
            {
                field: "op",
                headerName: "Operation",
                headerAlign: "center",
                flex: 1,
                renderCell: (row) => {
                    return (
                        <Box
                            width="60%"
                            m=" auto"
                            p="5px"
                            display="flex"
                            justifyContent="center"
                            borderRadius="4px"
                        >
                            <Button onClick={() => { viewAccount(row.row) }}>
                                <PriceChangeOutlinedIcon style={{ color: colors.grey[100] }} />
                            </Button>
                            <Button onClick={() => { viewHistory(row.row) }}>
                                <HistoryToggleOffOutlinedIcon style={{ color: colors.grey[100] }} />
                            </Button>
                        </Box>
                    );
                },
            },
        ];

        return (
            <Box
                gridColumn="span 8"
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
                    p="10px"
                >
                    <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
                        Accounts List
                    </Typography>
                </Box>
                <Box
                    height="74vh"
                    sx={{
                        "& .MuiDataGrid-root": {
                            border: "none",
                        },
                        "& .MuiDataGrid-cell": {
                            borderBottom: "none",
                        },
                        "& .name-column--cell": {
                            color: colors.greenAccent[300],
                        },
                        "& .MuiDataGrid-columnHeaders": {
                            backgroundColor: colors.blueAccent[700],
                            borderBottom: "none",
                        },
                        "& .MuiDataGrid-virtualScroller": {
                            backgroundColor: colors.primary[400],
                        },
                        "& .MuiDataGrid-footerContainer": {
                            borderTop: "none",
                            backgroundColor: colors.blueAccent[700],
                        },
                        "& .MuiCheckbox-root": {
                            color: `${colors.greenAccent[200]} !important`,
                        },
                        "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                            color: `${colors.grey[100]} !important`,
                        },
                    }}
                >
                    <DataGrid
                        rows={accounts}
                        columns={columns}
                        components={{ Toolbar: GridToolbar }}
                        pageSize={10}
                    />
                </Box>
                <ErrorBar isOpen={isErrorAcc} title={"Accounts list"} message={messageAcc} />

            </Box>
        );
    }
}

export default Accounts;