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
exports.findAllProduct = exports.findProductById = void 0;
const response_interface_1 = require("../interfaces/response.interface");
const product_models_1 = __importDefault(require("../models/product.models"));
const findProductById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const fillter = { _id: id };
    try {
        const products = yield product_models_1.default.findOne(fillter);
        return products;
    }
    catch (error) {
        throw new response_interface_1.IResponseErrorObject('not found product', 400);
    }
});
exports.findProductById = findProductById;
const findAllProduct = () => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_models_1.default.find();
    if (products.length == 0) {
        return [];
    }
    if (products) {
        return products;
    }
});
exports.findAllProduct = findAllProduct;
