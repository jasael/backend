import { UserModel } from "../models/user.model";

export default class UserService {
  async index() {
    return await UserModel.find();
  }

  async show(username: string) {
    return await UserModel.findOne({ username });
  }

  async create(createUserDto: any) {
    return await UserModel.create(createUserDto);
  }

  async update(username: string, updateUserDto: any) {
    return await UserModel.updateOne({ username }, updateUserDto);
  }

  async delete(username: string) {
    return await UserModel.deleteOne({ username });
  }
}
