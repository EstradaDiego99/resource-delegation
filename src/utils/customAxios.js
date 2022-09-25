import axios from "axios";

export default axios.create(
  process.env.NODE_ENV === "development"
    ? { baseURL: "http://localhost:5000" }
    : {
        baseURL:
          "https://us-central1-fern-template-3e1e3.cloudfunctions.net/api",
      }
);
