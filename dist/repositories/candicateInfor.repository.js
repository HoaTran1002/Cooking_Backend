"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var recruitment_models_1 = require("../models/recruitment.models");
var CandicateInRepository = /** @class */ (function () {
    function CandicateInRepository(candicateInforModel) {
        this.Model = candicateInforModel;
    }
    CandicateInRepository.prototype.create = function (payload) {
        var record = recruitment_models_1.candicateInforModel.create(payload);
        return record;
    };
    CandicateInRepository.prototype.getById = function (id) {
        return recruitment_models_1.candicateInforModel.findById(id);
    };
    CandicateInRepository.prototype.deleteById = function (id) {
        return recruitment_models_1.candicateInforModel.deleteOne({ _id: id });
    };
    CandicateInRepository.prototype.getAll = function (limit, skip) {
        var data = recruitment_models_1.candicateInforModel.find().limit(limit).skip(skip);
        return data;
    };
    CandicateInRepository.prototype.update = function (id, payload) {
        var fillter = { _id: id };
        var options = { new: true };
        var data = recruitment_models_1.candicateInforModel.findOneAndUpdate(fillter, payload, options);
        return data;
    };
    return CandicateInRepository;
}());
exports.default = new CandicateInRepository(recruitment_models_1.candicateInforModel);
