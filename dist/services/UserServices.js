"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const _ = __importStar(require("lodash"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const models_1 = require("../models");
const constants_1 = require("../constants");
class UserService {
    findUser(user_params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield models_1.User.findOne({ email: user_params.email });
                if (user)
                    return user.toObject();
                return false;
            }
            catch (e) {
                console.log(e.message);
            }
        });
    }
    findUserById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let user = yield models_1.User.findById(id).select('-password');
                return user;
            }
            catch (e) {
                console.log(e.message);
            }
        });
    }
    addLeg(upline, user_id) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const upline_user = yield models_1.User.findOne({ email: upline });
                if (upline_user)
                    (_a = upline_user.legs) === null || _a === void 0 ? void 0 : _a.push({
                        user_id: user_id,
                    });
                yield (upline_user === null || upline_user === void 0 ? void 0 : upline_user.save());
                return upline_user;
            }
            catch (e) {
                console.log(e.message);
            }
        });
    }
    createUser(user_params) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const salt = yield bcrypt_1.default.genSalt(10);
                user_params.password = yield bcrypt_1.default.hash(user_params.password, salt);
                let user = new models_1.User({
                    firstname: user_params.firstname,
                    middlename: user_params.middlename,
                    lastname: user_params.lastname,
                    email: user_params.email,
                    mobile_number: user_params.mobile_number,
                    gender: user_params.gender,
                    age: user_params.age,
                    role: user_params.role,
                    password: user_params.password,
                    upline: user_params.upline ? user_params.upline : 'admin@admin.com',
                });
                yield user.save();
                yield this.addLeg(user_params.upline, user._id);
                return _.pick(user, [
                    '_id',
                    'firstname',
                    'lastname',
                    'email',
                    'mobile_number',
                    'upline',
                ]);
            }
            catch (e) {
                console.log(e.message);
            }
        });
    }
    validatePassword(reqPassword, userPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            const validPassword = yield bcrypt_1.default.compare(reqPassword, userPassword);
            if (!validPassword)
                return false;
            return true;
        });
    }
    getToken(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = jsonwebtoken_1.default.sign({ user_id: id }, constants_1.JWT_KEY);
            return token.toString();
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=userServices.js.map