import express from "express"
import authRouter from "./routes/auth.routes";

const app = express();

app.use(express.json())

app.use("/api/v1/auth", authRouter);

app.get("/", (req, res) => {
    res.send("Hello");
})

const PORT = process.env.PORT;

app.listen(PORT);