import container from "#root/container.js";

class AuthService {

  async register(data) {
    try {
      const user = container.schema.CreateUser.parse(data);
      const result = await container.useCase.Register.execute(user);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

  async login(data) {
    try {
      const user = container.schema.UserLogin.parse(data);
      const result = await container.useCase.Login.execute(user);
      return result;
    } catch (error) {
      throw new Error(error);
    }
  }

}

export default new AuthService();