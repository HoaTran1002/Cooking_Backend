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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.findById = exports.updateById = exports.removeCourse = exports.addCourse = exports.remove = void 0;
var category_models_1 = __importDefault(require("../models/category.models"));
var remove = function (_id) { return __awaiter(void 0, void 0, void 0, function () {
    var fillter, options, category;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fillter = { _id: _id };
                options = { new: true };
                return [4 /*yield*/, category_models_1.default.findOneAndDelete(fillter, options)];
            case 1:
                category = _a.sent();
                return [2 /*return*/, category];
        }
    });
}); };
exports.remove = remove;
var addCourse = function (_id, _idCourse) { return __awaiter(void 0, void 0, void 0, function () {
    var fillter, update, options, category;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fillter = { _id: _id };
                update = { $push: { _idCourses: { idCourse: _idCourse } } };
                options = { new: true };
                return [4 /*yield*/, category_models_1.default.updateOne(fillter, update)];
            case 1:
                category = _a.sent();
                return [2 /*return*/, category];
        }
    });
}); };
exports.addCourse = addCourse;
var removeCourse = function (_id, _idCourse) { return __awaiter(void 0, void 0, void 0, function () {
    var fillter, update, options, category;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fillter = { _id: _id };
                update = {
                    $pull: {
                        _idCourses: { idCourse: _idCourse }
                    }
                };
                options = { new: true };
                return [4 /*yield*/, category_models_1.default.updateOne(fillter, update, options)];
            case 1:
                category = _a.sent();
                return [2 /*return*/, category];
        }
    });
}); };
exports.removeCourse = removeCourse;
var updateById = function (_id, body) { return __awaiter(void 0, void 0, void 0, function () {
    var fillter, name, update, options, category;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fillter = { _id: _id };
                name = body;
                update = {
                    body: body
                };
                options = {
                    new: true
                };
                return [4 /*yield*/, category_models_1.default.findOneAndUpdate(fillter, update, options)];
            case 1:
                category = _a.sent();
                return [2 /*return*/, category];
        }
    });
}); };
exports.updateById = updateById;
var findById = function (_id) { return __awaiter(void 0, void 0, void 0, function () {
    var category;
    return __generator(this, function (_a) {
        category = category_models_1.default.findById(_id);
        return [2 /*return*/, category];
    });
}); };
exports.findById = findById;