import { injectable } from 'inversify';
import { container } from '../containers';
import TYPES from '../containers/types';

import { ICommand, IJiraService } from '../interfaces';

@injectable()
export class ListCommand implements ICommand {
  public readonly command = ['list <type>', 'l'];
  public readonly describe = 'List a type with a query.';
  public builder = {
    query: {
      describe: 'Specify query (can be JQL for JIRA)',
      alias: 'q',
      nargs: 1,
      demand: true,
    },
    limit: {
      alias: 'l',
      describe: 'Limit in search result',
      demand: false,
    },
    width: {
      alias: 'w',
      describe: 'Column width of issue description.',
      demand: false,
      type: 'number',
    },
  };

  public handler(args: any): void {
    const jiraService = container.get<IJiraService>(TYPES.JiraService);

    const options = {
      json: args.json,
      width: args.width || 60,
    };

    jiraService.listIssuesFromQuery(args.query, options);
  }
}
