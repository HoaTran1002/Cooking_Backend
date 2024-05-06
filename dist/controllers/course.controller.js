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
exports.removeAllVideoByCourseById = exports.updateContentVideoVPS = exports.deleteVideoVPSByCourseId = exports.uploadVideoFromLocalToVPSByCourseId = exports.removeAllImageByCourseById = exports.updateContentImageVPS = exports.deleteImageFromVPSByCourseId = exports.uploadImageFromLocalToVPSByCourseId = exports.findOneById = exports.getAll = exports.removeCourseById = exports.removeRoadmaps = exports.removeRoadmapById = exports.updateRoadmapById = exports.courseUpdateById = exports.getCourseById = exports.courseCreateRoadmap = exports.courseCreate = void 0;
var mongoose_1 = require("mongoose");
var file_service_1 = require("../services/file.service");
var course_service_1 = require("../services/course.service");
var course_repository_1 = require("../repositories/course.repository");
var course_models_1 = __importDefault(require("../models/course.models"));
//create
var courseCreate = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var course, response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, course_models_1.default.create(req.body)];
            case 1:
                course = _a.sent();
                response = {
                    message: 'create sucess!',
                    status: 200,
                    data: course
                };
                if (!course) {
                    response.message = 'create failed!!';
                    response.status = 400;
                }
                return [2 /*return*/, res.status(response.status ? response.status : 400).json(response)];
            case 2:
                error_1 = _a.sent();
                throw new mongoose_1.Error(error_1.message);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.courseCreate = courseCreate;
var courseCreateRoadmap = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, params, roadmap, fillter, update, options, course;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                response = {
                    message: ''
                };
                params = req.params;
                roadmap = req.body;
                fillter = { _id: params.courseId };
                update = { $push: { roadmaps: roadmap } };
                options = { new: true };
                return [4 /*yield*/, course_models_1.default.findOneAndUpdate(fillter, update, options)];
            case 1:
                course = _a.sent();
                if (!course) {
                    return [2 /*return*/, res.status(404).send('Course not found')];
                }
                if (course) {
                    response.message = 'created roadmap';
                    response.data = course;
                    response.status = 201;
                }
                return [2 /*return*/, res.status(201).json({ course: course })];
        }
    });
}); };
exports.courseCreateRoadmap = courseCreateRoadmap;
var getCourseById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idCourse, response, course;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idCourse = req.params.courseId;
                response = {
                    message: 'get course success!'
                };
                if (!idCourse) {
                    return [2 /*return*/, res.status(404).json({ message: 'idcourse required' })];
                }
                return [4 /*yield*/, (0, course_service_1.findById)(idCourse)];
            case 1:
                course = _a.sent();
                if (!course) {
                    return [2 /*return*/, res.status(404).json({ message: 'Course not found' })];
                }
                response.data = course;
                return [2 /*return*/, res.status(200).json(response)];
        }
    });
}); };
exports.getCourseById = getCourseById;
//update
var courseUpdateById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var params, fillter, upadate, options, response, course, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                params = req.params;
                fillter = { _id: params === null || params === void 0 ? void 0 : params.courseId };
                upadate = req.body;
                options = { new: true };
                response = {
                    message: ''
                };
                if (!params.courseId) {
                    response.message = 'not exist courseId';
                    response.status = 401;
                    return [2 /*return*/, res.status(401).json(response)];
                }
                return [4 /*yield*/, course_models_1.default.findOneAndUpdate(fillter, upadate, options)];
            case 1:
                course = _a.sent();
                if (!course) {
                    return [2 /*return*/, res.status(404).send('Course not found')];
                }
                if (course) {
                    response.message = 'updated course success';
                    response.status = 200;
                    response.data = course;
                    return [2 /*return*/, res.status(200).json(course)];
                }
                return [3 /*break*/, 3];
            case 2:
                error_2 = _a.sent();
                throw new mongoose_1.Error(error_2);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.courseUpdateById = courseUpdateById;
var updateRoadmapById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var params, fillter, roadmap, update, options, response, course, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                params = req.params;
                fillter = { _id: params.courseId, 'roadmaps._id': params.roadmapId };
                roadmap = req.body;
                update = {
                    $set: {
                        'roadmaps.$.name': roadmap.name,
                        'roadmaps.$.startTime': roadmap.startTime,
                        'roadmaps.$.endTime': roadmap.endTime,
                        'roadmaps.$.knowledge': roadmap.knowledge,
                        'roadmaps.$.skill': roadmap.skill
                    }
                };
                options = { new: true };
                response = {
                    message: ''
                };
                return [4 /*yield*/, course_models_1.default.findOneAndUpdate(fillter, update, options)];
            case 1:
                course = _a.sent();
                if (!course) {
                    return [2 /*return*/, res.status(404).send('Course or roadmap not found')];
                }
                if (course) {
                    response.message = 'updated roadmap success';
                    response.status = 200;
                    response.data = course;
                    return [2 /*return*/, res.status(200).json(response)];
                }
                return [3 /*break*/, 3];
            case 2:
                error_3 = _a.sent();
                throw new mongoose_1.Error(error_3);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.updateRoadmapById = updateRoadmapById;
//remove
var removeRoadmapById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, params, filter, update, options, updatedCourse, error_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                response = {
                    message: ''
                };
                params = req.params;
                filter = { _id: params.courseId };
                update = {
                    $pull: {
                        roadmaps: { _id: params.roadmapId }
                    }
                };
                options = { new: true };
                return [4 /*yield*/, course_models_1.default.findOneAndUpdate(filter, update, options)];
            case 1:
                updatedCourse = _a.sent();
                if (!updatedCourse) {
                    return [2 /*return*/, res.status(404).send('Course or roadmap not found')];
                }
                else {
                    response.message = 'deleted roadmap success';
                    response.status = 204;
                    response.data = updatedCourse;
                    return [2 /*return*/, res.status(204).json(response)];
                }
                return [3 /*break*/, 3];
            case 2:
                error_4 = _a.sent();
                throw new mongoose_1.Error(error_4);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.removeRoadmapById = removeRoadmapById;
var removeRoadmaps = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, params, filter, update, options, updatedCourse, error_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                response = {
                    message: ''
                };
                params = req.params;
                filter = { _id: params.courseId };
                update = {
                    $pull: {
                        roadmaps: { _id: params.roadmapId }
                    }
                };
                options = { new: true };
                return [4 /*yield*/, course_models_1.default.findOneAndUpdate(filter, update, options)];
            case 1:
                updatedCourse = _a.sent();
                if (!updatedCourse) {
                    return [2 /*return*/, res.status(404).send('Course or roadmap not found')];
                }
                else {
                    response.message = 'deleted roadmap success';
                    response.status = 204;
                    response.data = updatedCourse;
                    return [2 /*return*/, res.status(204).json(response)];
                }
                return [3 /*break*/, 3];
            case 2:
                error_5 = _a.sent();
                throw new mongoose_1.Error(error_5);
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.removeRoadmaps = removeRoadmaps;
var removeCourseById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, params, filter, courseExist, udeletedCourse, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                response = {
                    message: ''
                };
                params = req.params;
                filter = { _id: params.courseId };
                if (!params.courseId) {
                    return [2 /*return*/, res.status(400).json({ message: 'not found idCourse prams' })];
                }
                return [4 /*yield*/, (0, course_service_1.findById)(params.courseId)];
            case 1:
                courseExist = _a.sent();
                if (!courseExist) {
                    return [2 /*return*/, res.status(400).json({ message: 'id invalid' })];
                }
                return [4 /*yield*/, (0, course_service_1.deleteFIleCourse)(params.courseId)];
            case 2:
                _a.sent();
                return [4 /*yield*/, course_models_1.default.deleteOne(filter)];
            case 3:
                udeletedCourse = _a.sent();
                if (!udeletedCourse) {
                    return [2 /*return*/, res.status(404).send('Course  not found')];
                }
                else {
                    response.message = 'deleted Course success';
                    return [2 /*return*/, res.status(200).send(response)];
                }
                return [3 /*break*/, 5];
            case 4:
                error_6 = _a.sent();
                throw new mongoose_1.Error(error_6);
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.removeCourseById = removeCourseById;
//queries
var getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var course, response, error_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, course_models_1.default.find({})];
            case 1:
                course = _a.sent();
                response = {
                    message: 'get all sucess!',
                    status: 200,
                    data: course
                };
                return [2 /*return*/, res.status(200).json(course)];
            case 2:
                error_7 = _a.sent();
                console.log(error_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAll = getAll;
var findOneById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () { return __generator(this, function (_a) {
    return [2 /*return*/];
}); }); };
exports.findOneById = findOneById;
//file
//image
var uploadImageFromLocalToVPSByCourseId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idCourse, course, file, imageObject, Images, error_8, file;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 5]);
                idCourse = req.params.idCourse;
                if (!idCourse) {
                    return [2 /*return*/, res.status(404).send('not found id course')];
                }
                return [4 /*yield*/, (0, course_service_1.findById)(idCourse)];
            case 1:
                course = _a.sent();
                if (!course) {
                    return [2 /*return*/, res.status(404).json({ mesage: 'not found coures' })];
                }
                file = req.file;
                if (!file) {
                    return [2 /*return*/, res.status(400).send('Không có file được tải lên.')];
                }
                imageObject = {
                    url: file.path
                };
                return [4 /*yield*/, (0, course_repository_1.addImageToCourse)(idCourse, imageObject)];
            case 2:
                Images = _a.sent();
                if (!Images) {
                    return [2 /*return*/, res.status(500).json({ message: 'upload image failed' })];
                }
                return [2 /*return*/, res.status(200).json({ message: 'upload image success', result: Images })];
            case 3:
                error_8 = _a.sent();
                file = req.file;
                return [4 /*yield*/, (0, file_service_1.deleteFile)(file.path)];
            case 4:
                _a.sent();
                throw new mongoose_1.Error(error_8);
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.uploadImageFromLocalToVPSByCourseId = uploadImageFromLocalToVPSByCourseId;
var deleteImageFromVPSByCourseId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idCourse, keyImage, courseExist, image, course, newImages;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                idCourse = req.params.idCourse;
                keyImage = req.params.keyImage;
                if (!idCourse) {
                    return [2 /*return*/, res.status(400).json({ message: 'not found idCourse prams' })];
                }
                if (!keyImage) {
                    return [2 /*return*/, res.status(400).json({ message: 'not found keyImage prams' })];
                }
                return [4 /*yield*/, (0, course_service_1.findById)(idCourse)];
            case 1:
                courseExist = _b.sent();
                if (!courseExist) {
                    return [2 /*return*/, res.status(400).json({ message: 'idProduct invalid' })];
                }
                return [4 /*yield*/, (0, course_repository_1.findCourseImage)(idCourse, keyImage)];
            case 2:
                image = _b.sent();
                if (!image) {
                    return [2 /*return*/, res.status(400).json({ message: 'key Image invalid' })];
                }
                return [4 /*yield*/, course_models_1.default.findById(idCourse)];
            case 3:
                course = _b.sent();
                newImages = (_a = course === null || course === void 0 ? void 0 : course.images) === null || _a === void 0 ? void 0 : _a.filter(function (item) { return item._id != keyImage; });
                return [4 /*yield*/, (0, file_service_1.deleteFile)(image.url)];
            case 4:
                _b.sent();
                if (!newImages) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, course_repository_1.updateDeleteImage)(idCourse, newImages)];
            case 5:
                _b.sent();
                return [2 /*return*/, res.status(200).json({ message: 'delete image success' })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.deleteImageFromVPSByCourseId = deleteImageFromVPSByCourseId;
var updateContentImageVPS = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idCourse, keyImage, image, file, imageObject, error_9, file;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 5]);
                idCourse = req.params.idCourse;
                keyImage = req.params.keyImage;
                if (!idCourse) {
                    return [2 /*return*/, res.status(400).json({ message: 'not found idCourse prams' })];
                }
                if (!keyImage) {
                    return [2 /*return*/, res.status(400).json({ message: 'not found keyImage prams' })];
                }
                return [4 /*yield*/, (0, course_repository_1.findCourseImage)(idCourse, keyImage)];
            case 1:
                image = _a.sent();
                if (!image) {
                    return [2 /*return*/, res.status(400).json({ message: 'key Image invalid' })];
                }
                if (!image) {
                    return [2 /*return*/, res.status(404).json({ mesage: 'not found image' })];
                }
                file = req.file;
                if (!file) {
                    return [2 /*return*/, res.status(400).send('Không có file được tải lên.')];
                }
                return [4 /*yield*/, (0, file_service_1.updateFileContent)(file, image.url)];
            case 2:
                imageObject = _a.sent();
                if (imageObject != null) {
                    return [2 /*return*/, res.status(200).json({ message: 'File has been updated successfully' })];
                }
                return [3 /*break*/, 5];
            case 3:
                error_9 = _a.sent();
                file = req.file;
                return [4 /*yield*/, (0, file_service_1.deleteFile)(file.path)];
            case 4:
                _a.sent();
                throw new mongoose_1.Error(error_9);
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateContentImageVPS = updateContentImageVPS;
var removeAllImageByCourseById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, params, filter, update, options, courseExist, deleted, error_10;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                response = {
                    message: ''
                };
                params = req.params;
                filter = { _id: params.idCourse };
                update = { $set: { images: [] } };
                options = { new: true };
                if (!params.idCourse) {
                    return [2 /*return*/, res.status(400).json({ message: 'not found idCourse prams' })];
                }
                return [4 /*yield*/, (0, course_service_1.findById)(params.idCourse)];
            case 1:
                courseExist = _a.sent();
                if (!courseExist) {
                    return [2 /*return*/, res.status(400).json({ message: 'id invalid' })];
                }
                if (courseExist.images && courseExist.images.length == 0) {
                    return [2 /*return*/, res.status(200).send('list image clean')];
                }
                return [4 /*yield*/, (0, course_service_1.deleteFIleImageCourse)(params.idCourse)];
            case 2:
                _a.sent();
                return [4 /*yield*/, course_models_1.default.findByIdAndUpdate(filter, update, options)];
            case 3:
                deleted = _a.sent();
                if (!deleted) {
                    return [2 /*return*/, res.status(404).send('Course  not found')];
                }
                else {
                    response.message = 'deleted all image  success';
                    return [2 /*return*/, res.status(200).send(response)];
                }
                return [3 /*break*/, 5];
            case 4:
                error_10 = _a.sent();
                throw new mongoose_1.Error(error_10);
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.removeAllImageByCourseById = removeAllImageByCourseById;
//video
var uploadVideoFromLocalToVPSByCourseId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idCourse, course, file, videoObject, Video, error_11, file;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 5]);
                idCourse = req.params.idCourse;
                if (!idCourse) {
                    return [2 /*return*/, res.status(404).send('not found id course')];
                }
                return [4 /*yield*/, (0, course_service_1.findById)(idCourse)];
            case 1:
                course = _a.sent();
                if (!course) {
                    return [2 /*return*/, res.status(404).json({ mesage: 'not found coures' })];
                }
                file = req.file;
                if (!file) {
                    return [2 /*return*/, res.status(400).send('Không có file được tải lên.')];
                }
                videoObject = {
                    url: file.path
                };
                return [4 /*yield*/, (0, course_repository_1.addVideoToCourse)(idCourse, videoObject)];
            case 2:
                Video = _a.sent();
                if (!Video) {
                    return [2 /*return*/, res.status(500).json({ message: 'upload video failed' })];
                }
                return [2 /*return*/, res.status(200).json({ message: 'upload video success', result: Video })];
            case 3:
                error_11 = _a.sent();
                file = req.file;
                return [4 /*yield*/, (0, file_service_1.deleteFile)(file.path)];
            case 4:
                _a.sent();
                throw new mongoose_1.Error(error_11);
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.uploadVideoFromLocalToVPSByCourseId = uploadVideoFromLocalToVPSByCourseId;
var deleteVideoVPSByCourseId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idCourse, keyVideo, courseExist, video, course, newVideos;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                idCourse = req.params.idCourse;
                keyVideo = req.params.keyVideo;
                if (!idCourse) {
                    return [2 /*return*/, res.status(400).json({ message: 'not found idCourse prams' })];
                }
                if (!keyVideo) {
                    return [2 /*return*/, res.status(400).json({ message: 'not found key video prams' })];
                }
                return [4 /*yield*/, (0, course_service_1.findById)(idCourse)];
            case 1:
                courseExist = _b.sent();
                if (!courseExist) {
                    return [2 /*return*/, res.status(400).json({ message: 'idProduct invalid' })];
                }
                return [4 /*yield*/, (0, course_repository_1.findCourseVideo)(idCourse, keyVideo)];
            case 2:
                video = _b.sent();
                if (!video) {
                    return [2 /*return*/, res.status(400).json({ message: 'key Image invalid' })];
                }
                return [4 /*yield*/, course_models_1.default.findById(idCourse)];
            case 3:
                course = _b.sent();
                newVideos = (_a = course === null || course === void 0 ? void 0 : course.videos) === null || _a === void 0 ? void 0 : _a.filter(function (item) { return item._id != keyVideo; });
                return [4 /*yield*/, (0, file_service_1.deleteFile)(video.url)];
            case 4:
                _b.sent();
                if (!newVideos) return [3 /*break*/, 6];
                return [4 /*yield*/, (0, course_repository_1.updateDeleteVideo)(idCourse, newVideos)];
            case 5:
                _b.sent();
                return [2 /*return*/, res.status(200).json({ message: 'delete video success' })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.deleteVideoVPSByCourseId = deleteVideoVPSByCourseId;
var updateContentVideoVPS = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idCourse, keyVideo, video, file, videoObject, error_12, file;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 5]);
                idCourse = req.params.idCourse;
                keyVideo = req.params.keyVideo;
                if (!idCourse) {
                    return [2 /*return*/, res.status(400).json({ message: 'not found idCourse prams' })];
                }
                if (!keyVideo) {
                    return [2 /*return*/, res.status(400).json({ message: 'not found key video prams' })];
                }
                return [4 /*yield*/, (0, course_repository_1.findCourseVideo)(idCourse, keyVideo)];
            case 1:
                video = _a.sent();
                if (!video) {
                    return [2 /*return*/, res.status(400).json({ message: 'key video invalid' })];
                }
                if (!video) {
                    return [2 /*return*/, res.status(404).json({ mesage: 'not found image' })];
                }
                file = req.file;
                if (!file) {
                    return [2 /*return*/, res.status(400).send('Không có file được tải lên.')];
                }
                return [4 /*yield*/, (0, file_service_1.updateFileContent)(file, video.url)];
            case 2:
                videoObject = _a.sent();
                if (videoObject != null) {
                    return [2 /*return*/, res.status(200).json({ message: 'File has been updated successfully' })];
                }
                return [3 /*break*/, 5];
            case 3:
                error_12 = _a.sent();
                file = req.file;
                return [4 /*yield*/, (0, file_service_1.deleteFile)(file.path)];
            case 4:
                _a.sent();
                throw new mongoose_1.Error(error_12);
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.updateContentVideoVPS = updateContentVideoVPS;
var removeAllVideoByCourseById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, params, filter, update, options, courseExist, deleted, error_13;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                response = {
                    message: ''
                };
                params = req.params;
                filter = { _id: params.idCourse };
                update = { $set: { videos: [] } };
                options = { new: true };
                if (!params.idCourse) {
                    return [2 /*return*/, res.status(400).json({ message: 'not found idCourse prams' })];
                }
                return [4 /*yield*/, (0, course_service_1.findById)(params.idCourse)];
            case 1:
                courseExist = _a.sent();
                if (!courseExist) {
                    return [2 /*return*/, res.status(400).json({ message: 'id invalid' })];
                }
                if (courseExist.videos && courseExist.videos.length == 0) {
                    return [2 /*return*/, res.status(200).send('list video clean')];
                }
                return [4 /*yield*/, (0, course_service_1.deleteFIleVideoCourse)(params.idCourse)];
            case 2:
                _a.sent();
                return [4 /*yield*/, course_models_1.default.findByIdAndUpdate(filter, update, options)];
            case 3:
                deleted = _a.sent();
                if (!deleted) {
                    return [2 /*return*/, res.status(404).send('Course  not found')];
                }
                else {
                    response.message = 'deleted all video  success';
                    return [2 /*return*/, res.status(200).send(response)];
                }
                return [3 /*break*/, 5];
            case 4:
                error_13 = _a.sent();
                throw new mongoose_1.Error(error_13);
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.removeAllVideoByCourseById = removeAllVideoByCourseById;
// export const deleteFileOnVPS = async (req: Request, res: Response): Promise<void | Response> => {
//   const filePath = req.params.filePath
//   await deleteFile(filePath)
//   return res.send('delete file success')
// }
