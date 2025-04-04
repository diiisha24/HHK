import mongoose from 'mongoose';
const mongoose = require("mongoose");

const jobApplicationSchema = new mongoose.Schema({
    jobId: { type: mongoose.Schema.Types.ObjectId, ref: "Job", required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    experience: { type: String, required: true },
    city: { type: String, required: true },
    resumeURL: { type: String, required: true }
});

module.exports = mongoose.model("JobApplication", jobApplicationSchema);
// Compare this snippet from Hotel-Highway-King/server/models/jobApplication.js: