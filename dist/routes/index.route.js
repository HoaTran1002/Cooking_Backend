"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var course_route_1 = __importDefault(require("../routes/course.route"));
var category_route_1 = __importDefault(require("../routes/category.route"));
var product_route_1 = __importDefault(require("../routes/product.route"));
var auth_route_1 = __importDefault(require("../routes/auth.route"));
// import upload from '../routes/uploadToS3.route'
var chef_route_1 = __importDefault(require("../routes/chef.route"));
var faq_route_1 = __importDefault(require("../routes/faq.route"));
var informationBusiness_route_1 = __importDefault(require("../routes/informationBusiness.route"));
var news_route_1 = __importDefault(require("../routes/news.route"));
var error_middlewear_1 = require("../middlewares/error.middlewear");
var useRoutes = function (app) {
    app.use('/api/v1/auth', auth_route_1.default);
    app.use('/api/v1/course', course_route_1.default);
    // app.use('/api/v1/account', accountRoutes)
    app.use('/api/v1/category', category_route_1.default);
    // app.use('/api/v1/upload', upload)
    app.use('/api/v1/product', product_route_1.default);
    app.use('/api/v1/informationBusiness', informationBusiness_route_1.default);
    app.use('/api/v1/news', news_route_1.default);
    app.use('/api/v1/chef', chef_route_1.default);
    app.use('/api/v1/faq', faq_route_1.default);
    app.use(error_middlewear_1.errorHandeler);
    app.use(error_middlewear_1.notFound);
};
exports.default = useRoutes;
