export interface ITrelloService {
  getBoardList(username: string, key: string, token: string): Promise<any>;
  getListList(boardId: string, key: string, token: string): Promise<any>;
}
