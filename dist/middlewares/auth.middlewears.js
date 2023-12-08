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
exports.authorize = void 0;
const error_middlewear_1 = require("./error.middlewear");
const jwt_service_1 = require("../services/jwt.service");
const account_models_1 = __importDefault(require("../models/account.models"));
const authorize = (roles) => (0, error_middlewear_1.asyncHandelError)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const response = {
        message: ''
    };
    const authorizationHeader = req.get('Authorization');
    console.log('authorizationHeader:', authorizationHeader);
    if (!authorizationHeader) {
        response.message = 'not found token';
        throw new Error('no authencation');
    }
    const token = authorizationHeader.split(' ')[1];
    const decoded = (0, jwt_service_1.decodeAccessToken)(token);
    if (!decoded) {
        response.message = 'Unauthorized';
        throw new Error('Unauthorized');
    }
    const account = yield account_models_1.default.findOne({ _id: decoded._id });
    if (!account) {
        response.message = 'Unauthorized';
        throw new Error('Unauthorized');
    }
    const role = (account === null || account === void 0 ? void 0 : account.role) || 'STUDENT';
    if (roles && roles.length > 0) {
        if (roles && roles.includes(role)) {
            next();
        }
        else {
            throw new Error('Forbidden');
        }
    }
    else {
        next();
    }
}));
exports.authorize = authorize;
