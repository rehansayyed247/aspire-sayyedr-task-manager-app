import { Request, Response, NextFunction } from "express";
import { AppError } from "./errorHandler";

/**
 * Validate task creation/update request body
 */
export const validateTaskInput = (validateRequired = true) => {
  return (req: Request, _res: Response, next: NextFunction): void => {
    try {
      const { title, description, due, status } = req.body;

      // Validate required fields
      if (validateRequired) {
        if (!title || typeof title !== "string") {
          throw new AppError(400, "Title is required and must be a string");
        }
        if (!due || typeof due !== "string") {
          throw new AppError(400, "Due date is required");
        }
        if (!status || typeof status !== "string") {
          throw new AppError(400, "Status is required");
        }
      }

      // Validate field lengths
      if (title && title.length > 255) {
        throw new AppError(400, "Title must not exceed 255 characters");
      }
      if (description && description.length > 2000) {
        throw new AppError(400, "Description must not exceed 2000 characters");
      }

      // Validate date format
      if (due && new Date(due).toString() === "Invalid Date") {
        throw new AppError(400, "Invalid date format for due date");
      }

      // Validate status
      const validStatuses = ["pending", "in_progress", "completed"];
      if (status && !validStatuses.includes(status)) {
        throw new AppError(
          400,
          `Status must be one of: ${validStatuses.join(", ")}`
        );
      }

      next();
    } catch (error) {
      next(error);
    }
  };
};

/**
 * Validate task ID parameter
 */
export const validateTaskId = (
  req: Request,
  _res: Response,
  next: NextFunction
): void => {
  try {
    const id = Number(req.params.id);

    if (!Number.isInteger(id) || id <= 0) {
      throw new AppError(400, "Invalid task ID");
    }

    next();
  } catch (error) {
    next(error);
  }
};

/**
 * Async error wrapper for Express route handlers
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
