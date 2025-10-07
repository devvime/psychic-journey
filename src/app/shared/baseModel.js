import database from "#root/app/shared/database.js";

export default class BaseModel {
  table = "";

  findAll(fields = ["*"], where = {}) {
    return database.select(fields).table(this.table).where(where);
  }

  findById(id, fields = ["*"]) {
    return database.select(fields).table(this.table).where({ id }).first();
  }

  findByEmail(email) {
    return database.select("*").from(this.table).where({ email }).first();
  }

  create(data) {
    return database.insert(data).into(this.table);
  }

  update(id, data) {
    return database.update(data).where({ id }).table(this.table);
  }

  delete(id) {
    return database.delete().where({ id }).table(this.table);
  }

  /**
   * Paginate results with dynamic filtering.
   * @param {Object} options
   * @param {number} [options.page=1] - Current page number.
   * @param {number} [options.perPage=10] - Items per page.
   * @param {Array<string>} [options.fields=["*"]] - Fields to select.
   * @param {Object} [options.where={}] - Filters.
   * @param {Object} [options.orderBy={column: "id", direction: "asc"}] - Order config.
   * @returns {Promise<{data: any[], total: number, totalPages: number, pages: number[], currentPage: number}>}
   */
  async paginate({
    page = 1,
    perPage = 10,
    fields = ["*"],
    where = {},
    orderBy = { column: "id", direction: "asc" }
  } = {}) {
    const offset = (page - 1) * perPage;
    const applyFilters = (query, filters) => {
      for (const [field, condition] of Object.entries(filters)) {
        if (condition && typeof condition === "object" && !Array.isArray(condition)) {
          const [operator, value] = Object.entries(condition)[0];
          switch (operator) {
            case "like":
              query.where(field, "like", value);
              break;
            case "in":
              query.whereIn(field, value);
              break;
            case "between":
              query.whereBetween(field, value);
              break;
            case ">":
            case "<":
            case ">=":
            case "<=":
            case "!=":
              query.where(field, operator, value);
              break;
            default:
              query.where(field, value);
          }
        } else {
          query.where(field, condition);
        }
      }
    };

    const countQuery = database(this.table);
    applyFilters(countQuery, where);
    const [{ count }] = await countQuery.count({ count: "*" });
    const total = parseInt(count, 10);
    const totalPages = Math.ceil(total / perPage);
    const dataQuery = database
      .select(fields)
      .from(this.table)
      .orderBy(orderBy.column, orderBy.direction)
      .limit(perPage)
      .offset(offset);

    applyFilters(dataQuery, where);
    const data = await dataQuery;
    const pages = [];
    const startPage = Math.max(1, totalPages - 4);

    for (let i = startPage; i <= totalPages; i++) {
      pages.push(i);
    }

    return {
      data,
      total,
      totalPages,
      currentPage: page,
      pages,
    };
  }
}
