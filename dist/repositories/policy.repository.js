"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var policy_models_1 = __importDefault(require("../models/policy.models"));
var PolicyRepository = /** @class */ (function () {
    function PolicyRepository(policyModel) {
        this.Model = policyModel;
    }
    PolicyRepository.prototype.create = function (payload) {
        var record = policy_models_1.default.create(payload);
        return record;
    };
    PolicyRepository.prototype.getById = function (id) {
        return policy_models_1.default.findById(id);
    };
    PolicyRepository.prototype.deleteById = function (id) {
        return policy_models_1.default.deleteOne({ _id: id });
    };
    PolicyRepository.prototype.getAll = function (limit, skip) {
        var data = policy_models_1.default.find().limit(limit).skip(skip);
        return data;
    };
    PolicyRepository.prototype.update = function (id, payload) {
        var fillter = { _id: id };
        var options = { new: true };
        var data = policy_models_1.default.findOneAndUpdate(fillter, payload, options);
        return data;
    };
    return PolicyRepository;
}());
exports.default = new PolicyRepository(policy_models_1.default);
