exports.up = function(knex) {
  return knex.schema.createTable("articles", function(table) {
    table.increments("article_id");
    table.string("title");
    table.string("body");
    table.integer("votes");
    table.string("author");
    table.timestamp("created_at").defaultTo(knex.fn.now());
  });
};

exports.down = function(knex) {};
