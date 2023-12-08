"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// eslint-disable-next-line prettier/prettier
const course_controller_1 = require("../controllers/course.controller");
const auth_middlewears_1 = require("../middlewares/auth.middlewears");
const error_middlewear_1 = require("../middlewares/error.middlewear");
const validate_middlewear_1 = require("../middlewares/validate.middlewear");
const course_validator_1 = require("../validator/course.validator");
const router = (0, express_1.Router)();
router.get('/getAll', (0, error_middlewear_1.asyncHandelError)(course_controller_1.getAll));
router.post('/create', (0, validate_middlewear_1.validateBody)(course_validator_1.courseValidate), (0, error_middlewear_1.asyncHandelError)(course_controller_1.courseCreate));
router.get('/:courseId/roadmap/getAll', (0, auth_middlewears_1.authorize)(), (0, error_middlewear_1.asyncHandelError)(course_controller_1.courseCreateRoadmap));
router.post('/:courseId/roadmap/create', (0, auth_middlewears_1.authorize)(), (0, validate_middlewear_1.validateBody)(course_validator_1.roadmapValidate), (0, error_middlewear_1.asyncHandelError)(course_controller_1.courseCreateRoadmap));
router.put('/:courseId/update', (0, auth_middlewears_1.authorize)(), (0, validate_middlewear_1.validateBody)(course_validator_1.courseValidate), (0, error_middlewear_1.asyncHandelError)(course_controller_1.courseUpdateById));
router.put('/:courseId/roadmap/:roadmapId/update', (0, auth_middlewears_1.authorize)(), (0, validate_middlewear_1.validateBody)(course_validator_1.roadmapValidate), (0, error_middlewear_1.asyncHandelError)(course_controller_1.updateRoadmapById));
router.delete('/:courseId/roadmap/:roadmapId/remove', (0, auth_middlewears_1.authorize)(), (0, error_middlewear_1.asyncHandelError)(course_controller_1.removeRoadmapById));
router.delete('/:courseId/remove', (0, auth_middlewears_1.authorize)(), (0, error_middlewear_1.asyncHandelError)(course_controller_1.removeCourseById));
exports.default = router;
