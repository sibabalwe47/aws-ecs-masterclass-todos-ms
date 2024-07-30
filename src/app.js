// Packages
import express from "express";
import { config } from "dotenv";
import bodyParser from "body-parser";

import startup from "./startup.js";

// Initialise
const app = express();

// Middleware
app.use(bodyParser.json());

// Environment vars
config({ path: "../.env" });

const PORT = process.env.PORT || 5500

// Routes
import authRoutes from "./routes/v1/session.route.js";
// Paths
app.use(`/api/v1/session`, authRoutes);
// app.use(`/api/v1/logs`, logRoutes);

app.listen(PORT, async () => {
  startup.initialise();
});
