import Sequelize from "sequelize";
import { db } from "../db.js";

const { DataTypes } = Sequelize;

const getOrderItemInstance = (sequelize) => {
  if (!(sequelize instanceof Sequelize.Sequelize)) {
    throw Error("Expected a sequelize instance");
  }

  return sequelize.define(
    "CompraItem",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      compraId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      produtoId: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      quantidade: {
        allowNull: false,
        type: DataTypes.INTEGER,
      },
    },
    {
      sequelize: db,
      modelName: "OrderItem",
      tableName: "CompraItem",
      timestamps: true,
    }
  );
};

export const OrderItem = getOrderItemInstance(db);
