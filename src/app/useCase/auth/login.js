import container from "#root/container.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { sendEmail } from "#shared/mailer.js";

class Login {

  async execute(data) {
    try {
      const { email, password } = data;
      const user = await container.repository.UserRepository.findByEmail(email);

      if (user === undefined) {
        throw new Error();
      }

      if (!user.active) {
        await sendEmail(user.email, 'Account activation', 'Test...');
        return {
          error: true,
          message: 'User is not active, access your email and activate your account.'
        }
      }

      const result = await bcrypt.compare(password, user.password);

      if (!result) {
        throw new Error();
      }

      const token = jwt.sign(
        {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
        process.env.SECRET_PASS
      );

      return { token };
    } catch (error) {
      throw new Error(error);
    }
  }

}

export default new Login();