"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_config_1 = require("../config/multer.config");
var product_controller_1 = require("../controllers/product.controller");
var auth_middlewears_1 = require("../middlewares/auth.middlewears");
// import { authorize } from '../middlewares/auth.middlewears'
var error_middlewear_1 = require("../middlewares/error.middlewear");
var validate_middlewear_1 = require("../middlewares/validate.middlewear");
var product_validate_1 = require("../validator/product.validate");
var route = (0, express_1.Router)();
// , authorize(['ADMIN'])
route.post('/create/:idCourse/:idCategory?', (0, auth_middlewears_1.authorize)(['ADMIN']), (0, validate_middlewear_1.validator)(product_validate_1.productValidator), (0, error_middlewear_1.asyncHandelError)(product_controller_1.createProduct));
route.get('/getAll', (0, error_middlewear_1.asyncHandelError)(product_controller_1.getAllProduct));
route.get('/:idProduct/getProductById', (0, error_middlewear_1.asyncHandelError)(product_controller_1.getProductById));
route.put('/:idProduct/edit/:idCourse?/:idCategory?', (0, auth_middlewears_1.authorize)(['ADMIN']), (0, validate_middlewear_1.validator)(product_validate_1.productValidator), (0, error_middlewear_1.asyncHandelError)(product_controller_1.editProductById));
route.delete('/:idProduct/delete', (0, auth_middlewears_1.authorize)(['ADMIN']), (0, error_middlewear_1.asyncHandelError)(product_controller_1.deleteProductById));
route.delete('/deleteAll', (0, auth_middlewears_1.authorize)(['ADMIN']), (0, error_middlewear_1.asyncHandelError)(product_controller_1.deleteAllProduct));
//image
route.post('/uploadImageFromLocal/:idProduct', (0, auth_middlewears_1.authorize)(['ADMIN']), multer_config_1.uploadDisk.single('file'), (0, error_middlewear_1.asyncHandelError)(product_controller_1.uploadImageFromLocalToVPSByProductId));
route.delete('/:idProduct/deleteImageFromVPSByProductId/:keyImage', (0, auth_middlewears_1.authorize)(['ADMIN']), (0, error_middlewear_1.asyncHandelError)(product_controller_1.deleteImageFromVPSByProductId));
route.put('/:idProduct/updateContentImage/:keyImage', (0, auth_middlewears_1.authorize)(['ADMIN']), multer_config_1.uploadMemory.single('file'), (0, error_middlewear_1.asyncHandelError)(product_controller_1.updateContentImageVPS));
route.delete('/:idProduct/removeAllImageByProductById', (0, auth_middlewears_1.authorize)(['ADMIN']), (0, error_middlewear_1.asyncHandelError)(product_controller_1.removeAllImageByProductById));
//video
route.post('/:idProduct/uploadVideoFromLocalToVPS', (0, auth_middlewears_1.authorize)(['ADMIN']), multer_config_1.uploadDisk.single('file'), (0, error_middlewear_1.asyncHandelError)(product_controller_1.uploadVideoFromLocalToVPSByProductId));
route.delete('/:idProduct/deleteVideoByProductId/:keyVideo', (0, auth_middlewears_1.authorize)(['ADMIN']), (0, error_middlewear_1.asyncHandelError)(product_controller_1.deleteVideoFromVPSByProductId));
route.put('/:idProduct/updateContentVideo/:keyVideo', (0, auth_middlewears_1.authorize)(['ADMIN']), multer_config_1.uploadMemory.single('file'), (0, error_middlewear_1.asyncHandelError)(product_controller_1.updateContentVideoVPS));
route.delete('/:idProduct/removeAllVideoByProductById', (0, auth_middlewears_1.authorize)(['ADMIN']), (0, error_middlewear_1.asyncHandelError)(product_controller_1.removeAllVIdeoByProductById));
exports.default = route;
