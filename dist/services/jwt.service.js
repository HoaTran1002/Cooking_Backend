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
exports.replaceRefreshToken = exports.getRefreshToken = exports.checkedRefreshToken = exports.checkedAccessToken = exports.decodeRefreshToken = exports.decodeAccessToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const env_config_1 = require("../config/env.config");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const refreshtoken_models_1 = __importDefault(require("../models/refreshtoken.models"));
const generateAccessToken = (user) => {
    try {
        const payload = { _id: user._id, userName: user.userName };
        const token = jsonwebtoken_1.default.sign(payload, env_config_1.env.SECRET_KEY_ACCESS_TOKEN, {
            expiresIn: env_config_1.env.EXPIRES_SETCRECT_KEY_ACCESS_TOKEN
        });
        return token;
    }
    catch (error) {
        error.status = 401;
        throw new Error(error);
    }
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (user) => {
    try {
        const payload = { _id: user._id, userName: user.userName };
        const token = jsonwebtoken_1.default.sign(payload, env_config_1.env.SECRET_KEY_REFRESH_TOKEN, {
            expiresIn: env_config_1.env.EXPIRES_SETCRECT_KEY_REFRESH_TOKEN
        });
        return token;
    }
    catch (error) {
        error.status = 401;
        throw new Error(error);
    }
};
exports.generateRefreshToken = generateRefreshToken;
const decodeAccessToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_config_1.env.SECRET_KEY_ACCESS_TOKEN);
        return decoded;
    }
    catch (error) {
        error.status = 401;
        throw new Error(error);
    }
};
exports.decodeAccessToken = decodeAccessToken;
const decodeRefreshToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_config_1.env.SECRET_KEY_REFRESH_TOKEN);
        return decoded;
    }
    catch (error) {
        error.status = 401;
        throw new Error(error);
    }
};
exports.decodeRefreshToken = decodeRefreshToken;
const checkedAccessToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_config_1.env.SECRET_KEY_ACCESS_TOKEN);
        const currentTime = Number(Math.floor(Date.now() / 1000));
        if (decoded.exp) {
            return decoded.exp < currentTime;
        }
        return false;
    }
    catch (error) {
        error.status = 401;
        throw new Error(error);
    }
};
exports.checkedAccessToken = checkedAccessToken;
const checkedRefreshToken = (token) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(token, env_config_1.env.SECRET_KEY_REFRESH_TOKEN);
        const currentTime = Number(Math.floor(Date.now() / 1000));
        if (decoded.exp) {
            return decoded.exp < currentTime;
        }
        return false;
    }
    catch (error) {
        error.status = 401;
        throw new Error(error);
    }
};
exports.checkedRefreshToken = checkedRefreshToken;
const getRefreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (!token) {
            throw new Error('Token is missing');
        }
        console.log('token:', token);
        const fillter = { token: token };
        const refreshToken = yield refreshtoken_models_1.default.findOne(fillter);
        if (!refreshToken)
            throw 'Invalid token';
        return refreshToken.token;
    }
    catch (error) {
        error.status = 401;
        throw new Error(error);
    }
});
exports.getRefreshToken = getRefreshToken;
const replaceRefreshToken = (refreshToken, newRefreshToken) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const filter = { token: refreshToken };
        const update = { token: newRefreshToken };
        const options = { new: true };
        const record = yield refreshtoken_models_1.default.findOneAndUpdate(filter, update, options);
        if (!record) {
            console.log(`Không tìm thấy bản ghi với refreshToken: ${refreshToken}`);
        }
        console.log('replace success:', record);
        return record;
    }
    catch (error) {
        error.status = 401;
        console.error('Lỗi trong quá trình cập nhật refreshToken:', error);
        throw error;
    }
});
exports.replaceRefreshToken = replaceRefreshToken;
