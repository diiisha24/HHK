import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const faqSchema = new Schema({
    question: {
        type: String,
        required: true
    },
    answer: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

faqSchema.pre('save', function(next) {
    this.updatedAt = Date.now();
    next();
});

const Faq = mongoose.model('FAQ', faqSchema);

export default Faq;