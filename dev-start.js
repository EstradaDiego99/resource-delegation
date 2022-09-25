// This file is for development only, to start the express app.
import app from "./server.js";
import dotenv from "dotenv";

dotenv.config();
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server is running on port: ${port}`));
