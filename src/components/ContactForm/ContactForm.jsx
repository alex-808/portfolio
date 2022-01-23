import { React, useState } from 'react';
import DOMPurify from 'dompurify';
import axios from 'axios';
import './index.css';

const sanitizeFormData = (formData) => {
  const sanitized = {};
  for (let [key, value] of Object.entries(formData)) {
    sanitized[key] = DOMPurify.sanitize(value);
  }
  return sanitized;
};

const validateEmail = (string) => {
  const regex = /\S+@\S+\.\S+/;
  return regex.test(string);
};

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [messageSent, setMessageSent] = useState(false);
  const [formErrorMsg, setFormErrorMsg] = useState('');

  const dispatchEmail = async (e) => {
    e.preventDefault();
    const isValidEmail = validateEmail(formData.email);

    if (!isValidEmail) {
      setFormErrorMsg('Invalid Email');
      return;
    }

    const sanitized = sanitizeFormData(formData);

    setMessageSent(true);

    try {
      const res = await axios.post('.netlify/functions/email', sanitized);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
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
          type="email"
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
      <div>{formErrorMsg}</div>
    </form>
  );
};

export { ContactForm, sanitizeFormData, validateEmail };
