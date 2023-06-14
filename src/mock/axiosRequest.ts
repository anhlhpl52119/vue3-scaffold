import axios from 'axios';
import type { AxiosRequestConfig, AxiosError, AxiosResponse } from 'axios';
import { localStore } from '@/utils/Storage';
import { EAuthKey } from '@/enums/cache';
import { uniqueSlash } from '@/utils/urlUtils';
interface RequestOptions {
    /** Whether to get data directly, while ignoring message, etc. */
    isGetDataDirectly?: boolean;
    /** Mark this api is authenication api => "api/authen..."" */
    isAuth?: boolean;
    /** Request success is a prompt message */
    successMsg?: string;
    /** Request failure is a prompt message */
    errorMsg?: string;
    /** Role codes can be excute this request */
    permitRoleCode?: string[];
}
const UNKNOWN_ERROR = 'Unknow error';

//TODO: config env to direct file .env
const VITE_BASE_MOCK = '/api/v1/';
const VITE_BASE_AUTH = '/authentication/';

const service = axios.create({
    // baseURL: baseApiUrl,
    timeout: 150000, // 3 mins
});

service.interceptors.request.use(
    (config) => {
        const token = localStore.get(EAuthKey.AccessToken);
        if (token && config.headers) {
            config.headers['Authorization'] = token;
        }
        return config;
    },
    (error) => {
        Promise.reject(error);
    }
);

service.interceptors.response.use(
    (response: AxiosResponse) => {
        const res = response.data;
        // if the custom code is not 200, it is judged as an error
        if (response.status !== 200) {
            //FIXME: when excuting an API "AUTH verryfy" will throuth an sync message with overlayed before success message
            // message.error(res.messages[0] || UNKNOWN_ERROR);
            //TODO: "unauthenthicated status 401" through common message
            const error = new Error(
                res.messages[0] || UNKNOWN_ERROR
            ) as Error & {
                code: any;
            };
            error.code = res.code;
            return Promise.reject(error); //=> pass to Error hooks.
        } else {
            return res; // continue with response data
        }
    },
    (error: AxiosError<{ messages: string[] }>) => {
        // nếu Error không có data từ serser trả về & ko có 'errorMsg' => Lỗi ko xác định
        // const errMsg = error?.response?.data.messages ?? UNKNOWN_ERROR;
        // message.error(errMsg);
        return Promise.reject(error);
    }
);

/**
 * @param config axios config
 * @param options axios option
 * @returns {string} return url + object params in string
 */
export const request = async <T>(
    config: AxiosRequestConfig,
    options: RequestOptions = {}
): Promise<T> => {
    const {
        isAuth = false,
        isGetDataDirectly = true,
        // successMsg,
        // errorMsg,
    } = options;
    try {
        const targetURL = isAuth ? VITE_BASE_AUTH : VITE_BASE_MOCK;
        config.url = uniqueSlash(`${targetURL + config.url}`);
        const response = await service.request(config);
        // successMsg && message.success(successMsg);
        return isGetDataDirectly ? response.data : response;
    } catch (error: any) {
        // errorMsg && message.error(errorMsg);
        return Promise.reject(error);
    }
};
