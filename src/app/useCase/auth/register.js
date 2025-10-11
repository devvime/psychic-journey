import container from "#root/container.js";
import bcrypt from "bcrypt";

class Register {

  async execute(data) {
    try {
      const user = await container.repository.UserRepository.findByEmail(data.email);

      if (user !== undefined) {
        throw new Error();
      }

      data.password = await bcrypt.hash(data.password, 10);

      const result = await container.repository.UserRepository.create(data);

      await container.useCase.Auth.SendActivationAccountEmail({
        name: data.name,
        email: data.email
      });

      return {
        success: true,
        message: 'User registered successfully, access your email and activate your account.'
      }
    } catch (error) {
      console.log(error);
      throw new JsonError('User is already registered.');
    }
  }

}

export default new Register();