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
exports.logOut = exports.requestRefereshToken = exports.login = exports.register = void 0;
const account_models_1 = __importDefault(require("../models/account.models"));
const auth_service_1 = require("../services/auth.service");
const jwt_service_1 = require("../services/jwt.service");
const refreshtoken_models_1 = __importDefault(require("../models/refreshtoken.models"));
const env_config_1 = require("../config/env.config");
const cookiesOptions = {
    expires: new Date(Date.now() + 86400000),
    httpOnly: false,
    secure: false
};
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const response = {
        message: 'create success',
        status: 200
    };
    if (!body.userName || !body.password) {
        ;
        (response.message = 'invalid format'), (response.status = 401);
        return res.status(401).json(response);
    }
    const alreadyAccount = yield account_models_1.default.findOne({ userName: body.userName });
    if (alreadyAccount) {
        ;
        (response.message = 'already account!'), (response.status = 409);
        return res.status(409).json(response);
    }
    const account = yield (0, auth_service_1.createAccount)(body);
    const user = {
        _id: account._id.toString(),
        userName: account.userName ? account.userName : 'no name'
    };
    console.log('user:', user);
    const accessToken = (0, jwt_service_1.generateAccessToken)(user);
    const refreshToken = (0, jwt_service_1.generateRefreshToken)(user);
    const RefreshTokenDocument = {
        token: refreshToken,
        idUser: account._id.toString()
    };
    yield refreshtoken_models_1.default.create(RefreshTokenDocument);
    res.setHeader('Authorization', `Bearer ${accessToken}`);
    res.cookie(env_config_1.env.NAME_REFRESH_TOKEN_IN_COOKIE, refreshToken, cookiesOptions);
    return res.status(200).json({
        message: 'register success',
        accessToken,
        refreshToken
    });
});
exports.register = register;
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const response = {
        message: 'login'
    };
    //kiểm tra định dạng
    if (!body.userName || !body.password) {
        response.message = 'Invalid format';
        return res.status(401).json(response);
    }
    const fillter = { userName: body.userName };
    const account = yield account_models_1.default.findOne(fillter);
    if (!account) {
        response.message = 'invalid account';
        return res.status(401).json(response);
    }
    //đảm bảo người dùng chỉ có duy nhất một refreshtoken, xoá tất cả refresktoken của user trước đăng nh
    const fillterRefreshToken = { idUser: account._id.toString() };
    yield refreshtoken_models_1.default.deleteMany(fillterRefreshToken);
    const valid = yield (0, auth_service_1.accountValid)(body);
    if (!valid) {
        response.message = 'invalid account';
        return res.status(401).json(response);
    }
    const user = {
        _id: account._id.toString(),
        userName: account.userName ? account.userName : 'no name'
    };
    const accessToken = (0, jwt_service_1.generateAccessToken)(user);
    const refreshToken = (0, jwt_service_1.generateRefreshToken)(user);
    const createRefreshTokenDocument = {
        token: refreshToken,
        idUser: account._id.toString()
    };
    yield refreshtoken_models_1.default.create(createRefreshTokenDocument);
    const refreshs = yield refreshtoken_models_1.default.find();
    console.log(refreshs);
    res.setHeader('Authorization', `Bearer ${accessToken}`);
    res.cookie(env_config_1.env.NAME_REFRESH_TOKEN_IN_COOKIE, refreshToken, cookiesOptions);
    return res.status(200).json({
        message: 'login success',
        profile: account,
        accessToken,
        refreshToken
    });
});
exports.login = login;
const requestRefereshToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = yield req.cookies[env_config_1.env.NAME_REFRESH_TOKEN_IN_COOKIE];
        const response = {
            message: 'refresh success',
            status: 201
        };
        if (!refreshToken) {
            ;
            (response.message = 'not found refreshtoken'), (response.status = 401);
            return res.status(401).json(response);
        }
        const refreshTokenValid = refreshtoken_models_1.default.findOne({ token: refreshToken });
        const user = (0, jwt_service_1.decodeRefreshToken)(refreshToken);
        if (!user) {
            response.message = 'invalid token';
            response.status = 401;
            return res.status(401).json(response);
        }
        if (!refreshTokenValid) {
            response.message = 'invalid token';
            response.status = 401;
            return res.status(401).json(response);
        }
        if (refreshTokenValid) {
            const newRefreshToken = (0, jwt_service_1.generateRefreshToken)(user);
            const replaced = yield (0, jwt_service_1.replaceRefreshToken)(refreshToken, newRefreshToken);
            if (!replaced) {
                response.message = 'invalid  token ';
                response.status = 401;
                return res.status(401).json(response);
            }
            if (replaced) {
                const accessToken = (0, jwt_service_1.generateAccessToken)(user);
                res.setHeader('Authorization', `Bearer ${accessToken}`);
                res.cookie(env_config_1.env.NAME_REFRESH_TOKEN_IN_COOKIE, newRefreshToken, cookiesOptions);
                response.message = 'refresh token success';
                response.data = { accessToken, refreshToken };
                return res.status(201).json(response);
            }
        }
    }
    catch (error) {
        error.status = 401;
        error.name = 'TokenError';
        throw error;
    }
});
exports.requestRefereshToken = requestRefereshToken;
const logOut = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const refreshToken = yield req.cookies[env_config_1.env.NAME_REFRESH_TOKEN_IN_COOKIE];
        const fillter = { token: refreshToken };
        yield refreshtoken_models_1.default.findOneAndDelete(fillter);
        res.clearCookie(env_config_1.env.NAME_REFRESH_TOKEN_IN_COOKIE);
        res.removeHeader('Authorization');
        const response = {
            message: 'logout success'
        };
        return res.status(200).json(response);
    }
    catch (error) {
        throw new Error(error);
    }
});
exports.logOut = logOut;
