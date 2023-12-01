"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFound = exports.errorHandeler = exports.asyncHandelError = void 0;
var asyncHandelError = function (
// eslint-disable-next-line prettier/prettier
callback) {
    var handleErr = function (request, response, next) {
        callback(request, response, next).catch(next);
    };
    return handleErr;
};
exports.asyncHandelError = asyncHandelError;
var handleErrorTrusted = function (err) {
    var responseErr = {
        message: err.message || 'Internal Server Error',
        status: 500
    };
    if (err && typeof err === 'object' && 'message' in err && 'status' in err) {
        responseErr.message = err.message;
        responseErr.status = err.status;
    }
    return responseErr;
};
var errorHandeler = function (err, req, res, next) {
    var response = handleErrorTrusted(err);
    return res.status(response.status ? response.status : 500).json(response);
};
exports.errorHandeler = errorHandeler;
var notFound = function (reques, response) {
    response.status(404).json({ message: 'Not Found ' });
};
exports.notFound = notFound;
