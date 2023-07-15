/**
 * @description: request method
 */
export enum EReqMethod {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    PUT = 'PUT',
    DELETE = 'DELETE',
}

/**
 * @description: Commonly used contentTyp types
 */
export enum EContentType {
    // json
    JSON = 'application/json;charset=UTF-8',
    // txt
    TEXT = 'text/plain;charset=UTF-8',
    // form-data generally cooperates with qs
    FORM_URLENCODED = 'application/x-www-form-urlencoded;charset=UTF-8',
    // form-data upload
    FORM_DATA = 'multipart/form-data;charset=UTF-8',
}
