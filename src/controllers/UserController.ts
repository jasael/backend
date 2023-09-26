import { Request, Response } from "express";
import UserService from "../services/UserService";

const userService = new UserService();

export default class UserController {
  async index(_req: Request, res: Response) {
    const users = await userService.index();

    res.json(users);
  }

  async show(_req: Request, res: Response) {
    const { username } = _req.params;

    const user = await userService.show(username);

    res.json(user);
  }

  async create(_req: Request, res: Response) {
    const { fullName, username, password } = _req.body;

    const userExists = await userService.show(username);

    if (!!userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    await userService.create({
      fullName,
      username,
      password,
    });

    res.status(201).json();
  }

  async update(_req: Request, res: Response) {
    const { username } = _req.params;
    const { fullName, username: usernameChanged } = _req.body;

    const userExists = await userService.show(username);

    if (!userExists) {
      return res.status(400).json({ message: "User does not exists" });
    }

    await userService.update(username, { fullName, username: usernameChanged });

    res.status(200).json();
  }

  async delete(_req: Request, res: Response) {
    const { username } = _req.params;

    const userExists = await userService.show(username);

    if (!userExists) {
      return res.status(400).json({ message: "User does not exists" });
    }

    await userService.delete(username);

    res.status(200).json();
  }
}
