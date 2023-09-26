import { Request, Response } from "express";
import AuthService from "../services/AuthService";
import UserService from "../services/UserService";

const authService = new AuthService();
const userService = new UserService();

export default class AuthController {
  async register(req: Request, res: Response) {
    const { fullName, username, password } = req.body;

    const userExists = await userService.show(username);

    if (!!userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    await authService.register({
      fullName,
      username,
      password,
    });

    res.status(201).json();
  }

  async login(req: Request, res: Response) {
    const { username, password } = req.body;

    const userExists = await userService.show(username);

    if (!userExists) {
      return res.status(400).json({ message: "User does not exists" });
    }

    const isPasswordValid = await authService.compareData(
      password,
      userExists.password
    );

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid password" });
    }

    const token = await authService.login({
      _id: userExists._id.toString(),
      username: userExists.username,
      role: userExists.role,
    });

    res.status(201).json({ token });
  }

  logout(_req: Request, res: Response) {
    authService.logout();
    res.json({ message: "logout" });
  }

  refresh(_req: Request, res: Response) {
    authService.refresh();
    res.json({ message: "refresh" });
  }
}
