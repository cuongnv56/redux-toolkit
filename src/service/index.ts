import { AxiosRequestConfig } from "axios";
import { Api } from "./api";

export const api = new Api({
    baseUrl: `https://jsonplaceholder.typicode.com/`
} as AxiosRequestConfig )