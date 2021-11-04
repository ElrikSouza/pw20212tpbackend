import { wrapWithErrorHandling } from "../errors/error-handling.js";
import { UsersService } from "./users-service.js";

const signUp = wrapWithErrorHandling(async (req, res) => {
  const { body: user } = req;

  await UsersService.signUp(user);

  return res.status(201).send({ message: "User has been created." });
});

const signIn = wrapWithErrorHandling(async (req, res) => {
  const { body: user } = req;

  const token = await UsersService.signIn(user);

  return res
    .status(200)
    .set("Authorization", `Bearer ${token}`)
    .send({ token });
});

export const UsersController = {
  signUp,
  signIn,
};
