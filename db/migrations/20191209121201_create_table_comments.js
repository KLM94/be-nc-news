exports.up = function(knex) {
  return knex.schema.createTable("comments", function(table) {
    table.increments("comment_id").primary();
    table.string("username");
    table.integer("article_id");
    table.integer("votes");
    table.timestamp("created_at").defaultTo(knex.fn.now());
    table.string("body");
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("comments");
};
