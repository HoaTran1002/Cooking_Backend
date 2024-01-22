"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesFactory = void 0;
var faq_service_1 = require("./faq.service");
var ServicesFactory = /** @class */ (function () {
    function ServicesFactory() {
    }
    ServicesFactory.createData = function (type, payload) {
        switch (type) {
            case 'FAQ':
                return new faq_service_1.FAQServices().createData(payload);
            default:
                throw new Error('not found type.');
        }
    };
    ServicesFactory.editData = function (id, type, payload) {
        switch (type) {
            case 'FAQ':
                return new faq_service_1.FAQServices().editData(id, payload);
            default:
                throw new Error('not found type.');
        }
    };
    ServicesFactory.deleteData = function (id, type) {
        switch (type) {
            case 'FAQ':
                return new faq_service_1.FAQServices().deleteData(id);
            default:
                throw new Error('not found type.');
        }
    };
    ServicesFactory.getById = function (id, type) {
        switch (type) {
            case 'FAQ':
                return new faq_service_1.FAQServices().getById(id);
            default:
                throw new Error('not found type.');
        }
    };
    ServicesFactory.getAllData = function (type) {
        switch (type) {
            case 'FAQ':
                return new faq_service_1.FAQServices().getAllData();
            default:
                throw new Error('not found type.');
        }
    };
    ServicesFactory.pagination = function (page, size, type) {
        switch (type) {
            case 'FAQ':
                return new faq_service_1.FAQServices().pagination(page, size);
            default:
                throw new Error('not found type.');
        }
    };
    return ServicesFactory;
}());
exports.ServicesFactory = ServicesFactory;
