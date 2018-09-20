import * as Configstore from 'configstore';
import { inject, injectable } from 'inversify';
import TYPES from '../../containers/types';

import {
  IConfigManagerService,
  IConfigstoreConfig,
  IConsoleService,
} from '../../interfaces';

@injectable()
export class ConfigManagerService implements IConfigManagerService {
  private conf: Configstore;

  constructor(
    @inject(TYPES.ConfigstoreConfig) configStoreConfig: IConfigstoreConfig,
    @inject(TYPES.ConsoleService) private consoleService: IConsoleService,
  ) {
    this.conf = new Configstore(configStoreConfig.name);
  }

  public setUserConfigValue(key: string, value: string): void {
    this.conf.set(key, value);
  }

  public getUserConfigValue(key: string): string {
    return this.conf.get(key);
  }

  public getUserConfigPath(): string {
    return this.conf.path;
  }

  public writeSecurityWarning(): void {
    const st1 = `This information will be kept in your local directory in a config file`;
    const st2 = `Passwords and secrets are kept in your local keystore.`;
    const st3 = this.consoleService
      .render`In any case, {yellow BE SURE THIS INFORMATION IS {bold SAFE}}!`;

    this.consoleService.writeBoxedMessage(
      `${st1}\n(path: ${this.getUserConfigPath()}).\n\n${st2}\n\n${st3}`,
    );
  }
}
