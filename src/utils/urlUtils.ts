/**
 * @param baseUrl URL
 * @param obj Object query string params
 * @returns {string} return url + object params in string
 * example:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.abc.com', obj)
 *  ==>www.abc.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: object): string {
    let parameters = '';
    let url = '';
    for (const key in obj) {
        parameters += `${key}=${encodeURIComponent(obj[key as keyof object])}&`;
    }
    parameters = parameters.replace(/&$/, '');
    if (/\?$/.test(baseUrl)) {
        url = baseUrl + parameters;
    } else {
        url = baseUrl.replace(/\/?$/, '?') + parameters;
    }
    return url;
}

/**
 * Only keep single slash in url
 * @param path URL path
 * @returns {string} return an string URL with unique slash
 */
export const uniqueSlash = (path: string) =>
    path.replace(/(https?:\/)|(\/)+/g, '$1$2');
