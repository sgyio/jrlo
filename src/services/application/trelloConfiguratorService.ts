import { inject, injectable } from 'inversify';
import TYPES from '../../containers/types';

import { IConfigurator, ITrelloConfigurationService } from '../../interfaces';

@injectable()
export class TrelloConfiguratorService implements IConfigurator {
  constructor(
    @inject(TYPES.TrelloConfigurationService)
    private trelloConfigurationService: ITrelloConfigurationService,
  ) {}

  public async configure(): Promise<void> {
    try {
      this.trelloConfigurationService.configure();
    } catch (err) {
      process.exitCode = 1;
      console.log(err.message);
    }
  }
}
