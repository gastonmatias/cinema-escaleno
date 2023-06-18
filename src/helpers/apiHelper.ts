import axios, { AxiosResponse } from "axios"

//apply base url for axios
const API_URL = 'https://api.themoviedb.org/3'

const axiosApi = axios.create({
  baseURL: API_URL,
})

axiosApi.interceptors.request.use(function (config) {
    const api_key = process.env.NEXT_PUBLIC_API_KEY
    config.headers["Authorization"] = api_key
    return config
})

export const getAxios = async (url: string, config = {}): Promise<any> => {
  try {
    const response: AxiosResponse = await axiosApi.get(url, { ...config });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const get = async (url: string, config = {}): Promise<any> => {
  try {
    const response: AxiosResponse = await axiosApi.get(url, { ...config });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};
