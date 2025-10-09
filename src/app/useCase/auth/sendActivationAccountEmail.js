import jwt from "jsonwebtoken";
import { sendEmail } from "#shared/mailer.js";
import { getTemplate } from "#root/app/shared/template.js";

export async function sendActivationAccountEmail(user) {
  try {
    const activateAccountToken = jwt.sign({ email: user.email }, process.env.SECRET_PASS);
    const activationLink = `${process.env.APP_URL}/auth/activate-account/${activateAccountToken}`;

    const template = getTemplate('account-activation', {
      username: user.name,
      activationLink,
      appName: process.env.SMTP_APP_NAME,
      year: new Date().getFullYear(),
      supportLink: process.env.SUPPORT_URL
    });

    await sendEmail(
      user.email,
      'Account activation',
      template
    );

    return {
      error: true,
      message: 'User is not active, access your email and activate your account.'
    }

  } catch (error) {
    throw new Error(error);
  }
}