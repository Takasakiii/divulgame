import express from "express";
import handlerController from "./handler";

const app = express();
app.use(express.json());
handlerController(app);

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
