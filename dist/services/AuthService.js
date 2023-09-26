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
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_model_1 = require("../models/user.model");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
class AuthService {
    register({ fullName, username, password, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const passwordHashed = yield this.generateHash(password);
            const newUser = new user_model_1.UserModel({
                fullName,
                username,
                password: passwordHashed,
            });
            yield newUser.save();
            return;
        });
    }
    login({ _id, username, role, }) {
        return __awaiter(this, void 0, void 0, function* () {
            const token = yield this.generateToken({
                _id,
                username,
                role,
            });
            return token;
        });
    }
    logout() { }
    refresh() { }
    compareData(data, hash) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.compare(data, hash);
        });
    }
    generateHash(data) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield bcrypt_1.default.hash(data, 10);
        });
    }
    generateToken({ _id, username, role, }) {
        return __awaiter(this, void 0, void 0, function* () {
            return jsonwebtoken_1.default.sign({
                _id,
                username,
                role,
            }, process.env.JWT_SECRET, {
                expiresIn: "1h",
            });
        });
    }
    decodeToken(token) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                return decoded;
            }
            catch (error) {
                console.log(error);
                return null;
            }
        });
    }
}
exports.default = AuthService;
//# sourceMappingURL=AuthService.js.map