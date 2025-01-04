import { Op, WhereOptions } from "sequelize";

enum sortTypeEnum {
  ASC = "ASC",
  DESC = "DESC",
}
export interface PaginationInterface {
  limit?: number;
  page?: number;
  sortBy?: string;
  sortType?: sortTypeEnum;
  search?: string;
  columns?: string[];
}
interface QueryInterface {
  limit?: number;
  offset?: number;
  order?: [string, string][];
  where?: any;
}
export class Pagination {
  limit: number;
  page: number;
  sortBy: string;
  sortType: sortTypeEnum;
  search: string;
  columns: string[];

  constructor({
    limit,
    page,
    sortBy,
    sortType,
    search,
    columns,
  }: PaginationInterface) {
    this.limit = limit ? Number(limit) : 10;
    this.page = page ? Number(page) : 1;
    this.sortBy = sortBy ?? "createdAt";
    this.sortType = sortType ?? sortTypeEnum.ASC;
    this.search = search ?? "";
    this.columns = columns ?? [];
  }

  getPreparedQuery(): QueryInterface {
    const query: QueryInterface = {};
    query["limit"] = this.limit;
    query["offset"] = (this.page - 1) * this.limit;
    query["order"] = [[this.sortBy, this.sortType]];
    if (this.search && this.columns.length) {
      for (const columnName of this.columns) {
        query["where"][columnName] = {
          [Op.like]: `%${this.search}%`,
        };
      }
    }
    return query;
  }
}
