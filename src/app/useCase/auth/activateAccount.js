import container from "#root/container.js";
import jwt from "jsonwebtoken";

class AccountActivation {

  async execute(token) {
    try {
      const decoded = jwt.verify(token, process.env.SECRET_PASS);
      const email = decoded.email;
      const user = await container.repository.UserRepository.findByEmail(email);

      if (user === undefined) {
        throw new JsonError();
      }

      if (!user.active) {
        await container.repository.UserRepository.update(user.id, {
          active: true
        });
      }

      return {
        success: true,
        message: "Account activated successfully.",
        userName: user.name
      }
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: "Invalid token"
      }
    }
  }

}

export default new AccountActivation();