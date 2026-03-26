import { MailtrapClient } from 'mailtrap';

const TOKEN = process.env.MAILTRAP_API_KEY;

const client = new MailtrapClient({
  token: TOKEN,
});

const sender = {
  email: "admin@kreonara.com",
  name: "Cashtrackr",
};
const recipients = [
  {
    email: "icoddes@gmail.com",
  }
];

client
  .send({
    from: sender,
    to: recipients,
    subject: "CashTrackr - Confirma tu cuenta",
    text: "Congrats for sending test email with Mailtrap!",
    category: "Integration Test",
    html: ``
  })
  .then(console.log, console.error);