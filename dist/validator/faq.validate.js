"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.faqValidate = void 0;
var joi_1 = __importDefault(require("joi"));
var faqValidate = function (data) {
    var faq = joi_1.default.object({
        question: joi_1.default.string().required().trim(),
        answer: joi_1.default.string().required().trim()
    });
    return faq.validate(data);
};
exports.faqValidate = faqValidate;
