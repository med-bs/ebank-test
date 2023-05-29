import axios from "axios";

const API_URL = "http://localhost:8095/api/v1";

// get account history
const getAccountHistoryPage = async (data, token) => {

    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    };

    const response = await axios.get(
        API_URL +
        "/clients/" +
        data.customerId+
        "/accounts/" +
        data.accountId+
        "/pageOperations/?page=" +
        data.page +
        "&size=" +
        data.size,
        config);

    return response.data;
};

const operationHistoryService = {
    getAccountHistoryPage
}

export default operationHistoryService;