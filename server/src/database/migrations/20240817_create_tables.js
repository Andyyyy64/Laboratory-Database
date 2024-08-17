/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
    return knex.schema
      .createTable("labos", function (table) {
        table.increments("labo_id").primary();
        table.text("name").nullable();
        table.text("prof").notNullable();
        table.text("description").notNullable();
        table.text("prerequisites").notNullable();
        table.text("room_number").notNullable();
        table.text("research_field").notNullable();
        table.text("prof_email").notNullable();
        table.specificType("student_field", "text[]").notNullable();
        table.integer("liked_number").defaultTo(0);
      })
      .createTable("users", function (table) {
        table.increments("id").primary();
        table.string("student_id").nullable();
        table.string("email").notNullable();
        table.string("password").notNullable();
        table.integer("grade").nullable();
        table.text("field_of_interest").nullable();
        table
          .integer("labo_id")
          .unsigned()
          .references("labo_id")
          .inTable("labos")
          .onDelete("SET NULL");
        table.specificType("liked_labos", "integer[]").nullable();
        table.boolean("is_varified").defaultTo(false);
        table.integer("verificationCode").notNullable();
        table.timestamp("created_at").defaultTo(knex.fn.now());
      })
      .createTable("comments", function (table) {
        table.increments("id").primary();
        table
          .integer("labo_id")
          .unsigned()
          .references("labo_id")
          .inTable("labos")
          .onDelete("CASCADE");
        table
          .integer("user_id")
          .unsigned().notNullable()
          .references("id")
          .inTable("users")
          .onDelete("CASCADE");
        table.timestamp("timestamp").defaultTo(knex.fn.now());
        table.text("student_id").notNullable();
        table.string("comment").notNullable();
      });
  };
  
  /**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

  exports.down = function(knex) {
    return knex.schema
      .dropTableIfExists('comments')
      .dropTableIfExists('users')
      .dropTableIfExists('labos');
  };
  