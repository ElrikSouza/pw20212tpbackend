const getFromEnvOrFail = (key) => {
  if (!process.env[key]) {
    throw new Error(`Key ${key} does not exist in process.env`);
  }

  return process.env[key];
};

const getAdmAccountFromEnv = () => {
  if (process.env.NODE_ENV == "local") {
    const { config } = require("dotenv");
    config({ path: ".local.env" });
  }

  const admAccount = {
    id: 1,
    tipoUsuarioId: 2,
    nome: "adm",
    email: getFromEnvOrFail("ADM_EMAIL"),
    senha: getFromEnvOrFail("ADM_BCRYPT_PASS"),
    createdAt: new Date(),
    updatedAt: new Date(),
  };

  return admAccount;
};

module.exports = {
  up: async (queryInterface, _) => {
    await queryInterface.bulkInsert("TipoUsuario", [
      {
        id: 1,
        rotulo: "USER",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        rotulo: "ADM",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);

    await queryInterface.bulkInsert("Usuario", [getAdmAccountFromEnv()]);
  },

  down: async (queryInterface, _) => {
    await queryInterface.bulkDelete("TipoUsuario", {
      rotulo: ["USER", "ADM"],
    });

    await queryInterface.bulkDelete("Usuario", { where: { id: 1 } });
  },
};
