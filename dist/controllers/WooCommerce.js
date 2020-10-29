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
const express = __importStar(require("express"));
const woocommerce_rest_api_1 = __importDefault(require("@woocommerce/woocommerce-rest-api"));
const woocommerce = new woocommerce_rest_api_1.default({
    url: 'http://astrosboutique.com',
    consumerKey: 'ck_2460bb859a68ed89dd61b366c938ad0e0268fe33',
    consumerSecret: 'cs_618366529939e6841cf58fef1dde5cf1146cdd76',
    version: 'wc/v3',
});
class WooCommerce {
    constructor() {
        this.path = '/api/woo';
        this.router = express.Router();
        this.response = (_req, res) => __awaiter(this, void 0, void 0, function* () {
            const response = yield woocommerce.get('products');
            console.log(response.data);
            res.send('okay');
        });
        this.intializeRoutes();
    }
    intializeRoutes() {
        this.router.get(this.path, this.response);
    }
}
exports.default = WooCommerce;
//# sourceMappingURL=WooCommerce.js.map