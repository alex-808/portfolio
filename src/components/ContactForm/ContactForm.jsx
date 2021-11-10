import { React, useState } from 'react';
import axios from 'axios';
import './index.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const [messageSent, setMessageSent] = useState(false);

  const dispatchEmail = async (e, msg) => {
    e.preventDefault();
    setMessageSent(true);

    console.log(formData);
    const res = await axios.post('.netlify/functions/email', formData);

    console.log(res);
  };

  const updateFormData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  if (messageSent) {
    return (
      <div className="message-sent contact-form">
        <h1>Message sent!</h1>
        Thank you, I will get back to you soon.
      </div>
    );
  }

  return (
    <form
      className="contact-form"
      onSubmit={dispatchEmail}
      onChange={updateFormData}
    >
      <h2>Contact Form</h2>
      <label>
        Name:
        <input
          type="text"
          defaultValue={formData.name}
          name="name"
          placeholder="Jamie Smith"
        />
      </label>
      <label>
        Email:
        <input
          type="text"
          defaultValue={formData.email}
          name="email"
          placeholder="jamiesmith@gmail.com"
          required
        />
      </label>
      <label>
        <div> Message:</div>
        <textarea
          type="textarea"
          defaultValue={formData.message}
          name="message"
          placeholder="I like your site!"
          required
        />
      </label>
      <input className="submit-btn" type="submit" value="Submit" />
    </form>
  );
};

export { ContactForm };
