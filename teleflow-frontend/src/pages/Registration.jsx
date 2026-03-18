import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Registration = () => {

const [name, setName] = useState("");
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const navigate = useNavigate();

const handleRegister = async (e) => {

e.preventDefault();

try {

await axios.post(
"http://localhost:5000/api/auth/register",
{
name,
email,
password
}
);

alert("Registration successful!");

navigate("/");

} catch (err) {

console.error(err);

alert(err.response?.data?.message || "Registration failed");

}

};

return (

<div
style={{
display:"flex",
justifyContent:"center",
alignItems:"center",
height:"100vh",
backgroundColor:"#D2C4B4"
}}
>

<div
style={{
padding:"2rem",
backgroundColor:"#F3E3D0",
borderRadius:"8px",
minWidth:"300px"
}}
>

<h2 style={{color:"#81A6C6"}}>
TeleFlow Registration
</h2>

<input
type="text"
placeholder="Full Name"
value={name}
onChange={(e)=>setName(e.target.value)}
style={{width:"100%",margin:"0.5rem 0"}}
/>

<input
type="email"
placeholder="Email"
value={email}
onChange={(e)=>setEmail(e.target.value)}
style={{width:"100%",margin:"0.5rem 0"}}
/>

<input
type="password"
placeholder="Password"
value={password}
onChange={(e)=>setPassword(e.target.value)}
style={{width:"100%",margin:"0.5rem 0"}}
/>

<button
onClick={handleRegister}
style={{
backgroundColor:"#81A6C6",
color:"#fff",
padding:"0.5rem 1rem",
width:"100%",
marginTop:"1rem",
borderRadius:"4px",
border:"none",
cursor:"pointer"
}}
>

Register

</button>

</div>

</div>

);

};

export default Registration;