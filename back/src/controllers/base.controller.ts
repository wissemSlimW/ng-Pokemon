import { Request, Response } from "express";
import { Db } from "../models/dbTypes";
import { BaseService } from "../services/base.service";

export class BaseController<T extends BaseService<Db[keyof Db]>> {
  service: T;
  constructor(service: T) {
    this.service = service;
  }

  async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await this.service.findOne(+id!);
      if (data) {
        return res.status(200).json(data);
      }
      return res.status(400).json({
        error: "No Data found",
        message: "No data was found with the requested id",
      });
    } catch (error: any) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const data = await this.service.findAll();
      return res.status(200).json(data);
    } catch (error: any) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }

  async create(req: Request, res: Response) {
    try {
      const data = await this.service.create(req.body);
      return res.status(200).json(data);
    } catch (error: any) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const oldData = await this.service.findOne(+id!);
      if (!oldData) return res.status(404).json({ message: "No data found!" });
      const newData = await this.service.update(+id!, req.body);
      return res.status(200).json(newData);
    } catch (error: any) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const data = await this.service.findOne(+id!);
      if (!data) {
        return res.status(404).json({ message: "No data found!" });
      }
      await this.service.delete(+id!);
      return res.status(200).json({
        message: "Item was successfully deleted!",
      });
    } catch (error: any) {
      res.status(500).json({ message: "ERROR", error: error.message });
    }
  }
}
