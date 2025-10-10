/* controller */
import AuthController from "#app/controller/auth.controller.js";
import UserController from "#root/app/controller/user.controller.js";
/* service */
import AuthService from "#app/service/auth.service.js";
import UserService from "#root/app/service/user.service.js";
/* repository */
import UserRepository from "#app/repository/user.repository.js";
/* useCase */
import Register from "#app/useCase/auth/register.js";
import Login from "#app/useCase/auth/login.js";
import SendActivationAccountEmail from "#app/useCase/auth/sendActivationAccountEmail.js";
import AccountActivation from "#app/useCase/auth/activateAccount.js";
/* schema */
import { CreateUser } from "#app/schema/user/create.schema.js";
import { UserLogin } from "#app/schema/user/login.schema.js";

/* shared */
import { GetTemplate } from "#app/shared/template.js";
import { SendEmail } from "#app/shared/mailer.js";

export default {
  controller: {
    AuthController,
    UserController,
  },
  service: {
    AuthService,
    UserService,
  },
  repository: {
    UserRepository,
  },
  useCase: {
    Auth: {
      Register,
      Login,
      SendActivationAccountEmail,
      AccountActivation
    }
  },
  schema: {
    CreateUser,
    UserLogin
  },
  GetTemplate,
  SendEmail
};
