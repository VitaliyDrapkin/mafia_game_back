import { DeepPartial, FindOptionsWhere, In, Repository } from 'typeorm';
import { HttpException, HttpStatus } from '@nestjs/common';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';

export abstract class BaseRepository<T extends { id: number }, F> {
  protected constructor(private readonly repository: Repository<T>) {}

  public async addOne(entity: DeepPartial<T>): Promise<T> {
    const createdEntity = await this.repository.save(entity);
    return await this.getById(createdEntity.id);
  }

  public async addMany(entities: DeepPartial<T>[]): Promise<T[]> {
    const createdEntities = await this.repository.save(entities);
    const createdEntitiesIds: number[] = createdEntities.map(
      (entity) => entity.id,
    );
    return await this.repository.find({
      where: { id: In(createdEntitiesIds) } as FindOptionsWhere<T>,
      relations: this.getRelations(),
    });
  }

  public async getById(id: number): Promise<T> {
    return await this.repository.findOne({
      where: { id } as FindOptionsWhere<T>,
      relations: this.getRelations(),
    });
  }

  public async getOneByQuery(query: F | undefined): Promise<T | undefined> {
    const filters = this.queryToFilters(query);
    return await this.repository.findOne({
      where: filters,
      relations: this.getRelations(),
    });
  }

  public async getManyByQuery(
    query: F | undefined,
    options?: { skip?: number; take?: number },
  ): Promise<[T[], number]> {
    const filters = this.queryToFilters(query);
    return await this.repository.findAndCount({
      where: filters,
      relations: this.getRelations(),
      take: options?.take,
      skip: options?.skip,
    });
  }

  public async updateById(
    id: number,
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<boolean> {
    const response = await this.repository.update(id, partialEntity);
    return response.affected > 0;
  }

  public async updateManyByQuery(
    query: F | undefined,
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<number> {
    const filters = this.queryToFilters(query);
    const response = await this.repository.update(filters, partialEntity);
    return response.affected || 0;
  }

  public async deleteById(id: number): Promise<boolean> {
    const response = await this.repository.softDelete(id);
    return response.affected > 0;
  }

  public async deleteManyByQuery(query: F | undefined): Promise<number> {
    const filters = this.queryToFilters(query);
    const response = await this.repository.softDelete(filters);
    return response.affected || 0;
  }

  public async countByQuery(query: F): Promise<number> {
    const filters = this.queryToFilters(query);
    return await this.repository.count({
      where: filters,
      relations: this.getRelations(),
    });
  }

  /**
   * This method provides a list of key transformations to apply when processing
   * filter queries or other similar operations.
   *
   * Each transformation maps a set of keys to a new key. This can be useful
   * when you want to aggregate multiple query parameters into a single filter
   * or rename keys for consistency in your processing logic.
   *
   * For player, you might have multiple query parameters like `start_date` and
   * `end_date` that should be combined into a single `dateRange` key in the final
   * filter object. After the transformation, you can use this combined key in
   * `filterStrategies` to define how to handle such cases.
   *
   * GameDto transformation:
   * ```
   * [
   *   { keys: ['start_date', 'end_date'], newKey: 'dateRange' },
   *   { keys: ['min_price', 'max_price'], newKey: 'priceRange' }
   * ]
   * ```
   *
   * GameDto usage in `filterStrategies`:
   * ```
   * dateRange: (value: { start: Date; end: Date }) => ({
   *   start_date: LessThanOrEqual(value.end),
   *   end_date: MoreThanOrEqual(value.start)
   * }),
   *
   * priceRange: (value: { min: number; max: number }) => ({
   *   min_price: MoreThanOrEqual(value.min),
   *   max_price: LessThanOrEqual(value.max)
   * })
   * ```
   *
   * This would transform input filters where `start_date` and `end_date` are
   * combined into a single `dateRange` key in the final filter object, and the
   * `filterStrategies` method would handle this combined key appropriately.
   */
  protected getKeyTransformations(): Array<{ keys: string[]; newKey: string }> {
    return [];
  }

  private queryToFilters(query: F): FindOptionsWhere<T> {
    const filters: FindOptionsWhere<T> = {};
    const strategies = this.filterStrategies();

    const transformedQuery = this.transformKeys(
      query,
      this.getKeyTransformations(),
    );

    for (const [key, value] of Object.entries(transformedQuery)) {
      const strategy = strategies[key];
      if (strategy === undefined) {
        throw new HttpException(
          `Unhandled query ${key} filter`,
          HttpStatus.CONFLICT,
        );
      }
      if (strategy) {
        Object.assign(filters, strategy(value));
      }
    }

    return filters;
  }

  private transformKeys(
    query: F,
    transformations: Array<{ keys: string[]; newKey: string }>,
  ): F {
    const newQuery = { ...query };

    for (const { keys, newKey } of transformations) {
      const values = keys.map((key) => newQuery[key]);

      if (values.every((value) => value !== undefined)) {
        newQuery[newKey] = {} as F[keyof F];

        keys.forEach((key, index) => {
          newQuery[newKey][key] = values[index];
        });

        keys.forEach((key) => delete newQuery[key]);
      }
    }

    return newQuery;
  }

  /**
   * Creates filter strategies.
   * GameDto:
   *
   * {
   *   query_key: (query_value) => ({ db_column: filter_condition })
   * }
   *
   * GameDto for a specific entity:
   *
   * {
   *   full_name: (value) => ({ full_name: Like(`%${value}%`) })
   * }
   *
   * Here:
   * - `query_key` — the key from the request (e.g., the parameter passed in the query),
   * - `query_value` — the value that the player provides for the filter,
   * - `db_column` — the column in the database that is being filtered,
   * - `filter_condition` — the condition applied to the column for filtering (usually matches `query_value`, but can be transformed).
   *
   * A concrete player:
   * - If the request contains a filter for `full_name`, it will be converted into a `Like` query to search for partial matches.
   * - For instance, the query `?full_name=John` will return all users whose names contain "John" (e.g., "John Doe", "Johnny").
   */

  protected abstract filterStrategies(): Record<
    string,
    (value: any) => FindOptionsWhere<T>
  >;

  /**
   * This abstract method should return an array of strings representing the
   * relationships (i.e., related entities) that need to be included in queries.
   *
   * Each string corresponds to the name of a relation defined in the entity.
   * When implementing this method in a subclass, you should specify which
   * relations (like `player`, `posts`, `comments`, etc.) to load along with the entity.
   *
   * GameDto:
   * - If the entity has relations such as `player` and `comments`,
   *   the implementation might return: `['player', 'comments']`.
   *
   * @returns An array of strings, each representing a relation to be included in the query.
   */
  protected abstract getRelations(): string[];
}
