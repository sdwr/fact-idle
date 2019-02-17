
export type Building = {
  id: number;
  visible: boolean;
  cost: number;
  energyToMove: number;
  moneyPerMinute: number;
  energyPerMinute: number;
  img: string;
};

export function createBuilding(id, visible, cost, energyToMove, 
															 moneyPerMinute, energyPerMinute, img) {
  return {
    id,
    visible,
    cost,
    energyToMove,
    moneyPerMinute,
    energyPerMinute,
    img
  } as Building;
}