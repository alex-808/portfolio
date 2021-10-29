exports.handler = async function (event, context) {
  const sgMail = require('@sendgrid/mail');
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: process.env.EMAIL_ADDRESS, // Change to your recipient
    from: process.env.EMAIL_ADDRESS, // Change to your verified sender
    subject: 'Hello from the other side',
    text: "It's working",
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
    })
    .catch((error) => {
      console.error(error);
    });
  console.log('worked');
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'Hello World' }),
  };
};
