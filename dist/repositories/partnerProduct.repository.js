"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var partner_model_1 = require("../models/partner.model");
var PartnerProductRepository = /** @class */ (function () {
    function PartnerProductRepository(partnerProductModel) {
        this.Model = partnerProductModel;
    }
    PartnerProductRepository.prototype.create = function (payload) {
        var record = partner_model_1.partnerProductModel.create(payload);
        return record;
    };
    PartnerProductRepository.prototype.getById = function (id) {
        return partner_model_1.partnerProductModel.findById(id);
    };
    PartnerProductRepository.prototype.deleteById = function (id) {
        return partner_model_1.partnerProductModel.deleteOne({ _id: id });
    };
    PartnerProductRepository.prototype.getAll = function (limit, skip) {
        var data = partner_model_1.partnerProductModel.find().limit(limit).skip(skip);
        return data;
    };
    PartnerProductRepository.prototype.update = function (id, payload) {
        var fillter = { _id: id };
        var options = { new: true };
        var data = partner_model_1.partnerProductModel.findOneAndUpdate(fillter, payload, options);
        return data;
    };
    return PartnerProductRepository;
}());
exports.default = new PartnerProductRepository(partner_model_1.partnerProductModel);
