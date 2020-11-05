import { BehaviorSubject, combineLatest, defer, Observable, Subject } from 'rxjs';
import { finalize, map, share, startWith, switchMap } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';

interface SimpleDataSource<T> extends DataSource<T> {
  connect(): Observable<T[]>;

  disconnect(): void;
}

export interface Sort<T> {
  property: keyof T;
  order: 'asc' | 'desc';
}

export interface PageRequest<T> {
  page: number;
  size: number;
  sort?: Sort<T>;
}

export interface Page<T> {
  content: T[];
  totalElements: number;
  size: number;
  number: number;
}

export type PaginatedEndpoint<T, Q> = (pageable: PageRequest<T>, query: Q) => Observable<Page<T>>;

function prepare<T>(callback: () => void): (source: Observable<T>) => Observable<T> {
  return (source: Observable<T>): Observable<T> => defer(() => {
    callback();
    return source;
  });
}

function indicate<T>(indicator: Subject<boolean>): (source: Observable<T>) => Observable<T> {
  return (source: Observable<T>): Observable<T> => source.pipe(
    prepare(() => indicator.next(true)),
    finalize(() => indicator.next(false))
  );
}

export class PaginatedDataSource<T, Q> implements SimpleDataSource<T> {
  private pageNumber = new Subject<number>();
  private sort: BehaviorSubject<Sort<T>>;
  private query: BehaviorSubject<Q>;
  private loading = new Subject<boolean>();

  public loading$ = this.loading.asObservable();
  public page$: Observable<Page<T>>;

  constructor(
    private endpoint: PaginatedEndpoint<T, Q>,
    initialSort: Sort<T>,
    initialQuery: Q,
    public pageSize = 20) {
    this.query = new BehaviorSubject<Q>(initialQuery);
    this.sort = new BehaviorSubject<Sort<T>>(initialSort);
    const param$ = combineLatest([this.query, this.sort]);
    this.page$ = param$.pipe(
      switchMap(([query, sort]) => this.pageNumber.pipe(
        startWith(0),
        switchMap(page => this.endpoint({page, sort, size: this.pageSize}, query)
          .pipe(indicate(this.loading))
        )
      )),
      share()
    );
  }

  sortBy(sort: Partial<Sort<T>>): void {
    const lastSort = this.sort.getValue();
    const nextSort = {...lastSort, ...sort};
    this.sort.next(nextSort);
  }

  queryBy(query: Partial<Q>): void {
    const lastQuery = this.query.getValue();
    const nextQuery = {...lastQuery, ...query};
    this.query.next(nextQuery);
  }

  fetch(page: number): void {
    this.pageNumber.next(page);
  }

  connect(): Observable<T[]> {
    return this.page$.pipe(map(page => page.content));
  }

  disconnect(): void {
  }

}
