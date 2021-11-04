import { ApiError } from "./api-error.js";

export const errorHandlingMiddleware = async (err, req, res, _) => {
  if (!(err instanceof ApiError)) {
    return res
      .status(500)
      .send({ code: 500, message: "An unknown error has occurred" });
  }

  return res.status(err.code).send({ message: err.message });
};
