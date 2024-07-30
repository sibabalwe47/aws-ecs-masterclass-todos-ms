import express from "express";
import SessionController from "../../controllers/session.controller.js";
const route = express.Router();

route.post("/store-session", SessionController.storeSesion);

route.post("/remove-session", SessionController.removeSession);

route.post("/validate-session", SessionController.validateUserSession);

route.get("/health", SessionController.healthCheck)

export default route;
