import { Request, Response } from "express";
import MovieService from "../services/MovieService";

const movieService = new MovieService();

export default class MovieController {
  async index(_req: Request, res: Response) {
    const movies = await movieService.index();

    res.json(movies);
  }

  async show(_req: Request, res: Response) {
    const { slug } = _req.params;

    const movie = await movieService.show(slug);

    res.json(movie);
  }

  async create(_req: Request, res: Response) {
    const { title } = _req.body;
    const slug = title.toLowerCase().replace(/ /g, "-");

    const movieExists = await movieService.show(slug);

    if (!!movieExists) {
      return res.status(400).json({ message: "Movie already exists" });
    }

    await movieService.create({ title, slug });

    res.status(201).json();
  }

  async update(_req: Request, res: Response) {
    const { slug } = _req.params;
    const { title, slugChanged } = _req.body;

    const movieExists = movieService.show(slug);

    if (!movieExists) {
      return res.status(400).json({ message: "Movie does not exists" });
    }

    await movieService.update(slug, { title, slug: slugChanged });

    res.status(200).json();
  }

  async delete(_req: Request, res: Response) {
    const { slug } = _req.params;

    const movieExists = movieService.show(slug);

    if (!movieExists) {
      return res.status(400).json({ message: "Movie does not exists" });
    }

    await movieService.delete(slug);

    res.status(200).json();
  }
}
