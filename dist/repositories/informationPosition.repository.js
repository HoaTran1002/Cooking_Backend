"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var recruitment_models_1 = require("../models/recruitment.models");
var InformationPositionRepository = /** @class */ (function () {
    function InformationPositionRepository(informationPositionModel) {
        this.Model = informationPositionModel;
    }
    InformationPositionRepository.prototype.create = function (payload) {
        var record = recruitment_models_1.informationPositionModel.create(payload);
        return record;
    };
    InformationPositionRepository.prototype.getById = function (id) {
        return recruitment_models_1.informationPositionModel.findById(id);
    };
    InformationPositionRepository.prototype.deleteById = function (id) {
        return recruitment_models_1.informationPositionModel.deleteOne({ _id: id });
    };
    InformationPositionRepository.prototype.getAll = function (limit, skip) {
        var data = recruitment_models_1.informationPositionModel.find().limit(limit).skip(skip);
        return data;
    };
    InformationPositionRepository.prototype.update = function (id, payload) {
        var fillter = { _id: id };
        var options = { new: true };
        var data = recruitment_models_1.informationPositionModel.findOneAndUpdate(fillter, payload, options);
        return data;
    };
    return InformationPositionRepository;
}());
exports.default = new InformationPositionRepository(recruitment_models_1.informationPositionModel);
