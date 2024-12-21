import { PaginationResponseDto } from '@src/common/interfaces/pagination.response.dto';

export class PaginationTransformer {
  static toPaginationResponseDto<T>(
    data: T[],
    totalItems: number,
    skip: number,
    take: number,
  ): PaginationResponseDto<T>;

  static toPaginationResponseDto<D, T>(
    data: T[],
    totalItems: number,
    skip: number,
    take: number,
    transformer: (item: T) => D,
  ): PaginationResponseDto<D>;

  static toPaginationResponseDto<D, T>(
    data: T[],
    totalItems: number,
    skip: number,
    take: number,
    transformer?: (item: T) => D,
  ): PaginationResponseDto<T> | PaginationResponseDto<D> {
    const currentPage = Math.floor(skip / take) + 1;
    const totalPages = Math.ceil(totalItems / take);

    const transformedData = transformer ? data.map(transformer) : data;

    if (transformer) {
      return {
        data: transformedData as D[],
        totalItems,
        totalPages,
        currentPage,
        itemsPerPage: take,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      };
    } else {
      return {
        data: transformedData as T[],
        totalItems,
        totalPages,
        currentPage,
        itemsPerPage: take,
        hasNextPage: currentPage < totalPages,
        hasPreviousPage: currentPage > 1,
      };
    }
  }
}
