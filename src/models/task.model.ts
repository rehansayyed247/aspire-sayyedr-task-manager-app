import { pool } from "../config/db";

export interface Task {
  id: number;
  title: string;
  description: string;
  due: string;
  status: string;
  created_at?: Date;
  updated_at?: Date;
}

/**
 * Retrieve all tasks from the database
 * @returns Array of tasks
 */
export const getTasks = async (): Promise<Task[]> => {
  try {
    const result = await pool.query(
      "SELECT * FROM tasks ORDER BY created_at DESC"
    );
    return result.rows;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw new Error("Failed to fetch tasks");
  }
};

/**
 * Create a new task
 * @param title - Task title
 * @param description - Task description
 * @param due - Task due date
 * @param status - Task status
 * @returns Created task
 */
export const createTask = async (
  title: string,
  description: string,
  due: string,
  status: string
): Promise<Task> => {
  try {
    // Input validation
    if (!title || title.trim().length === 0) {
      throw new Error("Title is required");
    }
    if (title.length > 255) {
      throw new Error("Title must not exceed 255 characters");
    }
    if (description && description.length > 2000) {
      throw new Error("Description must not exceed 2000 characters");
    }
    if (!due || new Date(due).toString() === "Invalid Date") {
      throw new Error("Valid due date is required");
    }
    if (!["pending", "in_progress", "completed"].includes(status)) {
      throw new Error("Invalid status value");
    }

    const result = await pool.query(
      `INSERT INTO tasks(title, description, due, status, created_at, updated_at)
       VALUES($1, $2, $3, $4, NOW(), NOW())
       RETURNING *`,
      [title.trim(), description ? description.trim() : "", due, status]
    );

    return result.rows[0];
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

/**
 * Update an existing task
 * @param id - Task ID
 * @param title - Updated task title
 * @param description - Updated task description
 * @param due - Updated due date
 * @param status - Updated status
 * @returns Updated task
 */
export const updateTask = async (
  id: number,
  title: string,
  description: string,
  due: string,
  status: string
): Promise<Task> => {
  try {
    // Input validation
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("Invalid task ID");
    }
    if (!title || title.trim().length === 0) {
      throw new Error("Title is required");
    }
    if (title.length > 255) {
      throw new Error("Title must not exceed 255 characters");
    }
    if (description && description.length > 2000) {
      throw new Error("Description must not exceed 2000 characters");
    }
    if (!due || new Date(due).toString() === "Invalid Date") {
      throw new Error("Valid due date is required");
    }
    if (!["pending", "in_progress", "completed"].includes(status)) {
      throw new Error("Invalid status value");
    }

    const result = await pool.query(
      `UPDATE tasks
       SET title = $1, description = $2, due = $3, status = $4, updated_at = NOW()
       WHERE id = $5
       RETURNING *`,
      [title.trim(), description ? description.trim() : "", due, status, id]
    );

    if (result.rows.length === 0) {
      throw new Error("Task not found");
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

/**
 * Delete a task by ID
 * @param id - Task ID
 * @returns Success message
 */
export const deleteTask = async (id: number): Promise<void> => {
  try {
    // Input validation
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("Invalid task ID");
    }

    const result = await pool.query("DELETE FROM tasks WHERE id = $1", [id]);

    if (result.rowCount === 0) {
      throw new Error("Task not found");
    }
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

/**
 * Get a single task by ID
 * @param id - Task ID
 * @returns Task object
 */
export const getTaskById = async (id: number): Promise<Task> => {
  try {
    if (!Number.isInteger(id) || id <= 0) {
      throw new Error("Invalid task ID");
    }

    const result = await pool.query("SELECT * FROM tasks WHERE id = $1", [id]);

    if (result.rows.length === 0) {
      throw new Error("Task not found");
    }

    return result.rows[0];
  } catch (error) {
    console.error("Error fetching task:", error);
    throw error;
  }
};