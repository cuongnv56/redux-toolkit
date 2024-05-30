import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

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

export interface Products {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    discountPercentage: number;
    rating: number;
    stock: number;
    tags: any[];
    brand: string;
    sku: string;
    weight: number;
    dimensions?: any;
}

export interface UserObj {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export interface ApiConfig {
    baseUrl?: string;
    axiosCall?: typeof axios;
}

export interface ResponseStatus {
    code: number;
    message?: string;
}

// export interface ResponseStatus {
//     status: number;
//     statusText?: string;
// }

export interface HttpResponse<D extends unknown, RS extends ResponseStatus> extends AxiosResponse {
    data: D;
    responseStatus?: RS;
}

export class HttpClient<D = any, T = AxiosRequestConfig<D>> {
    private baseUrl: string = "https://api.realworld.io/api/"
    private axiosCall = (config: AxiosRequestConfig) => axios.request(config);

    // private axiosCall = (config: AxiosRequestConfig) => {
    //     return axios.request(config);

    //     const instance: AxiosInstance = axios.create({
    //         baseURL: this.baseUrl,
    //         headers: {
    //             'Content-Type': 'application/json',
    //         },
    //     })
        
    //     instance.interceptors.request.use(
    //         async function (config: any) {
    //             const accessToken = localStorage.getItem('accessToken');
        

    //             config.headers = {
    //                 ...config.headers,
    //                 Authorization: `Bearer ${accessToken}`,
    //             };

    //             // if (requiredAuth && !hasToken) {
    //             // config.cancelToken = new axios.CancelToken((cancel) =>
    //             //     cancel('Cancel private request but not login'),
    //             // );
    //         //     throw new axios.Cancel('Missing token');
    //         // }
    //             return config
    //         },
    //         function (error) {
    //             return Promise.reject(error)
    //         },
    //     )
    
    //     instance.interceptors.response.use(
    //         function (response) {
    //             return response.data
    //         },
    //         async function (error: AxiosError) {
    //             return Promise.reject(error)
    //         },
    //     )
    
    //     return instance.request(config)
    // }

    constructor(apiConfig: T) {
        Object.assign(this, apiConfig);
    }

    public request = async <R = any, RS extends ResponseStatus = ResponseStatus>({
        url,
        method,
        baseUrl,
        params,
        data,
    // }: any): Promise<AxiosResponse> => {
    }: any): Promise<HttpResponse<R, RS>> => {
        const config = {
            method: method,
            url: `${baseUrl || this.baseUrl}${url}`,
            ...(params && { params: params }),
            ...(data && { data: data })
        }

        return await this.axiosCall(config)
        .then(response => {
            const result = response as HttpResponse<R, RS>
            result.data = response?.data as unknown as R;
            result.responseStatus = {
                code: response?.status,
                message: response?.statusText,
            } as unknown as RS;

            return result
        });

        // return new Promise<boolean>((resolve, reject) => {
        //     resolve(res.data.success);
        //   });
        
        // return Promise.resolve(res.data.success);
    }
}

export class Api extends HttpClient<AxiosRequestConfig> {
    users = {
        login: (
            user: LoginUser
        ) => {
            this.request<
                {
                    products: UserObj,
                },
                ResponseStatus
            >({
                url: `products`,
                method: "GET",
            })
        }
    }
    products = {
        fetch: () => {
            return this.request<
                UserObj,
                ResponseStatus
            >({
                url: `todos/1`,
                method: "GET",
            })
        }
    }
}
