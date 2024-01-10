"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_config_1 = require("../config/multer.config");
var news_controller_1 = require("../controllers/news.controller");
var error_middlewear_1 = require("../middlewares/error.middlewear");
var validate_middlewear_1 = require("../middlewares/validate.middlewear");
var news_validate_1 = require("../validator/news.validate");
// validateBody<INews>(validateCreateNews),
var route = (0, express_1.Router)();
route.post('/createNews', multer_config_1.uploadDisk.single('file'), (0, error_middlewear_1.asyncHandelError)(news_controller_1.createNews));
route.get('/getAll/:page/:size', (0, error_middlewear_1.asyncHandelError)(news_controller_1.getAllNews));
route.delete('/:id/delete', (0, error_middlewear_1.asyncHandelError)(news_controller_1.deleteNewsById));
route.put('/:id/updateContentImage', multer_config_1.uploadMemory.single('file'), (0, error_middlewear_1.asyncHandelError)(news_controller_1.updateContentImageVPS));
route.put('/:id/update', (0, validate_middlewear_1.validateBody)(news_validate_1.validateCreateNews), (0, error_middlewear_1.asyncHandelError)(news_controller_1.updateNewsById));
route.get('/:id/get', (0, error_middlewear_1.asyncHandelError)(news_controller_1.getNewsById));
exports.default = route;
