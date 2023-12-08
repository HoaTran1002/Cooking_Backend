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
exports.deleteProduct = exports.deleteAllVideo = exports.deleteAllImage = exports.getAllVideoProduct = exports.getAllImageProduct = exports.findProductVideo = exports.findProductImage = exports.findOneProductById = exports.updateDeleteProductVideo = exports.updateDeleteProductImage = exports.updateProductWhenUploadVideo = exports.updateProductWhenUploadImage = exports.editProduct = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const response_interface_1 = require("../interfaces/response.interface");
const product_models_1 = __importDefault(require("../models/product.models"));
const upload_service_1 = require("../services/upload.service");
const editProduct = (id, body) => __awaiter(void 0, void 0, void 0, function* () {
    const fillter = { _id: id };
    const update = body;
    const options = { new: true };
    const product = yield product_models_1.default.findOneAndUpdate(fillter, update, options);
    return product;
});
exports.editProduct = editProduct;
const updateProductWhenUploadImage = (idProduct, image) => __awaiter(void 0, void 0, void 0, function* () {
    const fillter = { _id: idProduct };
    const update = { $push: { images: image } };
    const options = { new: true };
    const product = yield product_models_1.default.findOneAndUpdate(fillter, update, options);
    return product;
});
exports.updateProductWhenUploadImage = updateProductWhenUploadImage;
const updateProductWhenUploadVideo = (idProduct, video) => __awaiter(void 0, void 0, void 0, function* () {
    const fillter = { _id: idProduct };
    const update = { $push: { videos: video } };
    const options = { new: true };
    const product = yield product_models_1.default.findOneAndUpdate(fillter, update, options);
    return product;
});
exports.updateProductWhenUploadVideo = updateProductWhenUploadVideo;
const updateDeleteProductImage = (idProduct, image) => __awaiter(void 0, void 0, void 0, function* () {
    const fillter = { _id: idProduct };
    const update = { $pull: { images: { key: image.key } } };
    const options = { new: true };
    const product = yield product_models_1.default.findOneAndUpdate(fillter, update, options);
    return product;
});
exports.updateDeleteProductImage = updateDeleteProductImage;
const updateDeleteProductVideo = (idProduct, video) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('video:', video);
    const fillter = { _id: idProduct };
    const update = { $pull: { videos: { key: video.key } } };
    const options = { new: true };
    console.log('update');
    const product = yield product_models_1.default.findOneAndUpdate(fillter, update, options);
    return product;
});
exports.updateDeleteProductVideo = updateDeleteProductVideo;
const findOneProductById = (idProduct) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield product_models_1.default.findById({ _id: idProduct });
    return product;
});
exports.findOneProductById = findOneProductById;
const findProductImage = (idProduct, key) => __awaiter(void 0, void 0, void 0, function* () {
    const productImage = yield product_models_1.default.aggregate([
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
                'images.key': key
            }
        }
    ]);
    if (productImage && productImage.length > 0) {
        const foundImage = productImage[0].images;
        return foundImage;
    }
    return null;
});
exports.findProductImage = findProductImage;
const findProductVideo = (idProduct, key) => __awaiter(void 0, void 0, void 0, function* () {
    const productVideo = yield product_models_1.default.aggregate([
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
                'videos.key': key
            }
        }
    ]);
    if (productVideo && productVideo.length > 0) {
        const foundImage = productVideo[0].videos;
        return foundImage;
    }
    return null;
});
exports.findProductVideo = findProductVideo;
const getAllImageProduct = (idProduct) => __awaiter(void 0, void 0, void 0, function* () {
    const fillter = { _id: idProduct };
    const product = yield product_models_1.default.findOne(fillter);
    if (product) {
        return product.images;
    }
    return [];
});
exports.getAllImageProduct = getAllImageProduct;
const getAllVideoProduct = (idProduct) => __awaiter(void 0, void 0, void 0, function* () {
    const fillter = { _id: idProduct };
    const product = yield product_models_1.default.findOne(fillter);
    if (product) {
        return product.videos;
    }
    return [];
});
exports.getAllVideoProduct = getAllVideoProduct;
const deleteAllImage = (idProduct, images) => __awaiter(void 0, void 0, void 0, function* () {
    for (let index = 0; index < images.length; index++) {
        try {
            yield (0, upload_service_1.deleteImageS3)(images[index].key);
            yield (0, exports.updateDeleteProductImage)(idProduct, images[index]);
        }
        catch (error) {
            throw new response_interface_1.IResponseErrorObject(error.message.toString, 500);
        }
    }
});
exports.deleteAllImage = deleteAllImage;
const deleteAllVideo = (idProduct, videos) => __awaiter(void 0, void 0, void 0, function* () {
    for (let index = 0; index < videos.length; index++) {
        try {
            yield (0, upload_service_1.deleteVideoS3)(videos[index].key);
            yield (0, exports.updateDeleteProductVideo)(idProduct, videos[index]);
        }
        catch (error) {
            throw new response_interface_1.IResponseErrorObject(error.message.toString, 500);
        }
    }
});
exports.deleteAllVideo = deleteAllVideo;
const deleteProduct = (idProduct) => __awaiter(void 0, void 0, void 0, function* () {
    const fillter = { _id: idProduct };
    return yield product_models_1.default.findByIdAndDelete(fillter);
});
exports.deleteProduct = deleteProduct;
