import Header from "../components/Header";
import "../styles/customer.css";

function CustomerProfile(){

return(

<div>

<Header/>

<div className="profile-container">

<div className="profile-header">

<h3>Name</h3>
<p>Account No:</p>

</div>

<div className="profile-details">

<p>Full Name:</p>
<p>Mobile No:</p>
<p>Address</p>
<p>Email ID:</p>

</div>

</div>

</div>

)

}

export default CustomerProfile;