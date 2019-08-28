import nodeMailer from "nodemailer";
import config from "./config";

export default (emailBody: any) =>
  new Promise((resolve, reject) => {
    nodeMailer.createTransport({
      service: config.email.service,
      auth: {
        user: config.email.emailUsername,
        pass: config.email.emailPassword
      }
    })
    .sendMail(emailBody, (error: any, info: any) => {
      if (error) {
        return reject(error);
      }

      resolve(info);
    });
  });
