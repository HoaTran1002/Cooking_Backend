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
exports.deleteAllProduct = exports.deleteProductById = exports.deleteAllProductVideoS3 = exports.deleteVideoImageS3 = exports.uploadProductVideoByIdFromLocalS3 = exports.deleteAllProductImageS3 = exports.deleteProductImageS3 = exports.uploadProductImageByIdFromLocalS3 = exports.editProductById = exports.getProductById = exports.getAllProduct = exports.createProduct = void 0;
const product_models_1 = __importDefault(require("../models/product.models"));
const product_repository_1 = require("../repositories/product.repository");
const product_service_1 = require("../services/product.service");
const upload_service_1 = require("../services/upload.service");
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = req.body;
    const product = yield product_models_1.default.create(body);
    if (product) {
        return res.status(200).json({ message: 'created product success', data: product });
    }
    return res.status(400).json('invalid data');
});
exports.createProduct = createProduct;
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield product_models_1.default.find();
    return res.status(200).json({ message: 'got all product success', data: products });
});
exports.getAllProduct = getAllProduct;
const getProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idProduct = req.params.idProduct;
    if (idProduct) {
        const product = yield (0, product_service_1.findProductById)(idProduct);
        if (!product) {
            return res.status(404).json({ message: 'not found product by id' });
        }
        return res.status(200).json({ message: 'got data product success', data: product });
    }
    return res.status(400).json({ message: 'invalid id product' });
});
exports.getProductById = getProductById;
const editProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idProduct = req.params.idProduct;
    const product = yield (0, product_service_1.findProductById)(idProduct);
    if (!product) {
        return res.status(404).json({ message: 'not found product by id' });
    }
    if (!idProduct) {
        return res.status(404).json({ message: 'not found id product' });
    }
    console.log('body:', req.body);
    const productEdit = yield (0, product_repository_1.editProduct)(idProduct, req.body);
    if (!productEdit) {
        return res.status(404).json({ message: 'not found product by id' });
    }
    return res.status(200).json({ message: 'update product success', data: productEdit });
});
exports.editProductById = editProductById;
//image
const uploadProductImageByIdFromLocalS3 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const idProduct = req.params.idProduct;
    if (!idProduct) {
        return res.status(400).json({ message: 'not found idProduct prams' });
    }
    const productEReady = yield (0, product_service_1.findProductById)(idProduct);
    if (!productEReady) {
        return res.status(404).json({ message: 'not found product by id' });
    }
    if (!file) {
        return res.status(400).json({ message: 'file not found' });
    }
    const image = yield (0, upload_service_1.uploadImageS3)(file);
    if (!image) {
        return res.status(400).json({ message: 'can not upload file ' });
    }
    const product = yield (0, product_repository_1.updateProductWhenUploadImage)(idProduct, image);
    return res.status(200).json({ message: 'upload succes ', data: product });
});
exports.uploadProductImageByIdFromLocalS3 = uploadProductImageByIdFromLocalS3;
const deleteProductImageS3 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idProduct = req.params.idProduct;
    const keyImage = req.params.key;
    if (!idProduct) {
        return res.status(400).json({ message: 'not found idProduct prams' });
    }
    if (!keyImage) {
        return res.status(400).json({ message: 'not found keyImage prams' });
    }
    const product = yield (0, product_repository_1.findOneProductById)(idProduct);
    if (!product) {
        return res.status(400).json({ message: 'idProduct invalid' });
    }
    const image = yield (0, product_repository_1.findProductImage)(idProduct, keyImage);
    if (!image) {
        return res.status(400).json({ message: 'keyImage invalid' });
    }
    yield (0, upload_service_1.deleteImageS3)(keyImage);
    const productDeleteImage = yield (0, product_repository_1.updateDeleteProductImage)(idProduct, image);
    return res.status(200).json({ message: 'success', data: productDeleteImage });
});
exports.deleteProductImageS3 = deleteProductImageS3;
const deleteAllProductImageS3 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idProduct = req.params.idProduct;
    const product = yield (0, product_service_1.findProductById)(idProduct);
    if (!product) {
        return res.status(404).json({ message: 'not found product by id' });
    }
    const images = yield (0, product_repository_1.getAllImageProduct)(idProduct);
    if (images.length === 0) {
        return res.status(200).json({ data: images });
    }
    if (images) {
        yield (0, product_repository_1.deleteAllImage)(idProduct, images);
        return res.status(200).send({ message: 'deleted all image of product' });
    }
});
exports.deleteAllProductImageS3 = deleteAllProductImageS3;
//video
const uploadProductVideoByIdFromLocalS3 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const file = req.file;
    const idProduct = req.params.idProduct;
    if (!idProduct) {
        return res.status(400).json({ message: 'not found idProduct prams' });
    }
    const productEReady = yield (0, product_service_1.findProductById)(idProduct);
    if (!productEReady) {
        return res.status(404).json({ message: 'not found product by id' });
    }
    if (!file) {
        return res.status(400).json({ message: 'file not found' });
    }
    const image = yield (0, upload_service_1.uploadVideoS3)(file);
    if (!image) {
        return res.status(400).json({ message: 'can not upload file ' });
    }
    const product = yield (0, product_repository_1.updateProductWhenUploadVideo)(idProduct, image);
    return res.status(200).json({ message: 'upload succes ', data: product });
});
exports.uploadProductVideoByIdFromLocalS3 = uploadProductVideoByIdFromLocalS3;
const deleteVideoImageS3 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idProduct = req.params.idProduct;
    const keyVideo = req.params.key;
    if (!idProduct) {
        return res.status(400).json({ message: 'not found idProduct prams' });
    }
    if (!keyVideo) {
        return res.status(400).json({ message: 'not found keyVideo prams' });
    }
    const product = yield (0, product_repository_1.findOneProductById)(idProduct);
    if (!product) {
        return res.status(400).json({ message: 'idProduct invalid' });
    }
    const video = yield (0, product_repository_1.findProductVideo)(idProduct, keyVideo);
    if (!video) {
        return res.status(400).json({ message: 'keyVideo invalid' });
    }
    yield (0, upload_service_1.deleteVideoS3)(keyVideo);
    const productDeleteVideo = yield (0, product_repository_1.updateDeleteProductVideo)(idProduct, video);
    return res.status(200).json({ message: 'delete video success', data: productDeleteVideo });
});
exports.deleteVideoImageS3 = deleteVideoImageS3;
const deleteAllProductVideoS3 = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idProduct = req.params.idProduct;
    const product = yield (0, product_service_1.findProductById)(idProduct);
    if (!product) {
        return res.status(404).json({ message: 'not found product by id' });
    }
    const videos = yield (0, product_repository_1.getAllVideoProduct)(idProduct);
    if (videos.length === 0) {
        return res.status(200).json({ data: videos });
    }
    if (videos) {
        yield (0, product_repository_1.deleteAllVideo)(idProduct, videos);
        return res.status(200).send({ message: 'deleted all videos of product' });
    }
});
exports.deleteAllProductVideoS3 = deleteAllProductVideoS3;
const deleteProductById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const idProduct = req.params.idProduct;
    const product = yield (0, product_service_1.findProductById)(idProduct);
    if (!product) {
        return res.status(404).json({ message: 'not found product by id' });
    }
    if (product.images.length > 0) {
        const images = yield (0, product_repository_1.getAllImageProduct)(idProduct);
        yield (0, product_repository_1.deleteAllImage)(idProduct, images);
    }
    if (product.videos.length > 0) {
        const videos = yield (0, product_repository_1.getAllVideoProduct)(idProduct);
        yield (0, product_repository_1.deleteAllVideo)(idProduct, videos);
    }
    yield (0, product_repository_1.deleteProduct)(idProduct);
    return res.json(200).send('delete success');
});
exports.deleteProductById = deleteProductById;
const deleteAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield (0, product_service_1.findAllProduct)();
    if (products.length == 0) {
        return res.status(201).json({ message: 'not exist product' });
    }
    if (products) {
        products.map((product) => __awaiter(void 0, void 0, void 0, function* () {
            if (product.images.length > 0) {
                const images = yield (0, product_repository_1.getAllImageProduct)(product._id);
                yield (0, product_repository_1.deleteAllImage)(product._id, images);
            }
            if (product.videos.length > 0) {
                const videos = yield (0, product_repository_1.getAllVideoProduct)(product._id);
                yield (0, product_repository_1.deleteAllVideo)(product._id, videos);
            }
            yield (0, product_repository_1.deleteProduct)(product._id);
        }));
    }
    return res.status(200).send('delete all product success');
});
exports.deleteAllProduct = deleteAllProduct;
