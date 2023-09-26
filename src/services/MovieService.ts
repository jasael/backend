import { MovieModel } from "../models/movie.model";
export default class MovieService {
  async index() {
    return await MovieModel.find();
  }

  async show(slug: string) {
    return await MovieModel.findOne({ slug });
  }

  async create({ slug, title }: { slug: string; title: string }) {
    return await MovieModel.create({ slug, title });
  }

  async update(id: string, { slug, title }: { slug?: string; title?: string }) {
    return await MovieModel.updateOne({ slug: id }, { slug, title });
  }

  async delete(slug: string) {
    return await MovieModel.deleteOne({ slug });
  }
}
