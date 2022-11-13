import app from "./app";
const path = require("path");

const PORT = process.env.PORT || 5000;
console.log(__dirname)
app.listen(PORT, () => console.log(`app listening on port ${PORT}!`));

