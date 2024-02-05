"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hightLightSchema = exports.videoSchema = exports.imageSchema = void 0;
var mongoose_1 = __importStar(require("mongoose"));
exports.imageSchema = new mongoose_1.Schema({
    url: { type: String },
    key: { type: String }
});
exports.videoSchema = new mongoose_1.Schema({
    url: { type: String },
    key: { type: String }
});
exports.hightLightSchema = new mongoose_1.Schema({
    title: { type: String },
    content: { type: String }
});
var product = new mongoose_1.Schema({
    name: { type: String },
    note: { type: String },
    images: { type: [exports.imageSchema] },
    videos: { type: [exports.videoSchema] },
    timeLearning: { type: String },
    idCourse: { type: String },
    idCategory: { type: String },
    linkYoutube: { type: String },
    title: { type: String },
    description: { type: String },
    price: { type: String },
    position: { type: String },
    executionTime: { type: String },
    numberOfAttendees: { type: Number },
    languageOfInstruction: { type: String },
    serviceDetailsWhenStudying: { type: String },
    linkMenu: { type: String },
    hightlight: [exports.hightLightSchema],
    requiredWhenStudying: { type: String },
    content_review: { type: String },
    listScript: [{ type: String }]
});
exports.default = mongoose_1.default.model('ProductsModels', product);
