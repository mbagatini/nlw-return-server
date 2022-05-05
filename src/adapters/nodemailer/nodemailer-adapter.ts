import nodemailer from "nodemailer";

import { MailAdapter, SendMailData } from "../mail-adapter";

export const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "426dedccf13946",
    pass: "be7196b7271da1",
  },
});

export class NodemailerAdapter implements MailAdapter {
  async sendMail({ subject, body }: SendMailData) {
    await transport.sendMail({
      from: "Equipe Feedget <noreply@feedget.com>",
      to: "Morgs <morganabagatini@gmail.com>",
      subject,
      html: body,
    });
  }
}
