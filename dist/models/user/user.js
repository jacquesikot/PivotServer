"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const joi_1 = __importDefault(require("joi"));
const mongoose_1 = require("mongoose");
const User = mongoose_1.model('User', new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
}));
exports.validateUser = (user) => {
    const schema = joi_1.default.object({
        username: joi_1.default.string().min(5).max(255).required(),
        email: joi_1.default.string().min(5).max(255).required().email(),
        password: joi_1.default.string().min(5).max(255).required(),
    });
    return schema.validate(user);
};
exports.default = User;
//# sourceMappingURL=user.js.map