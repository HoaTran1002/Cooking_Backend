"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var informationBusiness_controllers_1 = require("../controllers/informationBusiness.controllers");
var auth_middlewears_1 = require("../middlewares/auth.middlewears");
var error_middlewear_1 = require("../middlewares/error.middlewear");
var validate_middlewear_1 = require("../middlewares/validate.middlewear");
var informationBusiness_validate_1 = require("../validator/informationBusiness.validate");
var router = (0, express_1.Router)();
router.get('/getAll', (0, error_middlewear_1.asyncHandelError)(informationBusiness_controllers_1.getAll));
router.get('/getById/:id', (0, error_middlewear_1.asyncHandelError)(informationBusiness_controllers_1.getById));
router.post('/create', 
// authorize(['ADMIN']),
(0, validate_middlewear_1.validateBody)(informationBusiness_validate_1.infoBusinessValidate), (0, error_middlewear_1.asyncHandelError)(informationBusiness_controllers_1.createInformationBusiness));
router.delete('/remove/:id', (0, auth_middlewears_1.authorize)(['ADMIN']), (0, error_middlewear_1.asyncHandelError)(informationBusiness_controllers_1.removeById));
router.patch('/update/:id', 
// authorize(['ADMIN']),
(0, validate_middlewear_1.validateBody)(informationBusiness_validate_1.infoBusinessValidate), (0, error_middlewear_1.asyncHandelError)(informationBusiness_controllers_1.updateFormationBusinessById));
exports.default = router;
