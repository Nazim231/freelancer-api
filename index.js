import Express from "express";
import {router as userRoutes} from "./routes/users.js";
import { makeConnection } from "./connection.js";

// creating server
const app = Express();
const PORT = 8000;

// applying middlewares
app.use(Express.urlencoded({extended: false}));

app.get("/", (req, res) => {
    res.end("Server Started Successfully");
});

// connecting to MongoDB
makeConnection();

// setting up routes
app.use("/users", userRoutes);

// starting server
app.listen(PORT, () => console.log(`Server started successfully\n http://localhost:${PORT}`))