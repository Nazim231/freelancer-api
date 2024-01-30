import mailchecker from "mailchecker";
import brcrypt from "bcrypt";
import { role as roles } from "../models/roles.js";
import { user as users } from "../models/users.js";

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
    const roleData = await roles.findOne({name: role});
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

}

export const user = new User();
