import { inject, injectable } from 'inversify';
import TYPES from '../../containers/types';

import {
  IConfigManagerService,
  IConsoleService,
  ICredentialManagerService,
  ITrelloConfig,
  ITrelloConfigurationService,
  ITrelloService,
} from '../../interfaces';
import { IList } from '../../model';

@injectable()
export class TrelloConfigurationService implements ITrelloConfigurationService {
  constructor(
    @inject(TYPES.ConfigManagerService)
    private configManagerService: IConfigManagerService,
    @inject(TYPES.CredentialManagerService)
    private credentialManagerService: ICredentialManagerService,
    @inject(TYPES.ConsoleService) private consoleService: IConsoleService,
    @inject(TYPES.TrelloService) private trelloService: ITrelloService,
    @inject(TYPES.TrelloConfig) private trelloConfig: ITrelloConfig,
  ) {}

  public async configure(): Promise<void> {
    this.consoleService.writeBoxedMessage('Trello Configuration', 'white');

    this.configManagerService.writeSecurityWarning();

    const appKey = await this.configureAppKey();
    const answers = await this.configureCredentials(appKey);

    this.consoleService.write('');

    await this.configureBoard(answers.username, answers.token, appKey);

    this.consoleService.write('');
    this.consoleService.writeInfo('Trello configuration done.');
  }

  private async configureAppKey(): Promise<string> {
    this.consoleService.writeLine(
      'This app will use your own App Key, you can find it by logging in to Trello and going to:\n    ❯❯ https://trello.com/app-key',
    );

    const answers = await this.consoleService.prompt([
      {
        type: 'input',
        name: 'appKey',
        message: 'Enter your Trello App Key:',
      },
    ]);

    await this.credentialManagerService.storeKeyAndSecret(
      'trelloAppKey',
      'appKey',
      answers.appKey,
    );

    return answers.appKey;
  }

  private async configureCredentials(appKey: string): Promise<any> {
    this.consoleService.writeLine(
      '\nTo use Trello, we also need your authorization as a user for read and write operations.  Click on link to open your in your browser:',
    );

    this.consoleService.writeLine(
      `    ❯❯ https://trello.com/1/authorize?key=${appKey}&name=jrlo&expiration=30days&scope=read,write&response_type=token`,
    );

    const answers = await this.consoleService.prompt([
      {
        type: 'input',
        name: 'token',
        message: 'Enter your Trello token:',
      },
      {
        type: 'input',
        name: 'username',
        message: 'Enter your Trello username:',
      },
    ]);

    this.credentialManagerService.storeKeyAndSecret(
      'trello',
      answers.username,
      answers.token,
    );

    return answers;
  }

  private async configureBoard(
    username: string,
    token: string,
    appKey: string,
  ): Promise<any> {
    const boardList = await this.trelloService.getBoardList(
      username,
      this.trelloConfig.appKey,
      token,
    );

    if (boardList && boardList.length) {
      const board: any = await this.consoleService.prompt([
        {
          type: 'list',
          name: 'name',
          message: 'Choose board you want to use:',
          choices: boardList.map(i => i[1]),
        },
      ]);

      board.id = boardList.filter(i => i[1] === board.name)[0][0];
      board.workflow = await this.configureLists(board.id, appKey, token);
      this.configManagerService.setUserConfigValue('trelloBoard', board);
    } else {
      this.consoleService.writeError(
        'No board available.  Open a new board in Trello and reconfigure jrlo.',
      );
      return;
    }
  }

  private async configureLists(
    boardId: string,
    appKey: string,
    token: string,
  ): Promise<any> {
    const listList = await this.trelloService.getListList(
      boardId,
      appKey,
      token,
    );

    if (listList && listList.length) {
      const workflow = await this.getWorkflowLists(listList);
      return workflow;
    } else {
      this.consoleService.error(
        `No list, create a 'todo', 'in progress' and a 'done' list in your board.`,
      );
      return;
    }
  }

  private async getWorkflowLists(listList: IList[]): Promise<any> {
    const workflow: any = {};

    workflow.todoId = await this.getWorkflowList('Todo (or backlog)', listList);
    listList = listList.filter(x => x[0] !== workflow.todoId);
    workflow.inProgressId = await this.getWorkflowList('In Progress', listList);
    listList = listList.filter(x => x[0] !== workflow.inProgressId);
    workflow.doneId = await this.getWorkflowList('Done', listList);

    return workflow;
  }

  private async getWorkflowList(
    listName: string,
    list: IList[],
  ): Promise<string> {
    const listChoice: any = await this.consoleService.prompt([
      {
        type: 'list',
        name: 'name',
        message: `Select your ${listName} list:`,
        choices: list.map(i => i[1]),
      },
    ]);

    return list.filter(i => i[1] === listChoice.name)[0][0];
  }
}
