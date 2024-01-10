"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadDisk = exports.uploadMemory = void 0;
var multer_1 = __importDefault(require("multer"));
var env_config_1 = require("./env.config");
var crypto_1 = __importDefault(require("crypto"));
exports.uploadMemory = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage()
});
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, env_config_1.env.PATH_DATA_FILE);
    },
    filename: function (req, file, cb) {
        var randomImageName = function () { return crypto_1.default.randomBytes(16).toString('hex'); };
        var imageName = randomImageName();
        cb(null, imageName + file.originalname);
    }
});
exports.uploadDisk = (0, multer_1.default)({
    storage: storage
});
