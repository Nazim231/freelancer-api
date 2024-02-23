import mailchecker from "mailchecker";
import brcrypt from "bcrypt";
import { role as roles } from "../models/roles.js";
import { user as users } from "../models/users.js";
import { auth } from "../services/auth.js";

class User {
    async signup(req, res) {
        const { name, email, password, confirm_password, role } = req.body;
        let { phone } = req.body;

        // validating fields
        if (!name || !email || !password || !phone || !role) {
            return res.status(400).json({
                message: "All fields are required",
            });
        } else if (!mailchecker.isValid(email)) {
            return res.status(400).json({
                message: "Invalid email",
            });
        } else if (password !== confirm_password) {
            return res.status(400).json({
                message: "Password & Confirm Password doesn't match",
            });
        } else if (phone.length != 10) {
            return res.status(400).json({
                message: "Invalid phone number, it should be 10 digits",
            });
        }

        try {
            phone = Number(phone);
        } catch {
            return res.status(400).json({
                message: "Invalid phone number",
            });
        }

        // checking if the role exists or not
        const roleData = await roles.findOne({ name: role });
        if (!roleData || roleData._id === null) {
            return res.status(400).json({
                message: "Role doesn't exists",
            });
        }

        // encrypting password
        const salt = await brcrypt.genSalt(10);
        const encPassword = await brcrypt.hash(password, salt);

        const userData = {
            name: name,
            email: email,
            phone: phone,
            password: encPassword,
            role_id: roleData._id,
        };

        const newUser = await users.create(userData).catch((err) => {
            return res.json({
                message: "Failed to create user",
                error: String(err),
            });
        });

        if (newUser) {
            return res.json({
                message: "User Created Successfully",
            });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;

        // validating fields
        if (!email || !password) {
            return res.status(400).json({
                message: "All fields are required",
            });
        } else if (password.length < 8) {
            return res.status(400).json({
                message: "Password should be at least 8 characters long.",
            });
        } else if (!mailchecker.isValid(email)) {
            return res.status(400).json({
                message: "Invalid email address",
            });
        }

        // finding user
        // ! getting user role as 'undefined'.
        // TODO: implement aggregation to find the user with its role.
        await users.findOne({ email }).then((user) => {
            if (!user) {
                // user not found with email
                return res.status(404).json({
                    message: "User doesn't exists, please check your email.",
                });
            }
            if (!brcrypt.compare(password, user.password)) {
                // password doesn't match
                return res.status(404).json({
                    message: "Incorrect password, please try again.",
                });
            }
            // assigning token to user
            const accessToken = auth.createUser(user);
            console.log(user.role);
            res.cookie("token", accessToken); // sending the token to the user
            return res.json({
                message: "User Logged in successfully",
                role: user.role,
            });
        });
    }
}

export const user = new User();
