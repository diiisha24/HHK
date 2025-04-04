// import mongoose from 'mongoose';
// // const mongoose = require("mongoose");

// const jobSchema = new mongoose.Schema({
//     title: { type: String, required: true },
//     location: { type: String, required: true },
//     department: { type: String, required: true },
//     experience: { type: String, required: true },
//     jobType: { type: String, enum: ["Full-time", "Part-time"], required: true },
//     description: { type: String, required: true },
//     postedDate: { type: Date, default: Date.now }
// });

// // module.exports = mongoose.model("Job", jobSchema);
// export default mongoose.model("Job", jobSchema);

import mongoose from 'mongoose';

const jobSchema = new mongoose.Schema({
    title: { type: String, required: true },
    location: { type: String, required: true },
    department: { type: String },
    experienceRequirements: { type: String },
    jobType: {
        type: String,
        enum: [
            "Full-time",
            "Part-time",
            "Contract",
            "Temporary",
            "Freelance",
            "Internship",
            "Apprenticeship",
            "Seasonal",
            "On-call",
            "Volunteer"
        ],
        required: true
    },
    description: { type: String, required: true },
    responsibilities: { type: [String] },
    postedDate: { type: Date, default: Date.now },
    validThrough: { type: Date },
    salary: { type: String },
    requiredSkills: { type: [String] },
    educationRequirements: { type: String },
    applicationInstructions: { type: String },
    companyName: { type: String },
    jobLocationType: { type: String, enum: ["on-site", "remote", "hybrid"] },
    workHours: { type: String },
    jobBenefits: { type: [String] },
    isActive: { type: Boolean, default: true },
    updatedAt: { type: Date }
});

// Pre-save hook to automatically update `updatedAt`
jobSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

export default mongoose.model("Job", jobSchema);