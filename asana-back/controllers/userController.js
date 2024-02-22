const jwt = require('jsonwebtoken');
const User = require('../models/User');
require('dotenv').config();


const jwtKey = process.env.JWT_SECRET

class UserController {
    async register(req, res) {
        try {
            const { email, password, userDetails } = req.body;
            const userId = await User.register(email, password, userDetails);
            res.status(201).json({ message: 'User registered successfully', userId });
        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }

    async login(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findByEmail(email);
            if (!user) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }
            const isValidPassword = await bcrypt.compare(password, user.password);
            if (!isValidPassword) {
                return res.status(401).json({ message: 'Invalid username or password' });
            }
            const token = jwt.sign({ userId: user.id }, jwtKey, { expiresIn: '1h' });
            res.status(200).json({ token });
        } catch (error) {
            console.error('Error during login:', error);
            res.status(500).json({ message: 'Internal server error' });
        }
    }
}

module.exports = new UserController();
