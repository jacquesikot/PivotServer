"use strict";
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
const express_1 = __importDefault(require("express"));
const services_1 = require("../services");
const validation_1 = require("../validation");
const services = new services_1.UserService();
class Auth {
    constructor() {
        this.path = '/api/auth';
        this.router = express_1.default.Router();
        this.addUser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { error } = validation_1.validateAuth(req.body);
            if (error)
                return res.status(400).send(error.details[0].message);
            let user = yield services.findUser(req.body);
            if (!user)
                return res.status(400).send('Invalid email or password');
            const validPassword = yield services.validatePassword(req.body.password, user.password);
            if (!validPassword)
                return res.status(400).send('Invalid email or password');
            const token = yield services.getToken(user._id);
            res.send(token);
        });
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.post(this.path, this.addUser);
    }
}
exports.default = Auth;
//# sourceMappingURL=Auth.js.map