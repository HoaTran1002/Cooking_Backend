"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
var multer_1 = __importDefault(require("multer"));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, callback) {
        console.log('create destination');
        return callback(null, './src/upload'); // Change the destination directory if needed
    },
    filename: function (req, file, cb) {
        console.log('create file name:', file.stream);
        return cb(null, file.originalname);
    }
});
exports.upload = (0, multer_1.default)({ storage: storage });
