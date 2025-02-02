import mongoose from 'mongoose';

const teamSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: String, required: true }, // Stores user email
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true } // Stores user ID
}, {
    versionKey: false,
    timestamps: true
});

const Team = mongoose.model('teams', teamSchema);
export default Team;
