import { injectable } from 'inversify';
const opn = require('opn');

import { container } from '../containers';
import TYPES from '../containers/types';

import { ICommand } from '../interfaces';
import { IConfigManagerService } from '../interfaces/IConfigManagerService';

@injectable()
export class OpenCommand implements ICommand {
  public readonly command = ['open [issue]', 'o'];
  public readonly describe = 'Open an issue in browser.';
  public builder = {};

  public handler(args: any): void {
    const configManagerService = container.get<IConfigManagerService>(
      TYPES.ConfigManagerService,
    );

    if (/([a-z]+\d*)-\d+/i.test(args.issue)) {
      const host = configManagerService.getUserConfigValue('host');
      opn(`https://${host}/browse/${args.issue}`, { wait: false });
    } else {
      console.log('Does not seem to be a valid issue key.');
    }
  }
}
