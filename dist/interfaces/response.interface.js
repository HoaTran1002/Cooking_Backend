"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IResponseErrorObject = void 0;
class IResponseErrorObject {
    constructor(message, status = 400) {
        this.status = status;
        this.message = message;
    }
}
exports.IResponseErrorObject = IResponseErrorObject;
