"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var course_route_1 = __importDefault(require("../routes/course.route"));
// import categoryRoutes from '../routes/category.route'
var product_route_1 = __importDefault(require("../routes/product.route"));
var auth_route_1 = __importDefault(require("../routes/auth.route"));
var account_route_1 = __importDefault(require("../routes/account.route"));
// import upload from '../routes/uploadToS3.route'
var informationBusiness_route_1 = __importDefault(require("../routes/informationBusiness.route"));
var news_route_1 = __importDefault(require("../routes/news.route"));
var error_middlewear_1 = require("../middlewares/error.middlewear");
var useRoutes = function (app) {
    app.use('/api/v1/auth', auth_route_1.default);
    app.use('/api/v1/course', course_route_1.default);
    app.use('/api/v1/account', account_route_1.default);
    // app.use('/api/v1/category', categoryRoutes)
    // app.use('/api/v1/upload', upload)
    app.use('/api/v1/product', product_route_1.default);
    app.use('/api/v1/informationBusiness', informationBusiness_route_1.default);
    app.use('/api/v1/news', news_route_1.default);
    app.use(error_middlewear_1.errorHandeler);
    app.use(error_middlewear_1.notFound);
};
exports.default = useRoutes;
