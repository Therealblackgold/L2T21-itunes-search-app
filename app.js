import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import helmet from "helmet";

// init express
const app = express();

// middleware
app.use(cors());
app.use(helmet());

// Itunes Search API
app.get("/api", async (req, res) => {
  // declaring variables to pass with the get request
  const { term } = req.query;
  const { media } = req.query;
  const apiUrl = `https://itunes.apple.com/search?media=${media}&term=${term}&limit=10`;
  const options = {
    method: "GET",
  };

  // sending GET request
  const response = await fetch(apiUrl, options)
    .then((res) => res.json())
    .catch((err) => {
      console.log(err);
    });
  // parse response.results
  res.json(response.results);
});

export default app;
