declare namespace API {
    type PaginResponse<K extends keyof any, T> = {
        current_page: number;
        total_page: number;
        total_records: number;
    } & {
        [Value in K]: T[];
    };

    interface QueryParams<T> {
        page: number;
        items: number;
        query: RansackQuery<T>;
    }

    /**________________________________________________________________________________________________ */
}

type RansackQuery<T> = {
    [K in keyof T as `${string & K}${T[K] extends string | null
        ? '_eq' | '_cont'
        : T[K] extends Date | null
        ? '_lteq' | '_gteq' | '_gt' | '_lt'
        : T[K] extends boolean | null
        ? '_true' | '_false'
        : never}`]: T[K];
} & {
    [key: string | number]: any; //dynamic query
};
