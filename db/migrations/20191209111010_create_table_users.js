exports.up = function(knex) {
  //contains commands to update database
  return knex.schema.createTable("users", function(table) {
    table
      .string("username")
      .unique()
      .primary();
    table.string("name");
    table.string("avatar_url");
  });
};

exports.down = function(knex) {
  //rollback to previous stage

  return knex.schema.dropTable("users");
};
