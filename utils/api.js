import { STRAPI_API_URL, STRAPI_API_TOKEN } from "./urls";

const fetchDataFromAPI = async (endpoint) => {
    const options = {
        method: "GET",
        headers: {
            Authorization: `Bearer ${STRAPI_API_TOKEN}`
        }
    };

    const response = await fetch(`${STRAPI_API_URL}${endpoint}`, options);
    const data = await response.json();
    return data;
};

export default fetchDataFromAPI;

export const makePaymentRequest = async (endpoint,payload) => {
    const res = await fetch(`${STRAPI_API_URL}${endpoint}`, {
        method: "POST",
        headers: {
            Authorization: `Bearer ${STRAPI_API_TOKEN}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify(payload)
    });

    const data = await res.json();
    return data;
}