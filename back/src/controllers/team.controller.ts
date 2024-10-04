import { Request, Response } from "express";
import { TeamService } from "../services/team.service";
import { BaseController } from "./base.controller";

export class TeamController extends BaseController<TeamService> {
  create(
    req: Request,
    res: Response
  ): Promise<Response<any, Record<string, any>> | undefined> {
    if (req.body.pokemonIds.length !== 6) {
      throw res.status(500).json({
        message: "ERROR",
        error: "pokemon list should contain 6 members",
      });
    } else return super.create(req, res);
  }
}
