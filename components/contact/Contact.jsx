"use client";

import { useState, useRef, useEffect } from "react";
import ReCAPTCHA from "react-google-recaptcha";

export default function Contact() {
  const [captchaToken, setCaptchaToken] = useState(null);
  const [isButtonEnabled, setIsButtonEnabled] = useState(false);
  const recaptchaRef = useRef(null);
  const buttonRef = useRef(null);

  const generateToken = (token) => {
    let secret = "";
    for (let i = 0; i < token.length; i++) {
      secret += String.fromCharCode(token.charCodeAt(i) ^ ((i + 7) % 13 + 17));
    }
    return secret + Date.now().toString().slice(-4);
  };

  const verifyToken = (generated) => {
    return /\d{4}$/.test(generated);
  };

  const handleCaptchaChange = (token) => {
    if (token) {
      const generated = generateToken(token);
      if (verifyToken(generated)) {
        setCaptchaToken(generated);
        setIsButtonEnabled(true);
      } else {
        setCaptchaToken(null);
        setIsButtonEnabled(false);
      }
    } else {
      setCaptchaToken(null);
      setIsButtonEnabled(false);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (!captchaToken || !verifyToken(captchaToken)) {
        if (buttonRef.current && !buttonRef.current.disabled) {
          buttonRef.current.disabled = true;
          setIsButtonEnabled(false);
        }
      }
    }, 100);

    return () => clearInterval(interval);
  }, [captchaToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.currentTarget;

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const phone = form.phone.value.trim();
    const message = form.message.value.trim();

    if (!name || !email || !message) {
      alert("Name, Email, and Message are required!");
      return;
    }

    if (!captchaToken || !isButtonEnabled || !verifyToken(captchaToken)) {
      alert("CAPTCHA validation failed! Solve it properly.");
      return;
    }

    const payload = { name, email, phone, message };

    try {
      const response = await fetch("https://script.google.com/macros/s/AKfycbzEwO800dnn50PD0rDeWptrU3DfTUeJY4MwiGwjbYDSky99kDuBK18RQib8CDdCLs5J/exec", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: { "Content-Type": "application/json" },
      });

      const result = await response.json();
      if (result.status === "success") {
        alert("Form submitted successfully!");
        form.reset();
        recaptchaRef.current?.reset();
        setCaptchaToken(null);
        setIsButtonEnabled(false);
      } else {
        alert("Failed to submit form: " + result.message);
      }
    } catch (err) {
      console.error(err);
      alert("Error submitting form");
    }
  };

  return (
    <form className="form-contact" onSubmit={handleSubmit}>
      <div className="wrap">
        <div className="tf-grid-layout md-col-2 mb_20">
          <fieldset>
            <label htmlFor="name" className="text-body-1 mb_8 text_on-surface-color">
              Full Name *
            </label>
            <input id="name" type="text" placeholder="Your Name" name="name" required />
          </fieldset>
          <fieldset>
            <label htmlFor="email" className="text-body-1 mb_8 text_on-surface-color">
              Email *
            </label>
            <input id="email" type="email" placeholder="Your Email" name="email" required />
          </fieldset>
        </div>

        <fieldset>
          <label htmlFor="phone" className="text-body-1 mb_8 text_on-surface-color">
            Phone (Optional)
          </label>
          <input id="phone" type="text" placeholder="Phone" name="phone" />
        </fieldset>

        <fieldset>
          <label htmlFor="message" className="text-body-1 mb_12 text_on-surface-color">
            Message *
          </label>
          <textarea id="message" rows={4} placeholder="Write your message" name="message" required />
        </fieldset>

        <div className="captcha-container mb_20">
          <ReCAPTCHA
            sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}
            onChange={handleCaptchaChange}
            ref={recaptchaRef}
          />
        </div>
      </div>

      <div className="button-submit">
        <button
          ref={buttonRef}
          className="tf-btn animate-hover-btn btn-switch-text"
          type="submit"
          disabled={!isButtonEnabled}
        >
          Send Message
        </button>
      </div>
    </form>
  );
}
