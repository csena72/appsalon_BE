import mongoose from 'mongoose';

export const validateObjectId = (id, res) => {
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({
            msg: 'El id no es válido'
        });
    }
}

export const handleNotFoundError = (message, res) => {
    return res.status(404).json({
        msg: message
    });
}