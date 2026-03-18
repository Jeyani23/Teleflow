import axios from "axios";

const API_URL = "http://localhost:5000/api/tickets";

export const createTicket = (ticket) => {
  return axios.post(API_URL, ticket);
};

export const getTickets = () => {
  return axios.get(API_URL);
};

export const updateTicketStatus = (id, status) => {
  return axios.put(`http://localhost:5000/api/tickets/${id}`, { status });
};

axios.get("/api/tickets/customer", {
  headers: { Authorization: `Bearer ${token}` },
});