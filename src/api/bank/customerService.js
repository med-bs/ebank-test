import axios from "axios";

const API_URL = "http://localhost:8095/api/v2";

// get all customers
const getAllCustomers = async (token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL + "/clients", config);

    return response.data;
};

// add customer
const addCustomer = async (data, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.post(API_URL + "/clients/", data, config);
    return response.data;
};

// update customer
const updateCustomer = async (data, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.put(API_URL + "/clients/" + data.id.trim(), data, config);
    return response.data;
};

// get customer
const getCustomer = async (data, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(API_URL + "/clients/" + data.trim(), config);
    return response.data;
};

// delete customer
const deleteCustomer = async (data, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.delete(API_URL + "/clients/" + data.trim(), config);
    return response.data;
};

const CustomerService = {
    getAllCustomers,
    getCustomer,
    addCustomer,
    updateCustomer,
    deleteCustomer
};

export default CustomerService;