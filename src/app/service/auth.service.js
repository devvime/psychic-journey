import { User } from "#app/schema/user.schema.js";

class AuthService {

  async register(data) {
    try {
      const user = User.parse(data);
      return user;
    } catch (error) {
      return { error }
    }
  }

}

export default new AuthService();