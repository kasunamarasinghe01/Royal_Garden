const UserSchema = require('../models/User');



const getAllCustomers = async (req, res, next) => {
    try {

        const customers = await UserSchema.find({role: ['Customer']}).lean();

        res.status(200).json({message: 'success', customers});
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getAllCustomers
}