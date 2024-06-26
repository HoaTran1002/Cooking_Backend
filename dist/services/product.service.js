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
exports.deleteByIdProduct = exports.updateIdCategory = exports.deleteFIleVideoProduct = exports.deleteFIleImageProduct = exports.findAllProduct = exports.findProductById = void 0;
var response_interface_1 = require("../contract/interfaces/response.interface");
var product_models_1 = __importDefault(require("../models/product.models"));
var file_service_1 = require("./file.service");
var product_repository_1 = require("../repositories/product.repository");
var findProductById = function (id) { return __awaiter(void 0, void 0, void 0, function () {
    var fillter, products, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fillter = { _id: id };
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, product_models_1.default.findOne(fillter)];
            case 2:
                products = _a.sent();
                return [2 /*return*/, products];
            case 3:
                error_1 = _a.sent();
                throw new response_interface_1.IResponseErrorObject('not found product', 400);
            case 4: return [2 /*return*/];
        }
    });
}); };
exports.findProductById = findProductById;
var findAllProduct = function () { return __awaiter(void 0, void 0, void 0, function () {
    var products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, product_models_1.default.find()];
            case 1:
                products = _a.sent();
                if (products.length == 0) {
                    return [2 /*return*/, []];
                }
                if (products) {
                    return [2 /*return*/, products];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.findAllProduct = findAllProduct;
var deleteFIleImageProduct = function (_id) { return __awaiter(void 0, void 0, void 0, function () {
    var product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, product_models_1.default.findOne({ _id: _id })];
            case 1:
                product = (_a.sent());
                if (product.images && product.images.length > 0) {
                    product.images.map(function (image) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, file_service_1.deleteFile)(image.url)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                }
                return [2 /*return*/];
        }
    });
}); };
exports.deleteFIleImageProduct = deleteFIleImageProduct;
var deleteFIleVideoProduct = function (_id) { return __awaiter(void 0, void 0, void 0, function () {
    var product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, product_models_1.default.findOne({ _id: _id })];
            case 1:
                product = (_a.sent());
                if (product.videos && product.videos.length > 0) {
                    product.videos.map(function (video) { return __awaiter(void 0, void 0, void 0, function () {
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0: return [4 /*yield*/, (0, file_service_1.deleteFile)(video.url)];
                                case 1:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                }
                return [2 /*return*/];
        }
    });
}); };
exports.deleteFIleVideoProduct = deleteFIleVideoProduct;
var updateIdCategory = function (idProduct, idCategory) { return __awaiter(void 0, void 0, void 0, function () {
    var fillter, update, options;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fillter = { id: idProduct };
                update = { idCategory: idCategory };
                options = { new: true };
                return [4 /*yield*/, product_models_1.default.findOneAndUpdate(fillter, update, options)];
            case 1:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.updateIdCategory = updateIdCategory;
var deleteByIdProduct = function (idProduct) { return __awaiter(void 0, void 0, void 0, function () {
    var product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, exports.findProductById)(idProduct)];
            case 1:
                product = (_a.sent());
                if (!(product.images.length > 0)) return [3 /*break*/, 3];
                // const images = await getAllImageProduct(idProduct)
                return [4 /*yield*/, (0, exports.deleteFIleImageProduct)(idProduct)];
            case 2:
                // const images = await getAllImageProduct(idProduct)
                _a.sent();
                _a.label = 3;
            case 3:
                if (!(product.videos.length > 0)) return [3 /*break*/, 5];
                // const videos = await getAllVideoProduct(idProduct)
                return [4 /*yield*/, (0, exports.deleteFIleVideoProduct)(idProduct)];
            case 4:
                // const videos = await getAllVideoProduct(idProduct)
                _a.sent();
                _a.label = 5;
            case 5: return [4 /*yield*/, (0, product_repository_1.deleteProduct)(idProduct)];
            case 6:
                _a.sent();
                return [2 /*return*/];
        }
    });
}); };
exports.deleteByIdProduct = deleteByIdProduct;
