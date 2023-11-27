"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const matrix_controller_1 = require("../controllers/matrix.controller");
const router = (0, express_1.Router)();
router.get('/', matrix_controller_1.matrixMultiply);
exports.default = router;
