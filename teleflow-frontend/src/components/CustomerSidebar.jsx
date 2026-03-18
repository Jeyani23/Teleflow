import { Link } from "react-router-dom";

function CustomerSidebar() {

return (

<div className="sidebar">

<h3>Customer Panel</h3>

<Link to="/customer-dashboard">Dashboard</Link>

<Link to="/create-ticket">Create Ticket</Link>

<Link to="/tickets">Ticket History</Link>

<Link to="/login">Logout</Link>

</div>

);

}

export default CustomerSidebar;