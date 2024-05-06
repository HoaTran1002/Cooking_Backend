"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_config_1 = require("../config/multer.config");
var serviceCustomer_controller_1 = __importDefault(require("../controllers/serviceCustomer.controller"));
var error_middlewear_1 = require("../middlewares/error.middlewear");
var router = (0, express_1.Router)();
router.post('/create', multer_config_1.uploadDisk.single('file'), (0, error_middlewear_1.asyncHandelError)(serviceCustomer_controller_1.default.create));
router.get('/getAll/:page/:size', (0, error_middlewear_1.asyncHandelError)(serviceCustomer_controller_1.default.getAll));
router.get('/:id/getById', (0, error_middlewear_1.asyncHandelError)(serviceCustomer_controller_1.default.getById));
router.delete('/:id/deleteById', (0, error_middlewear_1.asyncHandelError)(serviceCustomer_controller_1.default.deleteById));
router.patch('/:id/update', multer_config_1.uploadMemory.single('file'), (0, error_middlewear_1.asyncHandelError)(serviceCustomer_controller_1.default.updateById));
exports.default = router;
