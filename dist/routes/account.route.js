"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var account_controllers_1 = require("../controllers/account.controllers");
var auth_middlewears_1 = require("../middlewares/auth.middlewears");
var error_middlewear_1 = require("../middlewares/error.middlewear");
var router = (0, express_1.Router)();
router.get('/getAll', (0, auth_middlewears_1.authorize)(), (0, error_middlewear_1.asyncHandelError)(account_controllers_1.findAllAccount));
router.get('/findAccountById/:id', (0, auth_middlewears_1.authorize)(), (0, error_middlewear_1.asyncHandelError)(account_controllers_1.findAccountById));
router.post('/create', (0, auth_middlewears_1.authorize)(), (0, error_middlewear_1.asyncHandelError)(account_controllers_1.createAccount));
router.delete('/delete/:id', (0, auth_middlewears_1.authorize)(), (0, error_middlewear_1.asyncHandelError)(account_controllers_1.deleteAccountById));
router.put('/update/:id', (0, auth_middlewears_1.authorize)(), (0, error_middlewear_1.asyncHandelError)(account_controllers_1.updateAccountById));
exports.default = router;
