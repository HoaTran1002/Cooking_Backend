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
exports.updateDeleteCourseImage = exports.findCourseVideo = exports.findCourseImage = exports.updateDeleteVideo = exports.updateDeleteImage = exports.updateDeleteAllVideos = exports.updateDeleteAllImages = exports.getAllVideos = exports.getAllImages = exports.addVideoToCourse = exports.addImageToCourse = exports.updateVideoFromPopVideos = exports.updateImageFromPopImages = exports.create = exports.find = exports.remove = void 0;
var course_models_1 = __importDefault(require("../models/course.models"));
var mongoose_1 = __importDefault(require("mongoose"));
var remove = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log('use service remove succesed!!');
        return [2 /*return*/];
    });
}); };
exports.remove = remove;
var find = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log('use service find succesed!!');
        return [2 /*return*/];
    });
}); };
exports.find = find;
var create = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        console.log('use service remove succesed!!');
        return [2 /*return*/];
    });
}); };
exports.create = create;
var updateImageFromPopImages = function (courseId, imageArray) { return __awaiter(void 0, void 0, void 0, function () {
    var fillter, update, options, course;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fillter = { _id: courseId };
                update = { image: imageArray[0] };
                options = { new: true };
                return [4 /*yield*/, course_models_1.default.findOneAndUpdate(fillter, update, options)];
            case 1:
                course = _a.sent();
                return [2 /*return*/, course];
        }
    });
}); };
exports.updateImageFromPopImages = updateImageFromPopImages;
var updateVideoFromPopVideos = function (courseId, videoArray) { return __awaiter(void 0, void 0, void 0, function () {
    var fillter, update, options, course;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fillter = { _id: courseId };
                update = { video: videoArray[0] };
                options = { new: true };
                return [4 /*yield*/, course_models_1.default.findOneAndUpdate(fillter, update, options)];
            case 1:
                course = _a.sent();
                return [2 /*return*/, course];
        }
    });
}); };
exports.updateVideoFromPopVideos = updateVideoFromPopVideos;
var addImageToCourse = function (courseId, image) { return __awaiter(void 0, void 0, void 0, function () {
    var fillter, update, options, course;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fillter = { _id: courseId };
                update = { $push: { images: image } };
                options = { new: true };
                return [4 /*yield*/, course_models_1.default.findOneAndUpdate(fillter, update, options)];
            case 1:
                course = _a.sent();
                return [2 /*return*/, course === null || course === void 0 ? void 0 : course.images];
        }
    });
}); };
exports.addImageToCourse = addImageToCourse;
var addVideoToCourse = function (courseId, video) { return __awaiter(void 0, void 0, void 0, function () {
    var fillter, update, options, course;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fillter = { _id: courseId };
                update = { $push: { videos: video } };
                options = { new: true };
                return [4 /*yield*/, course_models_1.default.findOneAndUpdate(fillter, update, options)];
            case 1:
                course = _a.sent();
                return [2 /*return*/, course === null || course === void 0 ? void 0 : course.videos];
        }
    });
}); };
exports.addVideoToCourse = addVideoToCourse;
var getAllImages = function (idCourse) { return __awaiter(void 0, void 0, void 0, function () {
    var fillter, course;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fillter = { _id: idCourse };
                return [4 /*yield*/, course_models_1.default.findOne(fillter)];
            case 1:
                course = _a.sent();
                return [2 /*return*/, (course === null || course === void 0 ? void 0 : course.images) || []];
        }
    });
}); };
exports.getAllImages = getAllImages;
var getAllVideos = function (idCourse) { return __awaiter(void 0, void 0, void 0, function () {
    var fillter, course;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fillter = { _id: idCourse };
                return [4 /*yield*/, course_models_1.default.findOne(fillter)];
            case 1:
                course = _a.sent();
                return [2 /*return*/, (course === null || course === void 0 ? void 0 : course.videos) || []];
        }
    });
}); };
exports.getAllVideos = getAllVideos;
var updateDeleteAllImages = function (idCourse) { return __awaiter(void 0, void 0, void 0, function () {
    var fillter, update, options, course;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fillter = { _id: idCourse };
                update = { $set: { images: [], image: null } };
                options = { new: true };
                return [4 /*yield*/, course_models_1.default.findOneAndUpdate(fillter, update, options)];
            case 1:
                course = _a.sent();
                return [2 /*return*/, course];
        }
    });
}); };
exports.updateDeleteAllImages = updateDeleteAllImages;
var updateDeleteAllVideos = function (idCourse) { return __awaiter(void 0, void 0, void 0, function () {
    var fillter, update, options, course;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fillter = { _id: idCourse };
                update = { $set: { videos: [], video: null } };
                options = { new: true };
                return [4 /*yield*/, course_models_1.default.findOneAndUpdate(fillter, update, options)];
            case 1:
                course = _a.sent();
                return [2 /*return*/, course];
        }
    });
}); };
exports.updateDeleteAllVideos = updateDeleteAllVideos;
var updateDeleteImage = function (idCourse, images) { return __awaiter(void 0, void 0, void 0, function () {
    var fillter, update, options, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fillter = { _id: idCourse };
                update = { $set: { images: images, image: images[0] } };
                options = { new: true };
                return [4 /*yield*/, course_models_1.default.findOneAndUpdate(fillter, update, options)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.updateDeleteImage = updateDeleteImage;
var updateDeleteVideo = function (idCourse, videos) { return __awaiter(void 0, void 0, void 0, function () {
    var fillter, update, options, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fillter = { _id: idCourse };
                update = { $set: { videos: videos, video: videos[0] } };
                options = { new: true };
                return [4 /*yield*/, course_models_1.default.findOneAndUpdate(fillter, update, options)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.updateDeleteVideo = updateDeleteVideo;
var findCourseImage = function (idCourse, key) { return __awaiter(void 0, void 0, void 0, function () {
    var courseImages, foundImage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, course_models_1.default.aggregate([
                    {
                        $match: {
                            _id: new mongoose_1.default.Types.ObjectId(idCourse)
                        }
                    },
                    {
                        $unwind: '$images'
                    },
                    {
                        $match: {
                            'images._id': new mongoose_1.default.Types.ObjectId(key)
                        }
                    }
                ])];
            case 1:
                courseImages = _a.sent();
                if (courseImages && courseImages.length > 0) {
                    foundImage = courseImages[0].images;
                    console.log('image:', foundImage);
                    return [2 /*return*/, foundImage];
                }
                return [2 /*return*/, null];
        }
    });
}); };
exports.findCourseImage = findCourseImage;
var findCourseVideo = function (idCourse, key) { return __awaiter(void 0, void 0, void 0, function () {
    var courseVideos, foundVideo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, course_models_1.default.aggregate([
                    {
                        $match: {
                            _id: new mongoose_1.default.Types.ObjectId(idCourse)
                        }
                    },
                    {
                        $unwind: '$videos'
                    },
                    {
                        $match: {
                            'videos._id': new mongoose_1.default.Types.ObjectId(key)
                        }
                    }
                ])];
            case 1:
                courseVideos = _a.sent();
                if (courseVideos && courseVideos.length > 0) {
                    foundVideo = courseVideos[0].videos;
                    return [2 /*return*/, foundVideo];
                }
                return [2 /*return*/, null];
        }
    });
}); };
exports.findCourseVideo = findCourseVideo;
var updateDeleteCourseImage = function (idCourse, image) { return __awaiter(void 0, void 0, void 0, function () {
    var fillter, update, options, course;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fillter = { _id: idCourse };
                update = { $pull: { images: { key: image.key } } };
                options = { new: true };
                return [4 /*yield*/, course_models_1.default.findOneAndUpdate(fillter, update, options)];
            case 1:
                course = _a.sent();
                return [2 /*return*/, course];
        }
    });
}); };
exports.updateDeleteCourseImage = updateDeleteCourseImage;
