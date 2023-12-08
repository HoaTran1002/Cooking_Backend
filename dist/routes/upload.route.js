"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable prettier/prettier */
const express_1 = require("express");
const multer_config_1 = require("../config/multer.config");
const upload_controllers_1 = require("../controllers/upload.controllers");
const error_middlewear_1 = require("../middlewares/error.middlewear");
const router = (0, express_1.Router)();
router.post('/uploadImageFromLocalS3/:idCourse', multer_config_1.uploadMemory.single('file'), (0, error_middlewear_1.asyncHandelError)(upload_controllers_1.uploadImageFromLocalToS3ByCourseId));
router.delete('/:keyImage/deleteImageFromS3ByCourseId/:idCourse', (0, error_middlewear_1.asyncHandelError)(upload_controllers_1.deleteImageFromS3ByCourseId));
router.delete('/deleteAllImageFromS3/:idCourse', (0, error_middlewear_1.asyncHandelError)(upload_controllers_1.deleteAllImageFromS3ByCourseId));
router.get('/getAllImageFromS3/:idCourse', (0, error_middlewear_1.asyncHandelError)(upload_controllers_1.getAllImageFromS3ByCourseId));
router.get('/:keyImage/getImageFromS3', (0, error_middlewear_1.asyncHandelError)(upload_controllers_1.getImageFromS3BykeyImage));
router.post('/uploadVideoFromLocalS3/:idCourse', multer_config_1.uploadMemory.single('file'), (0, error_middlewear_1.asyncHandelError)(upload_controllers_1.uploadVideoFromLocalToS3ByCourseId));
router.delete('/:keyVideo/deleteVideoFromS3ByCourseId/:idCourse', (0, error_middlewear_1.asyncHandelError)(upload_controllers_1.deleteVideoFromS3ByCourseId));
router.delete('/deleteAllVideoFromS3/:idCourse', (0, error_middlewear_1.asyncHandelError)(upload_controllers_1.deleteAllVideoFromS3ByCourseId));
router.get('/getAllVideoFromS3/:idCourse', (0, error_middlewear_1.asyncHandelError)(upload_controllers_1.getAllVideoFromS3ByCourseId));
router.get('/:keyVideo/getVideoFromS3', (0, error_middlewear_1.asyncHandelError)(upload_controllers_1.getVideoFromS3BykeyVideo));
exports.default = router;
