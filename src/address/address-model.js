import Sequelize from "sequelize";
import { db } from "../db.js";

const { DataTypes } = Sequelize;

const getAddressInstance = (sequelize) => {
  if (!(sequelize instanceof Sequelize.Sequelize)) {
    throw Error("Expected a sequelize instance");
  }

  return sequelize.define(
    "Endereco",
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
      logradouro: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      numero: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      bairro: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      cidade: {
        type: DataTypes.STRING(255),
        allowNull: false,
      },
      uf: {
        type: DataTypes.CHAR(2),
        allowNull: false,
      },
      cep: {
        type: DataTypes.CHAR(9),
        allowNull: false,
      },
    },
    {
      sequelize: db,
      modelName: "Endereco",
      tableName: "Endereco",
      timestamps: true,
    }
  );
};

export const Address = getAddressInstance(db);
