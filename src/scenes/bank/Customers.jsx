import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AccountBalanceWalletOutlinedIcon from '@mui/icons-material/AccountBalanceWalletOutlined';
import Header from "../../components/Header";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllCustomers, reset } from "../../api/bank/customerSlice";
import { useEffect } from "react";
import CircularProgressBar from "../../components/CircularProgressBar";
import ErrorBar from "../../components/ErrorBar";

const Customers = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { customers, isErrorCus, isLoadingCus, messageCus } = useSelector(
        (state) => state.customers
    );

    const handelAccount = (data) => {
        navigate("/operations/" + data);
    }

    useEffect(() => {

        dispatch(getAllCustomers());

        if (isErrorCus) {
            dispatch(reset());
        }

    }, [isErrorCus, messageCus, dispatch])

    if (isLoadingCus) {
        return (
            <Box m="20px" justifyContent="center" display="flex">
                <CircularProgressBar />
            </Box>
        );
    } else {

        const columns = [
            { field: "id", headerName: "ID" },
            {
                field: "name",
                headerName: "Name",
                flex: 1,
                cellClassName: "name-column--cell",
            },
            {
                field: "email",
                headerName: "Email",
                flex: 1,
            },
            {
                field: "account",
                headerName: "Accounts",
                headerAlign: "center",
                flex: 1,
                renderCell: ({ row: { id } }) => {
                    return (
                        <Box
                            width="60%"
                            m="0 auto"
                            p="5px"
                            display="flex"
                            justifyContent="center"
                            backgroundColor={colors.greenAccent[700]}
                            borderRadius="4px"
                        >
                            <IconButton onClick={() => handelAccount(id)}>
                                <Typography color={colors.grey[100]} sx={{ mr: "5px" }}>
                                    View Accounts
                                </Typography>
                                <AccountBalanceWalletOutlinedIcon />
                            </IconButton>

                        </Box>
                    );
                },
            },
        ];

        return (
            <Box m="20px">
                <Header title="CUSTOMERS" subtitle="Managing the Bank's Customers" />

                <ErrorBar isOpen={isErrorCus} title={"Customer List"} message={messageCus} />

                <Box
                    m="40px 0 0 0"
                    height="75vh"
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
                        rows={customers}
                        columns={columns}
                        components={{ Toolbar: GridToolbar }}
                        pageSize={10}
                    />
                </Box>
            </Box>
        );
    }
};

export default Customers;
