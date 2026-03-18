import { useEffect, useState } from "react";
import "./TicketList.css";

function TicketList() {

const [tickets,setTickets] = useState([]);
const [agentTeam,setAgentTeam] = useState("");

useEffect(()=>{

const storedTickets = JSON.parse(localStorage.getItem("tickets")) || [];
const loggedAgent = JSON.parse(localStorage.getItem("loggedInAgent"));

if(loggedAgent){
setAgentTeam(loggedAgent.team);

const filtered = storedTickets.filter(
(ticket)=>ticket.assignedTeam === loggedAgent.team
);

setTickets(filtered);
}

},[]);

return(

<div className="ticket-container">

<h2 className="ticket-title">
{agentTeam} Dashboard
</h2>

{tickets.length === 0 ? (

<p className="no-ticket">No tickets assigned</p>

) : (

<div className="ticket-grid">

{tickets.map((ticket)=>(
<div key={ticket.id} className="ticket-card">

<h3>{ticket.issue}</h3>

<p><b>Location:</b> {ticket.location}</p>

<p><b>Description:</b> {ticket.description}</p>

<p>
<b>Priority:</b>
<span className={`priority ${ticket.priority}`}>
{ticket.priority}
</span>
</p>

<p>
<b>Status:</b>
<span className="status">{ticket.status}</span>
</p>

</div>
))}

</div>

)}

</div>

);

}

export default TicketList;