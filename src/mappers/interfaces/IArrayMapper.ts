import { IMapper } from './IMapper';

export interface IArrayMapper extends IMapper {
  mapArray(response: any[]): any[];
}
