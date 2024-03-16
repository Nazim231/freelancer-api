import { Schema, model } from "mongoose";

const jobSchema = new Schema(
    {
        title: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        category_id: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        currency: {
            type: String,
            required: true,
            default: "USD",
        },
        time_limit: {
            type: String,
            required: true,
        },
        payment_type: {
            type: String,
            required: true,
            default: "project",
        },
        posted_by: {
            type: Schema.Types.ObjectId,
            required: true,
        },
        images: [
            {
                image: {
                    type: String,
                },
            },
        ],
        status: {
            type: String,
            default: "Active",
        },
        tags: [
            {
                tag: {
                    type: Schema.Types.ObjectId,
                },
            },
        ],
    },
    {
        timestamps: true,
    }
);

export const job = model("jobs", jobSchema);
