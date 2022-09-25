import express from "express";
import cors from "cors";
import resourceNodesRouter from "./src/resourceNodes/router.js";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/resourceNodes", resourceNodesRouter);

export default app;
