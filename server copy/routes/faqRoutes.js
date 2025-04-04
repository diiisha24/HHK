import express from 'express';
import Faq from '../models/faq.js';

const router = express.Router();
// Get all FAQs
router.get('/', async (req, res) => {
    try {
        const faqs = await Faq.find();
        res.status(200).json(faqs);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Create new FAQ
router.post('/', async (req, res) => {
    const faq = new Faq({
        question: req.body.question,
        answer: req.body.answer
    });

    try {
        const newFaq = await faq.save();
        res.status(201).json(newFaq);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Get FAQ by ID
router.get('/:id', async (req, res) => {
    try {
        const faq = await Faq.findById(req.params.id);
        if (faq) {
            res.status(200).json(faq);
        } else {
            res.status(404).json({ message: 'FAQ not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update FAQ
router.put('/:id', async (req, res) => {
    try {
        const faq = await Faq.findById(req.params.id);
        if (faq) {
            faq.question = req.body.question || faq.question;
            faq.answer = req.body.answer || faq.answer;
            
            const updatedFaq = await faq.save();
            res.status(200).json({message: "Faq Updated successfully" ,updatedFaq});
        } else {
            res.status(404).json({ message: 'FAQ not found' });
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete FAQ
router.delete('/:id', async (req, res) => {
    try {
        const faq = await Faq.findByIdAndDelete(req.params.id);
        if (faq) {
            // await faq.remove();
            res.status(200).json({ message: 'FAQ deleted' });
        } else {
            res.status(404).json({ message: 'FAQ not found' });
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

export default router;
