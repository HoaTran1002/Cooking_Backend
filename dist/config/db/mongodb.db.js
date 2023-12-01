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
exports.connnectDB = void 0;
var mongoose_1 = __importStar(require("mongoose"));
var env_config_1 = require("../env.config");
var connnectDB = function () {
    var mongoDbUri = "mongodb://".concat(env_config_1.env.MONGODB_ADDRESS, "/Cooking");
    mongoose_1.default
        .connect(mongoDbUri)
        .then(function () {
        console.log('connect success!');
    })
        .catch(function (err) {
        console.log('connect failed:', err);
        throw new mongoose_1.Error('connect failed');
    });
};
exports.connnectDB = connnectDB;
