import { DataSourceSortInterface } from './data-source-sort.interface';
import { DataSourcePaginationStrategyInterface } from './data-source-pagination-strategy.enum';
import { DataSourcePaginationInterface } from './data-source-pagination.interface';

export interface DataSourceStateInterface extends DataSourcePaginationInterface {
  page: number;
  pageSize: number;
  filter: { [key: string]: any };
  sort: DataSourceSortInterface;
  paginationStrategy: DataSourcePaginationStrategyInterface;
}
