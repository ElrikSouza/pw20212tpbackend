import { cachedProperty } from "../helpers/cached-property.js";
import { Roles } from "./role.model.js";

const getRoleId = (rotulo) => async () => {
  const { id } = await Roles.findOne({
    where: { rotulo },
    attributes: ["id"],
  });

  return id;
};

const getUserRoleId = cachedProperty(getRoleId("USER"));

const getAdmRoleId = cachedProperty(getRoleId("ADM"));

export const RolesService = { getUserRoleId, getAdmRoleId };
