import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

transporter.verify()
  .then(() => console.log('SMTP connected successfully'))
  .catch(err => console.error('Error connecting to SMTP:', err));

export async function sendEmail(to, subject, html = '') {
  return await transporter.sendMail({
    from: `"${process.env.SMTP_APP_NAME}" <${process.env.SMTP_USER}>`,
    to,
    subject,
    html,
  });
}
