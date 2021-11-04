module.exports = {
  up: async (queryInterface, _) => {
    await queryInterface.addConstraint("Usuario", {
      fields: ["tipoUsuarioId"],
      type: "foreign key",
      name: "tipoUsuarioFk",
      references: {
        table: "TipoUsuario",
        field: "id",
      },
      onDelete: "restrict",
      onUpdate: "restrict",
    });
  },

  down: async (queryInterface, _) => {
    await queryInterface.removeConstraint("Usuario", "tipoUsuarioFk");
  },
};
