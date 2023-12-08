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
exports.findOne = exports.updateAccount = exports.deleteAccount = void 0;
const account_models_1 = __importDefault(require("../models/account.models"));
const deleteAccount = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const fillter = { id: _id };
    const options = { new: true };
    const data = yield account_models_1.default.findOneAndRemove(fillter, options);
    return data;
});
exports.deleteAccount = deleteAccount;
const updateAccount = (_id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const fillter = { id: _id };
    const options = { new: true };
    const update = body;
    const data = yield account_models_1.default.findOneAndUpdate(fillter, update, options);
    return data;
});
exports.updateAccount = updateAccount;
const findOne = (_id) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield account_models_1.default.findOne({ id: _id });
    return data;
});
exports.findOne = findOne;
