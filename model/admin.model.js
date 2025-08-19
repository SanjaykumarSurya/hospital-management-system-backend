import mongoose from "mongoose";

const adminSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ["admin", "receptionist"],
    default: "admin",
    required: true,
  },
  password: { type: String, required: true },
}, {
  versionKey: false,
  timestamps: true,
});

const Admin = mongoose.model("Admin", adminSchema);

export default Admin;