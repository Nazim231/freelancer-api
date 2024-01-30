import { connect } from "mongoose";

export async function makeConnection() {
    return connect("mongodb://127.0.0.1/freelancer").then(
        () => console.log("MongoDB connected successfully")
    ).catch(
        (err) => {
        console.log("MONGODB ERROR:::" + err);
    });
}