/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").del();
  await knex("users").insert([
    { name: "Alice", email: "alice@example.com", password: "sgsgegseg#ggs4" },
    { name: "Bob", email: "bob@example.com", password: "sgsgegseg#ggs4" },
    { name: "Charlie", email: "charlie@example.com", password: "sgsgegseg#ggs4" },
  ]);
};
