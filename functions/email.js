exports.handler = async function (event, context) {
  const sgMail = require('@sendgrid/mail');
  console.log('API key:', process.env.SENDGRID_API_KEY);
  console.log('Email address:', process.env.EMAIL_ADDRESS);

  sgMail.setApiKey(process.env.SENDGRID_API_KEY);

  const formData = JSON.parse(event.body);

  const msg = {
    to: process.env.EMAIL_ADDRESS, // Change to your recipient
    from: process.env.EMAIL_ADDRESS, // Change to your verified sender
    subject: `New Porfolio Message from ${formData.name}`,
    html: `<p>Name: ${formData.name}</p>
	<p>Email: ${formData.email}</p>
	<p>Message:${formData.message}</p>`,
  };

  console.log('Message:', msg);

  try {
    const res = await sgMail.send(msg);
    console.log(res);
    console.log('Email sent');
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: 'Email sent' }),
    };
  } catch (err) {
    console.log('Email not sent');
    return {
      statusCode: 200,
      body: JSON.stringify({ msg: 'Email not sent' }),
    };
  }
};
