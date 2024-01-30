import { Schema, model } from "mongoose";

const roleSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    }
});

export const role = model("roles", roleSchema);