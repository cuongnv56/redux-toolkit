import axios, { AxiosRequestConfig, AxiosResponse } from 'axios'

export interface LoginUser {
    account: string,
    password: string
}

export interface User {
    email: string;
    token: string;
    username: string;
    image: string;
}

export interface HttpResponse<D extends unknown, E extends unknown = unknown> extends Response {
    data: D;
    error: E;
}

export interface GenericErrorModel {
    errors: {
        body: string[];
    };
}

export interface ApiConfig {
    baseUrl?: string;
    // baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
    // securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
    axiosCall?: typeof axios;
}

export class HttpClient<AxiosRequestConfig> {
    private _baseUrl: string = "https://api.realworld.io/api"
    private axiosCall = (config: AxiosRequestConfig) => axios.request(config);

    constructor(apiConfig: AxiosRequestConfig) {
        Object.assign(this, apiConfig);
    }

    public request = async <T = any, R = AxiosResponse<T>>({
        method,
        path,
        baseUrl,
        url
    }: any): Promise<AxiosResponse> => {
        const config: AxiosRequestConfig = {
            method: method,
            url: `${baseUrl}${path}`,
        }
        return this.axiosCall(config)
    }
}

export class Api extends HttpClient<AxiosRequestConfig> {
    users = {
        login: (
            data: {
                user: LoginUser
            },
        ) => {
            this.request<
                {
                    user: User,
                }
            >({
                url: `/users/login`,
                method: "POST"
            })
        }
    }
}