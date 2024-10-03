import { Request, Response, Router } from "express";
import { WeaknessController } from "../controllers/weakness.controller";
import { WeaknessService } from "../services/weakness.service";

export const weaknessRoutes = Router();
const service = new WeaknessService("weaknesses");
const controller = new WeaknessController(service);
weaknessRoutes.get("/:id", (req: Request, res: Response) => {
  controller.findOne(req, res);
});
weaknessRoutes.get("/", (req: Request, res: Response) => {
  controller.findAll(req, res);
});
weaknessRoutes.post("/", (req: Request, res: Response) => {
  controller.create(req, res);
});
weaknessRoutes.put("/:id", (req: Request, res: Response) => {
  controller.update(req, res);
});
weaknessRoutes.delete("/:id", (req: Request, res: Response) => {
  controller.delete(req, res);
});
