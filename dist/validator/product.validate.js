"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidator = void 0;
const joi_1 = __importDefault(require("joi"));
const productValidator = (data) => {
    const product = joi_1.default.object({
        name: joi_1.default.string().required(),
        level: joi_1.default.string().valid('BASIC', 'MEDIUM', 'MASTER').required().trim(),
        category: joi_1.default.string().valid('SHORT_TERM', 'LONG_TERM').required().trim(),
        note: joi_1.default.string().required(),
        image: joi_1.default.array(),
        video: joi_1.default.array()
    });
    return product.validate(data);
};
exports.productValidator = productValidator;
