"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authValidate = void 0;
var joi_1 = __importDefault(require("joi"));
var authValidate = function (data) {
    var auth = joi_1.default.object({
        userName: joi_1.default.string().required(),
        password: joi_1.default.string().required()
    });
    return auth.validate(data);
};
exports.authValidate = authValidate;
