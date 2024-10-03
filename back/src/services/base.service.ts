import { poolQuery } from "../config/db";
import { Db } from "../models/dbTypes";

export class BaseService<T extends Db[keyof Db]> {
  tableName: keyof Db;
  constructor(tableName: keyof Db) {
    this.tableName = tableName;
  }
  async findOne(id: number): Promise<T> {
    const query = `SELECT * FROM ${this.tableName} WHERE id = $1`;
    const result = await poolQuery(query, [id]);
    return result.rows[0];
  }
  async findAll(): Promise<T[]> {
    const query = `SELECT * FROM ${this.tableName}`;
    const result = await poolQuery(query);
    return result.rows;
  }
  async create(data: T): Promise<T> {
    const columns = Object.keys(data).join(", ");
    const values = Object.values(data);
    const placeholders = values.map((_, i) => `$${i + 1}`).join(", ");

    const query = `INSERT INTO ${this.tableName} (${columns}) VALUES (${placeholders}) RETURNING *`;
    const result = await poolQuery(query, values);
    return result.rows[0];
  }
  async update(id: number, data: T): Promise<T> {
    const columns = Object.keys(data)
      .map((key, i) => `${key} = $${i + 2}`)
      .join(", ");
    const values = Object.values(data);
    values.unshift(id);

    const query = `UPDATE ${this.tableName} SET ${columns} WHERE id = $1 RETURNING *`;
    const result = await poolQuery(query, values);
    return result.rows[0];
  }

  async delete(id: number): Promise<void> {
    const query = `DELETE FROM ${this.tableName} WHERE id = $1 RETURNING *`;
    await poolQuery(query, [id]);
  }
}
