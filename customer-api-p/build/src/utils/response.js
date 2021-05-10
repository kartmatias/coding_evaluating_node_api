"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.statusCode = exports.Response = void 0;
/**
 * For  response structure
 * We have add general response format as per our need and it works
 * Change as per the application, team and company need
 * // TODO : add json.api implementation for node js specified at https://jsonapi.org/implementations/#server-libraries-node-js
 */
class Response {
    static success(data, meta) {
        const successResponseObject = {};
        // add data
        successResponseObject["data"] = data;
        // add meta to response if provided
        if (meta && typeof meta === "object") {
            successResponseObject["meta"] = Object.assign({}, meta);
        }
        return successResponseObject;
    }
    static error(code, title, detail, optionals) {
        return {
            errors: [Object.assign({ code: code, title: title, detail: detail }, optionals)],
        };
    }
    static errors(errorObject) {
        const errorsResponseObject = [];
        if (errorObject && errorObject.length > 0) {
            errorObject.forEach((obj) => {
                const errorObj = Object.assign({}, obj);
                errorsResponseObject.push(Object.assign({}, errorObj));
            });
        }
        return {
            errors: errorsResponseObject
        };
    }
}
exports.Response = Response;
/**
 * Status Code for responses
 */
const statusCode = {
    OK_200: 200,
    CREATED_201: 201,
    ACCEPTED_202: 202,
    NO_CONTENT_204: 204,
    NOT_MODIFIED_304: 304,
    BAD_REQUEST_400: 400,
    UNAUTHORIZED_401: 401,
    FORBIDDEN_403: 403,
    NOT_FOUND_404: 404,
    METHOD_NOT_ALLOWED_405: 405,
    REQUEST_TIME_OUT_408: 408,
    PAYLOAD_TOO_LARGE_413: 413,
    TOO_MANY_REQUESTS_429: 429,
    UNAVAILABLE_FOR_LEGAL_REASONS_451: 451,
    INTERNAL_SERVER_ERROR_500: 500,
    NOT_IMPLEMENTED_501: 501,
    SERVICE_UNAVAILABLE_503: 503,
};
exports.statusCode = statusCode;
