"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadDisk = exports.uploadMemory = void 0;
var multer_1 = __importDefault(require("multer"));
exports.uploadMemory = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage()
});
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './src/upload');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
});
exports.uploadDisk = (0, multer_1.default)({
    storage: storage
});