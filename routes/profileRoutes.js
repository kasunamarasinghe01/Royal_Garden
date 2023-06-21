const express = require('express');
const router = express.Router();
const User = require('../models/User');


router.get('/:id', async (req, res) => {
    try {
        
        const user = await User.findById(req.params.id);

        return res.status(200).json({user});

    } catch (err) {
        return res.status(500).json({message: "Internal server error"});
    }
});






module.exports = router;