import connection from "#root/database/database.js";

export default class BaseModel {
  table = "";

  findAll(fields = ["*"], where = {}) {
    return connection.select(fields).table(this.table).where(where);
  }

  findById(id, fields = ["*"]) {
    return connection.select(fields).table(this.table).where({ id }).first();
  }

  findByEmail(email) {
    return connection.select("*").from(this.table).where({ email }).first();
  }

  create(userData) {
    return connection.insert(userData).into(this.table);
  }

  update(id, userData) {
    return connection.update(userData).where({ id }).table(this.table);
  }

  delete(id) {
    return connection.delete().where({ id }).table(this.table);
  }
}