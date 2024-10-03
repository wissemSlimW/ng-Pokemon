import { Db } from "../models/dbTypes";

export const createInsertManyQuery = <T extends Omit<Db[keyof Db], "id">>(
  tableName: keyof Db,
  columns: (keyof T)[],
  values: T[]
): string => {
  const columnsPart = columns.join(", ");
  const valuesPart = values
    .map(
      (value) => `(${columns.map((column) => `'${value[column]}'`).join(", ")})`
    )
    .join(", ");
  const query = `INSERT INTO ${tableName} (${columnsPart}) VALUES ${valuesPart} RETURNING *;`;
  return query;
};

export const deleteManyQuery = <T extends Omit<Db[keyof Db], "id">>(
  tableName: keyof Db,
  colName: keyof T,
  values: number[]
): string => {
  const columns = values.map((key, i) => `$${i + 1}`).join(", ");
  const query = `DELETE FROM ${tableName} WHERE ${String(colName)} IN (${columns}) RETURNING *`;
  return query;
};
