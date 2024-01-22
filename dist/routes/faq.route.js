"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var faq_controller_1 = __importDefault(require("../controllers/faq.controller"));
var auth_middlewears_1 = require("../middlewares/auth.middlewears");
var error_middlewear_1 = require("../middlewares/error.middlewear");
var validate_middlewear_1 = require("../middlewares/validate.middlewear");
var faq_validate_1 = require("../validator/faq.validate");
var route = (0, express_1.Router)();
route.post('/create', (0, auth_middlewears_1.authorize)(['ADMIN']), (0, validate_middlewear_1.validateBody)(faq_validate_1.faqValidate), (0, error_middlewear_1.asyncHandelError)(faq_controller_1.default.createFAQ));
route.put('/:id/update', (0, auth_middlewears_1.authorize)(['ADMIN']), (0, validate_middlewear_1.validateBody)(faq_validate_1.faqValidate), (0, error_middlewear_1.asyncHandelError)(faq_controller_1.default.editFAQ));
route.delete('/:id/delete', (0, auth_middlewears_1.authorize)(['ADMIN']), (0, error_middlewear_1.asyncHandelError)(faq_controller_1.default.deleteFAQ));
route.get('/:id/getFAQ', (0, error_middlewear_1.asyncHandelError)(faq_controller_1.default.getFAQById));
route.get('/getFAQs', (0, error_middlewear_1.asyncHandelError)(faq_controller_1.default.getFAQs));
route.get('/pagination/:page/:size', (0, error_middlewear_1.asyncHandelError)(faq_controller_1.default.paginationFAQ));
exports.default = route;
