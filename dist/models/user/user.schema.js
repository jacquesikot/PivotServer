"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const legsSchema = new mongoose_1.Schema({
    user_id: {
        type: String,
        required: true,
    },
});
const userSchema = new mongoose_1.Schema({
    firstname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
    },
    middlename: {
        type: String,
        minlength: 2,
        maxlength: 255,
    },
    lastname: {
        type: String,
        required: true,
        minlength: 2,
        maxlength: 255,
    },
    email: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 255,
        unique: true,
    },
    mobile_number: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 20,
        unique: true,
    },
    gender: {
        type: String,
        required: true,
        minlength: 3,
        maxLength: 6,
    },
    age: {
        type: Number,
        required: true,
        minlength: 1,
    },
    role: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 25,
    },
    password: {
        type: String,
        required: true,
        minlength: 5,
        maxlength: 1024,
    },
    upline: {
        type: String,
        required: true,
    },
    legs: [legsSchema],
}, { timestamps: true });
exports.default = userSchema;
//# sourceMappingURL=user.schema.js.map