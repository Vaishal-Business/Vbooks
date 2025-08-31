"use client";

import axios from "axios";
import { useState } from "react";

export default function NewsLetterForm() {
  const [success, setSuccess] = useState(true);
  const [showMessage, setShowMessage] = useState(false);
  const handleShowMessage = () => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 2000);
  };
  const sendEmail = async (e) => {
    e.preventDefault(); // Prevent default form submission behavior
    const email = e.target.email.value;

    try {
      const response = await axios.post(
        "https://express-brevomail.vercel.app/api/contacts",
        {
          email,
        }
      );

      if ([200, 201].includes(response.status)) {
        e.target.reset(); // Reset the form
        setSuccess(true); // Set success state
        handleShowMessage();
      } else {
        console.log(response);
        setSuccess(false); // Handle unexpected responses
        handleShowMessage();
      }
    } catch (error) {
      console.error("Error:", error || "An error occurred");
      setSuccess(false); // Set error state
      handleShowMessage();
      e.target.reset(); // Reset the form
    }
  };
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        sendEmail(e);
      }}
      className="form-newslate mb_20"
    >
      <div className="position-relative">
        <fieldset className="fieldset-item">
          <input
            type="email"
            placeholder="E-mail"
            name="email"
            aria-required="true"
            required
          />
        </fieldset>
        <div className="box-btn">
          <button
            id="subscribe-button"
            type="submit"
            className="btn-submit animate-hover-btn"
          >
            <span className="icon-PaperPlaneTilt" />
          </button>
        </div>
      </div>

      <div
        className={`tfSubscribeMsg  footer-sub-element ${
          showMessage ? "active" : ""
        }`}
      >
        {success ? (
          <p style={{ color: "rgb(52, 168, 83)" }}>
            You have successfully subscribed.
          </p>
        ) : (
          <p style={{ color: "red" }}>Something went wrong</p>
        )}
      </div>
    </form>
  );
}
