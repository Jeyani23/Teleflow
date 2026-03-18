import React, { useState } from "react";
import { createTicket } from "../api/ticketApi";

function CreateTicket() {

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newTicket = {
      title,
      description,
      status: "Open"
    };

    try {
      await createTicket(newTicket);
      alert("Ticket Created Successfully 🎉");
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("Error creating ticket:", error);
    }
  };

  return (
    <div>
      <h2>Create Ticket</h2>

      <form onSubmit={handleSubmit}>

        <input
          type="text"
          placeholder="Ticket Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          placeholder="Ticket Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />

        <button type="submit">Submit Ticket</button>

      </form>
    </div>
  );
}

export default CreateTicket;