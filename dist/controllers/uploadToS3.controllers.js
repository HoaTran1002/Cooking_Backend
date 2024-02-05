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
exports.deleteVideoFromS3ByCourseId = exports.deleteAllVideoFromS3ByCourseId = exports.getVideoFromS3BykeyVideo = exports.getAllVideoFromS3ByCourseId = exports.uploadVideoFromLocalToS3ByCourseId = exports.getImageFromS3BykeyImage = exports.getAllImageFromS3ByCourseId = exports.deleteAllImageFromS3ByCourseId = exports.updateContentImageS3 = exports.uploadImageFromLocalToS3ByCourseId = void 0;
var uploadToS3_service_1 = require("../services/uploadToS3.service");
var course_models_1 = __importDefault(require("../models/course.models"));
var course_repository_1 = require("../repositories/course.repository");
var course_service_1 = require("../services/course.service");
//Image
var uploadImageFromLocalToS3ByCourseId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idCourse, course, file, imageObject, Images;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
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
                return [4 /*yield*/, (0, uploadToS3_service_1.uploadImageS3)(file)];
            case 2:
                imageObject = _a.sent();
                if (!imageObject) {
                    return [2 /*return*/, res.status(500).json({ message: 'upload image failed', imageObject: imageObject })];
                }
                return [4 /*yield*/, (0, course_repository_1.addImageToCourse)(idCourse, imageObject)];
            case 3:
                Images = _a.sent();
                if (!Images) {
                    return [2 /*return*/, res.status(500).json({ message: 'upload image failed' })];
                }
                return [2 /*return*/, res.status(200).json({ message: 'upload image success', result: Images })];
        }
    });
}); };
exports.uploadImageFromLocalToS3ByCourseId = uploadImageFromLocalToS3ByCourseId;
//Image
var updateContentImageS3 = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var keyImage, url, image, file, imageObject;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                keyImage = req.params.keyImage;
                if (!keyImage) {
                    return [2 /*return*/, res.status(404).send('not found id ')];
                }
                return [4 /*yield*/, (0, uploadToS3_service_1.getImageS3)(keyImage)];
            case 1:
                url = _a.sent();
                image = { url: '', key: '' };
                if (url) {
                    ;
                    (image.key = keyImage), (image.url = url);
                }
                if (!image) {
                    return [2 /*return*/, res.status(404).json({ mesage: 'not found image' })];
                }
                file = req.file;
                if (!file) {
                    return [2 /*return*/, res.status(400).send('Không có file được tải lên.')];
                }
                return [4 /*yield*/, (0, uploadToS3_service_1.PutImageS3)(file, image)];
            case 2:
                imageObject = _a.sent();
                if (!imageObject) {
                    return [2 /*return*/, res.status(500).json({ message: 'upload image failed', imageObject: imageObject })];
                }
                if (!imageObject) {
                    return [2 /*return*/, res.status(500).json({ message: 'update image failed' })];
                }
                return [2 /*return*/, res.status(200).json({ message: 'update image success', result: imageObject })];
        }
    });
}); };
exports.updateContentImageS3 = updateContentImageS3;
// export const deleteImageFromS3ByCourseId = async (
//   req: Request,
//   res: Response
// ): Promise<Response<IResonseObject> | void> => {
//   const idCourse = req.params.idCourse
//   const keyImage = req.params.keyImage
//   if (!idCourse) {
//     return res.status(400).json({ message: 'not found idCourse prams' })
//   }
//   if (!keyImage) {
//     return res.status(400).json({ message: 'not found keyImage prams' })
//   }
//   const courseExist = await findById(idCourse)
//   if (!courseExist) {
//     return res.status(400).json({ message: 'idProduct invalid' })
//   }
//   const image = await findCourseImage(idCourse, keyImage)
//   if (!image) {
//     return res.status(400).json({ message: 'keyImage invalid' })
//   }
//   const course = await Course.findById(idCourse)
//   const newImages = course?.images?.filter((item) => item.key != keyImage)
//   await deleteImageS3(keyImage)
//   if (newImages) {
//     const result = await updateDeleteImage(idCourse, newImages)
//     return res.status(200).json({ message: 'delete image success' })
//   }
// }
var deleteAllImageFromS3ByCourseId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idCourse, course;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                idCourse = req.params.idCourse;
                if (!idCourse) return [3 /*break*/, 2];
                return [4 /*yield*/, course_models_1.default.findById({ _id: idCourse })];
            case 1:
                course = (_b.sent());
                if ((_a = course === null || course === void 0 ? void 0 : course.images) === null || _a === void 0 ? void 0 : _a.length) {
                    course.images.map(function (item) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, uploadToS3_service_1.deleteImageS3)(item.key.toString())];
                                case 1:
                                    _a.sent();
                                    return [4 /*yield*/, (0, course_repository_1.updateDeleteCourseImage)(idCourse, item)];
                                case 2:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                    return [2 /*return*/, res.status(200).json({ message: 'delete image all success' })];
                }
                else {
                    return [2 /*return*/, res.status(400).json({ message: 'invalid prams' })];
                }
                return [3 /*break*/, 3];
            case 2:
                if (!idCourse) {
                    return [2 /*return*/, res.status(400).json({ message: 'invalid params' })];
                }
                _b.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteAllImageFromS3ByCourseId = deleteAllImageFromS3ByCourseId;
var getAllImageFromS3ByCourseId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idCourse, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idCourse = req.params.idCourse;
                if (!idCourse) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, course_repository_1.getAllImages)(idCourse)];
            case 1:
                result = _a.sent();
                if (!result) {
                    return [2 /*return*/, res.status(400).json({ message: 'invalid params' })];
                }
                return [2 /*return*/, res.status(200).json({ message: 'get all images success', images: result })];
            case 2:
                if (!idCourse) {
                    return [2 /*return*/, res.status(400).json({ message: 'invalid params' })];
                }
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllImageFromS3ByCourseId = getAllImageFromS3ByCourseId;
var getImageFromS3BykeyImage = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var keyImage, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                keyImage = req.params.keyImage;
                if (!keyImage) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, uploadToS3_service_1.getImageS3)(keyImage)];
            case 1:
                result = _a.sent();
                if (!result) {
                    return [2 /*return*/, res.status(400).json({ message: 'not found image' })];
                }
                return [2 /*return*/, res.status(200).json({ message: 'get  images success', image: result })];
            case 2:
                if (!keyImage) {
                    return [2 /*return*/, res.status(400).json({ message: 'invalid params' })];
                }
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getImageFromS3BykeyImage = getImageFromS3BykeyImage;
//Video
var uploadVideoFromLocalToS3ByCourseId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idCourse, course, file, videoObject, Videos, courseUpdate;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idCourse = req.params.idCourse;
                course = course_models_1.default.findById({ _id: idCourse });
                if (!idCourse) {
                    return [2 /*return*/, res.status(404).send('not found')];
                }
                if (!course) {
                    return [2 /*return*/, res.status(404).json({ mesage: 'not found coures' })];
                }
                file = req.file;
                if (!file) {
                    return [2 /*return*/, res.status(400).send('Không có file được tải lên.')];
                }
                if (!file) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, uploadToS3_service_1.uploadVideoS3)(file)];
            case 1:
                videoObject = _a.sent();
                if (!videoObject) {
                    return [2 /*return*/, res.status(500).json({ message: 'upload videoObject failed', videoObject: videoObject })];
                }
                console.log('add satrt');
                return [4 /*yield*/, (0, course_repository_1.addVideoToCourse)(idCourse, videoObject)];
            case 2:
                Videos = _a.sent();
                console.log('add success');
                if (!Videos) {
                    return [2 /*return*/, res.status(500).json({ message: 'upload image failed' })];
                }
                if (!!course.video) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, course_repository_1.updateVideoFromPopVideos)(idCourse, Videos)];
            case 3:
                courseUpdate = _a.sent();
                if (!courseUpdate) {
                    return [2 /*return*/, res.status(500).json({ message: 'update image failed' })];
                }
                _a.label = 4;
            case 4: return [2 /*return*/, res.status(200).json({ message: 'upload image success', result: Videos })];
            case 5: return [2 /*return*/, res.status(400).json({ message: 'File not provided or invalid' })];
        }
    });
}); };
exports.uploadVideoFromLocalToS3ByCourseId = uploadVideoFromLocalToS3ByCourseId;
var getAllVideoFromS3ByCourseId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idCourse, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idCourse = req.params.idCourse;
                if (!idCourse) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, course_repository_1.getAllVideos)(idCourse)];
            case 1:
                result = _a.sent();
                if (!result) {
                    return [2 /*return*/, res.status(400).json({ message: 'invalid params' })];
                }
                return [2 /*return*/, res.status(200).json({ message: 'get all video success', videos: result })];
            case 2:
                if (!idCourse) {
                    return [2 /*return*/, res.status(400).json({ message: 'invalid params' })];
                }
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getAllVideoFromS3ByCourseId = getAllVideoFromS3ByCourseId;
var getVideoFromS3BykeyVideo = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var keyVideo, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                keyVideo = req.params.keyVideo;
                if (!keyVideo) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, uploadToS3_service_1.getVideoS3)(keyVideo)];
            case 1:
                result = _a.sent();
                if (!result) {
                    return [2 /*return*/, res.status(400).json({ message: 'not found video' })];
                }
                return [2 /*return*/, res.status(200).json({ message: 'get  video success', video: result })];
            case 2:
                if (!keyVideo) {
                    return [2 /*return*/, res.status(400).json({ message: 'invalid params' })];
                }
                _a.label = 3;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.getVideoFromS3BykeyVideo = getVideoFromS3BykeyVideo;
var deleteAllVideoFromS3ByCourseId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idCourse, course, courseUpdate;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                idCourse = req.params.idCourse;
                if (!idCourse) return [3 /*break*/, 5];
                return [4 /*yield*/, course_models_1.default.findById({ _id: idCourse })];
            case 1:
                course = (_b.sent());
                if (!((_a = course === null || course === void 0 ? void 0 : course.videos) === null || _a === void 0 ? void 0 : _a.length)) return [3 /*break*/, 3];
                course.videos.map(function (item) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, (0, uploadToS3_service_1.deleteVideoS3)(item.key.toString())];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [4 /*yield*/, (0, course_repository_1.updateDeleteAllVideos)(idCourse)];
            case 2:
                courseUpdate = _b.sent();
                return [2 /*return*/, res.status(200).json({ message: 'delete video all success', courseUpdate: courseUpdate })];
            case 3: return [2 /*return*/, res.status(400).json({ message: 'invalid prams' })];
            case 4: return [3 /*break*/, 6];
            case 5:
                if (!idCourse) {
                    return [2 /*return*/, res.status(400).json({ message: 'invalid params' })];
                }
                _b.label = 6;
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.deleteAllVideoFromS3ByCourseId = deleteAllVideoFromS3ByCourseId;
var deleteVideoFromS3ByCourseId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idCourse, keyVideo, course, newVideos, result;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                idCourse = req.params.idCourse;
                keyVideo = req.params.keyVideo;
                if (!(idCourse && keyVideo)) return [3 /*break*/, 4];
                return [4 /*yield*/, course_models_1.default.findById(idCourse)];
            case 1:
                course = _b.sent();
                newVideos = (_a = course === null || course === void 0 ? void 0 : course.videos) === null || _a === void 0 ? void 0 : _a.filter(function (item) { return item.key != keyVideo; });
                return [4 /*yield*/, (0, uploadToS3_service_1.deleteVideoS3)(keyVideo)];
            case 2:
                _b.sent();
                if (!newVideos) return [3 /*break*/, 4];
                return [4 /*yield*/, (0, course_repository_1.updateDeleteVideo)(idCourse, newVideos)];
            case 3:
                result = _b.sent();
                return [2 /*return*/, res.status(200).json({ message: 'delete video success' })];
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.deleteVideoFromS3ByCourseId = deleteVideoFromS3ByCourseId;
