import User from "../model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import ash from "express-async-handler";

export const signUp = ash(async (req, res) => {
    const { firstName, lastName, email, phoneNumber, password } = req.body;

    if (!firstName || !lastName || !email || !phoneNumber || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
        res.status(409);
        throw new Error("Email already exists");
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashedPassword,
    });

    await user.save();

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT, {
        expiresIn: "1d"
    });

    res.cookie("access_token", token, { httpOnly: true, expires: new Date(Date.now() + 1000 * 60 * 60 * 24) });

    res.status(201).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
    });
});

export const signIn = ash(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const user = await User.findOne({ email });
    if (!user) {
        res.status(401);
        throw new Error("Invalid credentials");
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
        res.status(401);
        throw new Error("Invalid credentials");
    }

    const token = jwt.sign({ _id: user._id, role: user.role }, process.env.JWT, {
        expiresIn: "1d"
    });

    res.cookie("access_token", token, { httpOnly: true, expires: new Date(Date.now() + 1000 * 60 * 60 * 24) });

    res.status(200).json({
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        role: user.role,
    });
});
