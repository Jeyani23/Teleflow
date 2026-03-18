import React from "react";
import { Link } from "react-router-dom";

const Sidebar = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));
  const menu = [];

  if(user.role === "admin") menu.push({name:"Dashboard", path:"/admin"});
  else if(user.role === "customer") menu.push({name:"Dashboard", path:"/customer"});
  else menu.push({name:"Dashboard", path:"/agent"});

  const handleLogout = () => {
    localStorage.clear();
    window.location.href = "/login";
  }

  return (
    <div style={{ display:"flex" }}>
      <div style={{ width:"200px", backgroundColor:"#AACDDC", minHeight:"100vh", padding:"1rem" }}>
        <h3 style={{ color:"#81A6C6" }}>TeleFlow</h3>
        {menu.map(item => (
          <Link key={item.path} to={item.path} style={{ display:"block", margin:"1rem 0", color:"#000" }}>{item.name}</Link>
        ))}
        <button onClick={handleLogout} style={{ marginTop:"2rem", backgroundColor:"#F3E3D0", padding:"0.5rem", borderRadius:"4px" }}>Logout</button>
      </div>
      <div style={{ flex:1, padding:"1rem" }}>
        {children}
      </div>
    </div>
  );
};

export default Sidebar;