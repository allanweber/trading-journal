export class Paginated<T> {
  public pageSize: number;
  public page: number;
  public total: number;
  public totalPages: number;

  public data: T[];

  constructor(list: T[], pageSize: number, page: number, total: number) {
    this.data = list;
    this.page = page;
    this.pageSize = pageSize;
    this.total = total;
    this.totalPages = Math.ceil(total / pageSize);
  }
}

export interface PaginatedParams {
  pageSize: number;
  page: number;
  total: number;
  totalPages: number;
}
