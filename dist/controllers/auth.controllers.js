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
exports.logOut = exports.requestRefereshToken = exports.login = exports.register = void 0;
var account_models_1 = __importDefault(require("../models/account.models"));
var auth_service_1 = require("../services/auth.service");
var jwt_service_1 = require("../services/jwt.service");
var refreshtoken_models_1 = __importDefault(require("../models/refreshtoken.models"));
var env_config_1 = require("../config/env.config");
var cookiesOptions = {
    expires: new Date(Date.now() + 86400000),
    httpOnly: false,
    secure: true
};
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, response, alreadyAccount, account, user, accessToken, refreshToken, RefreshTokenDocument;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                response = {
                    message: 'create success',
                    status: 200
                };
                if (!body.userName || !body.password) {
                    ;
                    (response.message = 'invalid format'), (response.status = 401);
                    return [2 /*return*/, res.status(401).json(response)];
                }
                return [4 /*yield*/, account_models_1.default.findOne({ userName: body.userName })];
            case 1:
                alreadyAccount = _a.sent();
                if (!alreadyAccount) return [3 /*break*/, 2];
                ;
                (response.message = 'already account!'), (response.status = 409);
                return [2 /*return*/, res.status(409).json(response)];
            case 2: return [4 /*yield*/, (0, auth_service_1.createAccount)(body)];
            case 3:
                account = _a.sent();
                user = {
                    _id: account._id.toString(),
                    userName: account.userName ? account.userName : 'no name'
                };
                accessToken = (0, jwt_service_1.generateAccessToken)(user);
                refreshToken = (0, jwt_service_1.generateRefreshToken)(user);
                RefreshTokenDocument = {
                    token: refreshToken,
                    idUser: account._id.toString()
                };
                return [4 /*yield*/, refreshtoken_models_1.default.create(RefreshTokenDocument)];
            case 4:
                _a.sent();
                res.setHeader('Authorization', "Bearer ".concat(accessToken));
                res.cookie(env_config_1.env.NAME_ACCESS_TOKEN_IN_COOKIE, accessToken, cookiesOptions);
                res.cookie(env_config_1.env.NAME_REFRESH_TOKEN_IN_COOKIE, refreshToken, cookiesOptions);
                return [2 /*return*/, res.status(200).json({
                        message: 'register success',
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    })];
        }
    });
}); };
exports.register = register;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, response, fillter, account, fillterRefreshToken, valid, user, accessToken, refreshToken, createRefreshTokenDocument, refreshs;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                response = {
                    message: 'login'
                };
                //kiểm tra định dạng
                if (!body.userName || !body.password) {
                    response.message = 'Invalid format';
                    return [2 /*return*/, res.status(401).json(response)];
                }
                fillter = { userName: body.userName };
                return [4 /*yield*/, account_models_1.default.findOne(fillter)];
            case 1:
                account = _a.sent();
                if (!account) {
                    response.message = 'invalid account';
                    return [2 /*return*/, res.status(401).json(response)];
                }
                fillterRefreshToken = { idUser: account._id.toString() };
                return [4 /*yield*/, refreshtoken_models_1.default.deleteMany(fillterRefreshToken)];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, auth_service_1.accountValid)(body)];
            case 3:
                valid = _a.sent();
                if (!valid) {
                    response.message = 'invalid account';
                    return [2 /*return*/, res.status(401).json(response)];
                }
                user = {
                    _id: account._id.toString(),
                    userName: account.userName ? account.userName : 'no name'
                };
                accessToken = (0, jwt_service_1.generateAccessToken)(user);
                refreshToken = (0, jwt_service_1.generateRefreshToken)(user);
                createRefreshTokenDocument = {
                    token: refreshToken,
                    idUser: account._id.toString()
                };
                return [4 /*yield*/, refreshtoken_models_1.default.create(createRefreshTokenDocument)];
            case 4:
                _a.sent();
                return [4 /*yield*/, refreshtoken_models_1.default.find()];
            case 5:
                refreshs = _a.sent();
                console.log(refreshs);
                res.setHeader('Authorization', "Bearer ".concat(accessToken));
                res.cookie(env_config_1.env.NAME_ACCESS_TOKEN_IN_COOKIE, accessToken, cookiesOptions);
                res.cookie(env_config_1.env.NAME_REFRESH_TOKEN_IN_COOKIE, refreshToken, cookiesOptions);
                return [2 /*return*/, res.status(200).json({
                        message: 'login success',
                        profile: account,
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    })];
        }
    });
}); };
exports.login = login;
var requestRefereshToken = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, response, refreshTokenValid, user, newRefreshToken, replaced, accessToken, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                return [4 /*yield*/, req.cookies[env_config_1.env.NAME_REFRESH_TOKEN_IN_COOKIE]];
            case 1:
                refreshToken = _a.sent();
                response = {
                    message: 'refresh success',
                    status: 201
                };
                if (!refreshToken) {
                    ;
                    (response.message = 'not found refreshtoken'), (response.status = 401);
                    return [2 /*return*/, res.status(401).json(response)];
                }
                refreshTokenValid = refreshtoken_models_1.default.findOne({ token: refreshToken });
                user = (0, jwt_service_1.decodeRefreshToken)(refreshToken);
                if (!user) {
                    response.message = 'invalid token';
                    response.status = 401;
                    return [2 /*return*/, res.status(401).json(response)];
                }
                if (!refreshTokenValid) {
                    response.message = 'invalid token';
                    response.status = 401;
                    return [2 /*return*/, res.status(401).json(response)];
                }
                if (!refreshTokenValid) return [3 /*break*/, 3];
                newRefreshToken = (0, jwt_service_1.generateRefreshToken)(user);
                return [4 /*yield*/, (0, jwt_service_1.replaceRefreshToken)(refreshToken, newRefreshToken)];
            case 2:
                replaced = _a.sent();
                if (!replaced) {
                    response.message = 'invalid  token ';
                    response.status = 401;
                    return [2 /*return*/, res.status(401).json(response)];
                }
                if (replaced) {
                    accessToken = (0, jwt_service_1.generateAccessToken)(user);
                    res.setHeader('Authorization', "Bearer ".concat(accessToken));
                    res.cookie(env_config_1.env.NAME_ACCESS_TOKEN_IN_COOKIE, accessToken, cookiesOptions);
                    res.cookie(env_config_1.env.NAME_REFRESH_TOKEN_IN_COOKIE, newRefreshToken, cookiesOptions);
                    response.message = 'refresh token success';
                    response.data = { accessToken: accessToken, refreshToken: refreshToken };
                    return [2 /*return*/, res.status(201).json(response)];
                }
                _a.label = 3;
            case 3: return [3 /*break*/, 5];
            case 4:
                error_1 = _a.sent();
                error_1.status = 401;
                error_1.name = 'TokenError';
                throw error_1;
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.requestRefereshToken = requestRefereshToken;
var logOut = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var refreshToken, fillter, response, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                return [4 /*yield*/, req.cookies[env_config_1.env.NAME_REFRESH_TOKEN_IN_COOKIE]];
            case 1:
                refreshToken = _a.sent();
                fillter = { token: refreshToken };
                return [4 /*yield*/, refreshtoken_models_1.default.findOneAndDelete(fillter)];
            case 2:
                _a.sent();
                res.clearCookie(env_config_1.env.NAME_ACCESS_TOKEN_IN_COOKIE);
                res.clearCookie(env_config_1.env.NAME_REFRESH_TOKEN_IN_COOKIE);
                res.removeHeader('Authorization');
                response = {
                    message: 'logout success'
                };
                return [2 /*return*/, res.status(200).json(response)];
            case 3:
                error_2 = _a.sent();
                throw new Error(error_2);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.logOut = logOut;
