import type { EAuthKey, EStorageKey } from '@/enums/cache';

// Default expire time item
const DEFAULT_CACHE_TIME = 60 * 60 * 24 * 2; // 2 days

/**
 * Create a local cache object
 * @param {string=} prefixKey -
 * @param {Object} [storage=localStorage] - sessionStorage | localStorage
 */
function createStorage(prefixKey: string, storageType = localStorage) {
    const storage = storageType;

    function _getKey(key: EStorageKey | EAuthKey) {
        return `${prefixKey}${key}`.toUpperCase();
    }

    /**
     * @description set cache
     * @param { EStorageKey | EAuthKey} key cache key
     * @param {*} value cache value
     * @param expire
     */
    function set(
        key: EStorageKey | EAuthKey,
        value: any,
        expire: number | null = DEFAULT_CACHE_TIME
    ) {
        const stringData = JSON.stringify({
            value,
            expire:
                expire !== null ? new Date().getTime() + expire * 1000 : null,
        });
        storage.setItem(_getKey(key), stringData);
    }

    /**
     * read cache
     * @param { EStorageKey | EAuthKey} key cache key
     * @param {*=} def default value
     */
    function get<T = any>(key: EStorageKey | EAuthKey, def: any = null): T {
        const item = storage.getItem(_getKey(key));
        if (item) {
            try {
                const data = JSON.parse(item);
                const { value, expire } = data;
                // Return directly within the validity period
                if (expire === null || expire >= Date.now()) {
                    return value;
                }
                remove(key);
            } catch (e) {
                return def;
            }
        }
        return def;
    }

    /**
     * Remove an item from the cache
     * @param { EStorageKey | EAuthKey} key
     */
    function remove(key: EStorageKey | EAuthKey) {
        storage.removeItem(_getKey(key));
    }

    /**
     * Clear all caches
     * @memberOf Cache
     */
    function clear(): void {
        storage.clear();
    }

    /**
     * set cookies
     * @param {string} name cookie name
     * @param {*} value cookie value
     * @param {number=} expire expiration time
     * If the expiration time is set, the browser automatically deletes by default
     * @example
     */
    function setCookie(
        name: EStorageKey | EAuthKey,
        value: any,
        expire: number | null = DEFAULT_CACHE_TIME
    ) {
        document.cookie = `${_getKey(name)}=${value}; Max-Age=${expire}`;
    }

    /**
     * Get cookie value by name
     * @param name
     */
    function getCookie(name: EStorageKey | EAuthKey): string {
        const cookieArr = document.cookie.split('; ');
        for (let i = 0, length = cookieArr.length; i < length; i++) {
            const kv = cookieArr[i].split('=');
            if (kv[0] === _getKey(name)) {
                return kv[1];
            }
        }
        return '';
    }

    /**
     * Delete the specified cookie by keyname
     * @param {string} key
     */
    function removeCookie(key: EStorageKey | EAuthKey) {
        setCookie(key, 1, -1);
    }

    /**
     * Empty cookies to invalidate all cookies
     */
    function clearCookie(): void {
        const keys = document.cookie.match(/[^ =;]+(?==)/g);
        if (keys) {
            for (let i = keys.length; i--; ) {
                document.cookie = `${keys[i]}=0;expire=${new Date(
                    0
                ).toUTCString()}`;
            }
        }
    }

    return {
        set,
        get,
        remove,
        clear,
        setCookie,
        getCookie,
        removeCookie,
        clearCookie,
    };
}

export const localStore = createStorage('LC_', localStorage);
export const sessionStore = createStorage('SS_', sessionStorage);
