declare namespace API {
  type PaginResponse<K extends keyof any, T> = {
    current_page: number;
    total_page: number;
    total_records: number;
  } & {
    [Value in K]: T[];
  };
  type IPaginQuery<T> = {
    page: number;
    items: number;
    query: T;
  };
} //TODO: Create queryParams by extent 2 below Interface
interface ICollectionQueryParams
  extends PrefixedWithCont<Partial<ICollection>>,
    PrefixedWithEQ<Partial<ICollection>>,
    QueryDate {}

interface QueryDate {
  created_at_lteq: string;
  created_at_gteq: string;
  updated_at_lteq: string;
  updated_at_gteq: string;
}
// type Recoed = Record
interface ITet<T>
  extends PrefixedWithCont<Partial<T>>,
    PrefixedWithEQ<Partial<T>>,
    QueryDate {}
// type Defination = ITet<ICollection>;
type Defination = ICollectionQueryParams;
type PrefixedWithCont<T extends Record<string, unknown>> = {
  [K in keyof T as `${string & K}_cont`]: T[K];
};
type PrefixedWithEQ<T extends Record<string, unknown>> = {
  [K in keyof T as `${string & K}_eq`]: T[K];
};
