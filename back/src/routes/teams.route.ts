import { Request, Response, Router } from "express";
import { TeamController } from "../controllers/team.controller";
import { TeamService } from "../services/team.service";

export const teamRoutes = Router();
const service = new TeamService("teams");
const controller = new TeamController(service);
teamRoutes.get("/:id", (req: Request, res: Response) => {
  controller.findOne(req, res);
});
teamRoutes.get("/", (req: Request, res: Response) => {
  controller.findAll(req, res);
});
teamRoutes.post("/", (req: Request, res: Response) => {
  console.log({ req });
  controller.create(req, res);
});
teamRoutes.put("/:id", (req: Request, res: Response) => {
  controller.update(req, res);
});
teamRoutes.delete("/:id", (req: Request, res: Response) => {
  controller.delete(req, res);
});
