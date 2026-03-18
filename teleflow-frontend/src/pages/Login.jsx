import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = ({ onLogin }) => {

const [email, setEmail] = useState("");
const [password, setPassword] = useState("");

const navigate = useNavigate();

const handleLogin = async (e) => {

e.preventDefault();

try{

const res = await axios.post(
  `${process.env.REACT_APP_API_URL}/api/auth/login`,
  {
    email,
    password
  }
);

const userData = res.data.user;

localStorage.setItem("token", res.data.token);
localStorage.setItem("user", JSON.stringify(userData));

onLogin?.(userData);

const role = userData.role;


if(role === "admin"){
navigate("/admin-dashboard");
}

else if(role === "customer"){
navigate("/customer");
}
else if (role === "networkAgent") navigate("/agent/network");
else if (role === "billingAgent") navigate("/agent/billing");
else if (role === "simAgent") navigate("/agent/sim");



}catch(err){

alert(err.response?.data?.message || "Invalid credentials");

}

};

return(

<div
style={{
display:"flex",
justifyContent:"center",
alignItems:"center",
height:"100vh",
backgroundColor:"#D2C4B4"
}}
>

<form
onSubmit={handleLogin}
style={{
padding:"2rem",
backgroundColor:"#F3E3D0",
borderRadius:"8px",
minWidth:"300px"
}}
>

<h2 style={{color:"#81A6C6"}}>
TeleFlow Login
</h2>

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
type="submit"
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

Login

</button>

<p style={{marginTop:"1rem",textAlign:"center"}}>

Don't have an account?{" "}

<Link
to="/register"
style={{color:"#81A6C6",fontWeight:"bold"}}
>

Register

</Link>

</p>

</form>

</div>

);

};

export default Login;
