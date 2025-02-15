import Service from '../models/Service.js';

export const getAllServices = async (req, res) => {
    try {
        const services = await Service.find();
        res.json(services);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const getServiceById = async (req, res) => {
    try {
        const service = await Service.findById(req.params.id);
        if (!service) return res.status(404).json({ message: "Service not found" });
        res.json(service);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const serviceCount = async (req, res) => {
    try {
        const count = await Service.countDocuments(); 
        res.json({ count });
      } catch (error) {
        res.status(500).json({ error: 'Error fetching service count' });
      }
    
};

export const createService = async (req, res) => {
    try {
        //console.log('invoke')
        const { title, description,image } = req.body;

        const newService = new Service({
            title,
            description,
            image,
            createdBy: req.headers.email, 
            userId: req.headers.user_id  
        });

        await newService.save();
        res.status(201).json(newService);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const updateService = async (req, res) => {
    try {
        const updatedService = await Service.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(updatedService);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};


export const deleteService = async (req, res) => {
    try {
        await Service.findByIdAndDelete(req.params.id);
        res.json({ message: "Service deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};