import express from 'express';
import { 
    createJob,
    getAllJobs,
    getActiveJobs,
    updateJob,
    deleteJob 
} from '../controllers/jobController.js';

const router = express.Router();

router.post('/', createJob);
router.get('/', getAllJobs);
router.get('/active', getActiveJobs);
router.put('/:id', updateJob);
router.delete('/:id', deleteJob);

export default router;