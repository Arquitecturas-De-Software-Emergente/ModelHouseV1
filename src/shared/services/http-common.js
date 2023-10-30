import axios from "axios";

export const serviceManagementApi = axios.create({
  baseURL: "http://modelhouse0.westus3.cloudapp.azure.com:8081/service-management",
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${
      localStorage.getItem("account")
        ? JSON.parse(localStorage.getItem("account")).token
        : null
    }`,
  },
});

export const subscriptionPaymentApi = axios.create({
  baseURL: "http://modelhouse0.westus3.cloudapp.azure.com:8082/subscription-payment",
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${
      localStorage.getItem("account")
        ? JSON.parse(localStorage.getItem("account")).token
        : null
    }`,
  },
});

export const securityApi = axios.create({
  baseURL: "http://modelhouse0.westus3.cloudapp.azure.com:8080/security",
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${
      localStorage.getItem("account")
        ? JSON.parse(localStorage.getItem("account")).token
        : null
    }`,
  },
});

export const localApi = axios.create({
  baseURL: "http://localhost:8080/api/v1/other",
  headers: {
    "Content-type": "application/json",
    Authorization: `Bearer ${
      localStorage.getItem("account")
        ? JSON.parse(localStorage.getItem("account")).token
        : null
    }`,
  },
});

export default {
  serviceManagementApi,
  subscriptionPaymentApi,
  securityApi,
  localApi,
};
