"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getById = exports.getAll = exports.removeCourseById = exports.addCourseById = exports.updateCategory = exports.removeCategory = exports.createCategory = void 0;
const category_models_1 = __importDefault(require("../models/category.models"));
const category_service_1 = require("../services/category.service");
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_models_1.default.create(req.body.name);
    const response = {
        message: 'create category success',
        data: category
    };
    return res.status(200).json(response);
});
exports.createCategory = createCategory;
const removeCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    const category = yield (0, category_service_1.remove)(_id);
    const response = {
        message: 'remove category success',
        data: category
    };
    return res.status(200).json(response);
});
exports.removeCategory = removeCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    const body = req.body;
    const category = yield (0, category_service_1.updateById)(_id, body);
    const response = {
        message: 'up date category success',
        data: category
    };
    return res.status(201).json(response);
});
exports.updateCategory = updateCategory;
const addCourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    const _idCourse = req.params.idCourse;
    const category = yield (0, category_service_1.addCourse)(_id, _idCourse);
    const response = {
        message: 'remove category success',
        data: category
    };
    return res.status(200).json(response);
});
exports.addCourseById = addCourseById;
const removeCourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    const _idCourse = req.params.idCourse;
    const category = yield (0, category_service_1.removeCourse)(_id, _idCourse);
    const response = {
        message: 'remove category success',
        data: category
    };
    return res.status(200).json(response);
});
exports.removeCourseById = removeCourseById;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const category = yield category_models_1.default.find();
    const response = {
        message: 'get all success',
        data: category
    };
    return res.status(200).json(response);
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    const category = yield (0, category_service_1.findById)(_id);
    const response = {
        message: 'get all category sucess',
        data: category
    };
    return res.status(200).json(response);
});
exports.getById = getById;
