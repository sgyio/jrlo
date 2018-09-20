import { inject, injectable } from 'inversify';

import TYPES from '../../containers/types';
import { ICardService, IJiraService } from '../../interfaces';

@injectable()
export class CardService implements ICardService {
  constructor(@inject(TYPES.JiraService) private jiraService: IJiraService) {}

  public async createFromIssue(key: string): Promise<void> {
    console.log('createcard');
    const issue = await this.jiraService.getIssue(key);
    console.log(issue);
  }
}
