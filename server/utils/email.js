import { Resend } from "resend";
import config from "../config/config.js";

const resend = new Resend(config.resendEmailApiKey);

// resend.emails.send({
//   from: "onboarding@resend.dev",
//   to: "bjmagar418@gmail.com",
//   subject: "Hello World",
//   html: "<p>Congrats on sending your <strong>first email</strong>!</p>",
// });
//domain should be registered in resend 

const sendEmail = ({ recipient, subject, html }) => {
  resend.emails.send({
    from: "onboarding@resend.dev",
    to: recipient,
    subject,
    html,
  });
};

export default sendEmail;
