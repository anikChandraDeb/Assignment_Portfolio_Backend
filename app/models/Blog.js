import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String, required: true },
    createdBy: { type: String, required: true }, // Stores user email
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'users', required: true } // Stores user ID
}, {
    versionKey: false,
    timestamps: true
});

const Blog = mongoose.model('blogs', blogSchema);
export default Blog;
