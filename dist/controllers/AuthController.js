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
const AuthService_1 = __importDefault(require("../services/AuthService"));
const UserService_1 = __importDefault(require("../services/UserService"));
const authService = new AuthService_1.default();
const userService = new UserService_1.default();
class AuthController {
    register(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fullName, username, password } = req.body;
            const userExists = yield userService.show(username);
            if (!!userExists) {
                return res.status(400).json({ message: "User already exists" });
            }
            yield authService.register({
                fullName,
                username,
                password,
            });
            res.status(201).json();
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username, password } = req.body;
            const userExists = yield userService.show(username);
            if (!userExists) {
                return res.status(400).json({ message: "User does not exists" });
            }
            const isPasswordValid = yield authService.compareData(password, userExists.password);
            if (!isPasswordValid) {
                return res.status(400).json({ message: "Invalid password" });
            }
            const token = yield authService.login({
                _id: userExists._id.toString(),
                username: userExists.username,
                role: userExists.role,
            });
            res.status(201).json({ token });
        });
    }
    logout(_req, res) {
        authService.logout();
        res.json({ message: "logout" });
    }
    refresh(_req, res) {
        authService.refresh();
        res.json({ message: "refresh" });
    }
}
exports.default = AuthController;
//# sourceMappingURL=AuthController.js.map