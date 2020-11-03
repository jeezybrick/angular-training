export interface AdapterInterface<T> {
  adapt(item: any): T;
}
