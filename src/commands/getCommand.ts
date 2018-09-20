import { injectable } from 'inversify';
import { container } from '../containers';
import TYPES from '../containers/types';

import { ICommand, IJiraService } from '../interfaces';

@injectable()
export class GetCommand implements ICommand {
  public readonly command = ['get <type> <id>', 'g'];
  public readonly describe = 'Get object type from source with an id.';
  public builder = {};

  public handler(args: any): void {
    const { id } = args;

    const jiraService = container.get<IJiraService>(TYPES.JiraService);

    try {
      jiraService.getIssue(id);
    } catch (e) {
      this.handleError(e);
    }
  }

  private handleError(err) {
    console.log(err);
  }
}
