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
exports.deleteVideoFromS3ByCourseId = exports.deleteAllVideoFromS3ByCourseId = exports.getVideoFromS3BykeyVideo = exports.getAllVideoFromS3ByCourseId = exports.uploadVideoFromLocalToS3ByCourseId = exports.deleteImageFromS3ByCourseId = exports.deleteAllImageFromS3ByCourseId = exports.getImageFromS3BykeyImage = exports.getAllImageFromS3ByCourseId = exports.uploadImageFromLocalToS3ByCourseId = void 0;
const upload_service_1 = require("../services/upload.service");
const course_models_1 = __importDefault(require("../models/course.models"));
const course_service_1 = require("../services/course.service");
//Image
const uploadImageFromLocalToS3ByCourseId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idCourse = req.params.idCourse;
    const course = course_models_1.default.findById({ _id: idCourse });
    if (!idCourse) {
        return res.status(404).send('not found');
    }
    if (!course) {
        return res.status(404).json({ mesage: 'not found coures' });
    }
    const file = req.file;
    if (!file) {
        return res.status(400).send('Không có file được tải lên.');
    }
    if (file) {
        const imageObject = yield (0, upload_service_1.uploadImageS3)(file);
        if (!imageObject) {
            return res.status(500).json({ message: 'upload image failed', imageObject: imageObject });
        }
        const Images = yield (0, course_service_1.addImageToCourse)(idCourse, imageObject);
        if (!Images) {
            return res.status(500).json({ message: 'upload image failed' });
        }
        if (!course.image) {
            const courseUpdate = yield (0, course_service_1.updateImageFromPopImages)(idCourse, Images);
            if (!courseUpdate) {
                return res.status(500).json({ message: 'update image failed' });
            }
        }
        return res.status(200).json({ message: 'upload image success', result: Images });
    }
    else {
        return res.status(400).json({ message: 'File not provided or invalid' });
    }
});
exports.uploadImageFromLocalToS3ByCourseId = uploadImageFromLocalToS3ByCourseId;
const getAllImageFromS3ByCourseId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idCourse = req.params.idCourse;
    if (idCourse) {
        const result = yield (0, course_service_1.getAllImages)(idCourse);
        if (!result) {
            return res.status(400).json({ message: 'invalid params' });
        }
        return res.status(200).json({ message: 'get all images success', images: result });
    }
    else if (!idCourse) {
        return res.status(400).json({ message: 'invalid params' });
    }
});
exports.getAllImageFromS3ByCourseId = getAllImageFromS3ByCourseId;
const getImageFromS3BykeyImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyImage = req.params.keyImage;
    if (keyImage) {
        const result = yield (0, upload_service_1.getImageS3)(keyImage);
        if (!result) {
            return res.status(400).json({ message: 'not found image' });
        }
        return res.status(200).json({ message: 'get  images success', image: result });
    }
    else if (!keyImage) {
        return res.status(400).json({ message: 'invalid params' });
    }
});
exports.getImageFromS3BykeyImage = getImageFromS3BykeyImage;
const deleteAllImageFromS3ByCourseId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const idCourse = req.params.idCourse;
    if (idCourse) {
        const course = (yield course_models_1.default.findById({ _id: idCourse }));
        if ((_a = course === null || course === void 0 ? void 0 : course.images) === null || _a === void 0 ? void 0 : _a.length) {
            course.images.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, upload_service_1.deleteImageS3)(item.key.toString());
            }));
            const courseUpdate = yield (0, course_service_1.updateDeleteAllImages)(idCourse);
            return res.status(200).json({ message: 'delete image all success', courseUpdate });
        }
        else {
            return res.status(400).json({ message: 'invalid prams' });
        }
    }
    else if (!idCourse) {
        return res.status(400).json({ message: 'invalid params' });
    }
});
exports.deleteAllImageFromS3ByCourseId = deleteAllImageFromS3ByCourseId;
const deleteImageFromS3ByCourseId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _b;
    const idCourse = req.params.idCourse;
    const keyImage = req.params.keyImage;
    if (idCourse && keyImage) {
        const course = yield course_models_1.default.findById(idCourse);
        const newImages = (_b = course === null || course === void 0 ? void 0 : course.images) === null || _b === void 0 ? void 0 : _b.filter((item) => item.key != keyImage);
        yield (0, upload_service_1.deleteImageS3)(keyImage);
        if (newImages) {
            const result = yield (0, course_service_1.updateDeleteImage)(idCourse, newImages);
            return res.status(200).json({ message: 'delete image success' });
        }
    }
});
exports.deleteImageFromS3ByCourseId = deleteImageFromS3ByCourseId;
//Video
const uploadVideoFromLocalToS3ByCourseId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idCourse = req.params.idCourse;
    const course = course_models_1.default.findById({ _id: idCourse });
    if (!idCourse) {
        return res.status(404).send('not found');
    }
    if (!course) {
        return res.status(404).json({ mesage: 'not found coures' });
    }
    const file = req.file;
    if (!file) {
        return res.status(400).send('Không có file được tải lên.');
    }
    if (file) {
        const videoObject = yield (0, upload_service_1.uploadVideoS3)(file);
        if (!videoObject) {
            return res.status(500).json({ message: 'upload videoObject failed', videoObject: videoObject });
        }
        const Videos = yield (0, course_service_1.addVideoToCourse)(idCourse, videoObject);
        if (!Videos) {
            return res.status(500).json({ message: 'upload image failed' });
        }
        if (!course.image) {
            const courseUpdate = yield (0, course_service_1.updateImageFromPopImages)(idCourse, Videos);
            if (!courseUpdate) {
                return res.status(500).json({ message: 'update image failed' });
            }
        }
        return res.status(200).json({ message: 'upload image success', result: Videos });
    }
    else {
        return res.status(400).json({ message: 'File not provided or invalid' });
    }
});
exports.uploadVideoFromLocalToS3ByCourseId = uploadVideoFromLocalToS3ByCourseId;
const getAllVideoFromS3ByCourseId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idCourse = req.params.idCourse;
    if (idCourse) {
        const result = yield (0, course_service_1.getAllVideos)(idCourse);
        if (!result) {
            return res.status(400).json({ message: 'invalid params' });
        }
        return res.status(200).json({ message: 'get all video success', videos: result });
    }
    else if (!idCourse) {
        return res.status(400).json({ message: 'invalid params' });
    }
});
exports.getAllVideoFromS3ByCourseId = getAllVideoFromS3ByCourseId;
const getVideoFromS3BykeyVideo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const keyVideo = req.params.keyVideo;
    if (keyVideo) {
        const result = yield (0, upload_service_1.getVideoS3)(keyVideo);
        if (!result) {
            return res.status(400).json({ message: 'not found video' });
        }
        return res.status(200).json({ message: 'get  video success', video: result });
    }
    else if (!keyVideo) {
        return res.status(400).json({ message: 'invalid params' });
    }
});
exports.getVideoFromS3BykeyVideo = getVideoFromS3BykeyVideo;
const deleteAllVideoFromS3ByCourseId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _c;
    const idCourse = req.params.idCourse;
    if (idCourse) {
        const course = (yield course_models_1.default.findById({ _id: idCourse }));
        if ((_c = course === null || course === void 0 ? void 0 : course.videos) === null || _c === void 0 ? void 0 : _c.length) {
            course.videos.map((item) => __awaiter(void 0, void 0, void 0, function* () {
                yield (0, upload_service_1.deleteVideoS3)(item.key.toString());
            }));
            const courseUpdate = yield (0, course_service_1.updateDeleteAllVideos)(idCourse);
            return res.status(200).json({ message: 'delete video all success', courseUpdate });
        }
        else {
            return res.status(400).json({ message: 'invalid prams' });
        }
    }
    else if (!idCourse) {
        return res.status(400).json({ message: 'invalid params' });
    }
});
exports.deleteAllVideoFromS3ByCourseId = deleteAllVideoFromS3ByCourseId;
const deleteVideoFromS3ByCourseId = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _d;
    const idCourse = req.params.idCourse;
    const keyVideo = req.params.keyVideo;
    if (idCourse && keyVideo) {
        const course = yield course_models_1.default.findById(idCourse);
        const newVideos = (_d = course === null || course === void 0 ? void 0 : course.videos) === null || _d === void 0 ? void 0 : _d.filter((item) => item.key != keyVideo);
        yield (0, upload_service_1.deleteVideoS3)(keyVideo);
        if (newVideos) {
            const result = yield (0, course_service_1.updateDeleteVideo)(idCourse, newVideos);
            return res.status(200).json({ message: 'delete video success' });
        }
    }
});
exports.deleteVideoFromS3ByCourseId = deleteVideoFromS3ByCourseId;
