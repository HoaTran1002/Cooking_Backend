"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productValidator = void 0;
var joi_1 = __importDefault(require("joi"));
var productValidator = function (data) {
    var product = joi_1.default.object({
        name: joi_1.default.string().required(),
        note: joi_1.default.string().required(),
        image: joi_1.default.array(),
        timeLearning: joi_1.default.string(),
        video: joi_1.default.array(),
        idCourse: joi_1.default.string(),
        idCategory: joi_1.default.string()
    });
    return product.validate(data);
};
exports.productValidator = productValidator;
