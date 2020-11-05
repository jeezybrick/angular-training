export type SortDirectionType = 'asc' | 'desc' | '';

export interface DataSourceSortInterface {
  direction: SortDirectionType;
  active: string;
}
