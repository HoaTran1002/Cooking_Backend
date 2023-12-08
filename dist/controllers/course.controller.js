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
exports.findOneById = exports.getAll = exports.removeCourseById = exports.removeRoadmaps = exports.removeRoadmapById = exports.updateRoadmapById = exports.courseUpdateById = exports.getCourseById = exports.courseCreateRoadmap = exports.courseCreate = void 0;
const course_models_1 = __importDefault(require("../models/course.models"));
const mongoose_1 = require("mongoose");
const course_service_1 = require("../services/course.service");
//create
const courseCreate = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield course_models_1.default.create(req.body);
        const response = {
            message: 'create sucess!',
            status: 200,
            data: course
        };
        if (!course) {
            response.message = 'create failed!!';
            response.status = 400;
        }
        return res.status(response.status ? response.status : 400).json(response);
    }
    catch (error) {
        throw new mongoose_1.Error(error.message);
    }
});
exports.courseCreate = courseCreate;
const courseCreateRoadmap = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const response = {
        message: ''
    };
    const params = req.params;
    const roadmap = req.body;
    const fillter = { _id: params.courseId };
    const update = { $push: { roadmaps: roadmap } };
    const options = { new: true };
    const course = yield course_models_1.default.findOneAndUpdate(fillter, update, options);
    if (!course) {
        return res.status(404).send('Course not found');
    }
    if (course) {
        response.message = 'created roadmap';
        response.data = course;
        response.status = 201;
    }
    return res.status(201).json({ course: course });
});
exports.courseCreateRoadmap = courseCreateRoadmap;
const getCourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idCourse = req.params.idCourse;
    const response = {
        message: 'get course success!'
    };
    if (idCourse) {
        const course = yield (0, course_service_1.findById)(idCourse);
        if (!course) {
            return res.status(404).json({ message: 'Course not found' });
        }
        response.data = course;
        return res.status(200).json(response);
    }
    else {
        return res.status(404).json({ message: 'Not Found' });
    }
});
exports.getCourseById = getCourseById;
//update
const courseUpdateById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.params;
        const fillter = { _id: params === null || params === void 0 ? void 0 : params.courseId };
        const upadate = req.body;
        const options = { new: true };
        const response = {
            message: ''
        };
        if (!params.courseId) {
            response.message = 'not exist courseId';
            response.status = 401;
            return res.status(401).json(response);
        }
        const course = yield course_models_1.default.findOneAndUpdate(fillter, upadate, options);
        if (!course) {
            return res.status(404).send('Course not found');
        }
        if (course) {
            response.message = 'updated course success';
            response.status = 200;
            response.data = course;
            return res.status(200).json(course);
        }
    }
    catch (error) {
        throw new mongoose_1.Error(error);
    }
});
exports.courseUpdateById = courseUpdateById;
const updateRoadmapById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const params = req.params;
        const fillter = { _id: params.courseId, 'roadmaps._id': params.roadmapId };
        const roadmap = req.body;
        const update = {
            $set: {
                'roadmaps.$.name': roadmap.name,
                'roadmaps.$.startTime': roadmap.startTime,
                'roadmaps.$.endTime': roadmap.endTime,
                'roadmaps.$.knowledge': roadmap.knowledge,
                'roadmaps.$.skill': roadmap.skill
            }
        };
        const options = { new: true };
        const response = {
            message: ''
        };
        const course = yield course_models_1.default.findOneAndUpdate(fillter, update, options);
        if (!course) {
            return res.status(404).send('Course or roadmap not found');
        }
        if (course) {
            response.message = 'updated roadmap success';
            response.status = 200;
            response.data = course;
            return res.status(200).json(response);
        }
    }
    catch (error) {
        throw new mongoose_1.Error(error);
    }
});
exports.updateRoadmapById = updateRoadmapById;
//remove
const removeRoadmapById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = {
            message: ''
        };
        const params = req.params;
        const filter = { _id: params.courseId };
        const update = {
            $pull: {
                roadmaps: { _id: params.roadmapId }
            }
        };
        const options = { new: true };
        const updatedCourse = yield course_models_1.default.findOneAndUpdate(filter, update, options);
        if (!updatedCourse) {
            return res.status(404).send('Course or roadmap not found');
        }
        else {
            response.message = 'deleted roadmap success';
            response.status = 204;
            response.data = updatedCourse;
            return res.status(204).json(response);
        }
    }
    catch (error) {
        throw new mongoose_1.Error(error);
    }
});
exports.removeRoadmapById = removeRoadmapById;
const removeRoadmaps = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = {
            message: ''
        };
        const params = req.params;
        const filter = { _id: params.courseId };
        const update = {
            $pull: {
                roadmaps: { _id: params.roadmapId }
            }
        };
        const options = { new: true };
        const updatedCourse = yield course_models_1.default.findOneAndUpdate(filter, update, options);
        if (!updatedCourse) {
            return res.status(404).send('Course or roadmap not found');
        }
        else {
            response.message = 'deleted roadmap success';
            response.status = 204;
            response.data = updatedCourse;
            return res.status(204).json(response);
        }
    }
    catch (error) {
        throw new mongoose_1.Error(error);
    }
});
exports.removeRoadmaps = removeRoadmaps;
const removeCourseById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = {
            message: ''
        };
        const params = req.params;
        const filter = { _id: params.courseId };
        const udeletedCourse = yield course_models_1.default.findByIdAndDelete(filter);
        if (!udeletedCourse) {
            return res.status(404).send('Course  not found');
        }
        else {
            response.message = 'deleted Course success';
            response.status = 204;
            response.data = udeletedCourse;
            return res.status(204).send('ok');
        }
    }
    catch (error) {
        throw new mongoose_1.Error(error);
    }
});
exports.removeCourseById = removeCourseById;
//queries
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const course = yield course_models_1.default.find({});
        const response = {
            message: 'get all sucess!',
            status: 200,
            data: course
        };
        return res.status(200).json(response);
    }
    catch (error) {
        console.log(error);
    }
});
exports.getAll = getAll;
const findOneById = (req, res) => __awaiter(void 0, void 0, void 0, function* () { });
exports.findOneById = findOneById;
