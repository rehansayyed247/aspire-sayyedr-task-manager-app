import { Request, Response } from "express";
import * as TaskModel from "../models/task.model";

/**
 * Get all tasks
 * @route GET /api/tasks
 */
export const getAllTasks = async (_req: Request, res: Response): Promise<void> => {
  try {
    const tasks = await TaskModel.getTasks();
    res.status(200).json({
      success: true,
      data: tasks,
      count: tasks.length,
    });
  } catch (error) {
    console.error("Controller error:", error);
    res.status(500).json({
      success: false,
      error: "Failed to fetch tasks",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

/**
 * Add a new task
 * @route POST /api/tasks
 * @body { title, description, due, status }
 */
export const addTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const { title, description, due, status } = req.body;

    // Validate required fields
    if (!title || !due || !status) {
      res.status(400).json({
        success: false,
        error: "Missing required fields: title, due, and status are required",
      });
      return;
    }

    const task = await TaskModel.createTask(
      title,
      description || "",
      due,
      status
    );

    res.status(201).json({
      success: true,
      data: task,
      message: "Task created successfully",
    });
  } catch (error) {
    console.error("Controller error:", error);
    res.status(400).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to create task",
    });
  }
};

/**
 * Edit an existing task
 * @route PUT /api/tasks/:id
 * @body { title, description, due, status }
 */
export const editTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);
    const { title, description, due, status } = req.body;

    // Validate ID
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        success: false,
        error: "Invalid task ID",
      });
      return;
    }

    // Validate required fields
    if (!title || !due || !status) {
      res.status(400).json({
        success: false,
        error: "Missing required fields: title, due, and status are required",
      });
      return;
    }

    const task = await TaskModel.updateTask(
      id,
      title,
      description || "",
      due,
      status
    );

    res.status(200).json({
      success: true,
      data: task,
      message: "Task updated successfully",
    });
  } catch (error) {
    console.error("Controller error:", error);
    const statusCode =
      error instanceof Error && error.message === "Task not found" ? 404 : 400;
    res.status(statusCode).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to update task",
    });
  }
};

/**
 * Delete a task
 * @route DELETE /api/tasks/:id
 */
export const removeTask = async (req: Request, res: Response): Promise<void> => {
  try {
    const id = Number(req.params.id);

    // Validate ID
    if (!Number.isInteger(id) || id <= 0) {
      res.status(400).json({
        success: false,
        error: "Invalid task ID",
      });
      return;
    }

    await TaskModel.deleteTask(id);

    res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Controller error:", error);
    const statusCode =
      error instanceof Error && error.message === "Task not found" ? 404 : 400;
    res.status(statusCode).json({
      success: false,
      error: error instanceof Error ? error.message : "Failed to delete task",
    });
  }
};