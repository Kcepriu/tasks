import nodemailer, { Transporter } from 'nodemailer';
import { FRONTEND_ROUTER_KEYS } from '../constants/app-keys.const';

interface IParamVerificate {
  email: string;
  verificationToken: string;
}

interface IParamResetPassword {
  email: string;
  resetPasswordToken: string;
}

interface IMailParams {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

class MailServices {
  private transporter: Transporter;

  constructor(private mailParams: IMailParams, private emailFrom: string, private baseUrl: string) {
    this.transporter = nodemailer.createTransport(mailParams);
  }

  sendVerificateToken = async ({ email, verificationToken }: IParamVerificate) => {
    const emailOptions = {
      from: this.emailFrom,
      to: email,
      subject: 'Veryfi email',
      html: `<a target="_blank" href="${this.baseUrl}${FRONTEND_ROUTER_KEYS.VERIFICATE_TOKEN}/${verificationToken}">Click verify email</a>`
    };

    try {
      await this.transporter.sendMail(emailOptions);
    } catch (error) {
      return false;
    }
  };

  sendResetPasswordToken = async ({ email, resetPasswordToken }: IParamResetPassword) => {
    const emailOptions = {
      from: this.emailFrom,
      to: email,
      subject: 'Reset password',
      html: `<a target="_blank" href="${this.baseUrl}${FRONTEND_ROUTER_KEYS.RESET_TOKEN}/${resetPasswordToken}">Click reset password</a>`
    };

    try {
      await this.transporter.sendMail(emailOptions);
    } catch (error) {
      return false;
    }
  };
}

const {
  SMTP_SERVER = '',
  SMTP_PORT = 25,
  SMTP_SECURE = false,
  EMAIL_FROM = '',
  SMTP_USER = '',
  SMTP_PASSWORD = '',
  BASE_URL_FRONTEND = ''
} = process.env;

const mailServices = new MailServices(
  {
    host: SMTP_SERVER,
    port: Number(SMTP_PORT),
    secure: Boolean(SMTP_SECURE),
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASSWORD
    }
  },
  EMAIL_FROM,
  BASE_URL_FRONTEND
);

export default mailServices;
