"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadDisk = exports.uploadMemory = void 0;
var multer_1 = __importDefault(require("multer"));
var crypto_1 = __importDefault(require("crypto"));
var fs_1 = __importDefault(require("fs")); // Import thư viện fs để làm việc với file system
exports.uploadMemory = (0, multer_1.default)({
    storage: multer_1.default.memoryStorage()
});
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        var uploadPath = './src/content/upload';
        // Kiểm tra xem thư mục uploadPath có tồn tại không
        if (!fs_1.default.existsSync(uploadPath)) {
            // Nếu không tồn tại, hãy tạo thư mục
            fs_1.default.mkdirSync(uploadPath, { recursive: true }); // Sử dụng recursive để tạo các thư mục cha nếu cần thiết
        }
        cb(null, uploadPath);
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
