exports.up = function(knex) {
  return knex.schema.createTable("articles", function(table) {
    table.increments("article_id").primary();
    table.text("title");
    table.text("body");
    table.integer("votes");
    table.text("topic");
    table.text("author");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable("articles");
};
