
export type Tile = {
  id: number;
  contains: number;
};

export function createTile(id, contains) {
  return {
    id,
    contains
  } as Tile;
}
