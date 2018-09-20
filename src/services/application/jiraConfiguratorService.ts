import { inject, injectable } from 'inversify';
import TYPES from '../../containers/types';

import { IConfigurator, IJiraConfigurationService } from '../../interfaces';

@injectable()
export class JiraConfiguratorService implements IConfigurator {
  constructor(
    @inject(TYPES.JiraConfigurationService)
    private jiraConfigurationService: IJiraConfigurationService,
  ) {}

  public async configure(): Promise<void> {
    try {
      this.jiraConfigurationService.configure();
    } catch (err) {
      process.exitCode = 1;
      console.log(err.message);
    }
  }
}
