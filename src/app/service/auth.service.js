import container from "#root/container.js";

class AuthService {

  async register(data) {
    try {
      const user = container.schema.CreateUser.parse(data);
      const result = await container.useCase.Auth.Register.execute(user);
      return result;
    } catch (error) {
      throw new JsonError(error);
    }
  }

  async login(data) {
    try {
      const user = container.schema.UserLogin.parse(data);
      const result = await container.useCase.Auth.Login.execute(user);
      return result;
    } catch (error) {
      throw new JsonError(error);
    }
  }

  async accountActivation(token) {
    const result = await container.useCase.Auth.AccountActivation.execute(token);

    if (result.success) {
      const template = container.GetTemplate('account-activated', {
        userName: result.userName
      });

      return { template };
    }

    const template = container.GetTemplate('invalid-token');

    return { template };
  }

}

export default new AuthService();