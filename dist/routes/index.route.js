"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const course_route_1 = __importDefault(require("../routes/course.route"));
// import categoryRoutes from '../routes/category.route'
const product_route_1 = __importDefault(require("../routes/product.route"));
const auth_route_1 = __importDefault(require("../routes/auth.route"));
const account_route_1 = __importDefault(require("../routes/account.route"));
const upload_route_1 = __importDefault(require("../routes/upload.route"));
const informationBusiness_route_1 = __importDefault(require("../routes/informationBusiness.route"));
const error_middlewear_1 = require("../middlewares/error.middlewear");
const useRoutes = (app) => {
    app.use('/api/v1/auth', auth_route_1.default);
    app.use('/api/v1/course', course_route_1.default);
    app.use('/api/v1/account', account_route_1.default);
    // app.use('/api/v1/category', categoryRoutes)
    app.use('/api/v1/upload', upload_route_1.default);
    app.use('/api/v1/product', product_route_1.default);
    app.use('/api/v1/informationBusiness', informationBusiness_route_1.default);
    app.use(error_middlewear_1.errorHandeler);
    app.use(error_middlewear_1.notFound);
};
exports.default = useRoutes;
