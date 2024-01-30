import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email : {
        type: String,
        required: true,
        unique: true,
    },
    phone: {
        type: String,
        required: true,
        unique: true,
    },
    role_id: {
        type: Schema.Types.ObjectId,
        required: true
    },
    password: {
        type: String,
        required: true
    }
}, {
    timestamps: true
});

export const user = model("users", userSchema);