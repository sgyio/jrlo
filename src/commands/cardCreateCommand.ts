import { injectable } from 'inversify';
// import { container } from '../containers';
// import TYPES from '../containers/types';

import { container } from '../containers';
import TYPES from '../containers/types';
import { ICardService, ICommand } from '../interfaces';

@injectable()
export class CardCreateCommand implements ICommand {
  public readonly command = ['create', 'c'];
  public readonly describe = 'Card create command';
  public builder = {
    i: {
      describe: 'Specify issue key',
      alias: 'issue',
      nargs: 1,
      demand: true,
    },
  };

  public handler(args: any): void {
    const cardService = container.get<ICardService>(TYPES.CardService);
    cardService.createFromIssue(args.issue);
  }
}
