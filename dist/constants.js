"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.JWT_KEY = exports.DB_URI = exports.PORT = exports.__Prod__ = void 0;
require("dotenv/config");
exports.__Prod__ = process.env.NODE_ENV === 'production';
exports.PORT = process.env.PORT;
exports.DB_URI = process.env.DB_URI ? process.env.DB_URI : '';
exports.JWT_KEY = process.env.JWT_KEY ? process.env.JWT_KEY : '';
//# sourceMappingURL=constants.js.map