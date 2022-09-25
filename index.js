import functions from "firebase-functions";
import app from "./server.js";

const api = functions.https.onRequest(app);
export { api };
