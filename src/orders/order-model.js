import Sequelize from "sequelize";
import { db } from "../db.js";

const { DataTypes } = Sequelize;

const getOrderInstance = (sequelize) => {
  if (!(sequelize instanceof Sequelize.Sequelize)) {
    throw Error("Expected a sequelize instance");
  }

  return sequelize.define(
    "Compra",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      usuarioId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      enderecoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      data: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize: db,
      modelName: "Order",
      tableName: "Compra",
      timestamps: true,
    }
  );
};

export const Order = getOrderInstance(db);
