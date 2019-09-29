import nodeMailer from "nodemailer";
import smtpTransport from "nodemailer-smtp-transport";
import config from "./config";

export default (emailBody: any) =>
  new Promise((resolve, reject) => {
    nodeMailer.createTransport(smtpTransport({
      service: config.email.service,
      auth: {
        user: config.email.emailUsername,
        pass: config.email.emailPassword
      }
    }))
      .sendMail(emailBody, (error: any, info: any) => {
        if (error) {
          return reject(error);
        }

        return resolve(info);
      });
  });
