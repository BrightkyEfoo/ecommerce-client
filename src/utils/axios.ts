import axios, { AxiosError, AxiosRequestConfig } from "axios";
const axiosOpenedInstance = axios.create();
axiosOpenedInstance.defaults.headers.common["Accept"] = "application/json";

const onRequest = async (
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
  

  return {
    ...config,
    baseURL : `${process.env.NEXT_PUBLIC_API_URI}/api/v1`,
    headers : {
      ...config.headers
    } 
  } as AxiosRequestConfig;
};
const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};
axiosOpenedInstance.interceptors.request.use(onRequest as any, onRequestError);


const axiosSecuredInstance = axios.create();
axiosSecuredInstance.defaults.headers.common["Accept"] = "application/json";

const onSecureRequest = async (
  config: AxiosRequestConfig
): Promise<AxiosRequestConfig> => {
  let token:string | null = ""
  if(typeof localStorage !== 'undefined')
    token = localStorage.getItem("token")
  if(!token) token = ""
  if(!token.startsWith('Bearer ')){
    token = 'Bearer '+token
  }
  return {
    ...config,
    baseURL :  `${process.env.NEXT_PUBLIC_API_URI}/api/v1`,
    headers : {
      ...config.headers,
      Authorization: token
    } 
  } as AxiosRequestConfig;
};
const onSecureRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};
axiosOpenedInstance.interceptors.request.use(onSecureRequest as any, onSecureRequestError);

export { axiosOpenedInstance, axiosSecuredInstance };
