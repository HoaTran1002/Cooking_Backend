"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var partner_model_1 = require("../models/partner.model");
var PartnerRepository = /** @class */ (function () {
    function PartnerRepository(partnerModel) {
        this.Model = partnerModel;
    }
    PartnerRepository.prototype.create = function (payload) {
        var record = partner_model_1.partnerModel.create(payload);
        return record;
    };
    PartnerRepository.prototype.getById = function (id) {
        return partner_model_1.partnerModel.findById(id);
    };
    PartnerRepository.prototype.deleteById = function (id) {
        return partner_model_1.partnerModel.deleteOne({ _id: id });
    };
    PartnerRepository.prototype.getAll = function (limit, skip) {
        var data = partner_model_1.partnerModel.find().limit(limit).skip(skip);
        return data;
    };
    PartnerRepository.prototype.update = function (id, payload) {
        var fillter = { _id: id };
        var options = { new: true };
        var data = partner_model_1.partnerModel.findOneAndUpdate(fillter, payload, options);
        return data;
    };
    return PartnerRepository;
}());
exports.default = new PartnerRepository(partner_model_1.partnerModel);
