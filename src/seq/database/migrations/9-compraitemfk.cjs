module.exports = {
  up: async (queryInterface, _) => {
    await queryInterface.addConstraint("CompraItem", {
      fields: ["compraId"],
      type: "foreign key",
      name: "compraItemCompraFk",
      references: {
        table: "Compra",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });

    await queryInterface.addConstraint("CompraItem", {
      fields: ["produtoId"],
      type: "foreign key",
      name: "compraItemProdutoFk",
      references: {
        table: "Produto",
        field: "id",
      },
      onDelete: "cascade",
      onUpdate: "cascade",
    });
  },

  down: async (queryInterface, _) => {
    await queryInterface.removeConstraint("CompraItem", "compraItemCompraFk");
    await queryInterface.removeConstraint("CompraItem", "compraItemProdutoFk");
  },
};
