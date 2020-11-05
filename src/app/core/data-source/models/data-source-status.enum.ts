// enum of states for manage view in pages where used data source
export enum DataSourceStatusEnum {
  init = 'init', // between init dataSource to get first response from data service (use for showing page preloader)
  hasData = 'hasData', // get response from data service with data (use for showing table/grid card)
  noData = 'noData', // get first response from data service without data (use for showing no data)
  error = 'error', // get first response from data service with error (use for showing error)
}
