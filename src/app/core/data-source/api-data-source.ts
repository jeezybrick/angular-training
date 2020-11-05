import { BehaviorSubject, combineLatest, Observable, Subject, Subscription } from 'rxjs';
import { distinctUntilChanged, map, switchMap, tap } from 'rxjs/operators';
import { DataSource } from '@angular/cdk/collections';
import { DataSourceStateInterface } from './models/data-source-state.interface';
import { DataSourceStatusEnum } from './models/data-source-status.enum';
import { DataSourcePaginationStrategyInterface } from './models/data-source-pagination-strategy.enum';
import { DataSourceSortInterface } from './models/data-source-sort.interface';

export interface ApiParamsInterface {
  [key: string]: any;
}

export interface PaginationInterface {
  page: number;
  hasMore: true;
  total: number;
  pageSize?: number;
}

export interface PageInterface<T> {
  list: T[];
  pagination: PaginationInterface;
}


export class ApiDataSource<T> extends DataSource<T> {
  private _iniState: DataSourceStateInterface = {
    page: 1,
    pageSize: 10,
    filter: {},
    sort: null,
    paginationStrategy: DataSourcePaginationStrategyInterface.reduce,
  };

  protected _loading$ = new BehaviorSubject<boolean>(true);
  protected _status$: BehaviorSubject<DataSourceStatusEnum> = new BehaviorSubject<DataSourceStatusEnum>(
    DataSourceStatusEnum.init,
  );
  protected _state$ = new BehaviorSubject<DataSourceStateInterface>(this._iniState);
  protected _data$ = new BehaviorSubject<T[]>([]);
  protected _total$ = new BehaviorSubject<number>(0);
  protected _hasMore$ = new BehaviorSubject<boolean>(true);
  protected _errors$ = new Subject<Error>();
  protected stateChangesSubscription: Subscription = Subscription.EMPTY;

  public get data$(): Observable<T[]> {
    return this._data$.asObservable();
  }

  public get errors$(): Observable<Error> {
    return this._errors$.asObservable();
  }

  public get total$(): Observable<number> {
    return this._total$.asObservable();
  }

  public get total(): number {
    return this._total$.value;
  }

  public get hasMore$(): Observable<boolean> {
    return this._hasMore$.asObservable();
  }

  public get hasMore(): boolean {
    return this._hasMore$.value;
  }

  public get loading$(): Observable<boolean> {
    return this._loading$.asObservable();
  }

  public get disabledLoading$(): Observable<boolean> {
    return combineLatest([this._loading$, this._hasMore$]).pipe(
      map(([loading, hasMore]) => loading || !hasMore),
      distinctUntilChanged(),
    );
  }

  public get page(): number {
    return this._state$.value.page;
  }

  public set page(page: number) {
    if (page < 0 || page > this.total) {
      return;
    }
    if (this.paginationStrategy === DataSourcePaginationStrategyInterface.reduce && this._loading$.value) {
      return;
    }
    this.setState({ page });
  }

  public get paginationStrategy(): DataSourcePaginationStrategyInterface {
    return this._state$.value.paginationStrategy;
  }

  public set paginationStrategy(paginationSchema: DataSourcePaginationStrategyInterface) {
    this.setState({ paginationStrategy: paginationSchema, page: 1 });
  }

  public get pageSize(): number {
    return this._state$.value.pageSize;
  }

  public set pageSize(pageSize: number) {
    this.setState({ pageSize, page: 1 });
  }

  public set filter(filter: ApiParamsInterface) {
    this.setState({ filter, page: 1 });
  }

  public set sort(sort: DataSourceSortInterface) {
    this.setState({ sort, page: 1 });
  }

  protected setState(patch: Partial<DataSourceStateInterface>): void {
    this._state$.next({ ...this._state$.value, ...patch });
  }

  public get status$(): Observable<DataSourceStatusEnum> {
    return this._status$.asObservable();
  }

  protected set status(newStatus: DataSourceStatusEnum) {
    if (this._status$.value === newStatus || newStatus === DataSourceStatusEnum.init) {
      return;
    }

    this._status$.next(newStatus);
  }

  public constructor(
    /**
     *  Method for updating listening state changes
     *  !!! Needs call definition in inherit class
     */
    public apiRequest: (params: ApiParamsInterface) => Observable<PageInterface<T>>,
    private initialState: Partial<DataSourceStateInterface> = {},
  ) {
    super();
    this.setState(initialState);
    this._updateStateChangesSubscription();
  }

  public connect(): Observable<T[]> {
    return this._data$.asObservable();
  }

  public disconnect(): void {
    this.stateChangesSubscription.unsubscribe();
    this._data$.complete();
    this._state$.complete();
    this._loading$.complete();
    this._total$.complete();
    this._hasMore$.complete();
    this._errors$.complete();
    this._status$.complete();
  }

  public refresh(): void {
    this._state$.next({ ...this._state$.value });
  }

  public reload(): void {
    this._updateStateChangesSubscription();
  }

  public nextPage(): void {
    this.page = this.page + 1;
  }

  public previousPage(): void {
    this.page = this.page - 1;
  }

  /**
   *  Method for processing data when changed state
   */
  private _updateStateChangesSubscription(): void {
    if (this.stateChangesSubscription) {
      this.stateChangesSubscription.unsubscribe();
    }
    this.stateChangesSubscription = this._state$
      .pipe(
        tap(() => this._loading$.next(true)),
        map((state: DataSourceStateInterface) => this._prepareParams(state)),
        switchMap((params: ApiParamsInterface) => this.apiRequest(params)),
      )
      .subscribe(
        (pageData: PageInterface<T>) => {
          this._updateData(pageData.list);
          this._updateTotal(pageData.pagination.total);
          this._updateHasMore(pageData.pagination.hasMore);
          this.status = pageData.pagination.total ? DataSourceStatusEnum.hasData : DataSourceStatusEnum.noData;
          this._loading$.next(false);
        },
        (error: Error) => {
          this.status = DataSourceStatusEnum.error;
          this._loading$.next(false);
          this._errors$.next(error);
        },
      );
  }

  private _prepareParams(state: DataSourceStateInterface): any {
    return {
      page: state.page,
      per_page: state.pageSize,
      ...state.filter,
    };
  }

  private _updateData(data: T[]): void {
    switch (this.paginationStrategy) {
      case DataSourcePaginationStrategyInterface.update:
        this._data$.next(data);
        return;
      case DataSourcePaginationStrategyInterface.reduce:
        if (this.page === 1) {
          this._data$.next(data);
        } else {
          this._data$.next([...this._data$.value, ...data]);
        }
        return;
    }
  }

  private _updateTotal(total: number): void {
    if (this._total$.value !== total) {
      this._total$.next(total);
    }
  }

  private _updateHasMore(hasMore: boolean): void {
    if (this.hasMore !== hasMore) {
      this._hasMore$.next(hasMore);
    }
  }
}
