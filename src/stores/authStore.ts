import { defineStore } from 'pinia';
import { localStore } from '@/utils/Storage';
import { EAuthKey } from '@/enums/cache';
import { userApi } from '@/apis';
import { EUserRole } from '@/enums/user';

interface IUserAuthState {
    token: string | null;
    userInfo: Partial<API.UserInfo>;
}
export const useUserAuth = defineStore({
    id: 'auth',
    state: (): IUserAuthState => ({
        token: localStore.get(EAuthKey.AccessToken), // get saved "token" in when setup sucess
        userInfo: {} as API.UserInfo,
    }),
    getters: {
        getToken(): string | null {
            return this.token!;
        },
        getUserRole(state): EUserRole {
            return state.userInfo?.role!;
        },
        getUserName(state): string {
            return (
                state.userInfo.username!.charAt(0).toUpperCase()! +
                state.userInfo.username!.slice(1)!
            );
        },
        getUserEmail(state): string {
            return state.userInfo?.email!;
        },
    },
    actions: {
        async loginReturnToken(loginParams: API.LoginRqBody) {
            try {
                const { token } = await userApi.getToken(loginParams);
                this._saveTokenToStorage(token);
                return this.afterLogin();
            } catch (error) {
                return Promise.reject(error);
            }
        },
        async loginByToken(loginParams: API.LoginRqBody) {
            try {
                const { token } = await userApi.getToken(loginParams);
                this._saveTokenToStorage(token);
                return this.afterLogin();
            } catch (error) {
                return Promise.reject(error);
            }
        },
        async doLogout() {
            await userApi.logout();
            this.resetToken();
        },

        resetToken() {
            localStore.clear();
            this.$reset();
        },

        async afterLogin() {
            try {
                const resUserInfo = await userApi.verifyToken();
                // const resUserInfo = await verifyUser();
                this.userInfo = resUserInfo;
                this._generateUserRoutes(this.getUserRole);
            } catch (error) {
                return Promise.reject(error);
            }
        },

        _saveTokenToStorage(token: string) {
            this.token = token ?? '';
            const expiretime = 7 * 24 * 60 * 60 * 1000;
            localStore.set(EAuthKey.AccessToken, token, expiretime);
        },

        _generateUserRoutes(userRole: EUserRole) {
            switch (userRole) {
                case EUserRole.admin:
                    //TODO Generate Admin Routes
                    break;
                case EUserRole.customer:
                    //TODO Generate customer Routes
                    break;
                case EUserRole.guest:
                    //TODO Generate guest Routes
                    break;
                default:
                    // Do someThing
                    break;
            }
        },
    },
});
