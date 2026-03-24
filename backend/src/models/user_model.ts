import { pool } from "../config/db";

export class UserModel {
  static async create(name: string, email: string, password: string) {
    const result = await pool.query(
      `INSERT INTO users(name,email,password,role)
       VALUES($1,$2,$3,'user')
       RETURNING id,name,email,role`,
      [name, email, password],
    );

    return result.rows[0];
  }

  static async findAll(limit: number, offset: number, search?: string) {
    let query = `SELECT * FROM users WHERE 1=1`;
    const values: any[] = [];

    if (search) {
      values.push(`%${search}%`);
      query += ` AND (name ILIKE $${values.length} OR email ILIKE $${values.length})`;
    }

    values.push(limit);
    values.push(offset);

    query += `
      ORDER BY created_at DESC
      LIMIT $${values.length - 1}
      OFFSET $${values.length}
    `;

    const result = await pool.query(query, values);
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

  static async findByAuth0Id(auth0_id: string) {
    const result = await pool.query(`SELECT * FROM users WHERE auth0_id = $1`, [
      auth0_id,
    ]);
    return result.rows[0];
  }

  static async createFromAuth0({
    auth0_id,
    email,
    name,
  }: {
    auth0_id: string;
    email: string;
    name: string;
  }) {
    const cleanName = name && !name.includes("@") ? name : email.split("@")[0];

    const result = await pool.query(
      `INSERT INTO users(auth0_id,email,name,role)
       VALUES($1,$2,$3,'user')
       RETURNING *`,
      [auth0_id, email, cleanName],
    );

    return result.rows[0];
  }
}
