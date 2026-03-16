import { pool } from "../config/db";

export class ProjectModel {
  static async create(name: string, description: string, createdBy: string) {
    const result = await pool.query(
      `INSERT INTO projects(name, description, created_by)
       VALUES($1,$2,$3)
       RETURNING *`,
      [name, description, createdBy],
    );

    return result.rows[0];
  }

  static async findAll(limit: number, offset: number) {
    const result = await pool.query(
      `SELECT *
       FROM projects
       ORDER BY created_at DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset],
    );

    return result.rows;
  }

  static async findById(id: string) {
    const result = await pool.query(
      `SELECT *
       FROM projects
       WHERE id=$1`,
      [id],
    );

    return result.rows[0];
  }
  static async findByUser(userId: string) {
    const result = await pool.query(
      `SELECT * FROM projects WHERE created_by=$1`,
      [userId],
    );

    return result.rows;
  }
}
