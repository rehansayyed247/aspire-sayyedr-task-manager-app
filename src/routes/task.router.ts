import { Router } from "express";
import * as TaskController from "../controllers/task.controller";
import {
  validateTaskInput,
  validateTaskId,
} from "../middleware/validation";

const router = Router();

/**
 * GET /api/tasks - Get all tasks
 */
router.get("/", TaskController.getAllTasks);

/**
 * POST /api/tasks - Create a new task
 * Body: { title, description, due, status }
 */
router.post(
  "/",
  validateTaskInput(true),
  TaskController.addTask
);

/**
 * PUT /api/tasks/:id - Update a task
 * Body: { title, description, due, status }
 */
router.put(
  "/:id",
  validateTaskId,
  validateTaskInput(true),
  TaskController.editTask
);

/**
 * DELETE /api/tasks/:id - Delete a task
 */
router.delete(
  "/:id",
  validateTaskId,
  TaskController.removeTask
);

export default router;