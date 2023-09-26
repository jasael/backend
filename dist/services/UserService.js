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
Object.defineProperty(exports, "__esModule", { value: true });
const user_model_1 = require("../models/user.model");
class UserService {
    index() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.UserModel.find();
        });
    }
    show(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.UserModel.findOne({ username });
        });
    }
    create(createUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.UserModel.create(createUserDto);
        });
    }
    update(username, updateUserDto) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.UserModel.updateOne({ username }, updateUserDto);
        });
    }
    delete(username) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.UserModel.deleteOne({ username });
        });
    }
}
exports.default = UserService;
//# sourceMappingURL=UserService.js.map