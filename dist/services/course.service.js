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
exports.updateDeleteVideo = exports.updateDeleteImage = exports.updateDeleteAllVideos = exports.updateDeleteAllImages = exports.getAllVideos = exports.getAllImages = exports.addVideoToCourse = exports.addImageToCourse = exports.updateVideoFromPopVideos = exports.updateImageFromPopImages = exports.create = exports.find = exports.remove = void 0;
const course_models_1 = __importDefault(require("../models/course.models"));
const remove = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('use service remove succesed!!');
});
exports.remove = remove;
const find = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('use service find succesed!!');
});
exports.find = find;
const create = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('use service remove succesed!!');
});
exports.create = create;
const updateImageFromPopImages = (courseId, imageArray) => __awaiter(void 0, void 0, void 0, function* () {
    const fillter = { _id: courseId };
    const update = { image: imageArray[0] };
    const options = { new: true };
    const course = yield course_models_1.default.findOneAndUpdate(fillter, update, options);
    return course;
});
exports.updateImageFromPopImages = updateImageFromPopImages;
const updateVideoFromPopVideos = (courseId, videoArray) => __awaiter(void 0, void 0, void 0, function* () {
    const fillter = { _id: courseId };
    const update = { image: videoArray[0] };
    const options = { new: true };
    const course = yield course_models_1.default.findOneAndUpdate(fillter, update, options);
    return course;
});
exports.updateVideoFromPopVideos = updateVideoFromPopVideos;
const addImageToCourse = (courseId, image) => __awaiter(void 0, void 0, void 0, function* () {
    const fillter = { _id: courseId };
    const update = { $push: { images: image } };
    const options = { new: true };
    const course = yield course_models_1.default.findOneAndUpdate(fillter, update, options);
    return course === null || course === void 0 ? void 0 : course.images;
});
exports.addImageToCourse = addImageToCourse;
const addVideoToCourse = (courseId, video) => __awaiter(void 0, void 0, void 0, function* () {
    const fillter = { _id: courseId };
    const update = { $push: { videos: video } };
    const options = { new: true };
    const course = yield course_models_1.default.findOneAndUpdate(fillter, update, options);
    return course === null || course === void 0 ? void 0 : course.videos;
});
exports.addVideoToCourse = addVideoToCourse;
const getAllImages = (idCourse) => __awaiter(void 0, void 0, void 0, function* () {
    const fillter = { _id: idCourse };
    const course = yield course_models_1.default.findOne(fillter);
    return (course === null || course === void 0 ? void 0 : course.images) || [];
});
exports.getAllImages = getAllImages;
const getAllVideos = (idCourse) => __awaiter(void 0, void 0, void 0, function* () {
    const fillter = { _id: idCourse };
    const course = yield course_models_1.default.findOne(fillter);
    return (course === null || course === void 0 ? void 0 : course.videos) || [];
});
exports.getAllVideos = getAllVideos;
const updateDeleteAllImages = (idCourse) => __awaiter(void 0, void 0, void 0, function* () {
    const fillter = { _id: idCourse };
    const update = { $set: { images: [], image: null } };
    const options = { new: true };
    const course = yield course_models_1.default.findOneAndUpdate(fillter, update, options);
    return course;
});
exports.updateDeleteAllImages = updateDeleteAllImages;
const updateDeleteAllVideos = (idCourse) => __awaiter(void 0, void 0, void 0, function* () {
    const fillter = { _id: idCourse };
    const update = { $set: { videos: [], video: null } };
    const options = { new: true };
    const course = yield course_models_1.default.findOneAndUpdate(fillter, update, options);
    return course;
});
exports.updateDeleteAllVideos = updateDeleteAllVideos;
const updateDeleteImage = (idCourse, images) => __awaiter(void 0, void 0, void 0, function* () {
    const fillter = { _id: idCourse };
    const update = { $set: { images: images, image: images[0] } };
    const options = { new: true };
    const result = yield course_models_1.default.findOneAndUpdate(fillter, update, options);
    return result;
});
exports.updateDeleteImage = updateDeleteImage;
const updateDeleteVideo = (idCourse, videos) => __awaiter(void 0, void 0, void 0, function* () {
    const fillter = { _id: idCourse };
    const update = { $set: { videos: videos, video: videos[0] } };
    const options = { new: true };
    const result = yield course_models_1.default.findOneAndUpdate(fillter, update, options);
    return result;
});
exports.updateDeleteVideo = updateDeleteVideo;
