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
exports.deleteProduct = exports.getAllVideoProduct = exports.getAllImageProduct = exports.findProductVideo = exports.findProductImage = exports.findOneProductById = exports.updateDeleteProductVideo = exports.updateDeleteVideo = exports.updateDeleteImage = exports.updateDeleteProductImage = exports.updateProductWhenUploadVideo = exports.updateProductWhenUploadImage = exports.addVideoToProduct = exports.addImageToProduct = exports.editProduct = void 0;
var mongoose_1 = __importDefault(require("mongoose"));
var product_models_1 = __importDefault(require("../models/product.models"));
var tour_models_1 = __importDefault(require("../models/tour.models"));
var factory_service_1 = require("../services/factory.service");
var editProduct = function (id, body) { return __awaiter(void 0, void 0, void 0, function () {
    var fillter, update, options, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fillter = { _id: id };
                update = body;
                options = { new: true };
                return [4 /*yield*/, product_models_1.default.findOneAndUpdate(fillter, update, options)];
            case 1:
                product = _a.sent();
                return [2 /*return*/, product];
        }
    });
}); };
exports.editProduct = editProduct;
var addImageToProduct = function (id, image) { return __awaiter(void 0, void 0, void 0, function () {
    var fillter, update, options, course;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fillter = { _id: id };
                update = { $push: { images: image } };
                options = { new: true };
                return [4 /*yield*/, product_models_1.default.findOneAndUpdate(fillter, update, options)];
            case 1:
                course = _a.sent();
                return [2 /*return*/, course === null || course === void 0 ? void 0 : course.images];
        }
    });
}); };
exports.addImageToProduct = addImageToProduct;
var addVideoToProduct = function (id, video) { return __awaiter(void 0, void 0, void 0, function () {
    var fillter, update, options, course;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fillter = { _id: id };
                update = { $push: { videos: video } };
                options = { new: true };
                return [4 /*yield*/, product_models_1.default.findOneAndUpdate(fillter, update, options)];
            case 1:
                course = _a.sent();
                return [2 /*return*/, course === null || course === void 0 ? void 0 : course.videos];
        }
    });
}); };
exports.addVideoToProduct = addVideoToProduct;
var updateProductWhenUploadImage = function (idProduct, image) { return __awaiter(void 0, void 0, void 0, function () {
    var fillter, update, options, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fillter = { _id: idProduct };
                update = { $push: { images: image } };
                options = { new: true };
                return [4 /*yield*/, product_models_1.default.findOneAndUpdate(fillter, update, options)];
            case 1:
                product = _a.sent();
                return [2 /*return*/, product];
        }
    });
}); };
exports.updateProductWhenUploadImage = updateProductWhenUploadImage;
var updateProductWhenUploadVideo = function (idProduct, video) { return __awaiter(void 0, void 0, void 0, function () {
    var fillter, update, options, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fillter = { _id: idProduct };
                update = { $push: { videos: video } };
                options = { new: true };
                return [4 /*yield*/, product_models_1.default.findOneAndUpdate(fillter, update, options)];
            case 1:
                product = _a.sent();
                return [2 /*return*/, product];
        }
    });
}); };
exports.updateProductWhenUploadVideo = updateProductWhenUploadVideo;
var updateDeleteProductImage = function (idProduct, image) { return __awaiter(void 0, void 0, void 0, function () {
    var fillter, update, options, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fillter = { _id: idProduct };
                update = { $pull: { images: { key: image.key } } };
                options = { new: true };
                return [4 /*yield*/, product_models_1.default.findOneAndUpdate(fillter, update, options)];
            case 1:
                product = _a.sent();
                return [2 /*return*/, product];
        }
    });
}); };
exports.updateDeleteProductImage = updateDeleteProductImage;
var updateDeleteImage = function (idProduct, images) { return __awaiter(void 0, void 0, void 0, function () {
    var fillter, update, options, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fillter = { _id: idProduct };
                update = { $set: { images: images, image: images[0] } };
                options = { new: true };
                return [4 /*yield*/, product_models_1.default.findOneAndUpdate(fillter, update, options)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.updateDeleteImage = updateDeleteImage;
var updateDeleteVideo = function (idProduct, videos) { return __awaiter(void 0, void 0, void 0, function () {
    var fillter, update, options, result;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fillter = { _id: idProduct };
                update = { $set: { videos: videos, video: videos[0] } };
                options = { new: true };
                return [4 /*yield*/, product_models_1.default.findOneAndUpdate(fillter, update, options)];
            case 1:
                result = _a.sent();
                return [2 /*return*/, result];
        }
    });
}); };
exports.updateDeleteVideo = updateDeleteVideo;
var updateDeleteProductVideo = function (idProduct, video) { return __awaiter(void 0, void 0, void 0, function () {
    var fillter, update, options, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log('video:', video);
                fillter = { _id: idProduct };
                update = { $pull: { videos: { key: video.key } } };
                options = { new: true };
                console.log('update');
                return [4 /*yield*/, product_models_1.default.findOneAndUpdate(fillter, update, options)];
            case 1:
                product = _a.sent();
                return [2 /*return*/, product];
        }
    });
}); };
exports.updateDeleteProductVideo = updateDeleteProductVideo;
var findOneProductById = function (idProduct) { return __awaiter(void 0, void 0, void 0, function () {
    var product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, product_models_1.default.findById({ _id: idProduct })];
            case 1:
                product = _a.sent();
                return [2 /*return*/, product];
        }
    });
}); };
exports.findOneProductById = findOneProductById;
var findProductImage = function (idProduct, key) { return __awaiter(void 0, void 0, void 0, function () {
    var productImage, foundImage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, product_models_1.default.aggregate([
                    {
                        $match: {
                            _id: new mongoose_1.default.Types.ObjectId(idProduct)
                        }
                    },
                    {
                        $unwind: '$images'
                    },
                    {
                        $match: {
                            'images._id': new mongoose_1.default.Types.ObjectId(key)
                        }
                    }
                ])];
            case 1:
                productImage = _a.sent();
                if (productImage && productImage.length > 0) {
                    foundImage = productImage[0].images;
                    return [2 /*return*/, foundImage];
                }
                return [2 /*return*/, null];
        }
    });
}); };
exports.findProductImage = findProductImage;
var findProductVideo = function (idProduct, key) { return __awaiter(void 0, void 0, void 0, function () {
    var productVideo, foundVideo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, product_models_1.default.aggregate([
                    {
                        $match: {
                            _id: new mongoose_1.default.Types.ObjectId(idProduct)
                        }
                    },
                    {
                        $unwind: '$videos'
                    },
                    {
                        $match: {
                            'videos._id': new mongoose_1.default.Types.ObjectId(key)
                        }
                    }
                ])];
            case 1:
                productVideo = _a.sent();
                if (productVideo && productVideo.length > 0) {
                    foundVideo = productVideo[0].videos;
                    return [2 /*return*/, foundVideo];
                }
                return [2 /*return*/, null];
        }
    });
}); };
exports.findProductVideo = findProductVideo;
var getAllImageProduct = function (idProduct) { return __awaiter(void 0, void 0, void 0, function () {
    var fillter, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fillter = { _id: idProduct };
                return [4 /*yield*/, product_models_1.default.findOne(fillter)];
            case 1:
                product = _a.sent();
                if (product) {
                    return [2 /*return*/, product.images];
                }
                return [2 /*return*/, []];
        }
    });
}); };
exports.getAllImageProduct = getAllImageProduct;
var getAllVideoProduct = function (idProduct) { return __awaiter(void 0, void 0, void 0, function () {
    var fillter, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fillter = { _id: idProduct };
                return [4 /*yield*/, product_models_1.default.findOne(fillter)];
            case 1:
                product = _a.sent();
                if (product) {
                    return [2 /*return*/, product.videos];
                }
                return [2 /*return*/, []];
        }
    });
}); };
exports.getAllVideoProduct = getAllVideoProduct;
// export const deleteAllImage = async (idProduct: string, images: IImage[]) => {
//   for (let index = 0; index < images.length; index++) {
//     try {
//       await deleteImageS3(images[index].key)
//       await updateDeleteProductImage(idProduct, images[index])
//     } catch (error: any) {
//       throw new IResponseErrorObject(error.message.toString, 500)
//     }
//   }
// }
// export const deleteAllVideo = async (idProduct: string, videos: IImage[]) => {
//   for (let index = 0; index < videos.length; index++) {
//     try {
//       await deleteVideoS3(videos[index].key)
//       await updateDeleteProductVideo(idProduct, videos[index])
//     } catch (error: any) {
//       throw new IResponseErrorObject(error.message.toString, 500)
//     }
//   }
// }
var deleteProduct = function (idProduct) { return __awaiter(void 0, void 0, void 0, function () {
    var fillter, tours;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fillter = { _id: idProduct };
                return [4 /*yield*/, tour_models_1.default.find({ idProduct: idProduct })];
            case 1:
                tours = _a.sent();
                if (!(tours.length > 0)) return [3 /*break*/, 3];
                tours.map(function (tour) { return __awaiter(void 0, void 0, void 0, function () {
                    return __generator(this, function (_a) {
                        switch (_a.label) {
                            case 0: return [4 /*yield*/, factory_service_1.ServicesFactory.deleteData(new mongoose_1.default.Types.ObjectId(tour._id).toString(), 'Tour')];
                            case 1:
                                _a.sent();
                                return [2 /*return*/];
                        }
                    });
                }); });
                return [4 /*yield*/, product_models_1.default.findByIdAndDelete(fillter)];
            case 2: return [2 /*return*/, _a.sent()];
            case 3: return [2 /*return*/];
        }
    });
}); };
exports.deleteProduct = deleteProduct;
