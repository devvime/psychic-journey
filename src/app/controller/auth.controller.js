import container from "#root/container.js";
import { Get, Post } from "#root/main.js";

class AuthController {

  constructor() {
    Post('/auth/register', this.register);
    Post('/auth/login', this.login);
    Get('/auth/activate-account/:token', this.accountActivation);
  }

  async register(req, res) {
    const result = await container.service.AuthService.register(req.body);
    res.status(201).json(result);
  }

  async login(req, res) {
    const result = await container.service.AuthService.login(req.body);
    res.status(200).json(result);
  }

  async accountActivation(req, res) {
    const token = req.params.token;
    const result = await container.service.AuthService.accountActivation(token);
    res.send(result.template);
  }

}

export default new AuthController();