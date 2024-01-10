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
exports.course = exports.videoSchema = exports.imageSchema = void 0;
var mongoose_1 = __importStar(require("mongoose"));
exports.imageSchema = new mongoose_1.Schema({
    url: { type: String },
    key: { type: String }
});
exports.videoSchema = new mongoose_1.Schema({
    url: { type: String },
    key: { type: String }
});
var roadmapSchema = new mongoose_1.Schema({
    name: { type: String, default: 'null' },
    startTime: { type: Date },
    endTime: { type: Date },
    skill: { type: String, default: 'null' },
    knowledge: { type: String, default: 'null' }
});
exports.course = new mongoose_1.Schema({
    category: { type: String },
    level: { type: String },
    title: { type: String, default: 'null' },
    description: { type: String, default: 'null' },
    images: [exports.imageSchema],
    videos: [exports.videoSchema],
    roadmaps: [roadmapSchema],
    price: { type: Number, default: 0 },
    discountPrice: { type: Number, default: 0 },
    discountPercentage: { type: Number, default: 0 },
    timeCreate: { type: Date, default: Date.now },
    timeUpdate: { type: Date }
});
exports.default = mongoose_1.default.model('Courses', exports.course);
