import container from "#root/container.js";
import { Post } from "#root/main.js";

class AuthController {

  constructor() {
    Post('/auth/register', this.register);
  }

  async register(req, res) {
    const result = await container.AuthService.register(req.body);
    res.status(201).json(result);
  }

}

export default new AuthController();