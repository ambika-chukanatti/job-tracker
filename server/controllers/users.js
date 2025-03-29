import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../models/user.js";

const createUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        console.log("Plain Password:", password);
        console.log("Hashed Password:", hashedPassword);

        const user = await User.create({ 
            username, 
            email, 
            password: hashedPassword 
        });

        const token = jwt.sign({ userId: user.id }, "MY_SECRET_KEY", { expiresIn: "6h" });

        const data = {
            token: token,
            username: user.username,
            user_id: user.id
        }

        res.status(201).json({ message: "User created successfully", data });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

const verifyUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Received Email:", email);
        console.log("Received Password:", password);

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        console.log("Stored Password (hashed):", user.password);

        const isMatch = await bcrypt.compare(password, user.password);
        console.log("Password Match Result:", isMatch);

        if (!isMatch) {
            return res.status(401).json({ error: "Invalid credentials" });
        }

        const token = jwt.sign({ userId: user.id }, "MY_SECRET_KEY", { expiresIn: "6h" });

        const data = {
            token: token,
            username: user.username,
            user_id: user.id
        }

        res.status(200).json({ message: "Sign-in successful", data });
    } catch (error) {
        console.error("Error in verifyUser:", error);
        res.status(500).json({ error: error.message });
    }
};

const getUser = async (req, res) => {
    try {
        const id = req.user.id;
        const user = await User.findByPk(id);

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        const data = {
            username: user.username,
            email: user.email
        }

        res.status(200).json(data);
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: error.message });
    }
};

const deleteUser = async (req, res) => {
    try {
        const { id } = req.params;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        await user.destroy();
        res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
        console.error("Error in deleteUser:", error);
        res.status(500).json({ error: error.message });
    }
};

const updateUser = async (req, res) => {
    try {
        const { id } = req.params;
        const { username, email, password } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // If password is provided, hash it before updating
        if (password) {
            user.password = await bcrypt.hash(password, 10);
        }

        if (username) user.username = username;
        if (email) user.email = email;

        await user.save();

        res.status(200).json({ message: "User updated successfully", user });
    } catch (error) {
        console.error("Error in updateUser:", error);
        res.status(500).json({ error: error.message });
    }
};

export { createUser, deleteUser, updateUser, getUser, verifyUser };

