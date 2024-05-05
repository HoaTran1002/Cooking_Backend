"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var recruitment_models_1 = require("../models/recruitment.models");
var IRecruitmentBlogRepository = /** @class */ (function () {
    function IRecruitmentBlogRepository(recruitmentBlogModel) {
        this.Model = recruitmentBlogModel;
    }
    IRecruitmentBlogRepository.prototype.create = function (payload) {
        var record = recruitment_models_1.recruitmentBlogModel.create(payload);
        return record;
    };
    IRecruitmentBlogRepository.prototype.getById = function (id) {
        return recruitment_models_1.recruitmentBlogModel.findById(id);
    };
    IRecruitmentBlogRepository.prototype.deleteById = function (id) {
        return recruitment_models_1.recruitmentBlogModel.deleteOne({ _id: id });
    };
    IRecruitmentBlogRepository.prototype.getAll = function (limit, skip) {
        var data = recruitment_models_1.recruitmentBlogModel.find().limit(limit).skip(skip);
        return data;
    };
    IRecruitmentBlogRepository.prototype.update = function (id, payload) {
        var fillter = { _id: id };
        var options = { new: true };
        var data = recruitment_models_1.recruitmentBlogModel.findOneAndUpdate(fillter, payload, options);
        return data;
    };
    return IRecruitmentBlogRepository;
}());
exports.default = new IRecruitmentBlogRepository(recruitment_models_1.recruitmentBlogModel);
