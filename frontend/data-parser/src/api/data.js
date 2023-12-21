import axios from "axios";


const isProduction = process.env.NODE_ENV === "production";

const URL = isProduction
  ? process.env.REACT_APP_URL
  : "http://localhost:3000";

export const createCounty = (data) => {
  return axios.post(`${URL}/data/county`, data);
};

export const getData = () => {
  return axios.get(`${URL}/data`);
};

export const uploadAddress = (data) => {
  return axios.post(`${URL}/data/upload/address`, data);
};

export const uploadOwnership = (data) => {
  return axios.post(`${URL}/data/upload/ownership`, data);
};

export const parseAddress = (data) => {
  return axios.post(`${URL}/data/parse/address`, data);
};

export const parseOwnership = (data) => {
  return axios.post(`${URL}/data/parse/ownership`, data);
};

export const deleteAddress = (data) => {
  return axios.post(`${URL}/data/delete/address`, data);
};

export const deleteOwnership = (data) => {
  return axios.post(`${URL}/data/delete/ownership`, data);
};

export const getFieldAddress = (data) => {
  return axios.post(`${URL}/data/fields/address`, data);
};

export const getFieldOwner = (data) => {
  return axios.post(`${URL}/data/fields/owner`, data);
};

export const search = (data, page, size) => {
  return axios.post(`${URL}/data/search?page=${page}&size=${size}`, data);
};

export const searchZip = (data,page, size) => {
  return axios.post(
    `${URL}/data/search/zipcode?page=${page}&size=${size}`,
    data
  );
};

export const getOwnerById = (data) => {
  return axios.post(`${URL}/data/getOwnerById`, data);
};

export const getUser = (data) => {
  return axios.get("https://graph.microsoft.com/v1.0/me", {
    headers: {
      Authorization: `Bearer ${data}`,
    },
  });
};

export const deleteCounty =  (data) =>{
  return axios.post(`${URL}/data/delete`, data);
}
