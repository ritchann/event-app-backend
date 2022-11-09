import app from "./app";
const path = require("path");

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`app listening on port ${PORT}!`));

console.log(__dirname);
app.get("*", (_, res) => {
  res.sendFile(path.join(__dirname + "/build/index.html"));
});
