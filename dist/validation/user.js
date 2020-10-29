"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateUser = void 0;
const joi_1 = __importDefault(require("joi"));
exports.validateUser = (user) => {
    const schema = joi_1.default.object({
        firstname: joi_1.default.string().min(2).max(255).required(),
        middlename: joi_1.default.string().min(2).max(255),
        lastname: joi_1.default.string().min(2).max(255).required(),
        email: joi_1.default.string().email().min(2).max(255).required(),
        mobile_number: joi_1.default.string().min(3).max(45).required(),
        gender: joi_1.default.string().min(4).max(6).required(),
        age: joi_1.default.number().min(1).required(),
        role: joi_1.default.string().min(5).max(10).required(),
        password: joi_1.default.string().min(3).max(25).required(),
        upline: joi_1.default.string().email(),
    });
    return schema.validate(user);
};
const validateAuth = (credential) => {
    const schema = joi_1.default.object({
        email: joi_1.default.string().min(5).max(255).required().email(),
        password: joi_1.default.string().min(3).max(255).required(),
    });
    return schema.validate(credential);
};
exports.default = validateAuth;
//# sourceMappingURL=user.js.map