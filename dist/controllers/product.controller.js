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
exports.removeAllVIdeoByProductById = exports.updateContentVideoVPS = exports.deleteVideoFromVPSByProductId = exports.uploadVideoFromLocalToVPSByProductId = exports.removeAllImageByProductById = exports.updateContentImageVPS = exports.deleteImageFromVPSByProductId = exports.uploadImageFromLocalToVPSByProductId = exports.deleteAllProduct = exports.deleteProductById = exports.deleteAllProductVideoS3 = exports.deleteVideoImageS3 = exports.uploadProductVideoByIdFromLocalS3 = exports.deleteAllProductImageS3 = exports.deleteProductImageS3 = exports.uploadProductImageByIdFromLocalS3 = exports.editProductById = exports.getProductById = exports.getAllProduct = exports.createProduct = void 0;
var product_models_1 = __importDefault(require("../models/product.models"));
var product_models_2 = __importDefault(require("../models/product.models"));
var product_repository_1 = require("../repositories/product.repository");
var file_service_1 = require("../services/file.service");
var product_service_1 = require("../services/product.service");
var uploadToS3_service_1 = require("../services/uploadToS3.service");
var createProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var body, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                body = req.body;
                return [4 /*yield*/, product_models_2.default.create(body)];
            case 1:
                product = _a.sent();
                if (product) {
                    return [2 /*return*/, res.status(200).json({ message: 'created product success', data: product })];
                }
                return [2 /*return*/, res.status(400).json('invalid data')];
        }
    });
}); };
exports.createProduct = createProduct;
var getAllProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, product_models_2.default.find()];
            case 1:
                products = _a.sent();
                return [2 /*return*/, res.status(200).json({ message: 'got all product success', data: products })];
        }
    });
}); };
exports.getAllProduct = getAllProduct;
var getProductById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idProduct, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idProduct = req.params.idProduct;
                if (!idProduct) return [3 /*break*/, 2];
                return [4 /*yield*/, (0, product_service_1.findProductById)(idProduct)];
            case 1:
                product = _a.sent();
                if (!product) {
                    return [2 /*return*/, res.status(404).json({ message: 'not found product by id' })];
                }
                return [2 /*return*/, res.status(200).json({ message: 'got data product success', data: product })];
            case 2: return [2 /*return*/, res.status(400).json({ message: 'invalid id product' })];
        }
    });
}); };
exports.getProductById = getProductById;
var editProductById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idProduct, product, productEdit;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idProduct = req.params.idProduct;
                return [4 /*yield*/, (0, product_service_1.findProductById)(idProduct)];
            case 1:
                product = _a.sent();
                if (!product) {
                    return [2 /*return*/, res.status(404).json({ message: 'not found product by id' })];
                }
                if (!idProduct) {
                    return [2 /*return*/, res.status(404).json({ message: 'not found id product' })];
                }
                console.log('body:', req.body);
                return [4 /*yield*/, (0, product_repository_1.editProduct)(idProduct, req.body)];
            case 2:
                productEdit = _a.sent();
                if (!productEdit) {
                    return [2 /*return*/, res.status(404).json({ message: 'not found product by id' })];
                }
                return [2 /*return*/, res.status(200).json({ message: 'update product success', data: productEdit })];
        }
    });
}); };
exports.editProductById = editProductById;
//s3 storage
//image
var uploadProductImageByIdFromLocalS3 = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var file, idProduct, productEReady, image, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                file = req.file;
                idProduct = req.params.idProduct;
                if (!idProduct) {
                    return [2 /*return*/, res.status(400).json({ message: 'not found idProduct prams' })];
                }
                return [4 /*yield*/, (0, product_service_1.findProductById)(idProduct)];
            case 1:
                productEReady = _a.sent();
                if (!productEReady) {
                    return [2 /*return*/, res.status(404).json({ message: 'not found product by id' })];
                }
                if (!file) {
                    return [2 /*return*/, res.status(400).json({ message: 'file not found' })];
                }
                return [4 /*yield*/, (0, uploadToS3_service_1.uploadImageS3)(file)];
            case 2:
                image = _a.sent();
                if (!image) {
                    return [2 /*return*/, res.status(400).json({ message: 'can not upload file ' })];
                }
                return [4 /*yield*/, (0, product_repository_1.updateProductWhenUploadImage)(idProduct, image)];
            case 3:
                product = _a.sent();
                return [2 /*return*/, res.status(200).json({ message: 'upload succes ', data: product })];
        }
    });
}); };
exports.uploadProductImageByIdFromLocalS3 = uploadProductImageByIdFromLocalS3;
var deleteProductImageS3 = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idProduct, keyImage, product, image, productDeleteImage;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idProduct = req.params.idProduct;
                keyImage = req.params.key;
                if (!idProduct) {
                    return [2 /*return*/, res.status(400).json({ message: 'not found idProduct prams' })];
                }
                if (!keyImage) {
                    return [2 /*return*/, res.status(400).json({ message: 'not found keyImage prams' })];
                }
                return [4 /*yield*/, (0, product_repository_1.findOneProductById)(idProduct)];
            case 1:
                product = _a.sent();
                if (!product) {
                    return [2 /*return*/, res.status(400).json({ message: 'idProduct invalid' })];
                }
                return [4 /*yield*/, (0, product_repository_1.findProductImage)(idProduct, keyImage)];
            case 2:
                image = _a.sent();
                if (!image) {
                    return [2 /*return*/, res.status(400).json({ message: 'keyImage invalid' })];
                }
                return [4 /*yield*/, (0, uploadToS3_service_1.deleteImageS3)(keyImage)];
            case 3:
                _a.sent();
                return [4 /*yield*/, (0, product_repository_1.updateDeleteProductImage)(idProduct, image)];
            case 4:
                productDeleteImage = _a.sent();
                return [2 /*return*/, res.status(200).json({ message: 'success', data: productDeleteImage })];
        }
    });
}); };
exports.deleteProductImageS3 = deleteProductImageS3;
var deleteAllProductImageS3 = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idProduct, product, images;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idProduct = req.params.idProduct;
                return [4 /*yield*/, (0, product_service_1.findProductById)(idProduct)];
            case 1:
                product = _a.sent();
                if (!product) {
                    return [2 /*return*/, res.status(404).json({ message: 'not found product by id' })];
                }
                return [4 /*yield*/, (0, product_repository_1.getAllImageProduct)(idProduct)];
            case 2:
                images = _a.sent();
                if (images.length === 0) {
                    return [2 /*return*/, res.status(200).json({ data: images })];
                }
                if (images) {
                    // await deleteAllImage(idProduct, images)
                    return [2 /*return*/, res.status(200).send({ message: 'deleted all image of product' })];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.deleteAllProductImageS3 = deleteAllProductImageS3;
//video
var uploadProductVideoByIdFromLocalS3 = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var file, idProduct, productEReady, image, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                file = req.file;
                idProduct = req.params.idProduct;
                if (!idProduct) {
                    return [2 /*return*/, res.status(400).json({ message: 'not found idProduct prams' })];
                }
                return [4 /*yield*/, (0, product_service_1.findProductById)(idProduct)];
            case 1:
                productEReady = _a.sent();
                if (!productEReady) {
                    return [2 /*return*/, res.status(404).json({ message: 'not found product by id' })];
                }
                if (!file) {
                    return [2 /*return*/, res.status(400).json({ message: 'file not found' })];
                }
                return [4 /*yield*/, (0, uploadToS3_service_1.uploadVideoS3)(file)];
            case 2:
                image = _a.sent();
                if (!image) {
                    return [2 /*return*/, res.status(400).json({ message: 'can not upload file ' })];
                }
                return [4 /*yield*/, (0, product_repository_1.updateProductWhenUploadVideo)(idProduct, image)];
            case 3:
                product = _a.sent();
                return [2 /*return*/, res.status(200).json({ message: 'upload succes ', data: product })];
        }
    });
}); };
exports.uploadProductVideoByIdFromLocalS3 = uploadProductVideoByIdFromLocalS3;
var deleteVideoImageS3 = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idProduct, keyVideo, product, video, productDeleteVideo;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idProduct = req.params.idProduct;
                keyVideo = req.params.key;
                if (!idProduct) {
                    return [2 /*return*/, res.status(400).json({ message: 'not found idProduct prams' })];
                }
                if (!keyVideo) {
                    return [2 /*return*/, res.status(400).json({ message: 'not found keyVideo prams' })];
                }
                return [4 /*yield*/, (0, product_repository_1.findOneProductById)(idProduct)];
            case 1:
                product = _a.sent();
                if (!product) {
                    return [2 /*return*/, res.status(400).json({ message: 'idProduct invalid' })];
                }
                return [4 /*yield*/, (0, product_repository_1.findProductVideo)(idProduct, keyVideo)];
            case 2:
                video = _a.sent();
                if (!video) {
                    return [2 /*return*/, res.status(400).json({ message: 'keyVideo invalid' })];
                }
                return [4 /*yield*/, (0, uploadToS3_service_1.deleteVideoS3)(keyVideo)];
            case 3:
                _a.sent();
                return [4 /*yield*/, (0, product_repository_1.updateDeleteProductVideo)(idProduct, video)];
            case 4:
                productDeleteVideo = _a.sent();
                return [2 /*return*/, res.status(200).json({ message: 'delete video success', data: productDeleteVideo })];
        }
    });
}); };
exports.deleteVideoImageS3 = deleteVideoImageS3;
var deleteAllProductVideoS3 = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idProduct, product, videos;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idProduct = req.params.idProduct;
                return [4 /*yield*/, (0, product_service_1.findProductById)(idProduct)];
            case 1:
                product = _a.sent();
                if (!product) {
                    return [2 /*return*/, res.status(404).json({ message: 'not found product by id' })];
                }
                return [4 /*yield*/, (0, product_repository_1.getAllVideoProduct)(idProduct)];
            case 2:
                videos = _a.sent();
                if (videos.length === 0) {
                    return [2 /*return*/, res.status(200).json({ data: videos })];
                }
                if (videos) {
                    // await deleteAllVideo(idProduct, videos)
                    return [2 /*return*/, res.status(200).send({ message: 'deleted all videos of product' })];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.deleteAllProductVideoS3 = deleteAllProductVideoS3;
var deleteProductById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idProduct, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                idProduct = req.params.idProduct;
                return [4 /*yield*/, (0, product_service_1.findProductById)(idProduct)];
            case 1:
                product = _a.sent();
                if (!product) {
                    return [2 /*return*/, res.status(404).json({ message: 'not found product by id' })];
                }
                if (!(product.images.length > 0)) return [3 /*break*/, 3];
                // const images = await getAllImageProduct(idProduct)
                return [4 /*yield*/, (0, product_service_1.deleteFIleImageProduct)(idProduct)];
            case 2:
                // const images = await getAllImageProduct(idProduct)
                _a.sent();
                _a.label = 3;
            case 3:
                if (!(product.videos.length > 0)) return [3 /*break*/, 5];
                // const videos = await getAllVideoProduct(idProduct)
                return [4 /*yield*/, (0, product_service_1.deleteFIleVideoProduct)(idProduct)];
            case 4:
                // const videos = await getAllVideoProduct(idProduct)
                _a.sent();
                _a.label = 5;
            case 5: return [4 /*yield*/, (0, product_repository_1.deleteProduct)(idProduct)];
            case 6:
                _a.sent();
                return [2 /*return*/, res.status(200).send('delete success')];
        }
    });
}); };
exports.deleteProductById = deleteProductById;
var deleteAllProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var products;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, (0, product_service_1.findAllProduct)()];
            case 1:
                products = _a.sent();
                if (products.length == 0) {
                    return [2 /*return*/, res.status(201).json({ message: 'not exist product' })];
                }
                if (products) {
                    products.map(function (product) { return __awaiter(void 0, void 0, void 0, function () {
                        var images, videos;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(product.images.length > 0)) return [3 /*break*/, 2];
                                    return [4 /*yield*/, (0, product_repository_1.getAllImageProduct)(product._id)
                                        // await deleteAllImage(product._id, images)
                                    ];
                                case 1:
                                    images = _a.sent();
                                    _a.label = 2;
                                case 2:
                                    if (!(product.videos.length > 0)) return [3 /*break*/, 4];
                                    return [4 /*yield*/, (0, product_repository_1.getAllVideoProduct)(product._id)
                                        // await deleteAllVideo(product._id, videos)
                                    ];
                                case 3:
                                    videos = _a.sent();
                                    _a.label = 4;
                                case 4: return [4 /*yield*/, (0, product_repository_1.deleteProduct)(product._id)];
                                case 5:
                                    _a.sent();
                                    return [2 /*return*/];
                            }
                        });
                    }); });
                }
                return [2 /*return*/, res.status(200).send('delete all product success')];
        }
    });
}); };
exports.deleteAllProduct = deleteAllProduct;
//file
//image
var uploadImageFromLocalToVPSByProductId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idProduct, product, file, imageObject, Images, error_1, file;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 5]);
                idProduct = req.params.idProduct;
                if (!idProduct) {
                    return [2 /*return*/, res.status(404).send('not found id product')];
                }
                return [4 /*yield*/, product_models_1.default.findById({ _id: idProduct })];
            case 1:
                product = _a.sent();
                if (!product) {
                    return [2 /*return*/, res.status(404).json({ mesage: 'not found product' })];
                }
                file = req.file;
                if (!file) {
                    return [2 /*return*/, res.status(400).send('Không có file được tải lên.')];
                }
                imageObject = {
                    url: file.path
                };
                return [4 /*yield*/, (0, product_repository_1.addImageToProduct)(idProduct, imageObject)];
            case 2:
                Images = _a.sent();
                if (!Images) {
                    return [2 /*return*/, res.status(500).json({ message: 'upload image failed' })];
                }
                return [2 /*return*/, res.status(200).json({ message: 'upload image success', result: Images })];
            case 3:
                error_1 = _a.sent();
                file = req.file;
                return [4 /*yield*/, (0, file_service_1.deleteFile)(file.path)];
            case 4:
                _a.sent();
                throw new Error(error_1);
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.uploadImageFromLocalToVPSByProductId = uploadImageFromLocalToVPSByProductId;
var deleteImageFromVPSByProductId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idProduct, keyImage, product, image, newImages;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                idProduct = req.params.idProduct;
                keyImage = req.params.keyImage;
                if (!idProduct) {
                    return [2 /*return*/, res.status(404).send('not found id product')];
                }
                return [4 /*yield*/, product_models_1.default.findById({ _id: idProduct })];
            case 1:
                product = _b.sent();
                if (!product) {
                    return [2 /*return*/, res.status(404).json({ mesage: 'not found product' })];
                }
                if (!keyImage) {
                    return [2 /*return*/, res.status(400).json({ message: 'not found keyImage prams' })];
                }
                return [4 /*yield*/, (0, product_repository_1.findProductImage)(idProduct, keyImage)];
            case 2:
                image = _b.sent();
                if (!image) {
                    return [2 /*return*/, res.status(400).json({ message: 'key Image invalid' })];
                }
                newImages = (_a = product === null || product === void 0 ? void 0 : product.images) === null || _a === void 0 ? void 0 : _a.filter(function (item) { return item._id != keyImage; });
                return [4 /*yield*/, (0, file_service_1.deleteFile)(image.url)];
            case 3:
                _b.sent();
                if (!newImages) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, product_repository_1.updateDeleteImage)(idProduct, newImages)];
            case 4:
                _b.sent();
                return [2 /*return*/, res.status(200).json({ message: 'delete image success' })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteImageFromVPSByProductId = deleteImageFromVPSByProductId;
var updateContentImageVPS = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idProduct, keyImage, product, image, file, imageObject, error_2, file;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 6]);
                idProduct = req.params.idProduct;
                keyImage = req.params.keyImage;
                if (!idProduct) {
                    return [2 /*return*/, res.status(404).send('not found id product')];
                }
                return [4 /*yield*/, product_models_1.default.findById({ _id: idProduct })];
            case 1:
                product = _a.sent();
                if (!product) {
                    return [2 /*return*/, res.status(404).json({ mesage: 'not found product' })];
                }
                if (!keyImage) {
                    return [2 /*return*/, res.status(400).json({ message: 'not found keyImage prams' })];
                }
                return [4 /*yield*/, (0, product_repository_1.findProductImage)(idProduct, keyImage)];
            case 2:
                image = _a.sent();
                if (!image) {
                    return [2 /*return*/, res.status(400).json({ message: 'key Image invalid' })];
                }
                file = req.file;
                if (!file) {
                    return [2 /*return*/, res.status(400).send('Không có file được tải lên.')];
                }
                return [4 /*yield*/, (0, file_service_1.updateFileContent)(file, image.url)];
            case 3:
                imageObject = _a.sent();
                if (imageObject != null) {
                    return [2 /*return*/, res.status(200).json({ message: 'File has been updated successfully' })];
                }
                return [3 /*break*/, 6];
            case 4:
                error_2 = _a.sent();
                file = req.file;
                return [4 /*yield*/, (0, file_service_1.deleteFile)(file.path)];
            case 5:
                _a.sent();
                throw new Error(error_2);
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.updateContentImageVPS = updateContentImageVPS;
var removeAllImageByProductById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, params, filter, update, options, productExist, deleted, error_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                response = {
                    message: ''
                };
                params = req.params;
                filter = { _id: params.idProduct };
                update = { $set: { images: [] } };
                options = { new: true };
                if (!params.idProduct) {
                    return [2 /*return*/, res.status(400).json({ message: 'not found idCourse prams' })];
                }
                return [4 /*yield*/, product_models_1.default.findById(filter)];
            case 1:
                productExist = _a.sent();
                if (!productExist) {
                    return [2 /*return*/, res.status(400).json({ message: 'id invalid' })];
                }
                if (productExist.images && productExist.images.length == 0) {
                    return [2 /*return*/, res.status(200).send('list image clean')];
                }
                return [4 /*yield*/, (0, product_service_1.deleteFIleImageProduct)(params.idProduct)];
            case 2:
                _a.sent();
                return [4 /*yield*/, product_models_1.default.findByIdAndUpdate(filter, update, options)];
            case 3:
                deleted = _a.sent();
                if (!deleted) {
                    return [2 /*return*/, res.status(404).send('product  not found')];
                }
                else {
                    response.message = 'deleted all image  success';
                    return [2 /*return*/, res.status(200).send(response)];
                }
                return [3 /*break*/, 5];
            case 4:
                error_3 = _a.sent();
                throw new Error(error_3);
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.removeAllImageByProductById = removeAllImageByProductById;
//video
var uploadVideoFromLocalToVPSByProductId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idProduct, product, file, videoObject, videos, error_4, file;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 5]);
                idProduct = req.params.idProduct;
                if (!idProduct) {
                    return [2 /*return*/, res.status(404).send('not found id product')];
                }
                return [4 /*yield*/, product_models_1.default.findById({ _id: idProduct })];
            case 1:
                product = _a.sent();
                if (!product) {
                    return [2 /*return*/, res.status(404).json({ mesage: 'not found product' })];
                }
                file = req.file;
                if (!file) {
                    return [2 /*return*/, res.status(400).send('Không có file được tải lên.')];
                }
                videoObject = {
                    url: file.path
                };
                return [4 /*yield*/, (0, product_repository_1.addVideoToProduct)(idProduct, videoObject)];
            case 2:
                videos = _a.sent();
                if (!videos) {
                    return [2 /*return*/, res.status(500).json({ message: 'upload video failed' })];
                }
                return [2 /*return*/, res.status(200).json({ message: 'upload video success', result: videos })];
            case 3:
                error_4 = _a.sent();
                file = req.file;
                return [4 /*yield*/, (0, file_service_1.deleteFile)(file.path)];
            case 4:
                _a.sent();
                throw new Error(error_4);
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.uploadVideoFromLocalToVPSByProductId = uploadVideoFromLocalToVPSByProductId;
var deleteVideoFromVPSByProductId = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idProduct, keyVideo, product, video, newVideos;
    var _a;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                idProduct = req.params.idProduct;
                keyVideo = req.params.keyVideo;
                if (!idProduct) {
                    return [2 /*return*/, res.status(404).send('not found id product')];
                }
                return [4 /*yield*/, product_models_1.default.findById({ _id: idProduct })];
            case 1:
                product = _b.sent();
                if (!product) {
                    return [2 /*return*/, res.status(404).json({ mesage: 'not found product' })];
                }
                if (!keyVideo) {
                    return [2 /*return*/, res.status(400).json({ message: 'not found keyVideo prams' })];
                }
                return [4 /*yield*/, (0, product_repository_1.findProductVideo)(idProduct, keyVideo)];
            case 2:
                video = _b.sent();
                if (!video) {
                    return [2 /*return*/, res.status(400).json({ message: 'key video invalid' })];
                }
                newVideos = (_a = product === null || product === void 0 ? void 0 : product.videos) === null || _a === void 0 ? void 0 : _a.filter(function (item) { return item._id != keyVideo; });
                return [4 /*yield*/, (0, file_service_1.deleteFile)(video.url)];
            case 3:
                _b.sent();
                if (!newVideos) return [3 /*break*/, 5];
                return [4 /*yield*/, (0, product_repository_1.updateDeleteVideo)(idProduct, newVideos)];
            case 4:
                _b.sent();
                return [2 /*return*/, res.status(200).json({ message: 'delete video success' })];
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.deleteVideoFromVPSByProductId = deleteVideoFromVPSByProductId;
var updateContentVideoVPS = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var idProduct, keyVideo, product, video, file, imageObject, error_5, file;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 6]);
                idProduct = req.params.idProduct;
                keyVideo = req.params.keyVideo;
                if (!idProduct) {
                    return [2 /*return*/, res.status(404).send('not found id product')];
                }
                return [4 /*yield*/, product_models_1.default.findById({ _id: idProduct })];
            case 1:
                product = _a.sent();
                if (!product) {
                    return [2 /*return*/, res.status(404).json({ mesage: 'not found product' })];
                }
                if (!keyVideo) {
                    return [2 /*return*/, res.status(400).json({ message: 'not found keyVideo prams' })];
                }
                return [4 /*yield*/, (0, product_repository_1.findProductVideo)(idProduct, keyVideo)];
            case 2:
                video = _a.sent();
                if (!video) {
                    return [2 /*return*/, res.status(400).json({ message: 'key video invalid' })];
                }
                file = req.file;
                if (!file) {
                    return [2 /*return*/, res.status(400).send('Không có file được tải lên.')];
                }
                return [4 /*yield*/, (0, file_service_1.updateFileContent)(file, video.url)];
            case 3:
                imageObject = _a.sent();
                if (imageObject != null) {
                    return [2 /*return*/, res.status(200).json({ message: 'File has been updated successfully' })];
                }
                return [3 /*break*/, 6];
            case 4:
                error_5 = _a.sent();
                file = req.file;
                return [4 /*yield*/, (0, file_service_1.deleteFile)(file.path)];
            case 5:
                _a.sent();
                throw new Error(error_5);
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.updateContentVideoVPS = updateContentVideoVPS;
var removeAllVIdeoByProductById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var response, params, filter, update, options, productExist, deleted, error_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 4, , 5]);
                response = {
                    message: ''
                };
                params = req.params;
                filter = { _id: params.idProduct };
                update = { $set: { videos: [] } };
                options = { new: true };
                if (!params.idProduct) {
                    return [2 /*return*/, res.status(400).json({ message: 'not found idCourse prams' })];
                }
                return [4 /*yield*/, product_models_1.default.findById(filter)];
            case 1:
                productExist = _a.sent();
                if (!productExist) {
                    return [2 /*return*/, res.status(400).json({ message: 'id invalid' })];
                }
                if (productExist.videos && productExist.videos.length == 0) {
                    return [2 /*return*/, res.status(200).send('list video clean')];
                }
                return [4 /*yield*/, (0, product_service_1.deleteFIleVideoProduct)(params.idProduct)];
            case 2:
                _a.sent();
                return [4 /*yield*/, product_models_1.default.findByIdAndUpdate(filter, update, options)];
            case 3:
                deleted = _a.sent();
                if (!deleted) {
                    return [2 /*return*/, res.status(404).send('product  not found')];
                }
                else {
                    response.message = 'deleted all video  success';
                    return [2 /*return*/, res.status(200).send(response)];
                }
                return [3 /*break*/, 5];
            case 4:
                error_6 = _a.sent();
                throw new Error(error_6);
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.removeAllVIdeoByProductById = removeAllVIdeoByProductById;
