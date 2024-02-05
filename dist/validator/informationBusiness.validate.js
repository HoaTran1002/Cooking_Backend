"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.infoBusinessValidate = void 0;
var joi_1 = __importDefault(require("joi"));
var infoBusinessValidate = function (data) {
    var infoBusiness = joi_1.default.object({
        name: joi_1.default.string().trim(),
        phoneNumber: joi_1.default.string().trim(),
        address: joi_1.default.string().trim(),
        email: joi_1.default.string().trim(),
        domain: joi_1.default.string().trim(),
        slogan: joi_1.default.string().trim(),
        logo: joi_1.default.object(),
        story: joi_1.default.string().trim(),
        achievement: joi_1.default.object(),
        relatedInformation: joi_1.default.object()
    });
    return infoBusiness.validate(data);
};
exports.infoBusinessValidate = infoBusinessValidate;
