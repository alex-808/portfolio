import { React, useState } from 'react';
import axios from 'axios';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const dispatchEmail = async (e, msg) => {
    e.preventDefault();

    console.log(formData);
    const res = await axios.post('.netlify/functions/email', formData);

    console.log(res);
  };

  const updateFormData = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <form onSubmit={dispatchEmail} onChange={updateFormData}>
      <label>
        Name:
        <input type="text" defaultValue={formData.name} name="name" />
      </label>
      <label>
        Email:
        <input type="text" defaultValue={formData.email} name="email" />
      </label>
      <label>
        Message:
        <input type="textarea" defaultValue={formData.message} name="message" />
      </label>
      <input type="submit" value="Submit" />
    </form>
  );
};

export { ContactForm };
