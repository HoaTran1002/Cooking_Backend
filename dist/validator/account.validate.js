"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accountValidate = void 0;
var joi_1 = __importDefault(require("joi"));
var accountValidate = function (data) {
    var account = joi_1.default.object({
        fullName: joi_1.default.string(),
        birthday: joi_1.default.string(),
        address: joi_1.default.string(),
        gmail: joi_1.default.string().email({ minDomainSegments: 2 }),
        phoneNumber: joi_1.default.string(),
        gender: joi_1.default.string(),
        avatar: joi_1.default.object(),
        userName: joi_1.default.string().required(),
        password: joi_1.default.string().required(),
        role: joi_1.default.string().valid('ADMIN', 'STUDENT').required(),
        Permission: joi_1.default.string().valid('ALL', 'EDIT', 'READ', 'DELETE', 'CREATE').required()
    });
    return account.validate(data);
};
exports.accountValidate = accountValidate;
