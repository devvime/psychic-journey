import container from "#root/container.js";
import bcrypt from "bcrypt";

class Register {

  async execute(data) {
    try {
      const user = await container.repository.UserRepository.findByEmail(data.email);

      if (user !== undefined) {
        throw new Error('User is already registered.')
      }

      data.password = await bcrypt.hash(data.password, 10);

      const result = await container.repository.UserRepository.create(data);

      return {
        success: true,
        message: 'User registered successfully.',
        userId: result[0]
      }
    } catch (error) {
      throw new Error(error);
    }
  }

}

export default new Register();