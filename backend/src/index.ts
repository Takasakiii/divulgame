import express from "express";
import handlerController from "./handler";
import cors from "cors";
import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

const db = new PrismaClient();

handlerController(app, db);

app.listen(2000, () => {
  console.log("Server is running on port 2000");
});
