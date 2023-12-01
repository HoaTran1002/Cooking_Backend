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
exports.deleteFiles = exports.deleteFile = exports.uploadFileToDrive = void 0;
const google_cloud_1 = require("../config/cloud/google.cloud");
const fs_1 = __importDefault(require("fs"));
const uploadFileToDrive = (file) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    const requestBody = {
        name: file.originalname,
        fields: 'id,mimeType'
    };
    const media = {
        mimeType: file.mimetype,
        body: fs_1.default.createReadStream(file.destination + '/' + file.originalname)
    };
    try {
        const file = yield google_cloud_1.drive.files.create({
            requestBody,
            media: media
        });
        const response = {
            id: ((_a = file === null || file === void 0 ? void 0 : file.data) === null || _a === void 0 ? void 0 : _a.id) || 'null',
            mimeType: ((_b = file === null || file === void 0 ? void 0 : file.data) === null || _b === void 0 ? void 0 : _b.mimeType) || 'null'
        };
        return response;
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.uploadFileToDrive = uploadFileToDrive;
//export const uploadFiles = () => {}
const deleteFile = () => { };
exports.deleteFile = deleteFile;
const deleteFiles = () => { };
exports.deleteFiles = deleteFiles;
