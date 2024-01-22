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
exports.deleteChefById = exports.getAllChef = exports.getByIdChef = exports.updateContentImageVPS = exports.updateTextDataChefById = exports.createChef = void 0;
var chef_repository_1 = require("../repositories/chef.repository");
var chef_service_1 = require("../services/chef.service");
var file_service_1 = require("../services/file.service");
var createChef = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var chefData, file, createdNews, response, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                chefData = req.body;
                file = req.file;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 5]);
                if (!file) {
                    return [2 /*return*/, res.status(400).json({ message: 'file not found' })];
                }
                chefData.image = { url: file.path };
                return [4 /*yield*/, (0, chef_repository_1.addChef)(chefData)];
            case 2:
                createdNews = _a.sent();
                response = {
                    message: 'created chef success',
                    data: createdNews
                };
                return [2 /*return*/, res.status(200).json(response)];
            case 3:
                error_1 = _a.sent();
                return [4 /*yield*/, (0, file_service_1.deleteFile)(file.path)];
            case 4:
                _a.sent();
                throw new Error(error_1);
            case 5: return [2 /*return*/];
        }
    });
}); };
exports.createChef = createChef;
var updateTextDataChefById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, body, chefExist, chefUpdate, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                body = req.body;
                if (!id) {
                    return [2 /*return*/, res.status(400).json({ message: 'cannot found id' })];
                }
                return [4 /*yield*/, (0, chef_repository_1.getChefByID)(id)];
            case 1:
                chefExist = (_a.sent());
                if (!chefExist) {
                    return [2 /*return*/, res.status(400).json({ message: 'cannot found any chef' })];
                }
                if (!chefExist.image.url) {
                    return [2 /*return*/, res.status(400).json({ message: 'cannot found chef image' })];
                }
                body.image = { url: chefExist.image.url };
                return [4 /*yield*/, (0, chef_repository_1.updateChefByID)(id, body)];
            case 2:
                chefUpdate = _a.sent();
                response = {
                    message: 'updated data chef success',
                    data: chefUpdate
                };
                if (chefUpdate) {
                    return [2 /*return*/, res.status(200).json(response)];
                }
                return [2 /*return*/];
        }
    });
}); };
exports.updateTextDataChefById = updateTextDataChefById;
var updateContentImageVPS = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var fileUpload, id, file, chefExist, imageObject, error_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                fileUpload = req.file;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 6, , 8]);
                id = req.params.id;
                file = req.file;
                if (!id) {
                    return [2 /*return*/, res.status(400).json({ message: 'not found id prams' })];
                }
                return [4 /*yield*/, (0, chef_repository_1.getChefByID)(id)];
            case 2:
                chefExist = _a.sent();
                if (!(chefExist == null)) return [3 /*break*/, 3];
                return [2 /*return*/, res.status(400).json({ message: 'cannot found any news' })];
            case 3:
                if (!chefExist.image) {
                    return [2 /*return*/, res.status(404).json({ mesage: 'not found image' })];
                }
                if (!file) {
                    return [2 /*return*/, res.status(400).send('Không có file được tải lên.')];
                }
                return [4 /*yield*/, (0, file_service_1.updateFileContent)(file, chefExist.image.url)];
            case 4:
                imageObject = _a.sent();
                if (imageObject != null) {
                    return [2 /*return*/, res.status(200).json({ message: 'File has been updated successfully' })];
                }
                _a.label = 5;
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
exports.updateContentImageVPS = updateContentImageVPS;
var getByIdChef = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, chefExist, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                if (!id) {
                    return [2 /*return*/, res.status(400).json({ message: 'cannot found id' })];
                }
                return [4 /*yield*/, (0, chef_repository_1.getChefByID)(id)];
            case 1:
                chefExist = _a.sent();
                if (!chefExist) {
                    return [2 /*return*/, res.status(400).json({ message: 'cannot found any chef' })];
                }
                response = {
                    message: 'get data success',
                    data: chefExist
                };
                return [2 /*return*/, res.status(200).json(response)];
        }
    });
}); };
exports.getByIdChef = getByIdChef;
var getAllChef = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var page, size, getAllChef, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                page = parseInt(req.params.page, 10);
                size = parseInt(req.params.size, 10);
                if (isNaN(page) || isNaN(size) || page <= 0 || size <= 0) {
                    return [2 /*return*/, res.status(400).json({ message: 'page and size should be positive integers greater than 0' })];
                }
                return [4 /*yield*/, (0, chef_service_1.findAll)(Number(page), Number(size))];
            case 1:
                getAllChef = _a.sent();
                response = {
                    message: 'get all success',
                    data: getAllChef
                };
                if (!getAllChef) {
                    return [2 /*return*/, res.status(200).json(response)];
                }
                return [2 /*return*/, res.status(200).json(getAllChef)];
        }
    });
}); };
exports.getAllChef = getAllChef;
var deleteChefById = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var id, chefExist;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                id = req.params.id;
                if (!id) {
                    return [2 /*return*/, res.status(400).json({ message: 'cannot found id' })];
                }
                return [4 /*yield*/, (0, chef_repository_1.getChefByID)(id)];
            case 1:
                chefExist = _a.sent();
                if (!chefExist) {
                    return [2 /*return*/, res.status(400).json({ message: 'cannot found any chef' })];
                }
                return [4 /*yield*/, (0, file_service_1.deleteFile)(chefExist.image.url)];
            case 2:
                _a.sent();
                return [4 /*yield*/, (0, chef_repository_1.deleteByIDChef)(id)];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(200).json({ message: 'deleted chef success' })];
        }
    });
}); };
exports.deleteChefById = deleteChefById;
