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
exports.getVideoS3 = exports.uploadVideoS3 = exports.deleteVideoS3 = exports.deleteImageS3 = exports.getImageS3 = exports.uploadImageS3 = void 0;
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
const env_config_1 = require("../config/env.config");
const s3_config_1 = require("../config/s3.config");
const crypto_1 = __importDefault(require("crypto"));
const uploadImageS3 = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const randomImageName = () => crypto_1.default.randomBytes(16).toString('hex');
    const imageName = randomImageName();
    const command = new client_s3_1.PutObjectCommand({
        Bucket: env_config_1.env.AWS_BUCKET_NAME,
        Key: imageName,
        Body: file.buffer,
        ContentType: 'image/jpg'
    });
    yield s3_config_1.s3.send(command);
    const commandGetUrl = new client_s3_1.GetObjectCommand({ Bucket: env_config_1.env.AWS_BUCKET_NAME, Key: imageName });
    const url = yield (0, s3_request_presigner_1.getSignedUrl)(s3_config_1.s3, commandGetUrl, { expiresIn: 360 });
    const objectImage = { url: url, key: imageName };
    return objectImage;
});
exports.uploadImageS3 = uploadImageS3;
const getImageS3 = (objectKey) => __awaiter(void 0, void 0, void 0, function* () {
    const command = new client_s3_1.GetObjectCommand({ Bucket: env_config_1.env.AWS_BUCKET_NAME, Key: objectKey });
    const result = yield (0, s3_request_presigner_1.getSignedUrl)(s3_config_1.s3, command, { expiresIn: 3600 });
    return result;
});
exports.getImageS3 = getImageS3;
const deleteImageS3 = (objectKey) => __awaiter(void 0, void 0, void 0, function* () {
    const command = new client_s3_1.DeleteObjectCommand({ Bucket: env_config_1.env.AWS_BUCKET_NAME, Key: objectKey });
    const result = yield s3_config_1.s3.send(command);
    console.log(result);
    return result;
});
exports.deleteImageS3 = deleteImageS3;
const deleteVideoS3 = (objectKey) => __awaiter(void 0, void 0, void 0, function* () {
    const command = new client_s3_1.DeleteObjectCommand({ Bucket: env_config_1.env.AWS_BUCKET_NAME, Key: objectKey });
    const result = yield s3_config_1.s3.send(command);
    return result;
});
exports.deleteVideoS3 = deleteVideoS3;
const uploadVideoS3 = (file) => __awaiter(void 0, void 0, void 0, function* () {
    const randomVideoName = () => crypto_1.default.randomBytes(16).toString('hex');
    const VideoName = randomVideoName();
    const command = new client_s3_1.PutObjectCommand({
        Bucket: env_config_1.env.AWS_BUCKET_NAME,
        Key: VideoName,
        Body: file.buffer,
        ContentType: 'video/mp4'
    });
    yield s3_config_1.s3.send(command);
    const commandGetUrl = new client_s3_1.GetObjectCommand({ Bucket: env_config_1.env.AWS_BUCKET_NAME, Key: VideoName });
    const url = yield (0, s3_request_presigner_1.getSignedUrl)(s3_config_1.s3, commandGetUrl, { expiresIn: 360 });
    const objectVideo = { url: url, key: VideoName };
    return objectVideo;
});
exports.uploadVideoS3 = uploadVideoS3;
const getVideoS3 = (objectKey) => __awaiter(void 0, void 0, void 0, function* () {
    const command = new client_s3_1.GetObjectCommand({ Bucket: env_config_1.env.AWS_BUCKET_NAME, Key: objectKey });
    const result = yield (0, s3_request_presigner_1.getSignedUrl)(s3_config_1.s3, command, { expiresIn: 3600 });
    return result;
});
exports.getVideoS3 = getVideoS3;
