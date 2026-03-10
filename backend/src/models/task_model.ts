import { pool } from "../config/db";

export class TaskModel {
  static async create(
    title: string,
    description: string,
    projectId: string,
    assignedTo?: string,
  ) {
    const result = await pool.query(
      `
      INSERT INTO tasks(title, description, project_id, assigned_to)
      VALUES($1,$2,$3,$4)
      RETURNING *
      `,
      [title, description, projectId, assignedTo],
    );

    return result.rows[0];
  }

  static async findTasks(
    limit: number,
    offset: number,
    status?: string,
    projectId?: string,
  ) {
    let query = `SELECT * FROM tasks WHERE 1=1`;
    const values: any[] = [];

    if (status) {
      values.push(status);
      query += ` AND status=$${values.length}`;
    }

    if (projectId) {
      values.push(projectId);
      query += ` AND project_id=$${values.length}`;
    }

    values.push(limit);
    values.push(offset);

    query += ` LIMIT $${values.length - 1} OFFSET $${values.length}`;

    const result = await pool.query(query, values);

    return result.rows;
  }

  static async updateStatus(taskId: string, status: string) {
    const result = await pool.query(
      `
      UPDATE tasks
      SET status=$1
      WHERE id=$2
      RETURNING *
      `,
      [status, taskId],
    );

    return result.rows[0];
  }

  static async delete(taskId: string) {
    await pool.query(`DELETE FROM tasks WHERE id=$1`, [taskId]);

    return true;
  }
}
