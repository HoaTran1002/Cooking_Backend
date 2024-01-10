"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var multer_config_1 = require("../config/multer.config");
// eslint-disable-next-line prettier/prettier
var course_controller_1 = require("../controllers/course.controller");
var auth_middlewears_1 = require("../middlewares/auth.middlewears");
var error_middlewear_1 = require("../middlewares/error.middlewear");
var validate_middlewear_1 = require("../middlewares/validate.middlewear");
var course_validator_1 = require("../validator/course.validator");
var router = (0, express_1.Router)();
router.get('/getAll', (0, error_middlewear_1.asyncHandelError)(course_controller_1.getAll));
router.post('/create', (0, validate_middlewear_1.validateBody)(course_validator_1.courseValidate), (0, error_middlewear_1.asyncHandelError)(course_controller_1.courseCreate));
router.get('/:courseId/roadmap/getAll', (0, auth_middlewears_1.authorize)(), (0, error_middlewear_1.asyncHandelError)(course_controller_1.courseCreateRoadmap));
router.post('/:courseId/roadmap/create', (0, auth_middlewears_1.authorize)(), (0, validate_middlewear_1.validateBody)(course_validator_1.roadmapValidate), (0, error_middlewear_1.asyncHandelError)(course_controller_1.courseCreateRoadmap));
router.put('/:courseId/update', (0, auth_middlewears_1.authorize)(), (0, validate_middlewear_1.validateBody)(course_validator_1.courseValidate), (0, error_middlewear_1.asyncHandelError)(course_controller_1.courseUpdateById));
router.put('/:courseId/roadmap/:roadmapId/update', (0, auth_middlewears_1.authorize)(), (0, validate_middlewear_1.validateBody)(course_validator_1.roadmapValidate), (0, error_middlewear_1.asyncHandelError)(course_controller_1.updateRoadmapById));
router.delete('/:courseId/roadmap/:roadmapId/remove', (0, auth_middlewears_1.authorize)(), (0, error_middlewear_1.asyncHandelError)(course_controller_1.removeRoadmapById));
router.delete('/:courseId/remove', (0, error_middlewear_1.asyncHandelError)(course_controller_1.removeCourseById));
//file
//image
router.post('/uploadImageFromLocal/:idCourse', multer_config_1.uploadDisk.single('file'), (0, error_middlewear_1.asyncHandelError)(course_controller_1.uploadImageFromLocalToVPSByCourseId));
router.delete('/:keyImage/deleteImageFromVPSByCourseId/:idCourse', (0, error_middlewear_1.asyncHandelError)(course_controller_1.deleteImageFromVPSByCourseId));
router.put('/:idCourse/updateContentImage/:keyImage', multer_config_1.uploadMemory.single('file'), (0, error_middlewear_1.asyncHandelError)(course_controller_1.updateContentImageVPS));
router.delete('/:idCourse/removeAllImageByCourseById', (0, error_middlewear_1.asyncHandelError)(course_controller_1.removeAllImageByCourseById));
// router.delete('/deleteAllImageFrom/:idCourse', asyncHandelError(deleteAllImageFromS3ByCourseId))
// router.get('/getAllImageFrom/:idCourse', asyncHandelError(getAllImageFromS3ByCourseId))
// router.get('/:keyImage/getImageFrom', asyncHandelError(getImageFromS3BykeyImage))
//video
router.post('/uploadVideoFromLocalToVPS/:idCourse', multer_config_1.uploadDisk.single('file'), (0, error_middlewear_1.asyncHandelError)(course_controller_1.uploadVideoFromLocalToVPSByCourseId));
router.delete('/:idCourse/deleteVideoByCourseId/:keyVideo', (0, error_middlewear_1.asyncHandelError)(course_controller_1.deleteVideoVPSByCourseId));
router.put('/:idCourse/updateContentVideo/:keyVideo', multer_config_1.uploadMemory.single('file'), (0, error_middlewear_1.asyncHandelError)(course_controller_1.updateContentVideoVPS));
router.delete('/:idCourse/removeAllVideoByCourseById', (0, error_middlewear_1.asyncHandelError)(course_controller_1.removeAllVideoByCourseById));
// router.delete('/deleteAllVideoFromS3/:idCourse', asyncHandelError(deleteAllVideoFromS3ByCourseId))
// router.get('/getAllVideoFromS3/:idCourse', asyncHandelError(getAllVideoFromS3ByCourseId))
// router.get('/:keyVideo/getVideoFromS3', asyncHandelError(getVideoFromS3BykeyVideo))
exports.default = router;
