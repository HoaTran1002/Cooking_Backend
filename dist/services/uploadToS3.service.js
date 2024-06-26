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
exports.getVideoS3 = exports.uploadVideoS3 = exports.deleteVideoS3 = exports.deleteImageS3 = exports.getImageS3 = exports.PutImageS3 = exports.uploadImageS3 = void 0;
var client_s3_1 = require("@aws-sdk/client-s3");
var s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
var env_config_1 = require("../config/env.config");
var s3_config_1 = require("../config/s3.config");
var crypto_1 = __importDefault(require("crypto"));
var uploadImageS3 = function (file) { return __awaiter(void 0, void 0, void 0, function () {
    var randomImageName, imageName, command, commandGetUrl, url, objectImage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                randomImageName = function () { return crypto_1.default.randomBytes(16).toString('hex'); };
                imageName = randomImageName();
                command = new client_s3_1.PutObjectCommand({
                    Bucket: env_config_1.env.AWS_BUCKET_NAME,
                    Key: imageName,
                    Body: file.buffer,
                    ContentType: 'image/jpg'
                });
                return [4 /*yield*/, s3_config_1.s3.send(command)];
            case 1:
                _a.sent();
                commandGetUrl = new client_s3_1.GetObjectCommand({ Bucket: env_config_1.env.AWS_BUCKET_NAME, Key: imageName });
                return [4 /*yield*/, (0, s3_request_presigner_1.getSignedUrl)(s3_config_1.s3, commandGetUrl)];
            case 2:
                url = _a.sent();
                objectImage = { url: url, key: imageName };
                return [2 /*return*/, objectImage];
        }
    });
}); };
exports.uploadImageS3 = uploadImageS3;
var PutImageS3 = function (file, image) { return __awaiter(void 0, void 0, void 0, function () {
    var command, objectImage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('image key:', image.key);
                command = new client_s3_1.PutObjectCommand({
                    Bucket: env_config_1.env.AWS_BUCKET_NAME,
                    Key: image.key,
                    Body: file.buffer,
                    ContentType: 'image/jpg'
                });
                return [4 /*yield*/, s3_config_1.s3.send(command)];
            case 1:
                _a.sent();
                objectImage = { url: image.url, key: image.key };
                return [2 /*return*/, objectImage];
        }
    });
}); };
exports.PutImageS3 = PutImageS3;
var getImageS3 = function (objectKey) { return __awaiter(void 0, void 0, void 0, function () {
    var command, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                command = new client_s3_1.GetObjectCommand({ Bucket: env_config_1.env.AWS_BUCKET_NAME, Key: objectKey });
                return [4 /*yield*/, (0, s3_request_presigner_1.getSignedUrl)(s3_config_1.s3, command)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.getImageS3 = getImageS3;
var deleteImageS3 = function (objectKey) { return __awaiter(void 0, void 0, void 0, function () {
    var command, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                command = new client_s3_1.DeleteObjectCommand({ Bucket: env_config_1.env.AWS_BUCKET_NAME, Key: objectKey });
                return [4 /*yield*/, s3_config_1.s3.send(command)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.deleteImageS3 = deleteImageS3;
var deleteVideoS3 = function (objectKey) { return __awaiter(void 0, void 0, void 0, function () {
    var command, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                command = new client_s3_1.DeleteObjectCommand({ Bucket: env_config_1.env.AWS_BUCKET_NAME, Key: objectKey });
                return [4 /*yield*/, s3_config_1.s3.send(command)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.deleteVideoS3 = deleteVideoS3;
var uploadVideoS3 = function (file) { return __awaiter(void 0, void 0, void 0, function () {
    var randomVideoName, VideoName, command, commandGetUrl, url, objectVideo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                randomVideoName = function () { return crypto_1.default.randomBytes(16).toString('hex'); };
                VideoName = randomVideoName();
                command = new client_s3_1.PutObjectCommand({
                    Bucket: env_config_1.env.AWS_BUCKET_NAME,
                    Key: VideoName,
                    Body: file.buffer,
                    ContentType: 'video/mp4'
                });
                console.log('pedding');
                return [4 /*yield*/, s3_config_1.s3.send(command)];
            case 1:
                _a.sent();
                commandGetUrl = new client_s3_1.GetObjectCommand({ Bucket: env_config_1.env.AWS_BUCKET_NAME, Key: VideoName });
                return [4 /*yield*/, (0, s3_request_presigner_1.getSignedUrl)(s3_config_1.s3, commandGetUrl)];
            case 2:
                url = _a.sent();
                console.log('success');
                objectVideo = { url: url, key: VideoName };
                return [2 /*return*/, objectVideo];
        }
    });
}); };
exports.uploadVideoS3 = uploadVideoS3;
var getVideoS3 = function (objectKey) { return __awaiter(void 0, void 0, void 0, function () {
    var command, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                command = new client_s3_1.GetObjectCommand({ Bucket: env_config_1.env.AWS_BUCKET_NAME, Key: objectKey });
                return [4 /*yield*/, (0, s3_request_presigner_1.getSignedUrl)(s3_config_1.s3, command)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.getVideoS3 = getVideoS3;
