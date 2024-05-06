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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var response_interface_1 = require("../contract/interfaces/response.interface");
var index_service_1 = __importDefault(require("../services/index.service"));
var Customer = /** @class */ (function () {
    function Customer() {
    }
    Customer.prototype.create = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var instance, record, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        instance = index_service_1.default.instance('customerBlog', req.body);
                        return [4 /*yield*/, instance.create()];
                    case 1:
                        record = _a.sent();
                        response = new response_interface_1.IResponseSuccessObject('create customer sucess', record, 200);
                        return [2 /*return*/, res.status(200).json(response)];
                }
            });
        });
    };
    Customer.prototype.getAll = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var instance, data, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        instance = index_service_1.default.instance('customerBlog');
                        return [4 /*yield*/, instance.getAll(req.params.page, req.params.size)];
                    case 1:
                        data = _a.sent();
                        response = new response_interface_1.IResponseSuccessObject('get all success', data, 200);
                        return [2 /*return*/, res.status(200).json(response)];
                }
            });
        });
    };
    Customer.prototype.getById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var instance, data, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        instance = index_service_1.default.instance('customerBlog');
                        return [4 /*yield*/, instance.getById(req.params.id)];
                    case 1:
                        data = _a.sent();
                        response = new response_interface_1.IResponseSuccessObject('get By id success', data, 200);
                        return [2 /*return*/, res.status(200).json(response)];
                }
            });
        });
    };
    Customer.prototype.deleteById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var instance, deleted, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        instance = index_service_1.default.instance('customerBlog');
                        return [4 /*yield*/, instance.deleteById(req.params.id)];
                    case 1:
                        deleted = _a.sent();
                        response = new response_interface_1.IResponseSuccessObject('delete By id success', deleted, 200);
                        return [2 /*return*/, res.status(200).json(response)];
                }
            });
        });
    };
    Customer.prototype.updateById = function (req, res) {
        return __awaiter(this, void 0, void 0, function () {
            var instance, updated, response;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        instance = index_service_1.default.instance('customerBlog', req.body);
                        return [4 /*yield*/, instance.updateById(req.params.id)];
                    case 1:
                        updated = _a.sent();
                        response = new response_interface_1.IResponseSuccessObject('update by id success', updated, 200);
                        return [2 /*return*/, res.status(200).json(response)];
                }
            });
        });
    };
    return Customer;
}());
var customerBlogController = new Customer();
exports.default = customerBlogController;