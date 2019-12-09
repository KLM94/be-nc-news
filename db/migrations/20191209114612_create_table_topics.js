exports.up = function(knex) {
  return knex.schema.createTable("topics", function(table) {
    table.string("slug");
    table.string("description");
  });
};

exports.down = function(knex) {};
