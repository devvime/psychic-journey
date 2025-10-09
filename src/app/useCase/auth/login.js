import container from "#root/container.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendActivationAccountEmail } from "./sendActivationAccountEmail.js";

class Login {

  async execute(data) {
    try {
      const { email, password } = data;
      const user = await container.repository.UserRepository.findByEmail(email);

      if (user === undefined) {
        throw new Error();
      }

      if (!user.active) {
        return await sendActivationAccountEmail(user);
      }

      const result = await bcrypt.compare(password, user.password);

      if (!result) {
        throw new Error();
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
      throw new Error(error);
    }
  }

}

export default new Login();