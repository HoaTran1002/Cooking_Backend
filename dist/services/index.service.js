"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var partner_service_1 = __importDefault(require("./partner.service"));
var customerBlogServices_service_1 = __importDefault(require("./customerBlogServices.service"));
var categoryServicesCustomer_service_1 = __importDefault(require("./categoryServicesCustomer.service"));
var serviceCustomer_service_1 = __importDefault(require("./serviceCustomer.service"));
var candicateInfor_service_1 = __importDefault(require("./candicateInfor.service"));
var informationPositionRecruitment_service_1 = __importDefault(require("./informationPositionRecruitment.service"));
var recruitmentBlog_service_1 = __importDefault(require("./recruitmentBlog.service"));
var termAndCondition_service_1 = __importDefault(require("./termAndCondition.service"));
var policy_service_1 = __importDefault(require("./policy.service"));
var partnerProduct_service_1 = __importDefault(require("./partnerProduct.service"));
var pageManage_service_1 = __importDefault(require("./pageManage.service"));
var FactoryService = /** @class */ (function () {
    function FactoryService() {
    }
    FactoryService.instance = function (service, payload) {
        switch (service) {
            case 'partner':
                return new partner_service_1.default(payload);
            case 'PartnerProduct':
                return new partnerProduct_service_1.default(payload);
            case 'customerBlog':
                return new customerBlogServices_service_1.default(payload);
            case 'categoryServiceCategory':
                return new categoryServicesCustomer_service_1.default(payload);
            case 'ServiceCustomer':
                return new serviceCustomer_service_1.default(payload);
            case 'CandicateInfor':
                return new candicateInfor_service_1.default(payload);
            case 'InformationPopsitionRecruitment':
                return new informationPositionRecruitment_service_1.default(payload);
            case 'RecruitmentBlog':
                return new recruitmentBlog_service_1.default(payload);
            case 'TermAndCondition':
                return new termAndCondition_service_1.default(payload);
            case 'PolicyServices':
                return new policy_service_1.default(payload);
            case 'PageManage':
                return new pageManage_service_1.default(payload);
            default:
                throw new Error('not foud option services');
        }
    };
    return FactoryService;
}());
exports.default = FactoryService;
