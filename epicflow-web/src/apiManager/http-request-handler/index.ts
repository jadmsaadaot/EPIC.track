import axios from 'axios';
import UserService from '../../services/userService';

const GetRequest = <T>(url: string, params = {}, headers = {}) => {
  return axios.get<T>(url, {
    params: params,
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${UserService.getToken() || window.localStorage.getItem('authToken')}`,
      ...headers,
    },
  });
};

const PostRequest = <T>(url: string, data = {}, params = {}, config = {}) => {
  return axios.post<T>(url, data, {
    params,
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${UserService.getToken() || window.localStorage.getItem('authToken')}`,
    },
    ...config
  });
};

const PutRequest = <T>(url: string, data = {}, params = {}) => {
  return axios.put<T>(url, data, {
    params,
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${UserService.getToken() || window.localStorage.getItem('authToken')}`,
    },
  });
};

const PatchRequest = <T>(url: string, data = {}) => {
  return axios.patch<T>(url, data, {
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${UserService.getToken() || window.localStorage.getItem('authToken')}`,
    },
  });
};

const DeleteRequest = <T>(url: string, params = {}) => {
  return axios.delete<T>(url, {
    params: params,
    headers: {
      'Content-type': 'application/json',
      Authorization: `Bearer ${UserService.getToken() || window.localStorage.getItem('authToken')}`,
    },
  });
};

interface OSSRequestOptions {
  amzDate: string;
  authHeader: string;
}
export const OSSGetRequest = <T>(url: string, requestOptions: OSSRequestOptions) => {
  return axios.get<T>(url, {
    headers: {
      'X-Amz-Date': requestOptions.amzDate,
      Authorization: requestOptions.authHeader,
    },
    responseType: 'blob',
  });
};

export const OSSPutRequest = <T>(url: string, data: File, requestOptions: OSSRequestOptions) => {
  return axios.put<T>(url, data, {
    headers: {
      'X-Amz-Date': requestOptions.amzDate,
      Authorization: requestOptions.authHeader,
    },
  });
};
export default {
  GetRequest,
  PostRequest,
  PutRequest,
  PatchRequest,
  DeleteRequest,
  OSSGetRequest,
  OSSPutRequest,
};
