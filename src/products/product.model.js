import Sequelize from "sequelize";
import { db } from "../db.js";

const { DataTypes } = Sequelize;

const getProductsInstance = (sequelize) => {
  if (!(sequelize instanceof Sequelize.Sequelize)) {
    throw Error("Expected a sequelize instance");
  }

  return sequelize.define(
    "Product",
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      img_filename: {
        type: DataTypes.STRING(120),
        allowNull: true,
      },
      nome: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      preco: {
        type: DataTypes.DECIMAL(12, 2),
        allowNull: false,
      },
      estoque: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      sequelize: db,
      modelName: "Product",
      tableName: "Produto",
      timestamps: true,
    }
  );
};

export const Products = getProductsInstance(db);
