import bcrypt from "bcrypt";
import { UserModel } from "../models/user.model";
import jwt from "jsonwebtoken";

export default class AuthService {
  async register({
    fullName,
    username,
    password,
  }: {
    fullName: string;
    username: string;
    password: string;
  }) {
    const passwordHashed = await this.generateHash(password);
    const newUser = new UserModel({
      fullName,
      username,
      password: passwordHashed,
    });
    await newUser.save();

    return;
  }

  async login({
    _id,
    username,
    role,
  }: {
    _id: string;
    username: string;
    role: string;
  }) {
    const token = await this.generateToken({
      _id,
      username,
      role,
    });

    return token;
  }

  logout() {}

  refresh() {}

  async compareData(data: string, hash: string) {
    return await bcrypt.compare(data, hash);
  }

  async generateHash(data: string) {
    return await bcrypt.hash(data, 10);
  }

  async generateToken({
    _id,
    username,
    role,
  }: {
    _id: string;
    username: string;
    role: string;
  }) {
    return jwt.sign(
      {
        _id,
        username,
        role,
      },
      process.env.JWT_SECRET as string,
      {
        expiresIn: "1h",
      }
    );
  }

  async decodeToken(token: string) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET as string);
      return decoded;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
}
