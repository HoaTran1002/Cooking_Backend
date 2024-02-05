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
Object.defineProperty(exports, "__esModule", { value: true });
var response_interface_1 = require("../interfaces/response.interface");
var factory_service_1 = require("../services/factory.service");
var file_service_1 = require("../services/file.service");
var TourController = /** @class */ (function () {
    function TourController() {
        var _this = this;
        this.createTour = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var idProduct, body, file, tour, response, _a, _b, error_1;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        idProduct = req.params.idProduct;
                        body = req.body;
                        file = req.file;
                        _c.label = 1;
                    case 1:
                        _c.trys.push([1, 3, , 5]);
                        if (!file) {
                            return [2 /*return*/, res.status(400).json({ message: 'file not found' })];
                        }
                        if (!idProduct) {
                            throw new response_interface_1.IResponseErrorObject('not found idProduct.', 404);
                        }
                        tour = {
                            idProduct: idProduct,
                            activityName: body.activityName,
                            activityContent: body.activityContent,
                            startTime: body.startTime,
                            endTime: body.endTime,
                            activityImages: { url: file.path, key: '' }
                        };
                        _a = response_interface_1.IResponseSuccessObject.bind;
                        _b = [void 0, 'Create TourOverView success'];
                        return [4 /*yield*/, factory_service_1.ServicesFactory.createData('Tour', tour)];
                    case 2:
                        response = new (_a.apply(response_interface_1.IResponseSuccessObject, _b.concat([_c.sent(), 200])))();
                        return [2 /*return*/, res.status(200).json(response)];
                    case 3:
                        error_1 = _c.sent();
                        return [4 /*yield*/, (0, file_service_1.deleteFile)(file.path)];
                    case 4:
                        _c.sent();
                        throw new Error(error_1.message);
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        this.editTour = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var response, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        console.log(req.body);
                        _a = response_interface_1.IResponseSuccessObject.bind;
                        _b = [void 0, 'Update Tour success'];
                        return [4 /*yield*/, factory_service_1.ServicesFactory.editData(req.params.id, 'Tour', req.body)];
                    case 1:
                        response = new (_a.apply(response_interface_1.IResponseSuccessObject, _b.concat([_c.sent(), 200])))();
                        return [2 /*return*/, res.status(200).json(response)];
                }
            });
        }); };
        this.deleteTour = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var response, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = response_interface_1.IResponseSuccessObject.bind;
                        _b = [void 0, 'delete FAQ success'];
                        return [4 /*yield*/, factory_service_1.ServicesFactory.deleteData(req.params.id, 'Tour')];
                    case 1:
                        response = new (_a.apply(response_interface_1.IResponseSuccessObject, _b.concat([_c.sent(), 200])))();
                        return [2 /*return*/, res.status(200).json(response)];
                }
            });
        }); };
        this.getTourById = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var response, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = response_interface_1.IResponseSuccessObject.bind;
                        _b = [void 0, 'get Tour success'];
                        return [4 /*yield*/, factory_service_1.ServicesFactory.getById(req.params.id, 'Tour')];
                    case 1:
                        response = new (_a.apply(response_interface_1.IResponseSuccessObject, _b.concat([_c.sent(), 200])))();
                        return [2 /*return*/, res.status(200).json(response)];
                }
            });
        }); };
        this.getTours = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var response, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = response_interface_1.IResponseSuccessObject.bind;
                        _b = [void 0, 'get Tour success'];
                        return [4 /*yield*/, factory_service_1.ServicesFactory.getAllData('Tour')];
                    case 1:
                        response = new (_a.apply(response_interface_1.IResponseSuccessObject, _b.concat([_c.sent(), 200])))();
                        return [2 /*return*/, res.status(200).json(response)];
                }
            });
        }); };
        this.paginationTour = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var response, _a, _b;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _a = response_interface_1.IResponseSuccessObject.bind;
                        _b = [void 0, 'get FAQ success'];
                        return [4 /*yield*/, factory_service_1.ServicesFactory.pagination(req.params.page, req.params.size, 'Tour')];
                    case 1:
                        response = new (_a.apply(response_interface_1.IResponseSuccessObject, _b.concat([_c.sent(), 200])))();
                        return [2 /*return*/, res.status(200).json(response)];
                }
            });
        }); };
        this.updateContentImageVPS = function (req, res) { return __awaiter(_this, void 0, void 0, function () {
            var fileUpload, id, tour, response, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        fileUpload = req.file;
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 6, , 8]);
                        id = req.params.id;
                        if (!id) {
                            return [2 /*return*/, res.status(400).json({ message: 'not found id prams' })];
                        }
                        return [4 /*yield*/, factory_service_1.ServicesFactory.getById(req.params.id, 'Tour')];
                    case 2:
                        tour = (_a.sent());
                        if (!(tour == null)) return [3 /*break*/, 3];
                        return [2 /*return*/, res.status(400).json({ message: 'cannot found any tour' })];
                    case 3:
                        if (!tour.activityImages) {
                            return [2 /*return*/, res.status(404).json({ mesage: 'not found image' })];
                        }
                        if (!fileUpload) {
                            return [2 /*return*/, res.status(400).send('Không có file được tải lên.')];
                        }
                        return [4 /*yield*/, (0, file_service_1.updateFileContent)(fileUpload, tour.activityImages.url)];
                    case 4:
                        _a.sent();
                        response = new response_interface_1.IResponseSuccessObject('File has been updated successfully', 200);
                        return [2 /*return*/, res.status(200).json(response)];
                    case 5: return [3 /*break*/, 8];
                    case 6:
                        error_2 = _a.sent();
                        return [4 /*yield*/, (0, file_service_1.deleteFile)(fileUpload.path)];
                    case 7:
                        _a.sent();
                        throw new Error(error_2);
                    case 8: return [2 /*return*/];
                }
            });
        }); };
    }
    return TourController;
}());
var tourController = new TourController();
exports.default = tourController;
