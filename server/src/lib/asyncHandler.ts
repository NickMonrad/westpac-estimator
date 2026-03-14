import type { Request, Response, NextFunction } from 'express'

/**
 * Wraps an async Express route handler to automatically catch rejected promises
 * and forward them to Express error handling, preventing unhandled rejections.
 */
export const asyncHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<void>
) => (req: Request, res: Response, next: NextFunction): void => {
  Promise.resolve(fn(req, res, next)).catch(next)
}
