import express from "express";
import { registerVeiw } from "../controllers/videoController";

const apiRouter = express.Router();

apiRouter.post("/videos/:id([0-9a-f]{24})/view", registerVeiw);

export default apiRouter;
