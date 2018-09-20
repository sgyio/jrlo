import { injectable } from 'inversify';

import { IToArrayMapper } from './interfaces/IToArrayMapper';

@injectable()
export class BoardMapper implements IToArrayMapper {
  public map(response: any): any {
    return {
      id: response.id,
      name: response.name,
      closed: response.closed,
    };
  }

  public mapArray(response: any[]): any[] {
    return response.map(this.map);
  }

  public mapToArray(data: any[]): any[][] {
    return data.map((line) => [line.id, line.name, line.closed]);
  }
}
