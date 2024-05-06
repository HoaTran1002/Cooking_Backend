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
var informationPosition_repository_1 = __importDefault(require("../repositories/informationPosition.repository"));
var response_interface_1 = require("../contract/interfaces/response.interface");
var InformationPopsitionRecruitment = /** @class */ (function () {
    function InformationPopsitionRecruitment(payload) {
        if (payload) {
            this.name = payload.name;
            this.description = payload.description;
        }
        else {
            this.name = '';
            this.description = '';
        }
    }
    InformationPopsitionRecruitment.prototype.create = function () {
        return __awaiter(this, void 0, void 0, function () {
            var body, customerBlog, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        body = {
                            name: this.name,
                            description: this.description
                        };
                        return [4 /*yield*/, informationPosition_repository_1.default.create(body)];
                    case 1:
                        customerBlog = _a.sent();
                        return [2 /*return*/, customerBlog];
                    case 2:
                        error_1 = _a.sent();
                        throw new response_interface_1.IResponseErrorObject(error_1, 404);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InformationPopsitionRecruitment.prototype.getAll = function (page, size) {
        return __awaiter(this, void 0, void 0, function () {
            var limit, skip, data, total_documents, total_pages, previous_pages, next_pages;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        limit = size;
                        skip = (page - 1) * size;
                        return [4 /*yield*/, informationPosition_repository_1.default.getAll(limit, skip)];
                    case 1:
                        data = _a.sent();
                        return [4 /*yield*/, informationPosition_repository_1.default.Model.countDocuments()];
                    case 2:
                        total_documents = _a.sent();
                        total_pages = Math.ceil(total_documents / size);
                        previous_pages = page > 1 ? page - 1 : null;
                        next_pages = skip + size < total_documents ? page + 1 : null;
                        return [2 /*return*/, { page: page, size: size, data: data, total_pages: total_pages, previous_pages: previous_pages, next_pages: next_pages }];
                }
            });
        });
    };
    InformationPopsitionRecruitment.prototype.getById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var customerBlog, error_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, informationPosition_repository_1.default.getById(id)];
                    case 1:
                        customerBlog = _a.sent();
                        return [2 /*return*/, customerBlog];
                    case 2:
                        error_2 = _a.sent();
                        throw new response_interface_1.IResponseErrorObject(error_2, 404);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InformationPopsitionRecruitment.prototype.deleteById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var customerBlog, error_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, informationPosition_repository_1.default.deleteById(id)];
                    case 1:
                        customerBlog = _a.sent();
                        return [2 /*return*/, customerBlog];
                    case 2:
                        error_3 = _a.sent();
                        throw new response_interface_1.IResponseErrorObject(error_3, 404);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    InformationPopsitionRecruitment.prototype.updateById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var body, customerBlog, error_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        body = {
                            name: this.name,
                            description: this.description
                        };
                        return [4 /*yield*/, informationPosition_repository_1.default.update(id, body)];
                    case 1:
                        customerBlog = _a.sent();
                        return [2 /*return*/, customerBlog];
                    case 2:
                        error_4 = _a.sent();
                        throw new response_interface_1.IResponseErrorObject(error_4, 404);
                    case 3: return [2 /*return*/];
                }
            });
        });
    };
    return InformationPopsitionRecruitment;
}());
exports.default = InformationPopsitionRecruitment;
