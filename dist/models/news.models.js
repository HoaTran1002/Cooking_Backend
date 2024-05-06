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
var mongoose_1 = __importStar(require("mongoose"));
var course_models_1 = require("./course.models");
var news = new mongoose_1.Schema({
    title: { type: String },
    author: { type: String },
    content: { type: String },
    dateCreated: { type: Date, default: Date.now() },
    image: course_models_1.imageSchema
});
// news.pre('findOneAndDelete', async function (next) {
//   try {
//     const doc = (await this.model.findOne(this.getQuery())) as INews
//     if (doc.image) {
//       await deleteImageS3(doc.image.url)
//     }
//     next()
//   } catch (error: any) {
//     next(error)
//   }
// })
exports.default = mongoose_1.default.model('newsModels', news);
