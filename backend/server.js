import express from "express";
import path from "path";
import morgan from "morgan";

const app = express();

app.use(express.json());
app.use(morgan("tiny"));

const __dirname = path.resolve();

const PORT = process.env.PORT || 8080;

app.get("/api", (req, res) => {
    res.send(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`);
});

if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "/frontend/build")));

    app.get("*", (req, res) =>
        res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
    );
}

app.listen(
    PORT,
    console.log(
        `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`
    )
);

process.once("SIGTERM", () => process.exit(0));
