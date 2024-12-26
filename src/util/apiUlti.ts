export type FilterParams = {
    user_id?: string;
    $or?: Array<FilterParams>;
    $and?: Array<FilterParams>;
    $contains?: Array<FilterParams>;
    [key: string]: any;
  };
  
  export type APIGetParams = {
    fields?: Array<
      | string
      | {
          [key: string]: any;
        }
    >;
    where?: any;
    order?: any;
    limit?: number;
    page?: number;
    [key: string]: any;
  };
  
  export interface IResponseList<T> {
    code: number;
    results: {
      objects: {
        rows: T;
      };
    };
    pagination?: {
      total: number;
      current_page: number;
      next_page: number;
      prev_page: number;
      limit: number;
    };
  }
  export interface IResponseListNoPagination<T> {
    code: number;
    results: {
      object: {
        count: number;
        rows: T;
      };
    };
  }
  
  export interface IResponse<T> {
    code: number;
    results: {
      object: T;
    };
  }
  export const exportResults = (res: any) => res.data;
  
  export const convertParams = (params: { [key: string]: any }) => {
    return Object.fromEntries(
      Object.entries(params).map(([key, value]) => [key, JSON.stringify(value)]),
    );
  };
  
  export const convertParamsDirectFilter = (params: { [key: string]: any }) => {
    return Object.fromEntries(
      Object.entries(params).map(([key, value]) => {
        if (value instanceof Array || value instanceof Object) {
          return [key, JSON.stringify(value)];
        } else {
          return [key, value];
        }
      }),
    );
  };
  

  export const mapData = <TInput, TOutput>(
    data: TInput[] | undefined,
    mapper: (item: TInput, index?: number) => TOutput,
  ): TOutput[] | undefined => {
    return data?.map(mapper);
  };
  