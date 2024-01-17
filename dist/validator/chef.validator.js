"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.chefValidate = void 0;
var joi_1 = __importDefault(require("joi"));
var chefValidate = function (data) {
    var chef = joi_1.default.object({
        name: joi_1.default.string().required().trim(),
        description: joi_1.default.string().required().trim(),
        slogan: joi_1.default.string().required().trim(),
        role: joi_1.default.string().required().trim()
    });
    return chef.validate(data);
};
exports.chefValidate = chefValidate;
