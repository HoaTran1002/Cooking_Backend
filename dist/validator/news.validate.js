"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateNews = void 0;
var joi_1 = __importDefault(require("joi"));
var validateCreateNews = function (data) {
    var news = joi_1.default.object({
        title: joi_1.default.string().required().trim(),
        author: joi_1.default.string().required().trim(),
        dateCreated: joi_1.default.date(),
        content: joi_1.default.string().required().trim()
    });
    return news.validate(data);
};
exports.validateCreateNews = validateCreateNews;
