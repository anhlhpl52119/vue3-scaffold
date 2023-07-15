import { request } from '@/mock/axiosRequest';
import { EReqMethod } from '@/enums/http-request';

/**
 * @description login API
 * @param {loginParams} loginParams
 * @callback request<API.UserInfo>
 */
export async function login(loginParams: API.LoginRqBody) {
    return request<API.UserInfo[]>(
        {
            url: 'login',
            method: EReqMethod.POST,
            data: { user: { ...loginParams } },
        },
        {
            isAuth: true,
            isGetDataDirectly: false,
        }
    );
}

/**
 * @description login API
 * @param {loginParams} loginParams
 * @callback request<API.LoginResult>
 */
export async function getToken(loginParams: API.LoginRqBody) {
    return request<API.ResToken>(
        {
            url: 'login_token',
            method: EReqMethod.POST,
            data: { user: { ...loginParams } },
        },
        {
            isAuth: true,
            isGetDataDirectly: false,
            successMsg: 'Đăng nhập thành công!',
        }
    );
}

export async function logout() {
    return request(
        {
            url: 'logout',
            method: EReqMethod.POST,
        },
        {
            isGetDataDirectly: false,
            isAuth: true,
        }
    );
}

export async function verifyUser() {
    return request<API.UserInfo>(
        {
            url: 'auth_verify',
            method: EReqMethod.GET,
        },
        {
            isGetDataDirectly: false,
            isAuth: true,
        }
    );
}
export async function verifyToken() {
    return request<API.UserInfo>(
        {
            url: 'auth_verify',
            method: EReqMethod.GET,
        },
        {
            isGetDataDirectly: false,
            isAuth: true,
        }
    );
}

export async function forgotPassword(
    userEmail: Pick<API.LoginRqBody, 'login'>
) {
    return request(
        {
            url: 'forgot_password',
            method: EReqMethod.POST,
            data: { user: { userEmail } },
        },
        {
            isGetDataDirectly: false,
            isAuth: true,
        }
    );
}

export function changePassByEmail(params: API.ChangePassByEmailRqBody) {
    return request(
        {
            url: 'forgot_password_with_email',
            method: EReqMethod.POST,
            data: { user: { ...params } },
        },
        {
            isGetDataDirectly: false,
            isAuth: true,
        }
    );
}

export function changePassByToken(params: API.ChangePassByTokenRqBody) {
    return request(
        {
            url: 'forgot_password',
            method: EReqMethod.POST,
            data: { user: { ...params } },
        },
        {
            isGetDataDirectly: false,
            isAuth: true,
        }
    );
}
