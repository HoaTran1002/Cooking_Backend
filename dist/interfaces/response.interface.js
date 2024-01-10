"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IResponseErrorObject = void 0;
var IResponseErrorObject = /** @class */ (function () {
    function IResponseErrorObject(message, status) {
        if (status === void 0) { status = 400; }
        this.status = status;
        this.message = message;
    }
    return IResponseErrorObject;
}());
exports.IResponseErrorObject = IResponseErrorObject;
