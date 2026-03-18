import React, { useEffect, useState } from "react";
import axios from "axios";

function AgentDashboard() {

const [tickets, setTickets] = useState([]);

useEffect(() => {

const fetchTickets = async () => {

try {

const token = localStorage.getItem("token");

const res = await axios.get(
"http://localhost:5000/api/tickets/agent",
{
headers: {
Authorization: `Bearer ${token}`
}
}
);

setTickets(res.data);

} catch (err) {

console.log(err);

}

};

fetchTickets();

}, []);

return (
    

<div style={{padding:"40px"}}>

<h2 style={{color:"#81A6C6"}}>
Agent Ticket Dashboard
</h2>

<div style={{marginTop:"30px"}}>

{tickets.map((ticket) => (

<div
key={ticket._id}
style={{
background:"#F3E3D0",
padding:"20px",
marginBottom:"15px",
borderRadius:"8px",
boxShadow:"0 3px 10px rgba(0,0,0,0.1)"
}}
>

<h3>Ticket ID : {ticket.ticketId}</h3>

<p>
<strong>Issue:</strong> {ticket.description}
</p>

<p>
<strong>Address:</strong> {ticket.address}
</p>

<p>
<strong>Status:</strong> {ticket.status}
</p>

<p>
<strong>Raised At:</strong> {new Date(ticket.createdAt).toLocaleString()}
</p>

<button
style={{
marginTop:"10px",
padding:"8px 15px",
background:"#81A6C6",
color:"white",
border:"none",
borderRadius:"5px"
}}
>
Mark In Progress
</button>

<button
style={{
marginLeft:"10px",
padding:"8px 15px",
background:"#AACDDC",
border:"none",
borderRadius:"5px"
}}
>
Resolve
</button>

</div>

))}

</div>

</div>

);

}

export default AgentDashboard;