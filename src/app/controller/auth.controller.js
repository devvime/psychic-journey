import container from "#root/container.js";
import { Post } from "#root/main.js";

class AuthController {

  constructor() {
    Post('/auth/register', this.register);
    Post('/auth/login', this.login);
  }

  async register(req, res) {
    const result = await container.service.AuthService.register(req.body);
    res.status(201).json(result);
  }

  async login(req, res) {
    const result = await container.service.AuthService.login(req.body);
    res.status(200).json(result);
  }

}

export default new AuthController();