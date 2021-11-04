export const wrapWithErrorHandling = (handler) => async (req, res, next) => {
  try {
    const result = await handler(req, res);
    return result;
  } catch (error) {
    next(error);
  }
};

export const wrapMiddlewareWithErrorHandling =
  (handler) => async (req, res, next) => {
    try {
      const result = await handler(req, res, next);
      return result;
    } catch (error) {
      next(error);
    }
  };
