import Team from '../models/Team.js';

//  Get All Team Members
export const getAllTeamMembers = async (req, res) => {
    try {
        const teamMembers = await Team.find();
        res.json(teamMembers);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//  Get a Single Team Member by ID
export const getTeamMemberById = async (req, res) => {
    try {
        const teamMember = await Team.findById(req.params.id);
        if (!teamMember) return res.status(404).json({ message: "Team member not found" });
        res.json(teamMember);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const teamCount = async (req, res) => {
    try {
        const count = await Team.countDocuments(); 
        res.json({ count });
      } catch (error) {
        res.status(500).json({ error: 'Error fetching team count' });
      }
    
};

export const createTeamMember = async (req, res) => {
    try {
        const { name, description,image } = req.body;
        
        const newTeamMember = new Team({
            name,
            description,
            image,
            createdBy: req.headers.email, 
            userId: req.headers.user_id  
        });


        await newTeamMember.save();
        res.status(201).json(newTeamMember);
    } catch (error) {

        res.status(500).json({ message: error.message });
    }
};

//  Update Team Member by ID (Secured)
export const updateTeamMember = async (req, res) => {
    try {
        const updatedTeamMember = await Team.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedTeamMember);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//  Delete Team Member by ID (Secured)
export const deleteTeamMember = async (req, res) => {
    try {
        await Team.findByIdAndDelete(req.params.id);
        res.json({ message: "Team member deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
