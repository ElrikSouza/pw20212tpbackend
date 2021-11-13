import Sequelize from "sequelize";
import { db } from "../db.js";
import { Users } from "../users/users.model.js";

const { DataTypes } = Sequelize;

const getRoleInstance = (sequelize) => {
  if (!(sequelize instanceof Sequelize.Sequelize)) {
    throw Error("Expected a sequelize instance");
  }

  return sequelize.define(
    "TipoUsuario",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      rotulo: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    },
    {
      sequelize: db,
      modelName: "TipoUsuario",
      tableName: "TipoUsuario",
      timestamps: false,
    }
  );
};

export const Roles = getRoleInstance(db);

Roles.hasMany(Users, {
  foreignKey: "tipoUsuarioId",
  type: DataTypes.INTEGER,
  allowNull: false,
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
  required: true,
});

Users.belongsTo(Roles, {
  foreignKey: "tipoUsuarioId",
  type: DataTypes.INTEGER,
  allowNull: false,
  onDelete: "RESTRICT",
  onUpdate: "RESTRICT",
  required: true,
});
