"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.roadmapValidate = exports.courseValidate = void 0;
var joi_1 = __importDefault(require("joi"));
var courseValidate = function (data) {
    var course = joi_1.default.object({
        title: joi_1.default.string().trim(),
        description: joi_1.default.string().trim(),
        image: joi_1.default.object(),
        images: joi_1.default.array(),
        video: joi_1.default.object(),
        videos: joi_1.default.array(),
        roadmaps: joi_1.default.array(),
        price: joi_1.default.number(),
        discountPrice: joi_1.default.number(),
        discountPercentage: joi_1.default.number(),
        timeCreate: joi_1.default.date(),
        timeUpdate: joi_1.default.date()
    });
    return course.validate(data);
};
exports.courseValidate = courseValidate;
var roadmapValidate = function (data) {
    var roadmap = joi_1.default.object({
        name: joi_1.default.string().trim().required(),
        knowledge: joi_1.default.string().trim().required(),
        skill: joi_1.default.string().trim().required(),
        startTime: joi_1.default.date(),
        endTime: joi_1.default.date()
    });
    return roadmap.validate(data);
};
exports.roadmapValidate = roadmapValidate;
