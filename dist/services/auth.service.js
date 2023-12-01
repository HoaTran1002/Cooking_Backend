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
exports.createAccount = exports.accountValid = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const account_models_1 = __importDefault(require("../models/account.models"));
const accountValid = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const account = yield account_models_1.default.findOne({ userName: body.userName });
    if (account) {
        const isMatch = bcrypt_1.default.compareSync(body.password, account.password);
        if (!isMatch) {
            return false;
        }
        return true;
    }
    return false;
});
exports.accountValid = accountValid;
const createAccount = (body) => __awaiter(void 0, void 0, void 0, function* () {
    const account = yield account_models_1.default.create(body);
    return account;
});
exports.createAccount = createAccount;
