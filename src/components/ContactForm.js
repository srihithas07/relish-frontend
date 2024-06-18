import React, { useState } from "react";
import './contact.css';

const FORM_ENDPOINT = "https://herotofu.com/start"; // TODO - update to the correct endpoint

const ContactForm = () => {
  const [submitted, setSubmitted] = useState(false);
  const handleSubmit = (e) => {
    e.preventDefault();

    const inputs = e.target.elements;
    const data = {};

    for (let i = 0; i < inputs.length; i++) {
      if (inputs[i].name) {
        data[inputs[i].name] = inputs[i].value;
      }
    }

    fetch(FORM_ENDPOINT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Form response was not ok');
        }

        setSubmitted(true);
      })
      .catch((err) => {
        // Submit the form manually
        e.target.submit();
      });
  };

  if (submitted) {
    return (
      <>
        <h2>Thank you!</h2>
        <div>We'll be in touch soon.</div>
      </>
    );
  }

  return (
    <div>
      <h2>Contact Us</h2>
      <p>
        For reservations or inquiries, please feel free to contact us through
        the following options:
      </p>
      <ul>
        <li>
          <strong>Email:</strong>{" "}
          <a href="mailto:info@example.com">info@example.com</a>
        </li>
        <li>
          <strong>Phone:</strong> <a href="tel:+1234567890">+1 (234) 567-890</a>
        </li>
      </ul>

      <p>
        We look forward to serving you and making your dining experience
        memorable!
      </p>
      <div className="cnt">
        <div
          className="form"
          action={FORM_ENDPOINT}
          onSubmit={handleSubmit}
          method="POST"
        >
          <div>
            <input type="text" placeholder="Your name" name="name" required />
          </div>
          <div>
            <input type="email" placeholder="Email" name="email" required />
          </div>
          <div>
            <textarea placeholder="Your message" name="message" required />
          </div>
          <div>
            <button type="submit"> Send a message </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactForm;