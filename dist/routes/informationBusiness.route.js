"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const informationBusiness_controllers_1 = require("../controllers/informationBusiness.controllers");
const auth_middlewears_1 = require("../middlewares/auth.middlewears");
const error_middlewear_1 = require("../middlewares/error.middlewear");
const validate_middlewear_1 = require("../middlewares/validate.middlewear");
const informationBusiness_validate_1 = require("../validator/informationBusiness.validate");
const router = (0, express_1.Router)();
router.get('/getAll', (0, auth_middlewears_1.authorize)(), (0, error_middlewear_1.asyncHandelError)(informationBusiness_controllers_1.getAll));
router.get('/getById/:id', (0, auth_middlewears_1.authorize)(), (0, error_middlewear_1.asyncHandelError)(informationBusiness_controllers_1.getById));
router.post('/create', (0, auth_middlewears_1.authorize)(['ADMIN']), (0, validate_middlewear_1.validateBody)(informationBusiness_validate_1.infoBusinessValidate), (0, error_middlewear_1.asyncHandelError)(informationBusiness_controllers_1.createInformationBusiness));
router.delete('/remove/:id', (0, auth_middlewears_1.authorize)(['ADMIN']), (0, error_middlewear_1.asyncHandelError)(informationBusiness_controllers_1.removeById));
router.patch('/update/:id', (0, auth_middlewears_1.authorize)(['ADMIN']), (0, validate_middlewear_1.validateBody)(informationBusiness_validate_1.infoBusinessValidate), (0, error_middlewear_1.asyncHandelError)(informationBusiness_controllers_1.updateFormationBusinessById));
exports.default = router;
