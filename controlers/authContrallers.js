const UserSchema = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

// @desc   register a new customer
// @route  POST /api/auth/register
// @access Public

const register = async (req, res, next) => {
  const {
    username,
    password,
    firstName,
    lastName,
    email,
    phoneNumber,
    address,
    street,
    city,
    gender,
    avatar,
  } = req.body;

  if (
    !username ||
    !password ||
    !firstName ||
    !lastName ||
    !email ||
    !phoneNumber ||
    !address ||
    !street ||
    !city ||
    !gender
  ) {
    return res.status(400).json({ message: "Invalid Inputs" });
  }

  try {
    
    // 1. find wether a user already exists within the given username
    const duplicate = await UserSchema.findOne({username});

    if(duplicate) return res.status(400).json({message: 'Username already exists'});

    // 2. hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

   // 3. create & store customer in database
   const customer = {   
        username,
        password: hashedPassword,
        firstName,
        lastName,
        email,
        phoneNumber,
        address,
        street,
        city,
        gender,
        avatar: avatar ? avatar : gender === 'male' ? 'https://firebasestorage.googleapis.com/v0/b/royal-garden-3e027.appspot.com/o/avatar%2Fpng-transparent-head-the-dummy-avatar-man-tie-jacket-user.png?alt=media&token=751fee00-7abc-4837-936c-3afc9eb95afe' : 'https://firebasestorage.googleapis.com/v0/b/royal-garden-3e027.appspot.com/o/avatar%2Fimages.png?alt=media&token=39e68945-8afa-4983-9f67-b649a8f7f005',
        role: ['Customer']
   }

   await UserSchema.create(customer);

    res.status(201).json({ message: "Registration Success" });
  } catch (err) {
    next(err);
  }
};

/// @desc   login all types of users (Customer, Employee, Admin)
// @route  POST /api/auth/login
// @access Public

const login = async (req, res, next) => {
  const { username, password, type } = req.body;

  if (!username || !password) {
    return res.status(400).json({ message: "Invalid username or password" });
  }

  try {
    const userExist = await UserSchema.findOne({ username }).exec();

    if (!userExist) {
      return res.status(404).json({ message: "Invalid username or password" });
    }

    if(type === 'Customer' && (userExist.role.includes('Employee') || userExist.role.includes('Admin'))) {
      return res.status(400).json({message: 'Invalid username or password'});
    }

    // check for the password
    const isMatch = await bcrypt.compare(password, userExist.password);

    if (!isMatch) {
      return res.status(404).json({ message: "Invalid username or password" });
    }

    // sign jwt token (access token)
    const token = jwt.sign({id: userExist._id, role: userExist.role, username: userExist.username}, 'adsasd2123123kjkassdn14123');

    // create response user object
    const user = {
      role: userExist.role,
      id: userExist._id,
      username: userExist.username
    };

    res.status(200).json({ message: "Login success", token, user});
  } catch (err) {
    next(err);
  }
};


const authUser = async (req, res, next) => {

  const {token} = req.body;
    
  jwt.verify(token, 'adsasd2123123kjkassdn14123', (err, decode) => {
    if(err) {
      return res.status(401).json({message: 'Unauthorized'});
    }

    return res.status(200).json({token, user: decode});
  })

}



module.exports = {
    register,
    login,
    authUser
}
