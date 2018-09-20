import { inject, injectable } from 'inversify';
import TYPES from '../../containers/types';

import {
  IConsoleService,
  IRequestService,
  ITrelloService,
} from '../../interfaces';
import { IToArrayMapper } from '../../mappers';

@injectable()
export class TrelloService implements ITrelloService {
  constructor(
    @inject(TYPES.BoardMapper) private boardMapper: IToArrayMapper,
    @inject(TYPES.RequestService) private requestService: IRequestService,
    @inject(TYPES.ConsoleService) private consoleService: IConsoleService,
  ) {}

  public async getBoardList(
    username: string,
    key: string,
    token: string,
  ): Promise<any> {
    try {
      const response = await this.requestService.get(
        `https://api.trello.com/1/members/${username}/boards?filter=open&key=${key}&token=${token}`,
      );

      return this.boardMapper.mapToArray(response);
    } catch (e) {
      this.handleError(e);
    }
  }

  public async getListList(
    boardId: string,
    key: string,
    token: string,
  ): Promise<any> {
    try {
      const response = await this.requestService.get(
        `https://api.trello.com/1/boards/${boardId}/lists?filter=open&key=${key}&token=${token}`,
      );

      return this.boardMapper.mapToArray(response);
    } catch (e) {
      this.handleError(e);
    }
  }

  private handleError(err: any): void {
    process.exitCode = 1;
    if (err.message.includes('401')) {
      this.consoleService.writeError(
        'Connection to Trello API is unauthorized.',
      );
    } else {
      this.consoleService.writeError(`Cannot connect to Trello API.`);
    }
  }
}
