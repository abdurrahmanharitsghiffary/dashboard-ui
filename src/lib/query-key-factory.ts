export class QueryKeyFactory {
  static LIST = 'LIST';
  static ITEM = 'ITEM';

  /**
   * Generate a query key for lists.
   * @param namespace - The namespace or root key of the query.
   * @param options - Additional options to customize the query key.
   * @returns A query key array for the list.
   */
  static list<T = undefined>(namespace: string, options?: T) {
    return [namespace, { scope: QueryKeyFactory.LIST, options }];
  }

  /**
   * Generate a query key for a single item.
   * @param namespace - The namespace or root key of the query.
   * @param id - The unique identifier for the item.
   * @param options - Additional options to customize the query key.
   * @returns A query key array for the item.
   */
  static item<T = undefined>(
    namespace: string,
    id: string | number,
    options?: T,
  ) {
    return [namespace, { id, scope: QueryKeyFactory.ITEM, options }];
  }

  /**
   * Generate a custom query key with nested scopes.
   * @param namespace - The namespace or root key of the query.
   * @param scopes - Additional nested scopes for the query.
   * @param options - Additional options to customize the query key.
   * @returns A query key array for custom scopes.
   */
  static custom<T = undefined>(
    namespace: string,
    scopes: string[],
    options?: T,
  ) {
    return [namespace, ...scopes, { options }];
  }
}
