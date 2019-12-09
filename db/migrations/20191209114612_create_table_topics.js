exports.up = function(knex) {
  return knex.schema.createTable("topics", function(table) {
    table
      .string("slug")
      .unique()
      .primary();
    table.string("description");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("topics");
};
