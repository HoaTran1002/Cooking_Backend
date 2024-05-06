"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var pageManageModels_1 = require("../models/pageManageModels");
var PageRepository = /** @class */ (function () {
    function PageRepository(pageModel) {
        this.Model = pageModel;
    }
    PageRepository.prototype.create = function (payload) {
        var record = pageManageModels_1.pageModel.create(payload);
        return record;
    };
    PageRepository.prototype.getById = function (id) {
        return pageManageModels_1.pageModel.findById(id);
    };
    PageRepository.prototype.deleteById = function (id) {
        return pageManageModels_1.pageModel.deleteOne({ _id: id });
    };
    PageRepository.prototype.getAll = function (limit, skip) {
        var data = pageManageModels_1.pageModel.find().limit(limit).skip(skip);
        return data;
    };
    PageRepository.prototype.update = function (id, payload) {
        var fillter = { _id: id };
        var options = { new: true };
        var data = pageManageModels_1.pageModel.findOneAndUpdate(fillter, payload, options);
        return data;
    };
    return PageRepository;
}());
exports.default = new PageRepository(pageManageModels_1.pageModel);
