import React from "react";

const Home = ({ user }) => {
  return (
    <div>
      <h1 style={{ color: "#81A6C6" }}>Welcome to TeleFlow, {user.name}!</h1>
      <p>This is your customer homepage. You can view tickets, create new tickets, and update your profile from the sidebar.</p>
    </div>
  );
};

export default Home;