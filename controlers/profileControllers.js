const db = require('../config/db');
const bcrypt = require('bcryptjs');

// @desc get logged in user profile
// @route GET /api/profile 
// @access Protected (Customer, Employee, Admin)

const getProfile = async (req, res, next) => {
    try {
        let query;
        if(req.user.role === 'Customer') {
            query = "SELECT id, username, role, firstName, lastName, address, street, city, email,  gender, phone, avatar FROM customer WHERE id = ?";
        } else {
            query = "SELECT id, username, role, firstName, lastName, address, street, city, age, email, salary, gender, phone, avatar FROM employee WHERE id = ?";
        }
        const [result] = await db.query(query, [req.user.id]);

        if(result.length === 0) {
            return res.status(404).json({message: 'Profile Not Found'});
        }

        res.status(200).json({message: 'Success', profile: result[0]});
    } catch (err) {
        next(err);    
    }
}


// @desc update current loggedin user's profile
// @route PUT /api/profile 
// @access Protected (Customer, Employee, Admin)

const updateProfile = async (req, res, next) => {

    const {username, password, role, firstName, lastName, address, street, city, age, email, gender, avatar, phone} = req.body;

    // common data check
    if(!username || !role || !firstName || !lastName || !address || !street || !city || !email || !gender || !avatar || !phone) {
        return res.status(400).json({message: 'Invalid Input Data'});
    }

    // employee data check
    if((role === 'Employee' || role === 'Admin') && (!age || +age <= 0)) {
        return res.status(400).json({message: 'Invalid age or salary'});
    }

    // check the username update
    let userProfile;
    if(req.user.role === 'Customer') {
        const [result] = await db.query("SELECT * FROM customer WHERE id = ?", [req.user.id]);
        userProfile = result[0];
    } else {
        const [result] = await db.query("SELECT * FROM employee WHERE id = ?", [req.user.id]);
        userProfile = result[0];
    }

    if(!userProfile) {
        return res.status(404).json({message: 'User Profile Not Found'});
    }

    if(username !== userProfile.username && req.user.role === 'Customer') {
        // trying to update the username
        const [result] = await db.query("SELECT * FROM customer WHERE username = ?", [username]);
        if(result.length > 0) return res.status(400).json({message: 'Username already taken'});  
    }

    if(username !== userProfile.username && (req.user.role === 'Employee' || req.user.role === 'Admin')) {
        // trying to update the username
        const [result] = await db.query("SELECT * FROM employee WHERE username = ?", [username]);
        if(result.length > 0) return res.status(400).json({message: 'Username already taken'});  
    }

    let hashedPassword;
    if(password) {
        hashedPassword = await bcrypt.hash(password, 10);
    }

    // good to go, we can update the profile
    let query;
    let params = [];
    if(userProfile.role === 'Customer') {
        if(password) {
            query = `UPDATE customer SET 
                username = ?, password = ?, role = ?, firstName = ?, lastName = ?, address = ?, street = ?, city = ?,
                email = ?, gender = ?, avatar = ?, phone = ? WHERE id = ?
            `;
            params = [username, hashedPassword, role, firstName, lastName, address, street, city, email, gender, avatar, phone, req.user.id];
        } else {
            query = `UPDATE customer SET 
                username = ?, role = ?, firstName = ?, lastName = ?, address = ?, street = ?, city = ?,
                email = ?, gender = ?, avatar = ?, phone = ? WHERE id = ?
            `;
            params = [username, role, firstName, lastName, address, street, city, email, gender, avatar, phone, req.user.id];
        }
    } else {
        if(password) {
            query = `UPDATE employee SET 
                username = ?, password = ?, role = ?, firstName = ?, lastName = ?, address = ?, street = ?, city = ?,
                age = ?, email = ?, gender = ?, avatar = ?, phone = ? WHERE id = ?
            `;
            params = [username, hashedPassword, role, firstName, lastName, address, street, city, age, email, gender, avatar, phone, req.user.id];
        } else {
            query = `UPDATE employee SET 
                username = ?, role = ?, firstName = ?, lastName = ?, address = ?, street = ?, city = ?,
                age = ?, email = ?, gender = ?, avatar = ?, phone = ? WHERE id = ?
            `;
            params = [username, role, firstName, lastName, address, street, city, age, email, gender, avatar, phone, req.user.id];
        }
    }

    try {
        await db.query(query, params);

        if(req.user.role === 'Customer') {
            query = "SELECT id, username, role, firstName, lastName, address, street, city, email,  gender, phone, avatar FROM customer WHERE id = ?";
        } else {
            query = "SELECT id, username, role, firstName, lastName, address, street, city, age, email, salary, gender, phone, avatar FROM employee WHERE id = ?";
        }
        const [result] = await db.query(query, [req.user.id]);
        res.status(200).json({message: 'Profile Updated', profile: result[0]});
    } catch (err) {
        next(err);
    }
}

module.exports = {
    getProfile,
    updateProfile
}