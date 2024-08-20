import mongoose from 'mongoose';
import Services from '../models/Services.js';
import { validateObjectId, handleNotFoundError } from '../utils/index.js';


const createService = async (req, res) => {
    
    if(Object.values(req.body).includes('')) {
        return res.status(400).json({
            msg: 'Todos los campos son obligatorios'
        });
    }

    try {
        const service = new Services(req.body);
        await service.save();
        res.json(service);
    } catch (error) {
    }
}

const getServices = async (req, res) => {
    try {
        const services = await Services.find();
        res.json(services);
    } catch (error) {
        console.log(error);
    }
}

const getServiceById = async (req, res) => {
    
    const { id } = req.params;
    if(validateObjectId(id, res)) return;

    const service = await Services.findById(id);
    if(!service) {
        return handleNotFoundError('El servicio no existe', res);
    }

    res.json(service);
}

const updateService = async (req, res) => {
    
    const { id } = req.params;
    if(validateObjectId(id, res)) return;

    const service = await Services.findByIdAndUpdate(id, req.body, { new: true });
    if(!service) {
        return handleNotFoundError('El servicio no existe', res);
    }

    res.json(service);
}

const deleteService = async (req, res) => {
    const { id } = req.params;
    if(validateObjectId(id, res)) return;

    const service = await Services.findByIdAndDelete(id);
    if(!service) {
        return handleNotFoundError('El servicio no existe', res);
    }

    res.json({ msg: 'El servicio ha sido eliminado' });
}

export {
    createService, 
    getServiceById,
    getServices,
    updateService,
    deleteService,
}