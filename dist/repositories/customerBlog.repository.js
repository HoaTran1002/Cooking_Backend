"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var customer_models_1 = require("../models/customer.models");
var customerBlogRepository = /** @class */ (function () {
    function customerBlogRepository(customerBlogModel) {
        this.Model = customerBlogModel;
    }
    customerBlogRepository.prototype.create = function (payload) {
        var record = customer_models_1.customerBlogModel.create(payload);
        return record;
    };
    customerBlogRepository.prototype.getById = function (id) {
        return customer_models_1.customerBlogModel.findById(id);
    };
    customerBlogRepository.prototype.deleteById = function (id) {
        return customer_models_1.customerBlogModel.deleteOne({ _id: id });
    };
    customerBlogRepository.prototype.getAll = function (limit, skip) {
        var data = customer_models_1.customerBlogModel.find().limit(limit).skip(skip);
        return data;
    };
    customerBlogRepository.prototype.update = function (id, payload) {
        var fillter = { _id: id };
        var options = { new: true };
        var data = customer_models_1.customerBlogModel.findOneAndUpdate(fillter, payload, options);
        return data;
    };
    return customerBlogRepository;
}());
exports.default = new customerBlogRepository(customer_models_1.customerBlogModel);
