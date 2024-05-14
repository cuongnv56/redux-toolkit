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

export interface ApiConfig<SecurityDataType = unknown> {
    baseUrl?: string;
    // baseApiParams?: Omit<RequestParams, "baseUrl" | "cancelToken" | "signal">;
    // securityWorker?: (securityData: SecurityDataType | null) => Promise<RequestParams | void> | RequestParams | void;
    axiosCall?: typeof axios;
}

export class HttpClient<SecurityDataType = unknown> {
    public baseUrl: string = "https://api.realworld.io/api"
    private axiosCall = (path: string, config: AxiosRequestConfig<any>) => axios(path, config);

    constructor(apiConfig: ApiConfig<SecurityDataType> = {}) {
        Object.assign(this, apiConfig);
    }

    public request = async <T = any, E = any>({
        // body,
        // secure,
        // path,
        // type,
        // query,
        // format,
        baseUrl,
        // cancelToken,
        config,
        // ...params
      }: any): Promise<AxiosResponse<any, any>> => {
        // const secureParams =
        //   ((typeof secure === "boolean" ? secure : this.baseApiParams.secure) &&
        //     this.securityWorker &&
        //     (await this.securityWorker(this.securityData))) ||
        //   {};
        // const requestParams = this.mergeRequestParams(params, secureParams);
        // const queryString = query && this.toQueryString(query);
        // const payloadFormatter = this.contentFormatters[type || ContentType.Json];
        // const responseFormat = format || requestParams.format;
    
        return this.axiosCall(`${baseUrl || this.baseUrl || ""}${path}}`, config)
    }
}

export class Api<SecurityDataType extends unknown> extends HttpClient<SecurityDataType> {
    users = {
        login: (
            data: {
                user: LoginUser
            },
        ) => {
            this.request<
                {
                    user: User,
                },
                GenericErrorModel
            >({
                path: `/users/login`,
                method: "POST",
                body: data,
            })
        }
    }
}