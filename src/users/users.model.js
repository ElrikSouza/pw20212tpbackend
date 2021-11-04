import Sequelize from "sequelize";
import { db } from "../db.js";

const { DataTypes } = Sequelize;

const getUserInstance = (sequelize) => {
  if (!(sequelize instanceof Sequelize.Sequelize)) {
    throw Error("Expected a sequelize instance");
  }

  return sequelize.define(
    "Usuario",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      tipoUsuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      nome: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING(100),
        allowNull: false,
        unique: true,
      },
      senha: {
        type: DataTypes.CHAR(60),
        allowNull: false,
      },
    },
    {
      sequelize: db,
      modelName: "Usuario",
      tableName: "Usuario",
      timestamps: true,
    }
  );
};

export const Users = getUserInstance(db);
