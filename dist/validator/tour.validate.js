"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.tourValidator = void 0;
var joi_1 = __importDefault(require("joi"));
var tourValidator = function (data) {
    var tour = joi_1.default.object({
        idProduct: joi_1.default.string(),
        startTime: joi_1.default.string(),
        endTime: joi_1.default.string(),
        AactivityName: joi_1.default.string(),
        activityContent: joi_1.default.string()
    });
    return tour.validate(data);
};
exports.tourValidator = tourValidator;
