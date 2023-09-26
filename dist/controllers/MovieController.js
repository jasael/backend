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
const MovieService_1 = __importDefault(require("../services/MovieService"));
const movieService = new MovieService_1.default();
class MovieController {
    index(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const movies = yield movieService.index();
            res.json(movies);
        });
    }
    show(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { slug } = _req.params;
            const movie = yield movieService.show(slug);
            res.json(movie);
        });
    }
    create(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { title } = _req.body;
            const slug = title.toLowerCase().replace(/ /g, "-");
            const movieExists = yield movieService.show(slug);
            if (!!movieExists) {
                return res.status(400).json({ message: "Movie already exists" });
            }
            yield movieService.create({ title, slug });
            res.status(201).json();
        });
    }
    update(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { slug } = _req.params;
            const { title, slugChanged } = _req.body;
            const movieExists = movieService.show(slug);
            if (!movieExists) {
                return res.status(400).json({ message: "Movie does not exists" });
            }
            yield movieService.update(slug, { title, slug: slugChanged });
            res.status(200).json();
        });
    }
    delete(_req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { slug } = _req.params;
            const movieExists = movieService.show(slug);
            if (!movieExists) {
                return res.status(400).json({ message: "Movie does not exists" });
            }
            yield movieService.delete(slug);
            res.status(200).json();
        });
    }
}
exports.default = MovieController;
//# sourceMappingURL=MovieController.js.map