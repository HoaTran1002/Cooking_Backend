"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cors_1 = __importDefault(require("cors"));
var mongodb_db_1 = require("./config/db/mongodb.db");
var env_config_1 = require("./config/env.config");
var index_route_1 = __importDefault(require("./routes/index.route"));
var body_parser_1 = __importDefault(require("body-parser"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var app = (0, express_1.default)();
var corsOptions = {
    origin: ['https://momvietnam.vn', 'http://localhost:5173'],
    optionsSuccessStatus: 200,
    credentials: true
};
app.use((0, cors_1.default)(corsOptions));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cookie_parser_1.default)());
(0, mongodb_db_1.connectDB)();
(0, index_route_1.default)(app);
app.listen(env_config_1.env.PORT);
