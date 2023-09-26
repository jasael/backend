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
const UserService_1 = __importDefault(require("../services/UserService"));
const userService = new UserService_1.default();
class UserController {
    index(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const users = yield userService.index();
            res.json(users);
        });
    }
    show(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = _req.params;
            const user = yield userService.show(username);
            res.json(user);
        });
    }
    create(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { fullName, username, password } = _req.body;
            const userExists = yield userService.show(username);
            if (!!userExists) {
                return res.status(400).json({ message: "User already exists" });
            }
            yield userService.create({
                fullName,
                username,
                password,
            });
            res.status(201).json();
        });
    }
    update(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = _req.params;
            const { fullName, username: usernameChanged } = _req.body;
            const userExists = yield userService.show(username);
            if (!userExists) {
                return res.status(400).json({ message: "User does not exists" });
            }
            yield userService.update(username, { fullName, username: usernameChanged });
            res.status(200).json();
        });
    }
    delete(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { username } = _req.params;
            const userExists = yield userService.show(username);
            if (!userExists) {
                return res.status(400).json({ message: "User does not exists" });
            }
            yield userService.delete(username);
            res.status(200).json();
        });
    }
}
exports.default = UserController;
//# sourceMappingURL=UserController.js.map