"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var termAndCondition_models_1 = __importDefault(require("../models/termAndCondition.models"));
var TermAndConditionRepository = /** @class */ (function () {
    function TermAndConditionRepository(termAndConditionModel) {
        this.Model = termAndConditionModel;
    }
    TermAndConditionRepository.prototype.create = function (payload) {
        var record = termAndCondition_models_1.default.create(payload);
        return record;
    };
    TermAndConditionRepository.prototype.getById = function (id) {
        return termAndCondition_models_1.default.findById(id);
    };
    TermAndConditionRepository.prototype.deleteById = function (id) {
        return termAndCondition_models_1.default.deleteOne({ _id: id });
    };
    TermAndConditionRepository.prototype.getAll = function (limit, skip) {
        var data = termAndCondition_models_1.default.find().limit(limit).skip(skip);
        return data;
    };
    TermAndConditionRepository.prototype.update = function (id, payload) {
        var fillter = { _id: id };
        var options = { new: true };
        var data = termAndCondition_models_1.default.findOneAndUpdate(fillter, payload, options);
        return data;
    };
    return TermAndConditionRepository;
}());
exports.default = new TermAndConditionRepository(termAndCondition_models_1.default);
