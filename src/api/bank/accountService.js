import axios from "axios";

const API_URL = "http://localhost:8095/api/v1";

// add saving account
const addSavingAccount = async (data, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL + "/accounts/saving", data, config);
    return response.data;
};

// add current account
const addCurrentAccount = async (data, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL + "/accounts/current", data, config);
    return response.data;
};

// get all accounts
const getAllAccounts = async (customerId, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL +
        "/clients/" +
        customerId +
        "/accounts",
        config);
    return response.data;
};

// get account
const getAccount = async (data, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL +
        "/clients/" +
        data.customerId +
        "/accounts/" +
        data.accountid.trim(),
        config);
    return response.data;
};

// debit
const debit = async (data, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL + "/accounts/debit", data, config);
    return response.data;
};

// credit
const credit = async (data, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL + "/accounts/credit", data, config);
    return response.data;
};

// transfer
const transfer = async (data, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL + "/accounts/transfer", data, config);
    return response.data;
};

const accountService = {
    addSavingAccount,
    addCurrentAccount,
    getAllAccounts,
    getAccount,
    debit,
    credit,
    transfer
}

export default accountService;