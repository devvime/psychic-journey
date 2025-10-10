import jwt from "jsonwebtoken";
import container from "#root/container.js";

export default async function SendActivationAccountEmail(user) {
  try {
    const activateAccountToken = jwt.sign(
      { email: user.email },
      process.env.SECRET_PASS,
      { expiresIn: '30m' }
    );
    const activationLink = `${process.env.APP_URL}/auth/activate-account/${activateAccountToken}`;

    const template = container.GetTemplate('account-activation', {
      username: user.name,
      activationLink,
      appName: process.env.SMTP_APP_NAME,
      year: new Date().getFullYear(),
      supportLink: process.env.SUPPORT_URL
    });

    await container.SendEmail(
      user.email,
      'Account activation',
      template
    );

    return {
      success: false,
      message: 'User is not active, access your email and activate your account.'
    }

  } catch (error) {
    throw new JsonError(error);
  }
}