import { request } from '@/mock/axiosRequest';
import { EReqMethod } from '@/enums/EHttpReq';

/**
 * @description login API
 * @param {loginParams} loginParams
 * @callback request<Promise<API.UserInfo>>
 */
export function login(loginParams: API.LoginParams) {
  return request<Promise<API.UserInfo[]>>(
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
 * @callback request<Promise<API.LoginResult>>
 */
export function loginToken(loginParams: API.LoginParams) {
  return request<Promise<API.LoginResult>>(
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
export function logout() {
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

export function verifyUser() {
  return request<Promise<API.UserInfo>>(
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
export function verifyToken() {
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

export function forgotPassword(userEmail: Pick<API.LoginParams, 'login'>) {
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
export function forgotPasswordWithEmail(params: API.forgotPassWithEmailParams) {
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

export function changePasswordWithToken(params: API.ChangePassWithTokenParams) {
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
