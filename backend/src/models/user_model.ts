import { pool } from "../config/db";

export class UserModel {
  static async create(name: string, email: string, password: string) {
    const result = await pool.query(
      `INSERT INTO users(name,email,password)
       VALUES($1,$2,$3)
       RETURNING id,name,email`,
      [name, email, password],
    );

    return result.rows[0];
  }

  static async findAll(limit: number, offset: number) {
    const result = await pool.query(
      `SELECT *
       FROM users
       ORDER BY created_at DESC
       LIMIT $1 OFFSET $2`,
      [limit, offset],
    );

    return result.rows;
  }

  static async findById(id: string) {
    const result = await pool.query(`SELECT * FROM users WHERE id=$1`, [id]);

    return result.rows[0];
  }

  static async findByEmail(email: string) {
    const result = await pool.query(`SELECT * FROM users WHERE email=$1`, [
      email,
    ]);

    return result.rows[0];
  }
}
