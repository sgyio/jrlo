import { IArrayMapper } from './IArrayMapper';

export interface IToArrayMapper extends IArrayMapper {
  mapToArray(data: any[]): any[][];
}
