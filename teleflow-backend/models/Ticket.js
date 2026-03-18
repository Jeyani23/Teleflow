import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema(
{
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true
  },

  ticketType: {
    type: String,
    enum: ["network", "billing", "sim"],
    required: true,
    trim: true
  },

  issue: {
    type: String,
    required: true,
    trim: true
  },

  address: {
    type: String,
    required: true,
    trim: true
  },

  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending"
  }
},
{ timestamps: true }
);

ticketSchema.index({ ticketType: 1 });

export default mongoose.model("Ticket", ticketSchema);