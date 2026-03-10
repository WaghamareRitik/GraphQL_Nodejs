export function getPagination(limit?: number, offset?: number) {
  return {
    limit: limit || 10,
    offset: offset || 0,
  };
}
