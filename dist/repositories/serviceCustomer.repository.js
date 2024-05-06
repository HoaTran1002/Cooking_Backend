"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var customer_models_1 = require("../models/customer.models");
var ServicesCustomerRepository = /** @class */ (function () {
    function ServicesCustomerRepository(servicesCustomerModel) {
        this.Model = servicesCustomerModel;
    }
    ServicesCustomerRepository.prototype.create = function (payload) {
        var record = customer_models_1.servicesCustomerModel.create(payload);
        return record;
    };
    ServicesCustomerRepository.prototype.getById = function (id) {
        return customer_models_1.servicesCustomerModel.findById(id);
    };
    ServicesCustomerRepository.prototype.deleteById = function (id) {
        return customer_models_1.servicesCustomerModel.deleteOne({ _id: id });
    };
    ServicesCustomerRepository.prototype.getAll = function (limit, skip) {
        var data = customer_models_1.servicesCustomerModel.find().limit(limit).skip(skip);
        return data;
    };
    ServicesCustomerRepository.prototype.update = function (id, payload) {
        var fillter = { _id: id };
        var options = { new: true };
        var data = customer_models_1.servicesCustomerModel.findOneAndUpdate(fillter, payload, options);
        return data;
    };
    return ServicesCustomerRepository;
}());
exports.default = new ServicesCustomerRepository(customer_models_1.servicesCustomerModel);
