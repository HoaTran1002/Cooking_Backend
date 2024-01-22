"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IResponseSuccessObject = exports.IResponseErrorObject = void 0;
var IResponseErrorObject = /** @class */ (function () {
    function IResponseErrorObject(message, status) {
        if (status === void 0) { status = 400; }
        this.status = status;
        this.message = message;
    }
    return IResponseErrorObject;
}());
exports.IResponseErrorObject = IResponseErrorObject;
var IResponseSuccessObject = /** @class */ (function () {
    function IResponseSuccessObject(message, data, status) {
        if (status === void 0) { status = 400; }
        this.status = status;
        this.message = message;
        this.data = data;
    }
    return IResponseSuccessObject;
}());
exports.IResponseSuccessObject = IResponseSuccessObject;
