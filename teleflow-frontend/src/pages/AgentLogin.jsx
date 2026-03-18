import { useState } from "react";
import { useNavigate } from "react-router-dom";

function AgentLogin() {

const [team,setTeam] = useState("");
const navigate = useNavigate();

const handleLogin = () => {

if(!team){
alert("Select Agent Type");
return;
}

localStorage.setItem("agentTeam", team);

alert(`Logged in as ${team}`);

navigate("/agent-tickets");

};

return(

<div style={{padding:"40px"}}>

<h2>Agent Login</h2>

<select
value={team}
onChange={(e)=>setTeam(e.target.value)}
>

<option value="">Select Agent</option>
<option value="Network Support">Network Agent</option>
<option value="Billing Team">Billing Agent</option>
<option value="SIM Support">SIM Agent</option>

</select>

<br/><br/>

<button onClick={handleLogin}>Login</button>

</div>

)

}

export default AgentLogin;