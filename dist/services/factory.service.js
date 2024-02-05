"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServicesFactory = void 0;
var faq_service_1 = require("./faq.service");
var tour_service_1 = require("./tour.service");
var ServicesFactory = /** @class */ (function () {
    function ServicesFactory() {
    }
    ServicesFactory.createData = function (type, payload) {
        switch (type) {
            case 'FAQ':
                return new faq_service_1.FAQServices().createData(payload);
            case 'Tour':
                return new tour_service_1.TourServices().createData(payload);
            default:
                throw new Error('not found type.');
        }
    };
    ServicesFactory.editData = function (id, type, payload) {
        switch (type) {
            case 'FAQ':
                return new faq_service_1.FAQServices().editData(id, payload);
            case 'Tour':
                return new tour_service_1.TourServices().editData(id, payload);
            default:
                throw new Error('not found type.');
        }
    };
    ServicesFactory.deleteData = function (id, type) {
        switch (type) {
            case 'FAQ':
                return new faq_service_1.FAQServices().deleteData(id);
            case 'Tour':
                return new tour_service_1.TourServices().deleteData(id);
            default:
                throw new Error('not found type.');
        }
    };
    ServicesFactory.getById = function (id, type) {
        switch (type) {
            case 'FAQ':
                return new faq_service_1.FAQServices().getById(id);
            case 'Tour':
                return new tour_service_1.TourServices().getById(id);
            default:
                throw new Error('not found type.');
        }
    };
    ServicesFactory.getAllData = function (type) {
        switch (type) {
            case 'FAQ':
                return new faq_service_1.FAQServices().getAllData();
            case 'Tour':
                return new tour_service_1.TourServices().getAllData();
            default:
                throw new Error('not found type.');
        }
    };
    ServicesFactory.pagination = function (page, size, type) {
        switch (type) {
            case 'FAQ':
                return new faq_service_1.FAQServices().pagination(page, size);
            case 'Tour':
                return new tour_service_1.TourServices().pagination(page, size);
            default:
                throw new Error('not found type.');
        }
    };
    return ServicesFactory;
}());
exports.ServicesFactory = ServicesFactory;
