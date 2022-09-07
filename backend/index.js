const express = require("express");
const morgan = require("morgan");

const app = express();

const PORT = process.env.PORT || 8080;

app.use(morgan("tiny"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

if (process.env.NODE_ENV === "production") {
    app.use(express.static("/../frontend/build"));
}

app.listen(PORT, console.log(`Server is starting at ${PORT}`));
