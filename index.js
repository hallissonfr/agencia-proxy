import express from "express";
import rss from "./api/rss.js";

const app = express();

app.use("/rss", rss);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log("Servidor online na porta " + port);
});