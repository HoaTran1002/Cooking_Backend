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
exports.updateFormationBusinessById = exports.removeById = exports.getById = exports.getAll = exports.createInformationBusiness = void 0;
var businessInformation_models_1 = __importDefault(require("../models/businessInformation.models"));
var informationBusiness_service_1 = require("../services/informationBusiness.service");
var createInformationBusiness = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, data, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                console.log(body);
                return [4 /*yield*/, businessInformation_models_1.default.create(body)];
            case 1:
                data = _a.sent();
                response = {
                    message: 'created information about the business',
                    data: data
                };
                return [2 /*return*/, res.status(200).json(response)];
        }
    });
}); };
exports.createInformationBusiness = createInformationBusiness;
var getAll = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var data, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, businessInformation_models_1.default.find()];
            case 1:
                data = _a.sent();
                response = {
                    message: 'got all list information business',
                    data: data
                };
                return [2 /*return*/, res.status(200).json(data)];
        }
    });
}); };
exports.getAll = getAll;
var getById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, data, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.params.id;
                return [4 /*yield*/, businessInformation_models_1.default.findById({ _id: _id })];
            case 1:
                data = _a.sent();
                response = {
                    message: 'get data success',
                    data: data
                };
                return [2 /*return*/, res.status(200).json(response)];
        }
    });
}); };
exports.getById = getById;
var removeById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, data, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _id = req.params.id;
                return [4 /*yield*/, businessInformation_models_1.default.findByIdAndDelete({ id: _id }, { new: true })];
            case 1:
                data = _a.sent();
                response = {
                    message: 'delete data success',
                    data: data
                };
                return [2 /*return*/, res.status(200).json(response)];
        }
    });
}); };
exports.removeById = removeById;
var updateFormationBusinessById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _id, body, data, response;
    return __generator(this, function (_a) {
        _id = req.params.id;
        body = req.body;
        data = (0, informationBusiness_service_1.updateById)(_id, body);
        response = {
            message: 'update data success',
            data: data
        };
        return [2 /*return*/, res.status(200).json(response)];
    });
}); };
exports.updateFormationBusinessById = updateFormationBusinessById;
