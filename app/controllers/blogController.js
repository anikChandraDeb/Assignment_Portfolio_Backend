import Blog from '../models/Blog.js';

export const getAllBlogs = async (req, res) => {
    try {
        if(req.params.limit!=0){
            const blogs = await Blog.find().sort({ createdAt: -1 }).limit(parseInt(req.params.limit));
            res.json(blogs);
        }
        else{
            const blogs = await Blog.find();
            res.json(blogs);
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id);
        if (!blog) return res.status(404).json({ message: "Blog not found" });
        res.json(blog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const blogCount = async (req, res) => {
    try {

        const count = await Blog.countDocuments(); 
        res.json({ count });
      } catch (error) {
        res.status(500).json({ error: 'Error fetching blog count' });
      }
    
};

export const createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const newBlog = new Blog({
            title,
            content,
            createdBy: req.headers.email, 
            userId: req.headers.user_id  
        });

        await newBlog.save();
        res.status(201).json(newBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const updateBlog = async (req, res) => {
    try {
        const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedBlog);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteBlog = async (req, res) => {
    try {
        await Blog.findByIdAndDelete(req.params.id);
        res.json({ message: "Blog deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
