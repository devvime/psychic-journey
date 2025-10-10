import container from "#root/container.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

class Login {

  async execute(data) {
    try {
      const { email, password } = data;
      const user = await container.repository.UserRepository.findByEmail(email);

      if (user === undefined) {
        throw new JsonError();
      }

      if (!user.active) {
        return await container.useCase.Auth.SendActivationAccountEmail(user);
      }

      const result = await bcrypt.compare(password, user.password);

      if (!result) {
        throw new JsonError();
      }

      const accessToken = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        process.env.SECRET_PASS
      );

      return { accessToken };

    } catch (error) {
      throw new JsonError('Invalid credentials');
    }
  }

}

export default new Login();