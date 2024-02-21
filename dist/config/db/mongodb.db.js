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
exports.connectDB = void 0;
var mongoose_1 = __importStar(require("mongoose"));
var connectDB = function () {
    // const mongoDbUri = `mongodb://${env.DB_USERNAME}:${env.DB_PASSWORD}@${env.MONGODB_ADDRESS}/Cooking`
    var mongoDbUri = "mongodb://localhost:27017/Cooking";
    mongoose_1.default
        .connect(mongoDbUri, {
        authSource: 'admin'
    })
        .then(function () {
        console.log('Connected to MongoDB');
    })
        .catch(function (error) {
        console.error('Error connecting to MongoDB:', error);
        if (error instanceof mongoose_1.default.Error) {
            if (error.name === 'MongoTimeoutError') {
                console.error('Timeout error occurred. Please check your network connection or MongoDB server.');
            }
            else if (error.name === 'MongoNetworkError') {
                console.error('Network error occurred. Please ensure MongoDB server is running.');
            }
            else {
                console.error('Other Mongoose error occurred:', error.message);
            }
        }
        else {
            console.error('Other error occurred:', error.message);
        }
        throw new mongoose_1.Error('Connect failed');
    });
};
exports.connectDB = connectDB;
