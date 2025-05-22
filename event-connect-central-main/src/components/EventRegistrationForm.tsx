import React, { useState } from "react";

const EventRegistrationForm = ({ eventId }) => {
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const registrationData = {
      fullName,
      email,
      eventId,
    };

    try {
      const response = await fetch(`/api/registrations`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(registrationData),
      });

      if (!response.ok) {
        setMessage("Error registering user.");
        return;
      }

      setMessage("Registration successful!");
    } catch (error) {
      setMessage("Error registering user.");
      console.error("Registration error:", error);
    }
  };

  return (
    <div>
      <h2>Register for this event</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="fullName">Full Name:</label>
          <input
            type="text"
            id="fullName"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};
