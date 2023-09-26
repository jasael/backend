"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        lowercase: true,
        index: true,
        unique: true,
    },
    password: { type: String, required: true },
    fullName: { type: String, required: true },
    role: {
        type: String,
        required: true,
        enum: ["user", "admin"],
        default: "user",
    },
}, { timestamps: true, collection: "users" });
exports.UserModel = (0, mongoose_1.model)("User", UserSchema);
//# sourceMappingURL=user.model.js.map