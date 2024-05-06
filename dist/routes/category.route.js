"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var category_controllers_1 = require("../controllers/category.controllers");
var auth_middlewears_1 = require("../middlewares/auth.middlewears");
var error_middlewear_1 = require("../middlewares/error.middlewear");
var router = (0, express_1.Router)();
// router.post('/create/:idCourse', authorize(), asyncHandelError(createCategory))
// router.put('/:id/update', asyncHandelError(updateCategory))
// router.delete('/:id/remove', authorize(), asyncHandelError(removeCategory))
// router.get('/getAll', asyncHandelError(getAll))
// router.get('/getAllByCourseId/:idCourse', asyncHandelError(getAllByCourseId))
// router.get('/:id/getAllById', authorize(), asyncHandelError(getById))
router.post('/create/:idCourse', (0, auth_middlewears_1.authorize)(['ADMIN']), (0, error_middlewear_1.asyncHandelError)(category_controllers_1.createCategory));
router.put('/:id/update', (0, auth_middlewears_1.authorize)(['ADMIN']), (0, error_middlewear_1.asyncHandelError)(category_controllers_1.updateCategory));
router.delete('/:id/remove', (0, auth_middlewears_1.authorize)(['ADMIN']), (0, error_middlewear_1.asyncHandelError)(category_controllers_1.removeCategory));
router.get('/getAll', (0, error_middlewear_1.asyncHandelError)(category_controllers_1.getAll));
router.get('/getAllByCourseId/:idCourse', (0, error_middlewear_1.asyncHandelError)(category_controllers_1.getAllByCourseId));
router.get('/:id/getAllById', (0, error_middlewear_1.asyncHandelError)(category_controllers_1.getById));
exports.default = router;
