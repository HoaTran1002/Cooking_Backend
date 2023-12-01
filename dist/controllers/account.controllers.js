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
exports.findAllAccount = exports.findAccountById = exports.updateAccountById = exports.deleteAccountById = exports.createAccount = void 0;
const account_models_1 = __importDefault(require("../models/account.models"));
const account_service_1 = require("../services/account.service");
const createAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const data = yield account_models_1.default.create(body);
    const response = {
        message: 'crates account success',
        data
    };
    return res.status(200).json(response);
});
exports.createAccount = createAccount;
const deleteAccountById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    const data = yield (0, account_service_1.deleteAccount)(_id);
    const response = {
        message: 'deleted account success',
        data
    };
    return res.status(200).json(response);
});
exports.deleteAccountById = deleteAccountById;
const updateAccountById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    const body = req.body;
    const data = yield (0, account_service_1.updateAccount)(_id, body);
    const response = {
        message: 'updated account success',
        data
    };
    return res.status(200).json(response);
});
exports.updateAccountById = updateAccountById;
const findAccountById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const data = yield account_models_1.default.findOne({ _id: id });
    const response = {
        message: 'got data success',
        data
    };
    return res.status(200).json(response);
});
exports.findAccountById = findAccountById;
const findAllAccount = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield account_models_1.default.find({});
    const response = {
        message: 'got all data success',
        data: data
    };
    return res.status(200).json(response);
});
exports.findAllAccount = findAllAccount;
