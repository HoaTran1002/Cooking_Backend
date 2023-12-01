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
exports.updateFormationBusinessById = exports.removeById = exports.getById = exports.getAll = exports.createInformationBusiness = void 0;
const businessInformation_models_1 = __importDefault(require("../models/businessInformation.models"));
const informationBusiness_service_1 = require("../services/informationBusiness.service");
const createInformationBusiness = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const data = yield businessInformation_models_1.default.create(body);
    const response = {
        message: 'created information about the business',
        data: data
    };
    return res.status(200).json(response);
});
exports.createInformationBusiness = createInformationBusiness;
const getAll = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield businessInformation_models_1.default.find();
    const response = {
        message: 'got all list information business',
        data: data
    };
    return res.status(200).json(response);
});
exports.getAll = getAll;
const getById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    const data = yield businessInformation_models_1.default.findOne({ id: _id });
    const response = {
        message: 'get data success',
        data: data
    };
    return res.status(200).json(response);
});
exports.getById = getById;
const removeById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    const data = yield businessInformation_models_1.default.findByIdAndDelete({ id: _id }, { new: true });
    const response = {
        message: 'delete data success',
        data: data
    };
    return res.status(200).json(response);
});
exports.removeById = removeById;
const updateFormationBusinessById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const _id = req.params.id;
    const body = req.body;
    const data = (0, informationBusiness_service_1.updateById)(_id, body);
    const response = {
        message: 'update data success',
        data: data
    };
    return res.status(200).json(response);
});
exports.updateFormationBusinessById = updateFormationBusinessById;
