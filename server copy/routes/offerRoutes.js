// routes/offerRoutes.js
import express from 'express';
import Offer from '../models/offer.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const newOffer = new Offer(req.body);
        await newOffer.save();
        res.status(201).json(newOffer);
    } catch (error) {
        console.error('Error creating offer:', error);
        res.status(500).json({ message: 'Error creating offer', error: error.message });
    }
});

router.get('/', async (req, res) => {
    try {
        const offers = await Offer.find();
        res.status(200).json(offers);
    } catch (error) {
        console.error('Error fetching offers:', error);
        res.status(500).json({ message: 'Error fetching offers', error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const offer = await Offer.findById(req.params.id);
        if (!offer) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        res.status(200).json(offer);
    } catch (error) {
        console.error('Error fetching offer:', error);
        res.status(500).json({ message: 'Error fetching offer', error: error.message });
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const deletedOffer = await Offer.findByIdAndDelete(req.params.id);
        if (!deletedOffer) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        res.status(200).json({ message: 'Offer deleted successfully' });
    } catch (error) {
        console.error('Error deleting offer:', error);
        res.status(500).json({ message: 'Error deleting offer', error: error.message });
    }
});

router.put('/:id', async (req, res) => {
    try {
        const updatedOffer = await Offer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedOffer) {
            return res.status(404).json({ message: 'Offer not found' });
        }
        res.status(200).json(updatedOffer);
    } catch (error) {
        console.error('Error updating offer:', error);
        res.status(500).json({ message: 'Error updating offer', error: error.message });
    }
});

export default router;