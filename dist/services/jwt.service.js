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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.replaceRefreshToken = exports.getRefreshToken = exports.checkedRefreshToken = exports.checkedAccessToken = exports.decodeRefreshToken = exports.decodeAccessToken = exports.generateRefreshToken = exports.generateAccessToken = void 0;
var env_config_1 = require("../config/env.config");
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var refreshtoken_models_1 = __importDefault(require("../models/refreshtoken.models"));
var generateAccessToken = function (user) {
    try {
        var payload = { _id: user._id, userName: user.userName };
        var token = jsonwebtoken_1.default.sign(payload, env_config_1.env.SECRET_KEY_ACCESS_TOKEN, {
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
var generateRefreshToken = function (user) {
    try {
        var payload = { _id: user._id, userName: user.userName };
        var token = jsonwebtoken_1.default.sign(payload, env_config_1.env.SECRET_KEY_REFRESH_TOKEN, {
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
var decodeAccessToken = function (token) {
    try {
        var decoded = jsonwebtoken_1.default.verify(token, env_config_1.env.SECRET_KEY_ACCESS_TOKEN);
        return decoded;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.decodeAccessToken = decodeAccessToken;
var decodeRefreshToken = function (token) {
    try {
        var decoded = jsonwebtoken_1.default.verify(token, env_config_1.env.SECRET_KEY_REFRESH_TOKEN);
        return decoded;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.decodeRefreshToken = decodeRefreshToken;
var checkedAccessToken = function (token) {
    try {
        var decoded = jsonwebtoken_1.default.verify(token, env_config_1.env.SECRET_KEY_ACCESS_TOKEN);
        var currentTime = Number(Math.floor(Date.now() / 1000));
        if (decoded.exp) {
            return decoded.exp < currentTime;
        }
        return false;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.checkedAccessToken = checkedAccessToken;
var checkedRefreshToken = function (token) {
    try {
        var decoded = jsonwebtoken_1.default.verify(token, env_config_1.env.SECRET_KEY_REFRESH_TOKEN);
        var currentTime = Number(Math.floor(Date.now() / 1000));
        if (decoded.exp) {
            return decoded.exp < currentTime;
        }
        return false;
    }
    catch (error) {
        throw new Error(error);
    }
};
exports.checkedRefreshToken = checkedRefreshToken;
var getRefreshToken = function (token) { return __awaiter(void 0, void 0, void 0, function () {
    var fillter, refreshToken;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!token) {
                    throw 'Token is missing';
                }
                console.log('token:', token);
                fillter = { token: token };
                return [4 /*yield*/, refreshtoken_models_1.default.findOne(fillter)];
            case 1:
                refreshToken = _a.sent();
                if (!refreshToken)
                    throw 'Invalid token';
                return [2 /*return*/, refreshToken.token];
        }
    });
}); };
exports.getRefreshToken = getRefreshToken;
var replaceRefreshToken = function (refreshToken, newRefreshToken) { return __awaiter(void 0, void 0, void 0, function () {
    var filter, update, options, record, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                filter = { token: refreshToken };
                update = { token: newRefreshToken };
                options = { new: true };
                return [4 /*yield*/, refreshtoken_models_1.default.findOneAndUpdate(filter, update, options)];
            case 1:
                record = _a.sent();
                if (!record) {
                    console.log("Kh\u00F4ng t\u00ECm th\u1EA5y b\u1EA3n ghi v\u1EDBi refreshToken: ".concat(refreshToken));
                }
                console.log('replace success:', record);
                return [2 /*return*/, record];
            case 2:
                error_1 = _a.sent();
                console.error('Lỗi trong quá trình cập nhật refreshToken:', error_1);
                throw error_1;
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.replaceRefreshToken = replaceRefreshToken;
