import container from "#root/container.js";
import { Get } from "#root/main.js";

class UserController {

  constructor() {
    Get('/user', this.list);
  }

  list(req, res) {
    const result = container.UserService.execute();
    res.json(result);
  }

}

export default new UserController;