"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var informationPositionRecruitment_controller_1 = __importDefault(require("../controllers/informationPositionRecruitment.controller"));
var error_middlewear_1 = require("../middlewares/error.middlewear");
var router = (0, express_1.Router)();
router.post('/create', (0, error_middlewear_1.asyncHandelError)(informationPositionRecruitment_controller_1.default.create));
router.get('/getAll/:page/:size', (0, error_middlewear_1.asyncHandelError)(informationPositionRecruitment_controller_1.default.getAll));
router.get('/:id/getById', (0, error_middlewear_1.asyncHandelError)(informationPositionRecruitment_controller_1.default.getById));
router.delete('/:id/deleteById', (0, error_middlewear_1.asyncHandelError)(informationPositionRecruitment_controller_1.default.deleteById));
router.patch('/:id/update', (0, error_middlewear_1.asyncHandelError)(informationPositionRecruitment_controller_1.default.updateById));
exports.default = router;
