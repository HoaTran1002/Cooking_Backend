"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var customer_models_1 = require("../models/customer.models");
var CategoryServicesCustomerRepository = /** @class */ (function () {
    function CategoryServicesCustomerRepository(categoryServicesModel) {
        this.Model = categoryServicesModel;
    }
    CategoryServicesCustomerRepository.prototype.create = function (payload) {
        var record = customer_models_1.categoryServicesModel.create(payload);
        return record;
    };
    CategoryServicesCustomerRepository.prototype.getById = function (id) {
        return customer_models_1.categoryServicesModel.findById(id);
    };
    CategoryServicesCustomerRepository.prototype.deleteById = function (id) {
        return customer_models_1.categoryServicesModel.deleteOne({ _id: id });
    };
    CategoryServicesCustomerRepository.prototype.getAll = function (limit, skip) {
        var data = customer_models_1.categoryServicesModel.find().limit(limit).skip(skip);
        return data;
    };
    CategoryServicesCustomerRepository.prototype.update = function (id, payload) {
        var fillter = { _id: id };
        var options = { new: true };
        var data = customer_models_1.categoryServicesModel.findOneAndUpdate(fillter, payload, options);
        return data;
    };
    return CategoryServicesCustomerRepository;
}());
exports.default = new CategoryServicesCustomerRepository(customer_models_1.categoryServicesModel);
