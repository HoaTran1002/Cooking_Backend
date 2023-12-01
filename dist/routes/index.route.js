"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const course_route_1 = __importDefault(require("../routes/course.route"));
const category_route_1 = __importDefault(require("../routes/category.route"));
const auth_route_1 = __importDefault(require("../routes/auth.route"));
const account_route_1 = __importDefault(require("../routes/account.route"));
const upload_route_1 = __importDefault(require("../routes/upload.route"));
const informationBusiness_route_1 = __importDefault(require("../routes/informationBusiness.route"));
const error_middlewear_1 = require("../middlewares/error.middlewear");
const useRoutes = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.use('/api/v1/auth', auth_route_1.default);
    app.use('/api/v1/course', course_route_1.default);
    app.use('/api/v1/account', account_route_1.default);
    app.use('/api/v1/category', category_route_1.default);
    app.use('/api/v1/upload', upload_route_1.default);
    app.use('/api/v1/informationBusiness', informationBusiness_route_1.default);
    app.use(error_middlewear_1.errorHandeler);
    app.use(error_middlewear_1.notFound);
});
exports.default = useRoutes;
