"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tour_route_1 = __importDefault(require("../routes/tour.route"));
var news_route_1 = __importDefault(require("../routes/news.route"));
var product_route_1 = __importDefault(require("../routes/product.route"));
var partner_route_1 = __importDefault(require("../routes/partner.route"));
var InformationPositionRecruitment_route_1 = __importDefault(require("../routes/InformationPositionRecruitment.route"));
var categoryServicesCustomer_route_1 = __importDefault(require("../routes/categoryServicesCustomer.route"));
var error_middlewear_1 = require("../middlewares/error.middlewear");
var informationBusiness_route_1 = __importDefault(require("../routes/informationBusiness.route"));
var termAndCondition_route_1 = __importDefault(require("../routes/termAndCondition.route"));
var servicesCustomer_route_1 = __importDefault(require("../routes/servicesCustomer.route"));
var recruitmentBlog_route_1 = __importDefault(require("../routes/recruitmentBlog.route"));
var partnerProduct_route_1 = __importDefault(require("../routes/partnerProduct.route"));
var candicateInfor_route_1 = __importDefault(require("../routes/candicateInfor.route"));
var customerBlog_route_1 = __importDefault(require("../routes/customerBlog.route"));
var pageManage_route_1 = __importDefault(require("../routes/pageManage.route"));
var category_route_1 = __importDefault(require("../routes/category.route"));
var policy_route_1 = __importDefault(require("../routes/policy.route"));
var course_route_1 = __importDefault(require("../routes/course.route"));
var chef_route_1 = __importDefault(require("../routes/chef.route"));
var auth_route_1 = __importDefault(require("../routes/auth.route"));
var faq_route_1 = __importDefault(require("../routes/faq.route"));
// import accountRoutes from '../routes/account.route'
// import upload from '../routes/uploadToS3.route'
var useRoutes = function (app) {
    app.use('/api/v1/informationPositionRecruitment', InformationPositionRecruitment_route_1.default);
    app.use('/api/v1/categoryServicesCustomer', categoryServicesCustomer_route_1.default);
    app.use('/api/v1/informationBusiness', informationBusiness_route_1.default);
    app.use('/api/v1/termAndCondition', termAndCondition_route_1.default);
    app.use('/api/v1/servicesCustomer', servicesCustomer_route_1.default);
    app.use('/api/v1/recruitmentBlog', recruitmentBlog_route_1.default);
    app.use('/api/v1/candicateInfor', candicateInfor_route_1.default);
    app.use('/api/v1/partnerProduct', partnerProduct_route_1.default);
    app.use('/api/v1/customerBlog', customerBlog_route_1.default);
    app.use('/api/v1/pageManage', pageManage_route_1.default);
    app.use('/api/v1/category', category_route_1.default);
    app.use('/api/v1/product', product_route_1.default);
    app.use('/api/v1/partner', partner_route_1.default);
    app.use('/api/v1/policy', policy_route_1.default);
    app.use('/api/v1/course', course_route_1.default);
    app.use('/api/v1/auth', auth_route_1.default);
    app.use('/api/v1/tour', tour_route_1.default);
    app.use('/api/v1/news', news_route_1.default);
    app.use('/api/v1/chef', chef_route_1.default);
    app.use('/api/v1/faq', faq_route_1.default);
    // app.use('/api/v1/account', accountRoutes)
    // app.use('/api/v1/upload', upload)
    app.use(error_middlewear_1.errorHandeler);
    app.use(error_middlewear_1.notFound);
};
exports.default = useRoutes;
