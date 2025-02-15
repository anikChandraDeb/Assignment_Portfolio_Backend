import mongoose from 'mongoose';

const serviceSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    createdBy: { type: String, required: true }, // Stores user email
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true } // Stores user ID
}, {
    versionKey: false,
    timestamps: true
});

const Service = mongoose.model('services', serviceSchema);
export default Service;
