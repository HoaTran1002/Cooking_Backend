"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const account_controllers_1 = require("../controllers/account.controllers");
const auth_middlewears_1 = require("../middlewares/auth.middlewears");
const error_middlewear_1 = require("../middlewares/error.middlewear");
const validate_middlewear_1 = require("../middlewares/validate.middlewear");
const account_validate_1 = require("../validator/account.validate");
const router = (0, express_1.Router)();
router.get('/getAll', (0, auth_middlewears_1.authorize)(), (0, error_middlewear_1.asyncHandelError)(account_controllers_1.findAllAccount));
router.get('/findAccountById/:id', (0, auth_middlewears_1.authorize)(), (0, error_middlewear_1.asyncHandelError)(account_controllers_1.findAccountById));
router.post('/create', (0, auth_middlewears_1.authorize)(), (0, validate_middlewear_1.validateBody)(account_validate_1.accountValidate), (0, error_middlewear_1.asyncHandelError)(account_controllers_1.createAccount));
router.delete('/delete/:id', (0, auth_middlewears_1.authorize)(), (0, error_middlewear_1.asyncHandelError)(account_controllers_1.deleteAccountById));
router.patch('/update/:id', (0, auth_middlewears_1.authorize)(), (0, validate_middlewear_1.validateBody)(account_validate_1.accountValidate), (0, error_middlewear_1.asyncHandelError)(account_controllers_1.updateAccountById));
exports.default = router;
