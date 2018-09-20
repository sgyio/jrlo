import { inject, injectable } from 'inversify';
import TYPES from '../../containers/types';

import {
  IConfigManagerService,
  IConsoleService,
  ICredentialManagerService,
  IJiraConfig,
  IKeySecretPair,
} from 'interfaces';
import { IJiraConfigurationService } from 'interfaces/IJiraConfigurationService';

@injectable()
export class JiraConfigurationService implements IJiraConfigurationService {
  constructor(
    @inject(TYPES.ConfigManagerService)
    private configManagerService: IConfigManagerService,
    @inject(TYPES.CredentialManagerService)
    private credentialManagerService: ICredentialManagerService,
    @inject(TYPES.ConsoleService) private consoleService: IConsoleService,
  ) {}

  public async getJiraConfig(): Promise<IJiraConfig> {
    let jiraConfig: IJiraConfig;

    const credentials = await this.getJiraCredentials();

    if (!credentials) {
      jiraConfig = await this.configure();
    } else {
      jiraConfig = {
        host: this.configManagerService.getUserConfigValue('host'),
        username: credentials.key,
        password: credentials.secret,
      };
    }

    return jiraConfig;
  }

  public async configure(): Promise<IJiraConfig> {
    this.consoleService.writeBoxedMessage('JIRA Configuration', 'white');

    this.configManagerService.writeSecurityWarning();

    const answers: any = await this.consoleService.prompt([
      {
        type: 'input',
        name: 'host',
        message: 'Enter JIRA host (ex: "jira.host.com"):',
      },
      { type: 'input', name: 'username', message: 'Enter your JIRA username:' },
      {
        type: 'password',
        name: 'password',
        message: 'Enter your JIRA password:',
      },
    ]);

    this.consoleService.insertLine();

    this.configManagerService.setUserConfigValue('host', answers.host);
    this.configManagerService.setUserConfigValue(
      'jiraUsername',
      answers.username,
    );

    await this.credentialManagerService.storeKeyAndSecret(
      'jiraUsername',
      answers.username,
      answers.password,
    );

    this.consoleService.writeInfo('JIRA configuration done.');
    return { ...answers };
  }

  private async getJiraCredentials(): Promise<IKeySecretPair> {
    const credentials = await this.credentialManagerService.getKeyAndSecret(
      'jiraUsername',
    );

    return credentials;
  }
}
