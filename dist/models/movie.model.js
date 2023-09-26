"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MovieModel = void 0;
const mongoose_1 = require("mongoose");
const MovieSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
    },
    slug: { type: String, required: true, index: true, unique: true },
}, {
    timestamps: true,
    collection: "movies",
});
exports.MovieModel = (0, mongoose_1.model)("Movie", MovieSchema);
//# sourceMappingURL=movie.model.js.map