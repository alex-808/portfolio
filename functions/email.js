exports.handler = async function (event, context) {
  const sgMail = require('@sendgrid/mail');
  console.log('API key:', process.env.SENDGRID_API_KEY);
  console.log('Email address:', process.env.EMAIL_ADDRESS);
  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const msg = {
    to: process.env.EMAIL_ADDRESS, // Change to your recipient
    from: process.env.EMAIL_ADDRESS, // Change to your verified sender
    subject: 'Hello from the other side',
    text: "It's working",
    html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  };
  console.log('worked');
  sgMail
    .send(msg)
    .then(() => {
      console.log('Email sent');
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Email Sent' }),
      };
    })
    .catch((error) => {
      console.error(error);
      console.log('Email not sent');
      return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Email Not Sent' }),
      };
    });
};
