const bcrypt = require('bcrypt');
const User = require('../modules/User.js');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const user = await User.findOne({ email });
        if (user) {
            return res.status(409).json({ message: "User already exists", success: false });
        }
        const newUser = new User({
            name,
            email,
            password: await bcrypt.hash(password, 10)
        });


        await newUser.save();
        res.status(201).json({ message: "User created successfully", success: true });
    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const errorMessage = "email or password is wrong";
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(403).json({ message: errorMessage, success: false });
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            return res.status(403).json({ message: errorMessage, success: false });
        }

        const token = jwt.sign({ email: user.email, _id: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
        res.status(200).json({ message: "login successful",success: true,token, email, name: user.name });

    } catch (error) {
        console.error("Error during signup:", error);
        res.status(500).json({ message: "Internal Server Error", success: false });
    }
};

module.exports = {
    signup,
    login
};