"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.partnerParamsValidator = exports.partnerValidator = void 0;
var joi_1 = __importDefault(require("joi"));
var partnerValidator = function (data) {
    var partnerSchema = joi_1.default.object({
        name: joi_1.default.string().required(),
        logo: joi_1.default.object(),
        description: joi_1.default.string(),
        position: joi_1.default.number(),
        products: joi_1.default.array(),
        params: joi_1.default.object({
            userId: joi_1.default.string().guid().required()
        })
    });
    return partnerSchema.validate(data);
};
exports.partnerValidator = partnerValidator;
var partnerParamsValidator = function (data) {
    var partnerSchema = joi_1.default.object({
        params: joi_1.default.object({
            userId: joi_1.default.string().guid().required()
        })
    });
    return partnerSchema.validate(data);
};
exports.partnerParamsValidator = partnerParamsValidator;
