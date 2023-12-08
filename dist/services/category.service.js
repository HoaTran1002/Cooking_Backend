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
exports.findById = exports.updateById = exports.removeCourse = exports.addCourse = exports.remove = void 0;
const category_models_1 = __importDefault(require("../models/category.models"));
const remove = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const fillter = { _id: _id };
    const options = { new: true };
    const category = yield category_models_1.default.findOneAndDelete(fillter, options);
    return category;
});
exports.remove = remove;
const addCourse = (_id, _idCourse) => __awaiter(void 0, void 0, void 0, function* () {
    const fillter = { _id: _id };
    const update = { $push: { _idCourses: { idCourse: _idCourse } } };
    const options = { new: true };
    const category = yield category_models_1.default.updateOne(fillter, update);
    return category;
});
exports.addCourse = addCourse;
const removeCourse = (_id, _idCourse) => __awaiter(void 0, void 0, void 0, function* () {
    const fillter = { _id: _id };
    const update = {
        $pull: {
            _idCourses: { idCourse: _idCourse }
        }
    };
    const options = { new: true };
    const category = yield category_models_1.default.updateOne(fillter, update, options);
    return category;
});
exports.removeCourse = removeCourse;
const updateById = (_id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const fillter = { _id: _id };
    const name = body;
    const update = {
        body
    };
    const options = {
        new: true
    };
    const category = yield category_models_1.default.findOneAndUpdate(fillter, update, options);
    return category;
});
exports.updateById = updateById;
const findById = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const category = category_models_1.default.findById(_id);
    return category;
});
exports.findById = findById;
