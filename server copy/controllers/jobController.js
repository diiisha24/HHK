import Job from '../models/job.js';

export const createJob = async (req, res) => {
    try {
        const { title, location, jobType, description } = req.body;

        if (!title || !location || !jobType || !description) {
            return res.status(400).json({ message: 'Missing required fields: title, location, jobType, and description are mandatory' });
        }

        const job = new Job({ ...req.body });
        await job.save();
        res.status(201).json({ jobId: job._id, message: 'Job posted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getAllJobs = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 10;
        const startIndex = (page - 1) * limit;

        const total = await Job.countDocuments();
        const jobs = await Job.find()
            .skip(startIndex)
            .limit(limit);

        res.json({
            jobs,
            totalPages: Math.ceil(total / limit),
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const getActiveJobs = async (req, res) => {
    try {
        const jobs = await Job.find({ isActive: true });
        res.json(jobs);
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};

export const updateJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndUpdate(
            req.params.id,
            { ...req.body, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.json({ message: 'Job updated', job });
    } catch (error) {
        res.status(400).json({ message: 'Validation error or server issue', error: error.message });
    }
};

export const deleteJob = async (req, res) => {
    try {
        const job = await Job.findByIdAndDelete(req.params.id);

        if (!job) {
            return res.status(404).json({ message: 'Job not found' });
        }

        res.json({ message: 'Job deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error', error: error.message });
    }
};