export enum RoomType {
  SINGLE = 'SINGLE',
  DOUBLE = 'DOUBLE',
  SUITE = 'SUITE',
  MATRIMONIAL = 'MATRIMONIAL'
}

export interface RoomDTO {
  roomNumber: number;
  type: RoomType;
  price: number;
  isAvailable: boolean;
}
