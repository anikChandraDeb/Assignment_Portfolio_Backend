import express from 'express';
const router = express.Router();

import { getAllBlogs, getBlogById, createBlog, updateBlog, deleteBlog, blogCount } from '../app/controllers/blogController.js';

import { getAllServices, getServiceById, createService, updateService, deleteService, serviceCount } from '../app/controllers/serviceController.js';

import { getAllTeamMembers, getTeamMemberById, createTeamMember, updateTeamMember, deleteTeamMember, teamCount } from '../app/controllers/teamController.js';

import { registerUser, loginUser, getUserProfile } from '../app/controllers/userController.js';

import authMiddleware from '../app/middlewares/authMiddlewares.js';

//  User Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', authMiddleware, getUserProfile);

//  Blog Routes
router.get('/blogs/:limit', getAllBlogs);
router.get('/blogscount', blogCount);
router.get('/blogsByID/:id', getBlogById);
router.post('/blogs', authMiddleware, createBlog); 
router.put('/blogs/:id', authMiddleware, updateBlog); 
router.delete('/blogs/:id', authMiddleware, deleteBlog); 

//  Service Routes
router.get('/services', getAllServices);
router.get('/services/count', serviceCount);
router.post('/services', authMiddleware, createService);  
router.put('/services/:id', authMiddleware, updateService); 
router.delete('/services/:id', authMiddleware, deleteService); 

//  Team Routes
router.get('/team', getAllTeamMembers);
router.get('/team/count', teamCount);
router.post('/team', authMiddleware, createTeamMember);   
router.put('/team/:id', authMiddleware, updateTeamMember);
router.delete('/team/:id', authMiddleware, deleteTeamMember); 

export default router;
