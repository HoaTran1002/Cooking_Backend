"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validator = void 0;
var response_interface_1 = require("../contract/interfaces/response.interface");
var validator = function (validate) {
    var middleware = function (req, _, next) {
        var valid = validate(req.body);
        if (valid.error) {
            throw new response_interface_1.IResponseErrorObject(valid.error.message, 400);
        }
        next();
    };
    return middleware;
};
exports.validator = validator;
